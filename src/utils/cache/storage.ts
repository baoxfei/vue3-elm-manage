import { supressError } from '@/utils/http/httpCheck'

class WebStorage {
  private storage: Storage
  private prefix?: string
  // 加密 TODO
  // private encryption: boolean
  constructor({ storage, prefix }) {
    this.storage = storage
    this.prefix = prefix
    // this.encryption = encryption
  }
  private getKey(key: string) {
    return `${this.prefix || ''}${key}`.toUpperCase()
  }
  set(key: string, value: any) {
    try {
      if (value instanceof Object) {
        this.storage.setItem(this.getKey(key), JSON.stringify(value))
      } else {
        this.storage.setItem(this.getKey(key), value)
      }
    } catch (error) {
      supressError(error)
    }
  }

  get(key: string) {
    return this.storage.getItem(this.getKey(key))
  }

  remove(key: string) {
    return this.storage.removeItem(this.getKey(key))
  }
  clear() {
    this.storage.clear()
  }
  static createWebStorage(options) {
    return new WebStorage(options)
  }
}

export const ss = WebStorage.createWebStorage({
  storage: sessionStorage,
  prefix: ''
})

export const ls = WebStorage.createWebStorage({ storage: localStorage, prefix: '' })

const cookie = (function () {
  const getCookie = (key) => {
    const name = key + '='
    const all = document.cookie.split(';')
    for (let i = 0; i < all.length; i++) {
      if (all[i].includes(name)) return all[i].trim().replace(name, '')
    }
  }

  const setCookie = (key) => {}
  return {
    getCookie,
    setCookie
  }
})()

export { cookie }
