import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { RequestConfig, RequestInterceptors, CancelRequestSource } from './types'
class Request {
  instance: AxiosInstance
  // 拦截器对象
  interceptorsObj?: RequestInterceptors

  cancelRequestSourceList?: CancelRequestSource[]

  requestUrlList?: string[]

  private getSourceIndex (url: string): number {
    return this.cancelRequestSourceList?.findIndex(
      (item: CancelRequestSource) => {
        return Object.keys(item)[0] === url
      }
    ) as number
  }

  private delUrl (url: string) {
    const urlIndex = this.requestUrlList?.findIndex(u => u === url)
    const sourceIndex = this.getSourceIndex(url)
    urlIndex !== -1 && this.requestUrlList?.splice(urlIndex as number, 1)
    sourceIndex !== -1 && this.cancelRequestSourceList?.splice(sourceIndex as number, 1)
  }

  cancelAllRequest () {
    this.cancelRequestSourceList?.forEach(source => {
      const key = Object.keys(source)[0]
      // console.log(key)
      // console.log(source)
      // source['/']()
      source[key]()
    })
  }

  cancelRequest (url: string | string[]) {
    if (typeof url === 'string') {
      // console.log(this.cancelRequestSourceList)
      const sourceIndex = this.getSourceIndex(url)
      if (sourceIndex >= 0 && this.cancelRequestSourceList) {
        this.cancelRequestSourceList[sourceIndex][url]()
      }
    } else {
      // console.log(this.cancelRequestSourceList)
      url.forEach(e => {
        const sourceIndex = this.getSourceIndex(e)
        // console.log(sourceIndex)
        if (sourceIndex >= 0 && this.cancelRequestSourceList) {
          this.cancelRequestSourceList[sourceIndex][e]()
        }
      })
    }
  }

  constructor (config: RequestConfig) {
    this.instance = axios.create(config)
    this.interceptorsObj = config.interceptors
    this.requestUrlList = []
    this.cancelRequestSourceList = []

    // 请求拦截器
    this.instance.interceptors.request.use((res: AxiosRequestConfig) => {
      console.log('请求拦截器')
      return res
    }, (err: any) => err)

    // 实例拦截器
    this.instance.interceptors.request.use(
      this.interceptorsObj?.requestInterceptors,
      this.interceptorsObj?.requestInterceptorsCatch
    )
    this.instance.interceptors.response.use(
      this.interceptorsObj?.responseInterceptors,
      this.interceptorsObj?.responseInterceptorsCatch
    )
    // 响应拦截器
    this.instance.interceptors.response.use((res: AxiosResponse) => {
      console.log('相应拦截器')
      return res.data
    }, (err: any) => err)
  }

  request<T> (config: RequestConfig): Promise<T> {
    // return this.instance.request(config)
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config)
      }

      const url = config.url
      if (url) {
        this.requestUrlList?.push(url)
        config.cancelToken = new axios.CancelToken(c => {
          this.cancelRequestSourceList?.push({
            [url]: c
          })
        })
      }

      this.instance.request<any, T>(config).then(res => {
        if (config.interceptors?.responseInterceptors) {
          res = config.interceptors.responseInterceptors<T>(res)
        }
        resolve(res)
      }).catch((err: any) => {
        reject(err)
      }).finally(() => {
        url && this.delUrl(url)
      })
    })
  }
}

export default Request
