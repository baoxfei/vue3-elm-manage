import axios from 'axios'
import type { CreateAxiosDefaults, InternalAxiosRequestConfig } from 'axios'
import { ss } from '@/utils/cache/storage'
import global from '../global'
import router from '@/router'
import HttpMessage from './httpMessage'
import { ElMessage } from 'element-plus'
import { merge } from 'lodash'

const axiosInstance = axios.create({
  baseURL: '',
  timeout: 30000,
  headers: {
    // Authorization: '', //
    'Content-Type': 'application/json;charset=utf-8'
  },
  responseType: 'json',
  maxContentLength: 2000,
  validateStatus(status) {
    return status >= 200 && status < 400
  }
})

class HttpRequest {
  private instance
  private options
  constructor(options: CreateAxiosDefaults = {}) {
    this.options = merge(options, {
      baseURL: '',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      responseType: 'json',
      maxContentLength: 2000,
      validateStatus(status) {
        return status >= 200 && status < 400
      }
    })
    this.instance = axios.create(options)
    this.setupInterceptors()
  }

  private createInstance(options: CreateAxiosDefaults) {
    return axios.create(options)
  }
  private setupInterceptors() {
    axios.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = ss.get(global.token)
        if (config.url?.indexOf('/public') == -1 && token) {
          config.headers.Authorization = token
        }
        return config
      },
      (error) => Promise.reject(error)
    )
    axios.interceptors.response.use(null, (error) => {
      switch (error.response.status) {
        case 401:
          ss.clear()
          router.push('/login')
          break
        default:
          return
      }
      ElMessage(HttpMessage[error.response.status || 0])
    })
  }
  /**
   * @description: reconfig
   */
  public config(options: CreateAxiosDefaults) {
    if (!this.instance) return
    this.instance = this.createInstance(options)
  }

  static createAxios(options = {}) {
    return new HttpRequest(options)
  }
}

export const request = HttpRequest.createAxios()

// import axios from 'axios'
// import getAuthorization from '@utils/getAuthorization'

// const addErrorLog = (errorInfo) => {
//   const {
//     statusText,
//     status,
//     request: { responseURL },
//   } = errorInfo;
//   const info = {
//     type: 'ajax',
//     code: status,
//     mes: statusText,
//     url: responseURL,
//   };
//   if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info);
// };

// class HttpRequest {
//   constructor(baseUrl) {
//     this.baseUrl = baseUrl;
//     this.queue = {};
//   }

//   getInsideConfig() {
//     const config = {
//       baseURL: this.baseUrl,
//       headers: {
//         Authorization: getAuthorization(),
//         'X-Application-Token': localStorage.getItem('x_application_token'),
//       },
//     };
//     return config;
//   }

//   destroy(url) {
//     delete this.queue[url];
//     if (!Object.keys(this.queue).length) {
//       // Spin.hide()
//     }
//   }

//   interceptors(instance, url) {
//     // 请求拦截
//     instance.interceptors.request.use(
//       (config) => {
//         // 添加全局的loading...
//         if (!Object.keys(this.queue).length) {
//           // Spin.show() // 不建议开启，因为界面不友好
//         }
//         this.queue[url] = true;
//         return config;
//       },
//       (error) => Promise.reject(error),
//     );
//     // 响应拦截
//     instance.interceptors.response.use(
//       (res) => {
//         this.destroy(url);
//         const { data, status } = res;
//         return { data, status };
//       },
//       (error) => {
//         this.destroy(url);
//         // const errorInfo = error.response;
//         // if (!errorInfo) {
//         //   const {
//         //     request: { statusText, status },
//         //     config,
//         //   } = JSON.parse(JSON.stringify(error));
//         //   errorInfo = {
//         //     statusText,
//         //     status,
//         //     request: { responseURL: config.url },
//         //   };
//         // }
//         // addErrorLog(errorInfo);
//         return Promise.reject(error);
//       },
//     );
//   }

//   request(options) {
//     const instance = axios.create();
//     const mergeOptions = Object.assign(this.getInsideConfig(), options);
//     this.interceptors(instance, mergeOptions.url);
//     return instance(mergeOptions);
//   }
// }
// export default HttpRequest;

