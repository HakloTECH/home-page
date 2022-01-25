import { ElemType, FuncCompParam } from "bluejsx"
import style from './index.module.scss'
import PageSection from "../PageSection"


export const scrollTarget = (document.scrollingElement
  || document.documentElement
  || document.body.parentNode
  || document.body
) as HTMLElement


const scrollFrame = scrollTarget === document.body
  && document.documentElement
  ? document.documentElement
  : scrollTarget
window.onbeforeunload =  () => {
  scrollTarget.scrollTop = 0
};
export default ({ children }: FuncCompParam<{ children?: typeof PageSection[] }>) => {

  const self = <div class={style.container}>
    {children}
  </div>
  document.addEventListener('scroll', () => {
    
    const progress = scrollTarget.scrollTop
    
    children.forEach(child => {
      child.setScroll(progress)
    })
  })
  self.style.height = `${children[children.length-1].end+60}px`
  
  return self
}