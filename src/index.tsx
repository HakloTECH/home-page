import './main.scss'

import Header from './components/Header'
import backScreen from './components/BackScreen'
import Main from './components/Main'
import PageSection from './components/PageSection'
import backParticle from './backPainters/particle.ts?url'
import backLine from './backPainters/lines.ts?url'
import { setBackScreen } from './components/BackScreen'

import {
  CommingSoon,
  DescriptionA,
  DescriptionB,
  WhatIsHaklo,
  Works,
} from './components/Contents'
import { waitMe } from './components/Splash/util'

const { okToGo } = waitMe()

export const start = () =>
  <div>
    {backScreen}
    <Header />
    <Main>
      <PageSection start={600} end={3000} speed={0.05}>
        <DescriptionA />
      </PageSection>
      <PageSection start={1500} end={3000}>
        <DescriptionB />
      </PageSection>
      {/* <PageSection start={3000} end={5000}>
        <WhatIsHaklo />
      </PageSection>
      <PageSection start={5000} end={7000}>
        <Works />
      </PageSection> */}
      <PageSection start={3200} end={5000} screenSetter={backLine} speed={0.01}>
        <CommingSoon />
      </PageSection>
    </Main>
  </div>



document.querySelector('#app').append(start())
setBackScreen(backParticle)

const onVisibilityChange = () => {
  if (document.hidden) return 0
  document.removeEventListener('visibilitychange', onVisibilityChange)
  okToGo()
}
addEventListener('load', () => {
  document.addEventListener('visibilitychange', onVisibilityChange)
  onVisibilityChange()
})