// const axiosInstance = axios.create({
//   baseURL: '',
//   // 自定义请求头信息
//   headers: {
//     'X-Requested-With': 'XMLHttpRequest',
//     'Content-Type': 'application/json;charset=utf-8',
//     clientType: 'web',
//     version: process.env.version,
//     sysCode: 'new-gwy'
//     // Authorization:
//     //   "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiIwNjc1ZmFiYjg3ODA0NDFkOWM5MTU2ZTEzMTU1YmU5ZCIsInNjb3BlIjpbIndlYi1hcHAiXSwiZXhwIjoxNTY0NDQ5ODYzLCJpYXQiOjE1NjQzNjM0NjMsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJqdGkiOiI1ZThjMTYzMy0xZWIxLTQ5YzQtOGU3My1jN2I3NzFiZjdhMDgiLCJjbGllbnRfaWQiOiJpbnRlcm5hbCJ9.C9Ci5oIe1pyt5ThYCiJGayfydUX2aQ-J77YHbapNwBJKCVpUqDrqIARAWqGFEBte4K4cWVMkPjj4IP3Rtesh6OHFfaPV_OWKyLVkjf77ckTXrtUFNyjC-pLa4a5ZX8p46Gzl4JDywBsBNWU75cMKsHLB0RGjuAcYgd2dM29g4ksZKj3442gMEfF8j9GHpcmEgJpIRGHVsmhohZw1X0AFFJIX2A2FIiBJI4_DjtTwPtK76YxMHYJgZnKbuxujozLIs7eNC6x0I5ejD2LwB0KeUDJu9_Sm3heU7qeoIhKlN7rdGZdm09mYeeMRpP4MX2SHSJ3lnRnVLO_bmg9X9Jj55g"
//   },
//   // 超时时间
//   timeout: 30000,
//   // 跨域是否携带身份凭证
//   withCredentials: true, // default
//   // 返回数据的格式arraybuffer,blob,document,json,text,stream
//   responseType: 'json', // default
//   // xsrf
//   xsrfCookieName: 'XSRF-TOKEN', // default
//   xsrfHeaderName: 'X-XSRF-TOKEN', // default
//   // http响应内容的最大值
//   maxContentLength: 2000,
//   // `validateStatus`定义了是否根据http相应状态码，来resolve或者reject promise
//   // 如果`validateStatus`返回true(或者设置为`null`或者`undefined`),那么promise的状态将会是resolved,否则其状态就是rejected
//   validateStatus: function (status) {
//     return status >= 200 && status < 400 // default
//   }
// })

// // POST传参序列化
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const isPost = config.method === 'post'
//     // const token = cookie.get(global.token)
//     // 使用session记录token，需求需要（2019.10.15）
//     const token = sessionStorage.getItem(global.token)
//     if (config.url.indexOf('/public/') == -1 && !config.withoutToken && token) {
//       config.headers['Authorization'] = token
//     }
//     const extraData = {}
//     // 根据key获取真实的请求url
//     // config.url = config.url
//     // 是否开启表单提交模式，除了加个formData外，入参不变
//     if (config.formData) {
//       config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
//     }
//     if (config.isMock) {
//       const name = config.url.split('/')[0]
//       if (mockConfig[name]) {
//         config.url = `http://10.0.0.28:7300/mock/${mockConfig[name]}/${name}/${config.url}`
//       }
//     } else if (!config.noBaseUrl) {
//       config.url = `${baseUrl}/${config.url}`
//     }
//     config.params = { ...config.params, ...(isPost ? {} : extraData) }
//     config.transformRequest = [
//       (data) => {
//         data = { ...data, ...(isPost ? extraData : {}) }
//         return config.formData ? qs.stringify(data) : JSON.stringify(data)
//       }
//     ]
//     //header中配置mID:签名字符串
//     // if (config.url.startsWith("/api/ideal-new-org/api/structMenu/getTopPost")) {
//     //   debugger
//     // }
//     const tid = Date.now()
//     const versionCode = 0
//     const dID = 'webDeviceID'
//     const secret = 'hka3MD1fg9sA'
//     let urlParam = ''
//     const obj = {}
//     const params = { ...config.params }
//     if (config.url.indexOf('?') > -1) {
//       urlParam = config.url.slice(config.url.indexOf('?') + 1)

//       const parr = urlParam.split('&')
//       for (const i of parr) {
//         const arr = i.split('=')
//         if (arr[1] instanceof Array) {
//           obj[arr[0]] = arr[1].length > 0 ? encodeURI(arr[1].join('/')).split('/') : []
//         } else if (arr[1] !== undefined && arr[1] !== null) obj[arr[0]] = encodeURI(arr[1])
//       }
//     }
//     if (config.method === 'get') {
//       Object.keys(params).forEach(function (i) {
//         // const data = typeof config.params[i] == "string" ? JSON.parse(config.params[i]) : ""
//         // if (data instanceof Array) {
//         if (typeof params[i] == 'string' && params[i].indexOf('[') > -1) {
//           const data = JSON.parse(params[i])
//           params[i] =
//             data.length > 0
//               ? JSON.stringify(encodeURI(data.join('/')).split('/'))
//               : JSON.stringify([])
//         } else if (config.params[i] !== undefined && config.params[i] !== null)
//           params[i] = encodeURI(params[i])
//       })
//     }
//     const md5Data = config.method === 'get' ? { ...params, ...obj } : config.data
//     config.headers['tID'] = tid
//     config.headers['dID'] = dID
//     config.headers['versionCode'] = versionCode
//     config.headers['mID'] = signMD5(
//       md5Data,
//       tid,
//       versionCode,
//       secret,
//       !!config.formData || config.method === 'get',
//       config.url
//     )
//     return config
//   },
//   (error) => {
//     if (error) {
//       console.log('axios.interceptors.request', error)
//     }
//     const err = {
//       code: 400,
//       msg: '错误的传参!',
//       data: {}
//     }
//     message.error(err.msg)
//     return Promise.reject(err)
//   }
// )

