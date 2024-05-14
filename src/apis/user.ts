import request from '~/libs/request'

/** 用户 - 注册 */
export function apiUserRegister(data: API.User.RegisterParams) {
  return request({
    method: 'post',
    url: '/user',
    data,
  }) as Promise<API.User.User>
}

/** 用户 - 登录 */
export function apiUserLogin(data: API.User.LoginParams) {
  return request({
    method: 'post',
    url: '/user/login',
    data,
  }) as Promise<API.User.User>
}
