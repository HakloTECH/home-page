import withBlue from 'vite-with-bluejsx'
import viteTsUrlLoader from './vite-ts-url-loader'
export default withBlue({
  bluejsx: {
    hmr: false,
  },
  plugins: [
    // viteTsUrlLoader()
  ],
  base: './',
  assetsInclude: 'public/*'
})
