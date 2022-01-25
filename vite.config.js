import withBlue from 'vite-with-bluejsx'
import viteTsUrlLoader from './vite_ts_url_loader.js'
export default withBlue({
  bluejsx: {
    hmr: true,
  },
  plugins: [
    viteTsUrlLoader()
  ],
  base: './',
  assetsInclude: 'public/*'
})