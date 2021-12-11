import axios from 'axios'
import { ElMessage } from 'element-plus'

const Axios = axios.create({
  timeout: 30000,
})

// 请求拦截器拦截器
Axios.interceptors.request.use(function (config) {
  config.headers = {
    ...config.headers,
    'x-tif-uid': '12345678', // TODO: 测试用，记得删掉
  }
  // 添加随机数，躲过ie缓存机制
  config.params = {
    ...config.params,
    random: new Date().getTime(),
  }
  return config
}, function (error) {
  return Promise.reject(error)
})


// 响应拦截
function repResolve(rep: any = {}) {
  return new Promise((resolve, reject) => {
    const { data, headers, status } = rep
    if (headers['content-type'] && headers['content-type'].includes('json')) {
      if (data.errcode === 0) {
        if (data.hasOwnProperty('data')) {
          resolve(data.data)
        } else {
          resolve(data)
        }
      } else {
        ElMessage.error(data.errmsg || '未知错误')
        reject()
      }
    } else {
      if (status === 200) resolve(rep)
      else {
        ElMessage.error(rep.statusText || '未知错误')
        reject()
      }
    }
  })
}

function repReject(error: any) {
  console.log('xxx', error);

  const { data } = error.response
  if (data.errcode) {
    ElMessage.error(data.text || '未知错误')
  } else {
    ElMessage.error('服务器出现错误')
  }
  return Promise.reject(error)
}

Axios.interceptors.response.use(repResolve, repReject)
export default Axios