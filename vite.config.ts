import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// 开发环境不关注
// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// import ElementPlus from 'unplugin-element-plus/vite'

// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx()
    // AutoImport({
    //   resolvers: [ElementPlusResolver({})]
    // }),
    // Components({
    //   resolvers: [ElementPlusResolver({})]
    // }),
    // ElementPlus({ useSource: true })
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/\/api/, '')
      }
      // '/admin': {
      //   target: 'http://127.0.0.1:8001',
      //   changeOrigin: true
      // }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
