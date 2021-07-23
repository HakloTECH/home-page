import { ElemType } from "bluejsx"
import { section as CLASS_SECTION, container as CLASS_CONTAINER } from './index.module.scss'
import PageSection from "../PageSection"
import backParticle from '../../backParticle'
export default ()=>{
  const self = <div class={CLASS_CONTAINER}>
    <PageSection screenSetter={backParticle}/>
    <section class={CLASS_SECTION}/>
    <section class={CLASS_SECTION}/>
  </div>
  return self
}