// // code状态码200判断
// axiosInstance.interceptors.response.use(
//   resp => {
//     // 如果返回html
//     if (
//       typeof resp.data === "string" &&
//       (resp.data.includes("<!DOC") || resp.data.includes("<!doc"))
//     ) {
//       message.error("服务器错误（非json格式）!")
//       return Promise.reject({
//         code: 400,
//         msg: "服务器错误（非json格式）!",
//         data: {}
//       })
//     }
//     // console.log('resp', resp)
//     const res = resp.data
//     if (res.code !== 200 && res.resultCode !== 1) {
//       if (!resp.config.isCancelErrorAlert) {
//         // process.env.NODE_ENV !== "development"
//         //   ? Modal.error({
//         //       title: "错误提示",
//         //       content: res.desc || res.resultMsg
//         //     })
//         //   : console.error(res.desc || res.resultMsg)
//         Modal.error({
//           title: "错误提示",
//           centered: true,
//           content: res.desc || res.resultMsg
//         })
//       }
//       return Promise.reject(res)
//     }

//     if (
//       res.code == 200 &&
//       (resp.config.method == "post" ||
//         resp.config.method == "put" ||
//         resp.config.method == "delete")
//     ) {
//       // if (!resp.config.isCancelSuccessAlert) {
//       //   message.success(res.desc)
//       // }
//       if (resp.config.successAlert) {
//         message.success(res.desc)
//       }
//     }

//     return res
//   },
//   error => {
//     const store = require("../store")
//     if (error) {
//       console.log("axios.interceptors.response", error)
//     }
//     // 设置默认返回
//     const errDefault = {
//       code: 404,
//       msg: "网络有点慢,换个姿势再来一次!",
//       data: {}
//     }

//     // 如果没有返回值
//     if (!error.response) {
//       return Promise.reject(errDefault)
//     }
//     // 如果有response.status
//     switch (error.response.status || 404) {
//       case 400:
//         console.log("RES STATUS: ", 400)
//         break
//       case 401:
//         console.log("RES STATUS: ", 401)
//         errDefault.code = 401
//         errDefault.msg = "您的账号已在其他客户端登陆或登陆超时"
//         IMBase.logout()
//         store.default.dispatch({ type: type.USER_LOGIN_FAIL })
//         // debugger
//         if (
//           !show401Error &&
//           error.response.status != 408 &&
//           (!error.config.isCancelErrorAlert ||
//             (error.config.isBurryPoint &&
//               error.config.isCancelErrorAlert &&
//               !error.config.isLoginOut))
//         ) {
//           show401Error = true
//           history.replace("/login")
//           const err = { ...errDefault, ...error.response.data }
//           sessionStorage.clear()
//           localStorage.clear()
//           cookie.deleteAll()

//           if (show401Error) {
//             notification.warn({
//               placement: "topRight",
//               duration: 10,
//               message: "安全提示",
//               description: (
//                 <span>
//                   您的账号在其他地方登录，被迫下线！
//                   <p>如果非本人操作，请及时修改密码!</p>
//                   <a onClick={() => document.location.reload()}>点击刷新</a>
//                 </span>
//               ),
//               onClose: () => {
//                 show401Error = false
//               }
//             })
//           }
//           return Promise.reject(err)
//         } else {
//           return Promise.reject()
//         }
//       case 403:
//         console.log("RES STATUS: ", 403)
//         break
//       case 404:
//         console.log("RES STATUS: ", 404)
//         break
//       case 406:
//         console.log("RES STATUS: ", 406)
//         break
//       case 410:
//         console.log("RES STATUS: ", 410)
//         break
//       case 422:
//         console.log("RES STATUS: ", 422)
//         break
//       case 500:
//         console.log("RES STATUS: ", 500)
//         break
//       default:
//         break
//     }
//     const err = { ...errDefault, ...error.response.data }
//     if (error.response.status != 408 && !error.config.isCancelErrorAlert) {
//       message.error(err.msg)
//     }
//     return Promise.reject(err)
//   }
// )
