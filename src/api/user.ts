import { request, dataWrapper } from '@/utils/http'

/**
 * @description: 登录
 * @return {*}
 */
export const login = dataWrapper(request.post('/login'))

/**
 * @description: 登出
 * @return {*}
 */

export const loginOut = dataWrapper(request.post('/loginOut'))
