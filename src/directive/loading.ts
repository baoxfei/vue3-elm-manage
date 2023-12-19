import type { App, Directive, DirectiveBinding } from 'vue'
import LoadingIcon from '@/components/icons/iconLoading.vue'
import { render, h } from 'vue'

const setLoading = (el: Element, binding: any) => {
  const { target, loading } = binding.value
  const parentElement: Element = target || el || document.body
  if (loading) {
    render(h(LoadingIcon), parentElement)
  } else {
    const child = document.querySelector('loading')
    if (child && parentElement.contains(child)) {
      parentElement.removeChild(child)
    }
  }
}

const authDirective: Directive = {
  mounted: (el: Element, binding: DirectiveBinding<any>) => {
    setLoading(el, binding)
  },
  updated: (el: Element, binding: DirectiveBinding<any>) => {
    setLoading(el, binding)
  }
}

export const setupGlobalLoading = (app: App) => {
  app.directive('loading', authDirective)
}

export default authDirective
