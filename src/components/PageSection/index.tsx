import { ElemType, FuncCompParam, RefType } from "bluejsx";
import style from './index.module.scss'
import { backScreenSetter, setBackScreen } from '../BackScreen'

let filterCount = 0
export default ({ children, screenSetter, start, end, speed = .1 }: FuncCompParam<{
  screenSetter?: string
  start: number
  end: number
  speed?: number
}>) => {
  const self = <section class={style.section}>
    {children}
  </section>

  const mid = (start + end) / 2
  self.start = start
  self.end = end
  let visible = false
  self.setScroll = (scrollTop: number) => {
    const p = (mid - scrollTop)
    if (start <= scrollTop && end >= scrollTop) {
      if (!visible) {
        self.classList.add(style.visible)

        if (screenSetter) {
          setBackScreen(screenSetter)
        }
        visible = true
      }
      self.style.transform = `translateY(${p * speed}px)`
    } else {
      if (visible) {
        visible = false
        self.classList.remove(style.visible)
      }
    }
  }
  return self as ElemType<'section'> & { start: number, end: number, setScroll: (scrollTop: number) => void }
}
