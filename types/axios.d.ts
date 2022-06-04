export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;
type Recordable<T = any> = Record<string, T>;
export interface RequestOptions {
  // Splicing request parameters to url将请求参数拼接到url
  joinParamsToUrl?: boolean;
  // Format request parameter time格式请求参数时间
  formatDate?: boolean;
  // Whether to process the request result是否处理请求结果
  isTransformResponse?: boolean;
  // Whether to return native response headers是否返回本机响应头
  // For example: use this attribute when you need to get the response headers例如:当你需要获取响应头时使用这个属性
  isReturnNativeResponse?: boolean;
  // Whether to join url是否加入url
  joinPrefix?: boolean;
  // Interface address, use the default apiUrl if you leave it blank接口地址，如果不填写，使用默认apiUrl
  apiUrl?: string;
  // 请求拼接路径
  urlPrefix?: string;
  // Error message prompt type错误消息提示类型
  errorMessageMode?: ErrorMessageMode;
  // Whether to add a timestamp是否添加时间戳
  joinTime?: boolean;
  ignoreCancelToken?: boolean;
  // Whether to send token in header是否在头部发送令牌
  withToken?: boolean;
  // 请求重试机制
  // eslint-disable-next-line no-use-before-define
  retryRequest?: RetryRequest;
}

export interface RetryRequest {
  isOpenRetry: boolean;
  count: number;
  waitTime: number;
}
export interface Result<T = any> {
  code: number;
  type: 'success' | 'error' | 'warning';
  message: string;
  result: T;
}

// multipart/form-data: upload file
export interface UploadFileParams {
  // Other parameters
  data?: Recordable;
  // File parameter interface field name
  name?: string;
  // file name
  file: File | Blob;
  // file name
  filename?: string;
  [key: string]: any;
}
