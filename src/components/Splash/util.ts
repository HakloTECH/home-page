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
let count = 0
export const waitMe = () =>{
  const i = count
  const waiter = {
    okToGo(){
      waiting[i] = true
      if(waiting.every(v=>v)) fireStart()
    }
  }
  waiting.push(false)
  count++
  
  return waiter
}

/* @ts-ignore */
window.fff = fireStart