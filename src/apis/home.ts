import request from '~/libs/request'

/** 首页 - 发现 */
export function getHome() {
  return request({
    url: '/homepage/block/page',
  })
}
/** 获取轮播图 */
export function getBanner() {
  return request({
    url: '/banner',
  })
}
