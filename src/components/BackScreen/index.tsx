import { ElemType, RefType } from "bluejsx"
import style from './index.module.scss'
import { PainterData } from "./util"
import OffScreenWorker from './offScreen.worker?worker'
import { waitExec, sleep } from "../../utils/lib"
import { waitMe } from "../Splash/util"

const { okToGo: okToSplash } = waitMe()

const SHUTTER_SWITCH_TIME = 200
const ctxNames = ['2d', 'webgl', 'webgl2'/* , 'webgpu' */, 'video'] as const

const OFF_SCREEN_AVAILABLE = import.meta.env.PROD && 'transferControlToOffscreen' in HTMLCanvasElement.prototype

type OffscreenCanvas = Transferable
type CTXName = typeof ctxNames[number]
type ScreenElement = HTMLCanvasElement | HTMLVideoElement


type ScreenInfo = {
  ctx?: RenderingContext | HTMLVideoElement
  toFront: () => void
  toBack: () => void
}
/**
 * only used when OFF_SCREEN_AVAILABLE
 */
const offscreenObjects: OffscreenCanvas[] = []
/**
 * only used when !OFF_SCREEN_AVAILABLE
 */
const CTXs: {
  [key: string]: RenderingContext
} = {}

class CanvasInfoList {
  elements: ScreenElement[] = []
  screenInfo: {
    [key in CTXName]?: ScreenInfo
  } = {}
  sendCurrentScreenBack: () => void = () => { }
  constructor() {
    for (let i = ctxNames.length; i--;) {
      const key = ctxNames[i]
      if (key === 'video') {
        const video = <video class={style.screen} /> as ElemType<'video'>
        this.screenInfo[key] = {
          ctx: video,
          toFront: () => video.classList.add(style.active),
          toBack: () => video.classList.remove(style.active),
        }
        this.elements[i] = video
      } else {
        const canvas = <canvas class={style.screen} /> as ElemType<'canvas'>

        const info: ScreenInfo = {
          toFront: () => canvas.classList.add(style.active),
          toBack: () => canvas.classList.remove(style.active),
        }
        if(OFF_SCREEN_AVAILABLE) {
          const offscreen = canvas.transferControlToOffscreen()
          offscreenObjects.push(offscreen)
        } else {
          const ctx = canvas.getContext(key)
          CTXs[key] = ctx
          info.ctx = ctx
        }
        this.screenInfo[key] = info
        this.elements[i] = canvas
      }
      
    }
  }
  forAllElements(func: (canvas: ScreenElement) => void) {
    for (let i = this.elements.length; i--;) {
      func(this.elements[i])
    }
  }
  useScreen(ctxName: CTXName) {
    this.sendCurrentScreenBack()
    const screen = this.screenInfo[ctxName]
    screen.toFront()
    this.sendCurrentScreenBack = screen.toBack
    if(!OFF_SCREEN_AVAILABLE) return screen.ctx
  }
}

const refs: RefType<{
  shutter: 'div'
}> = {}
const canvasInfos = new CanvasInfoList()

const backScreen = <div class={style.backScreen}>
  {canvasInfos.elements}
  <div ref={[refs, 'shutter']} class={`${style.shutter} ${style.shut}`}></div>
</div> as ElemType<'div'>
const { shutter } = refs



export type backScreenSetter = {
  ctxName: CTXName
  init: (canvas: RenderingContext | HTMLVideoElement) => void | Promise<void>
  dispose: () => void | Promise<void>
}

let loaded = false
const waitTillLoad = () => new Promise(resolve => {
  if (loaded) resolve(0)
  else {
    addEventListener('load', () => setTimeout(() => {
      loaded = true
      resolve(0)
    }, 300))
  }
})
const hideBackScreen = () => {
  shutter.classList.add(style.shut)
  const { waitMe } = waitExec(()=>shutter.classList.remove(style.shut))
  const { okToGo } = waitMe()
  setTimeout(okToGo, SHUTTER_SWITCH_TIME);
  return { waitMe }
}
let firstPaint = true
let offWorker: Worker
let painterData: PainterData
let okToShowBackScreen: () => void
let fitCanvasToScreen: (width: number, height: number) => void

/*
# message order


M: main to worker
W: worker to main

(msg): e.data.type === msg
{ tasks }: doing tasks

## Initialization: 

M(init)

## Painting:

M(load) -> W(loaded) -> M {
  shutter on
  wait for SHUTTER_SWITCH_TIME ms
} -> M(paintStart) -> W(paintEnd) -> M {
  shutter off
  show matched screen
}
*/
if(OFF_SCREEN_AVAILABLE) {
  
  offWorker = new OffScreenWorker()
  offWorker.onmessage = async (e) => {
    switch (e.data.type) {
      case 'loaded': {
        okToShowBackScreen = hideBackScreen().waitMe().okToGo
        await sleep(SHUTTER_SWITCH_TIME)
        offWorker.postMessage({
          type: 'paintStart'
        })
        break;
      }
      case 'paintEnd': {
        okToShowBackScreen()
        canvasInfos.useScreen(e.data.ctxName)
        if(firstPaint){
          okToSplash()
          firstPaint = false
        }
        break;
      }
    }
  }
  offWorker.postMessage({
    type: 'init',
    canvases: offscreenObjects,
    ctxNames: ['2d', 'webgl', 'webgl2'/* , 'webgpu' */]
  }, offscreenObjects)
  fitCanvasToScreen = (width, height) => {
    offWorker.postMessage({
      type: 'resize',
      width,
      height
    })
  }
} else {
  painterData = new PainterData()
  fitCanvasToScreen = (width, height) => {
    canvasInfos.forAllElements(canvas => {
      canvas.width = width
      canvas.height = height
    })
  }
  
}
addEventListener('load', ()=>fitCanvasToScreen(document.body.clientWidth, document.body.clientHeight))

window.addEventListener('resize', () => {
  fitCanvasToScreen(document.body.clientWidth, document.body.clientHeight)
})
let currentDisposer: () => void | Promise<void> = () => { }
let prevPainterURL: string | null = null

export const setBackScreen = async (scriptURL: string) => {
  await waitTillLoad()
  if(OFF_SCREEN_AVAILABLE){
    offWorker.postMessage({
      type: 'load',
      scriptURL
    })
  } else {
    if(prevPainterURL === scriptURL) return 0
    const { success, ctxName, init } = await painterData.loadPainter(scriptURL, CTXs)
    if(!success) return 0
    prevPainterURL = scriptURL
    okToShowBackScreen = hideBackScreen().waitMe().okToGo
    await sleep(SHUTTER_SWITCH_TIME)
    await currentDisposer?.()
    currentDisposer = (await init()).dispose
    canvasInfos.useScreen(ctxName as CTXName)
    okToShowBackScreen()
    if(firstPaint){
      setTimeout(okToSplash, 300)
      firstPaint = false
    }
  }
}
export default backScreen