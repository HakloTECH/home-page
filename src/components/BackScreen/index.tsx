import { ElemType } from "bluejsx"
import { backScreen as CLASS_BACK_SCREEN, screen as CLASS_SCREEN, active as CLASS_ACTIVE, shutter as CLASS_SHUTTER, shut as CLASS_SHUT } from './index.module.scss'

const ctxNames = ['2d', 'webgl', 'webgl2', 'webgpu'] as const
type CTXName = typeof ctxNames[number]

class CanvasInfoList {
  elements: HTMLCanvasElement[] = []
  screenInfo: {
    [key in CTXName]?: {
      ctx: RenderingContext
      toFront: ()=>void
      toBack: ()=>void
    }
  } = {}
  sendCurrentScreenBack: ()=>void = ()=>{}
  constructor() {
    for (let i = ctxNames.length; i--;) {
      const key = ctxNames[i]
      const canvas = <canvas class={CLASS_SCREEN} /> as ElemType<'canvas'>
      this.screenInfo[key] = {
        ctx: canvas.getContext(key),
        toFront: ()=> canvas.classList.add(CLASS_ACTIVE),
        toBack: ()=> canvas.classList.remove(CLASS_ACTIVE),  
      }
      this.elements[i] = canvas
    }
  }
  forAllElements(func: (canvas: HTMLCanvasElement) => void) {
    for (let i = this.elements.length; i--;) {
      func(this.elements[i])
    }
  }
  useScreen(ctxName: CTXName){
    this.sendCurrentScreenBack()
    const screen = this.screenInfo[ctxName]
    screen.toFront()
    this.sendCurrentScreenBack = screen.toBack
    return screen.ctx
  }
}

const refs: {
  shutter?: ElemType<'div'>
} = {}
const canvasInfos = new CanvasInfoList()

const backScreen = <div class={CLASS_BACK_SCREEN}>
  {canvasInfos.elements}
  <div ref={[refs, 'shutter']} class={CLASS_SHUTTER}></div>
</div> as ElemType<'div'>
const { shutter } = refs

const fitCanvasToScreen = () => {
  canvasInfos.forAllElements(canvas => {
    canvas.width = document.body.clientWidth
    canvas.height = document.body.clientHeight
  })
}
fitCanvasToScreen()
window.addEventListener('resize', e => {
  fitCanvasToScreen()
})

export type backScreenSetter = {
  ctxName: CTXName
  init: (canvas: RenderingContext) => void | Promise<void>
  dispose: () => void | Promise<void>
}

let currentDisposer: () => void | Promise<void>

export const setBackScreen = async ({ ctxName, init, dispose }: backScreenSetter) => {
  shutter.classList.add(CLASS_SHUT)
  await currentDisposer?.()
  await init(canvasInfos.useScreen(ctxName))
  currentDisposer = dispose
  shutter.classList.remove(CLASS_SHUT)
}
export default backScreen 
