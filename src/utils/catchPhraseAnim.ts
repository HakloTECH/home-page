import { ElemType } from "bluejsx";
import { DESCRIPTION } from "./logoDescriptionTexts";
const TIME_TYPE_CHAR = 50, TIME_DELETE_CHAR = 30;
const PHASE = {
  MOVING: 0,
  STOP_REQUEST: 1,
  STOPPED: 2
}
let descTextIndex = 0, currentPhase = PHASE.STOPPED

const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time))

let textElem: ElemType<'p'>
export const initText = (elem: ElemType<'p'>) => {
  textElem = elem
  return {
    start: () => {
      if (currentPhase === PHASE.STOPPED) {
        currentPhase = PHASE.MOVING
        mainLoop()
      }else if(currentPhase === PHASE.STOP_REQUEST){
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
  await typeAndDelete(DESCRIPTION[descTextIndex])
  descTextIndex++

  if (DESCRIPTION.length <= descTextIndex) {
    descTextIndex = 0
  }
  if (currentPhase === PHASE.STOP_REQUEST) {
    currentPhase = PHASE.STOPPED
  } else {
    await sleep(400)
    await mainLoop()
  }
}