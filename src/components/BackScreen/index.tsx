import { ElemType } from "bluejsx"
import { backScreen as CLASS_SCREEN } from './index.module.scss'
export type backScreenSetter = {
  init: (canvas: HTMLCanvasElement) => void | Promise<void>
  dispose: () => void | Promise<void>
}
export default () => {
  const refs: {
    canvas?: ElemType<'canvas'>
    shutter?: ElemType<'div'>
  } = {}
  const backScreen = <div class={CLASS_SCREEN}>
    <canvas ref={[refs, 'canvas']}></canvas>
    <div ref={[refs, 'shutter']}></div>
  </div>
  const { canvas, shutter } = refs
  const fitCanvasToScreen = () => {
    canvas.width = document.body.clientWidth
    canvas.height = document.body.clientHeight
  }
  fitCanvasToScreen()
  window.addEventListener('resize', e => {
    fitCanvasToScreen()
  })
  let currentDisposer = () => { }
  backScreen.setBackScreen = async ({ init, dispose }: backScreenSetter) => {
    backScreen.classList.add('loading')
    await currentDisposer()
    await init(canvas)
    currentDisposer = dispose
    backScreen.classList.remove('loading')
  }
  return backScreen as ElemType<'div'> & { setBackScreen: (setter: backScreenSetter) => void }
}