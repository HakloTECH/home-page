import { waitExec } from '../../utils/lib'
type Listener = ()=>void
const splashFuncs: Listener[] = []
const waiting: boolean[] = []
export const listenStart = (func: Listener) =>{
  splashFuncs.push(func)
}

export const fireStart = () =>{
  for(let i=splashFuncs.length;i--;){
    splashFuncs[i]()
  }
}


export const { waitMe } = waitExec(fireStart)
