import { defineStore } from 'pinia'
import store from '../index'
interface UserState {
  userInfo: Record<string, any>
  token: string
  sessionTimeout?: boolean
  permission: string[]
}
const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    userInfo: {},
    token: '',
    permission: []
  }),
  getters: {
    getUserInfo: (state) => {
      return state.userInfo
    },
    getToken: (state) => {
      return state.token
    },
    getPermission: (state) => {
      return state.permission
    }
  },
  actions: {
    setToken: (token) => {
      this.token = token
    },
    setPermission: (permission) => {},
    /**
     * @description: login
     */
    login: async () => {
      try {
        this.setToken('')
        return {}
      } catch (error) {}
    }
  }
})

export const useUserStoreWithOut = () => {
  return useUserStore(store)
}
