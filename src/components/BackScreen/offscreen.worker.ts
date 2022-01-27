import { PainterData } from "./util"

const painterData = new PainterData()
let canvases: HTMLCanvasElement[]
const CTXs: {
  [key: string]: RenderingContext
} = {}
let currentDisposer: () => void | Promise<void>
let prevPainterURL: string | null = null
self.onmessage = async (
  e: MessageEvent<{
    type: string
  } & {
    [key: string]: any
  }>
) => {
  switch (e.data.type) {
    case 'init': {
      const { ctxNames } = e.data
      canvases = e.data.canvases
      for (let i = ctxNames.length; i--;) {
        CTXs[ctxNames[i]] = canvases[i].getContext(ctxNames[i])
      }
      break;
    }
    case 'load': {
      const { scriptURL } = e.data
      const { success, ctxName, init } = await painterData.loadPainter(scriptURL, CTXs)

      if (!success || prevPainterURL === scriptURL) return 0
      postMessage({ type: 'paintStart', ctxName })
      await currentDisposer?.()
      prevPainterURL = scriptURL
      // console.log('load in worker!!!');

      currentDisposer = (await init()).dispose
      postMessage({ type: 'paintEnd' })
      break;
    }
    case 'resize': {
      const { width, height } = e.data
      for (let i = canvases.length; i--;) {
        const canvas = canvases[i]
        if(!canvas) continue;

        canvas.width = width
        canvas.height = height
        
      }
      break;
    }
    default: {
      break;
    }
  }
}
// postMessage({type: 'hello' })