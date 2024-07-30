import { request, dataWrapper } from '@/utils/http'

/**
 * @description: 登录
 * @return {*}
 */
export const login = (params) => dataWrapper(request.post('/admin/login', params))

/**
 * @description: 登出
 * @return {*}
 */

export const loginOut = () => dataWrapper(request.get('/admin/loginOut'))

/**
 * @description: 注册
 * @return {*}
 */

export const register = (params) => dataWrapper(request.post('/admin/register', params))
