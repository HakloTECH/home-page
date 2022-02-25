import { ElemType, FuncCompParam, getRefs } from "bluejsx";
import style from './index.module.scss'
import { backScreenSetter, setBackScreen } from '../BackScreen'

let filterCount = 0
export default ({ children, screenSetter, start, end, speed = .1 }: FuncCompParam<{
  screenSetter?: backScreenSetter
  start: number
  end: number
  speed?: number
}>) => {
  const refs = getRefs<{
    gblur: 'feGaussianBlur'
    fa: 'feFuncA'
  }>()
  const filterId = `section_filter-${filterCount++}`
  const self = <section class={style.section}>
    {children}
    <svg>
      <filter id={filterId}>
        <feGaussianBlur ref={[refs, 'gblur']} stdDeviation='0 0' />
        <feComponentTransfer>
          <feFuncA ref={[refs, 'fa']} type="linear" slope="0" />
        </feComponentTransfer>
      </filter>
    </svg>
  </section>


  const { gblur, fa } = refs
  const range = end - start
  const mid = (start + end) / 2
  self.start = start
  self.end = end
  self.style.filter = `url(#${filterId})`
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
      gblur.setAttribute('stdDeviation', `0 0`)
      fa.setAttribute('slope', `1`)
      self.style.transform = `translateY(${p * speed}px)`
    } else {

      const outA = scrollTop - start, outB = scrollTop - end
      const shift = ((outA < 0) ? outA : outB) / 10

      const shiftAbs = Math.abs(shift)

      self.style.transform = `translateY(${p * 1.5 - shift}px)`
      gblur.setAttribute('stdDeviation', `0 ${shiftAbs}`)
      fa.setAttribute('slope', `${1 - shiftAbs / 15}`)
      if (shiftAbs > 10) {
        // if (visible) {
        //   visible = false
          self.classList.remove(style.visible)
        // }
      } else {
        self.classList.add(style.visible)
      }
    }
  }
  return self as ElemType<'section'> & { start: number, end: number, setScroll: (scrollTop: number) => void }
}
