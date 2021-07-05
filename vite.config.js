//import mdLoader from './mdloader'
//import hljs from 'highlight.js'
//const prefix = `monaco-editor/esm/vs`;
/** @type {import('vite').UserConfig} */
export default ({
  esbuild: {
    jsxFactory: 'Blue.r',
    jsxFragment: 'Blue.Fragment',
    jsxInject: `import Blue from 'bluejsx'`
  },
  plugins: [
  ],
  base: './',
  assetsInclude: 'public/*'
})