import { getRefs } from 'bluejsx'
import { initText } from '../../utils/catchPhraseAnim'
import Splash, { DURATION_ANIMATE } from '../Splash'
import style from './index.module.scss'
import { listenStart } from '../Splash/util'
const { body } = document
const shrinkAnimOptions = {
  duration: 1,
  easing: 'ease-in-out',
  fill: 'both',
  delay: 1,
} as KeyframeAnimationOptions
export default () => {
  const refs = getRefs<{
    splash: typeof Splash
    descText: 'p'
  }>()
  const self = <header class={style.header}>
    <Splash ref={[refs, 'splash']} />
    <div class={style.descTextField}>
      <p ref={[refs, 'descText']} class={style.descText} />
    </div>
  </header>
  const { splash, descText } = refs
  const textControl = initText(descText)
  const shrink = self.animate({
    height: ['80vh', 'var(--header-height)']
  }, shrinkAnimOptions)

  shrink.pause()


  addEventListener('load', () => {
    body.classList.add('disable-scroll')
    let blackback = false
    const moveDescTextPos = descText.animate({
      top: ['calc(var(--header-logo-bottom-y) + 15px)', '-10px'],
    }, shrinkAnimOptions)

    moveDescTextPos.pause()
    const onScroll = () => {
      const progress = 1 - body.getBoundingClientRect().top / body.offsetHeight
      shrink.currentTime = progress
      moveDescTextPos.currentTime = progress
      if (progress > 2) {
        if (!blackback) {
          self.classList.add(style.blackback)
          textControl.stop()
          blackback = true
        }
      } else {
        if (blackback) {
          self.classList.remove(style.blackback)
          textControl.start()
          blackback = false
        }
      }
    }

    document.addEventListener('scroll', onScroll)
    listenStart(() => {
      setTimeout(() => {
        body.classList.remove('disable-scroll');
        textControl.start()
      }, DURATION_ANIMATE + 2100);
      self.animate({
        height: [
          '100vh',
          '80vh'
        ]
      }, {
        delay: DURATION_ANIMATE + 1100,
        duration: 500,
        easing: 'ease-in-out',
        fill: 'backwards'
      })
    })
  })

  return self
}