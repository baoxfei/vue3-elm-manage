import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { setupStore } from '@/stores'
import router, { setupRouter } from '@/router'
import { setupRouterGuard } from '@/router/guard'
import 'normalize.css'
import '@/styles/index.scss'

function main() {
  const app = createApp(App)
  // config store
  setupStore(app)
  // config router
  setupRouter(app)
  // config router-guard
  // setupRouterGuard(router)
  // TODO config global error handling
  // TODO config global directive
  // TODO
  app.mount('#app')
}

main()
