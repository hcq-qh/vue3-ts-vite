import Request from './http'
import { RequestConfig } from './types'

interface HCQRequestConfig<T> extends RequestConfig{
    data?:T
}
interface HCQResponse<T>{
    code: number
    message: string
    data: T
}

const request = new Request({
  // baseURL: import.meta.env.BASE_URL,
  baseURL: 'http://localhost:8888/',
  timeout: 1000 * 60 * 5,
  interceptors: {
    requestInterceptors: config => {
      console.log('实例请求拦截器')
      return config
    },
    responseInterceptors: result => {
      console.log('实例响应拦截器')
      return result
    }
  }
})

export const cancelAllRequest = () => {
  return request.cancelAllRequest()
}

export const cancelRequest = (url: string | string[]) => {
  return request.cancelRequest(url)
}
const HCQRequest = <D, T = any>(config:HCQRequestConfig<D>) => {
  return request.request<HCQResponse<T>>(config)
}

export default HCQRequest
