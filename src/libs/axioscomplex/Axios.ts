import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { CreateAxiosOptions } from './axiosTransform'
import { RequestOptions, Result } from '../../../types/axios'
import { AxiosCanceler } from './axiosCancel'
import { cloneDeep } from 'lodash-es'
export class VAxios {
  private axiosInstance: AxiosInstance
  private readonly options: CreateAxiosOptions

  constructor (options: CreateAxiosOptions) {
    console.log(options)

    this.options = options
    this.axiosInstance = axios.create(options)
    this.setupInterceptors()
  }

  private getTransform () {
    const { transform } = this.options
    return transform
  }

  private setupInterceptors () {
    const transform = this.getTransform()
    if (!transform) {
      return false
    }

    const { requestInterceptors, responseInterceptors, requestInterceptorsCatch, responseInterceptorsCatch } = transform

    const axiosCanceler = new AxiosCanceler()

    this.axiosInstance.interceptors.request.use((config:AxiosRequestConfig) => {
      // @ts-ignore
      const { ignoreCancelToken } = config.requestOptions

      const ignoreCancel = ignoreCancelToken !== undefined ? ignoreCancelToken : this.options.requestOptions?.ignoreCancelToken
      !ignoreCancel && axiosCanceler.addPending(config)
      if (requestInterceptors) {
        config = requestInterceptors(config, this.options)
      }
      return config
    }, undefined)
    requestInterceptorsCatch && this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch)
    this.axiosInstance.interceptors.response.use((res:AxiosResponse<any>) => {
      res && axiosCanceler.removePending(res.config)
      if (responseInterceptors) {
        res = responseInterceptors(res)
      }
      return res
    }, undefined)
    responseInterceptorsCatch && this.axiosInstance.interceptors.response.use(undefined, responseInterceptorsCatch)
  }

  get<T = any> (config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'GET' }, options)
  }

  post<T = any> (config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'POST' }, options)
  }

  put<T = any> (config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'PUT' }, options)
  }

  delete<T = any> (config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'DELETE' }, options)
  }

  request<T = any> (config: AxiosRequestConfig, options?:RequestOptions): Promise<T> {
    console.log('options', options)

    let conf:CreateAxiosOptions = cloneDeep(config)
    console.log('conf', conf)

    const transform = this.getTransform()
    console.log('transform', transform)

    const { requestOptions } = this.options

    const opt:RequestOptions = Object.assign({}, requestOptions, options)
    console.log('opt', opt)

    const { beforeRequestHook, requestCatchHook, transformRequestHook } = transform || {}
    if (beforeRequestHook) {
      conf = beforeRequestHook(conf, opt)
    }
    conf.requestOptions = opt
    return new Promise((resolve, reject) => {
      this.axiosInstance.request<any, AxiosResponse<Result>>(config).then((res:AxiosResponse<Result>) => {
        // console.log(res.data)
        if (transformRequestHook) {
          try {
            const ret = transformRequestHook(res, opt)
            resolve(ret)
          } catch (err) {
            reject(err || new Error('request error!'))
          }
          return
        }
        resolve(res as unknown as Promise<T>)
      }).catch((error:Error | AxiosError) => {
        if (requestCatchHook) {
          reject(requestCatchHook(error, opt))
          return
        }
        reject(error)
      })
    })
  }
}
