import { AttrHolder, ElemType, FuncCompParam, RefType, useAttr, useConstProps } from "bluejsx";
import style from './index.module.scss'
import { backScreenSetter, setBackScreen } from '../BackScreen'
import backParticle from '../../backPainters/particle.ts?url'

let filterCount = 0
export default ({ children, screenSetter = backParticle, start, end, speed = .1 }: FuncCompParam<{
  screenSetter?: string
  start: number
  end: number
  speed?: number
}>) => {
  const self = <section class={style.section}>
    {children}
  </section>

  const mid = (start + end) / 2
  let visible = false
  useAttr(self, 'start', start)
  useAttr(self, 'end', end)
  useConstProps(self, {
    // start,
    // end,
    setScroll: (scrollTop: number) => {
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
  })
  return self
}
