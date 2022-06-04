import axios, { AxiosRequestConfig } from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:8888/'
})

// 请求拦截
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截
request.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

export default <T = any>(config: AxiosRequestConfig<any>) => {
  return request(config).then(res => {
    return res.data as T
  })
}
