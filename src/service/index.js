import axios from "axios"
import { storage } from "@/util"

const instance = axios.create({
  timeout: 60000,
  baseURL: process.env.REACT_APP_API_URL
})
// 请求拦截
instance.interceptors.request.use(
  config => {
    config.data = JSON.stringify(config.data)
    config.headers = {
      "Content-Type": "application/json",
      "Authorization": storage.getl("lToken")
    }
    return config
  }, 
  error => {
    return Promise.reject(error)
  }
)
// 响应拦截
instance.interceptors.response.use(
  res => {
    if (res.status === 200) {
      let response = res.data
      if (response.code === 0) {
        return response.data
      }  else {
        return Promise.reject(response)
      }
    } else {
      return Promise.reject(res.statusText)
    }
  }, 
  error => {
    return Promise.reject(error)
  }
)
// 请求方法
export const post = function post(url, params = {}) {
  return new Promise((resolve, reject) => {
    instance.post(url,params).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export const get = function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    instance.get(url, { params }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export const upload = function upload(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.REACT_APP_API_URL + url, params, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": storage.getl("lToken")
      }
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
