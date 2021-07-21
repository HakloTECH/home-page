import './main.scss'
import Main from './components/Main'
import Header from './components/Header'
import BackScreen from './components/BackScreen'
import backParticle from './backParticle'

const backScreen = <BackScreen /> as ReturnType<typeof BackScreen>
document.querySelector('#app').append(...<>
  {backScreen}
  <Header />
  <Main />
</>)
backScreen.setBackScreen(backParticle)