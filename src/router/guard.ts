import type { Router } from 'vue-router'
import { useUserStoreWithOut } from '@/stores/modules/user'
import { PUBLIC_URL, UN_TOKEN_REDIRECT_URL } from '@/utils/const'

function createPageGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const useStore = useUserStoreWithOut()
    const { getPermission, getToken } = useStore
    if (PUBLIC_URL.includes(to.path)) return true
    if (getPermission.includes(to.path)) {
      return getToken ? true : UN_TOKEN_REDIRECT_URL
    } else {
      return false
    }
  })
}

export const setupRouterGuard = (router: Router) => {
  createPageGuard(router)
}
