/* eslint-disable no-use-before-define */
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { RequestOptions, Result } from '../../../types/axios'
export interface CreateAxiosOptions extends AxiosRequestConfig {
  authenticationScheme?: string
  transform?: AxiosTransform
  requestOptions?: RequestOptions
}

export abstract class AxiosTransform {
  beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig

  transformRequestHook?: (res: AxiosResponse<Result>, options: RequestOptions) => any

  requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>

  requestInterceptors?: (
    config: AxiosRequestConfig,
    options: CreateAxiosOptions
  ) => AxiosRequestConfig

  requestInterceptorsCatch?: (error: Error) => void

  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>

  responseInterceptorsCatch?: (error: Error) => void
}
