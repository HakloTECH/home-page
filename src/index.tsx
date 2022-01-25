import './main.scss'
// import smoothscroll from 'smoothscroll-polyfill';

// smoothscroll.polyfill();

import Header from './components/Header'
import backScreen from './components/BackScreen'
import Main from './components/Main'
import PageSection from './components/PageSection'
import backParticle from './backPainters/particle.ts?url'
import { setBackScreen } from './components/BackScreen'

import {
  DescriptionA,
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
      <PageSection start={600} end={1500}>
        <DescriptionA />
      </PageSection>
      <PageSection start={1500} end={2500}>
        <WhatIsHaklo />
      </PageSection>
      <PageSection start={2500} end={4500}>
        <Works />
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
