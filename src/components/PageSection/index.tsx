import { ElemType } from "bluejsx";
import { section as CLASS_SECTION } from './index.module.scss'
import { backScreenSetter, setBackScreen } from '../BackScreen'

type FuncCompParam = {
  children?: [Blue.JSX.Element]
  [key: string]: any
}
export default ({children, screenSetter}: FuncCompParam & { screenSetter?: backScreenSetter}) => {
  const refs: {

  } = {}
  const self = <section class={CLASS_SECTION}>
    {children}
  </section>
  //document.addEventListener('scroll', ()=>{
    setBackScreen(screenSetter)
  //})
  return self
}