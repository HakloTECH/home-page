import { buildSync } from 'esbuild'

export default ()=>{
  /** @type {import('vite').ResolvedConfig} */
  let config
  /** @type {import('vite').Plugin}*/
  return ({
    name: 'vite-plugin-url-loader',
    configResolved(resolvedConfig) {
      // store the resolved config
      config = resolvedConfig
    },
    // enforce: 'pre',
    // apply(config, {command}){
    //   return command === 'build'
    // },
    transform(code, id){
      if(/\.ts\?url/.test(id)){
        //return `export default 'data:text/javascript;charset=utf-8,${encodeURIComponent(code)}'`
        if(config.mode === 'development') return id
        id = id.replace(/\?[\w-]+/, '')
        const code = buildSync({
          bundle: false,
          entryPoints: [id],
          write: false
        }).outputFiles[0].text
        const url = this.emitFile({
          name: id.match(/[\w\.\-\_\/]+\/([\w\_\-]+)\.ts$/)[1]+'.js',
          type: 'asset',
          source: code
        })
        return `export default "/__VITE_ASSET__${url}__"`
      }
    }
  })
}
