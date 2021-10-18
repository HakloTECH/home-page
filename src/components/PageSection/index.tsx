import { ElemType, FuncCompParam } from "bluejsx";
import { section as CLASS_SECTION } from './index.module.scss'
import { backScreenSetter, setBackScreen } from '../BackScreen'


export default ({ children, screenSetter }: FuncCompParam<{ screenSetter?: backScreenSetter }>) => {
  const self = <section class={CLASS_SECTION}>
    {children}
  </section>
  if (screenSetter) {
    setBackScreen(screenSetter)
  }
  //document.addEventListener('scroll', ()=>{

  //})
  return self
}