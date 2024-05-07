import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { ApiPromise } from '~/functions'

// 服务器错误处理
const errMsg: ObjectT = {
  400: '请求参数错误 400',
  401: '未授权，请登录 401',
  403: '拒绝访问 403',
  404: '请求地址不存在 404',
  405: '请求方法不允许 405',
  408: '请求超时 408',
  415: '不支持的媒体类型(一般来说是content-type错了) 415',
  500: '服务器内部错误 500',
  501: '服务未实现 501',
  502: '网关错误 501',
  503: '服务不可用 503',
  504: '网关超时 504',
  505: 'HTTP版本不受支持 505',
}

// create an axios instance
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API, // url = base url + request url
  timeout: 10000, // request timeout
})

// request interceptor
instance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// response interceptor
instance.interceptors.response.use(
  (response) => {
    const { status, data } = response
    if (status === 200) {
      switch (data.code) {
        case 200:
          return data.data
        default:
          throw new Error(data)
      }
    }
    else { throw new Error(errMsg[status]) }
  },
  (error) => {
    console.error(`err${error}`) // for debug
    throw error
  },
)

export default function request(options: AxiosRequestConfig) {
  return new ApiPromise((resolve, reject) => instance(options).then(res => resolve(res)).catch(err => reject(err)))
}
