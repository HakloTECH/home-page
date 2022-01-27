import { ElemType, RefType } from "bluejsx"
import style, { active as CLASS_ACTIVE } from './index.module.scss'
import { PainterData } from "./util"
import OffScreenWorker from './offScreen.worker?worker'
import { waitMe } from "../Splash/util"

const { okToGo } = waitMe()
const ctxNames = ['2d', 'webgl', 'webgl2'/* , 'webgpu' */, 'video'] as const

/* @ts-ignore */
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
          toFront: () => video.classList.add(CLASS_ACTIVE),
          toBack: () => video.classList.remove(CLASS_ACTIVE),
        }
        this.elements[i] = video
      } else {
        const canvas = <canvas class={style.screen} /> as ElemType<'canvas'>

        const info: ScreenInfo = {
          toFront: () => canvas.classList.add(CLASS_ACTIVE),
          toBack: () => canvas.classList.remove(CLASS_ACTIVE),
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
let firstPaint = true
let offWorker: Worker
let painterData: PainterData
let fitCanvasToScreen: (width: number, height: number) => void
if(OFF_SCREEN_AVAILABLE) {
  
  offWorker = new OffScreenWorker()
  offWorker.onmessage = async (e) => {
    switch (e.data.type) {
      case 'paintStart': {
        shutter.classList.add(style.shut)
        canvasInfos.useScreen(e.data.ctxName)
        break;
      }
      case 'paintEnd': {
        shutter.classList.remove(style.shut)
        if(firstPaint){
          okToGo()
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
    const { success, ctxName, init } = await painterData.loadPainter(scriptURL, CTXs)
    if(!success || prevPainterURL === scriptURL) return 0
    if(firstPaint){
      setTimeout(okToGo, 300)
      firstPaint = false
    }
    shutter.classList.add(style.shut)
    await currentDisposer?.()
    canvasInfos.useScreen(ctxName as CTXName)
    prevPainterURL = scriptURL
    currentDisposer = (await init()).dispose
    shutter.classList.remove(style.shut)
  }
}
export default backScreen