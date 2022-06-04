import axios from '@/libs/axiossimple/axios'
import { IResponseData } from '@/api/types/all'
import request from '../libs/axiosmedium/sever'

import { defHttp } from '../libs/axioscomplex/index'
// eslint-disable-next-line no-unused-vars
export const bbb = () => {
  // return axios.request({
  //   method: 'get',
  //   url: '/'
  // })
  // return axios.get<{
  //   msg: string,
  //   status: string,
  //   data: {
  //     list: string[],
  //     str: string
  //   }
  // }>('/')
  // return axios.get<IResponseData< {
  //   list: string[],
  //   str: string
  // }>>('/')
  return axios<IResponseData>({
    method: 'get',
    url: '/'
  })
}

export const eee = (data: any) => {
  return request<any, IResponseData>({
    method: 'get',
    url: '/',
    data,
    interceptors: {
      requestInterceptors (res) {
        console.log('接口请求拦截')

        return res
      },
      responseInterceptors (result) {
        console.log('接口响应拦截')
        return result
      }
    }
  })
}

export const ddd = (data: any) => {
  return request<any, IResponseData>({
    method: 'get',
    url: '/aaa',
    data,
    interceptors: {
      requestInterceptors (res) {
        console.log('接口请求拦截')

        return res
      },
      responseInterceptors (result) {
        console.log('接口响应拦截')
        return result
      }
    }
  })
}

export const ggg = () => defHttp.get({ url: '/' }, { joinTime: false })
