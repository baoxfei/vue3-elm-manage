import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import { setupStore } from '@/stores'
import router, { setupRouter } from '@/router'
import { setupRouterGuard } from '@/router/guard'
import { setupGlobalDirective } from '@/directive'
import 'normalize.css'
import '@/styles/index.scss'
import 'element-plus/dist/index.css'
import './assets/main.css'
// 暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'

function main() {
  const app = createApp(App)
  app.use(ElementPlus)
  // config store
  setupStore(app)
  // config router
  setupRouter(app)
  // config router-guard
  // setupRouterGuard(router)
  // TODO config global error handling
  // TODO config global directive
  setupGlobalDirective(app)
  // TODO
  app.mount('#app')
}

main()
