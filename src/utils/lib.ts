type Listener = () => void
/**
 * @param func process to run when all waiting factors are ready to go
 */
export const waitExec = (func: Listener) => {
  const waiting: boolean[] = []
  let count = 0
  /**
   * tells the process to wait till all factors run `okToGo`
   */
  const waitMe = () => {
    const i = count++
    waiting.push(false)
    /**
     * tells the process that you are no longer waiting
     */
    const okToGo = () => {
      waiting[i] = true
      if (waiting.every(v => v)) func()
    }
    return {
      okToGo
    }
  }
  return {
    waitMe
  }
}
export const sleep = async (time: number) => new Promise((resolve)=>setTimeout(resolve, time))