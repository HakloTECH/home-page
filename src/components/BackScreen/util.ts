type URLString = string
type CTXName = "2d" | "webgl" | "webgl2" | "webgpu"
type initResult = {
  dispose: () => void | Promise<void>
}
type PainterController = {
  init: (ctx: RenderingContext) => initResult | Promise<initResult>
}
export type PainterObject = {
  painters: {
    [key in CTXName]?: PainterController
  }
}
type PainterResult = {
  success: boolean,
  ctxName?: string,
  init?: ()=>initResult | Promise<initResult>
}
export class PainterData {
  cache: {
    [key: URLString]: PainterResult
  } = {}
  constructor() {}
  async loadPainter(url: URLString, CTXs: {
    [key: string]: RenderingContext | null
  }): Promise<PainterResult> {
    if (url in this.cache) return this.cache[url]
    const { painters }: PainterObject = await import(/* @vite-ignore */ url)
    
    if(!painters){
      return { success: false }
    }
    let success = false
    let init: () => initResult | Promise<initResult>
    let ctxName: string
    for (ctxName in painters) {
      const ctx = CTXs[ctxName]
      if (ctx) {
        init = () => painters[ctxName as CTXName].init(ctx)
        success = true
        break;
      }
    }
    const result: PainterResult = {
      success,
      ctxName,
      init
    }
    
    this.cache[url] = result
    return result
  }

}
