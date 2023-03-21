import { ElemType } from "bluejsx";
import { DESCRIPTION } from "./logoDescriptionTexts";
const TIME_TYPE_CHAR = 50, TIME_DELETE_CHAR = 30;
enum PHASE {
  MOVING,
  STOP_REQUEST,
  STOPPED
}
let descTextIndex = 0, currentPhase = PHASE.STOPPED
const state: {
  resolver: (value: 0) => void,
  sleepTime: number,
  sleepStartTime: number,
  newSleep: boolean
} = {
  resolver: () => { },
  sleepTime: 0,
  sleepStartTime: 0,
  newSleep: false
}

const mainCallBack = (time: number) => {
  if (state.newSleep) {
    state.sleepStartTime = time
    state.newSleep = false
  }
  if (time - state.sleepStartTime >= state.sleepTime) {
    state.resolver(0)
  }
  requestAnimationFrame(mainCallBack)
}
requestAnimationFrame(mainCallBack)
// const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time))

// resolving sleep using `requestAnimationFrame` because `setTimeout` did not work on MS Edge
const sleep = (time: number) => new Promise<0>(resolve => {
  state.resolver = resolve
  state.newSleep = true
  state.sleepTime = time
})

let textElem: ElemType<'p'>
export const initText = (elem: ElemType<'p'>) => {
  textElem = elem
  return {
    start: () => {
      if (currentPhase === PHASE.STOPPED) {
        currentPhase = PHASE.MOVING
        mainLoop()
      } else if (currentPhase === PHASE.STOP_REQUEST){
        currentPhase = PHASE.MOVING
      }
    },
    stop: () => {
      if (currentPhase === PHASE.MOVING) currentPhase = PHASE.STOP_REQUEST
    }
  }
}



const typeAndDelete = async (str: string) => {
  let index = 0
  while (index < str.length) {
    textElem.textContent += str[index]
    index++
    await sleep(TIME_TYPE_CHAR)
  }
  await sleep(1000)
  while (textElem.textContent.length) {
    textElem.textContent = textElem.textContent.slice(0, -1)
    await sleep(TIME_DELETE_CHAR)
  }
  return 0
}

const mainLoop = async () => {
  while(true){

    await typeAndDelete(DESCRIPTION[descTextIndex])
    descTextIndex++
  
    if (DESCRIPTION.length <= descTextIndex) {
      descTextIndex = 0
    }
    if (currentPhase === PHASE.STOP_REQUEST) {
      currentPhase = PHASE.STOPPED
      break;
    } else {
      await sleep(400)
    }
  }
}
