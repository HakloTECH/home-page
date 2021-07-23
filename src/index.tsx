import './main.scss'
import Main from './components/Main'
import Header from './components/Header'
import backScreen from './components/BackScreen'


document.querySelector('#app').append(...<>
  {backScreen}
  <Header />
  <Main />
</>)