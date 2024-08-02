import { request, dataWrapper } from '@/utils/http'

/**
 * @description: 获取商店分类
 * @return {*}
 */

export const getCategories = () => dataWrapper(request.get('/category/getCategory'))

/**
 * @description: 添加商铺
 * @return {*}
 */

export const addShop = (params) => dataWrapper(request.post('/shop/addShop', params))

/**
 * @description: 获取店铺列表
 * @return {*}
 */

export const getShopList = (params) => dataWrapper(request.get('/shop/getShopList', { params }))
