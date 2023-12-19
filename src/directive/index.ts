import type { App } from 'vue'
import { setupGlobalLoading } from './loading'

export const setupGlobalDirective = (app: App) => {
  setupGlobalLoading(app)
}
