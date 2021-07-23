import { ElemType } from 'bluejsx'
import { initText } from '../../catchPhraseAnim'
import Splash, { DURATION_ANIMATE } from '../Splash'
import { header as CLASS_HEADER, blackback as CLASS_BLACKBACK, descText as CLASS_DESCTEXT, descTextField as CLASS_DESCTEXT_FIELD } from './index.module.scss'
const { body } = document
const shrinkAnimOptions = {
  duration: 1,
  easing: 'ease-in-out',
  fill: 'both',
  delay: 1,
} as KeyframeAnimationOptions
export default () => {
  const refs: {
    splash?: ReturnType<typeof Splash>
    descText?: ElemType<'p'>
  } = {}
  const self = <header class={CLASS_HEADER}>
    <Splash ref={[refs, 'splash']} />
    <div class={CLASS_DESCTEXT_FIELD}>
      <p ref={[refs, 'descText']} class={CLASS_DESCTEXT} />
    </div>
  </header>
  const { splash, descText } = refs
  const textControl = initText(descText)
  const shrink = self.animate({
    height: ['80vh', 'var(--header-height)']
  }, shrinkAnimOptions)
  
  shrink.pause()
  

  addEventListener('DOMContentLoaded', () => {
    let blackback = false
    const moveDescTextPos = descText.animate({
      top: ['calc(var(--header-logo-bottom-y) + 15px)', '-20px'],
    }, shrinkAnimOptions)
    
    moveDescTextPos.pause()
    const onScroll = () => {
      const progress = 1 - body.getBoundingClientRect().top / body.offsetHeight
      shrink.currentTime = progress
      moveDescTextPos.currentTime = progress
      if (progress > 2) {
        if (!blackback) {
          self.classList.add(CLASS_BLACKBACK)
          textControl.stop()
          blackback = true
        }
      } else {
        if (blackback) {
          self.classList.remove(CLASS_BLACKBACK)
          textControl.start()
          blackback = false
        }
      }
    }
    document.addEventListener('scroll', onScroll)
    const onVisibilityChange = () => {
      if (document.hidden) return 0
      document.removeEventListener('visibilitychange', onVisibilityChange)
      
      if (window.scrollY === 0) {
        //alert('bruh')
        body.classList.add('disable-scroll')
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
      } else {
        //self.classList.add(CLASS_BLACKBACK)
      }

    }
    document.addEventListener('visibilitychange', onVisibilityChange)
    onVisibilityChange()

  })

  return self
}