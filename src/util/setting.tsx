import axios from 'axios'
// import { history } from "..";

export const config = {
  setCookie: (name: string, value: string, days: number) => {
    var expires = ''
    if (days) {
      var date = new Date()
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
      expires = '; expires=' + date.toUTCString()
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/'
  },
  getCookie: (name: string) => {
    var nameEQ = name + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i]
      while (c.charAt(0) == ' ') c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
    }
    return null
  },
  deleteCookie: (name: string) => {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  },
  getStore: (name: string) => {
    if (localStorage.getItem(name)) {
      return localStorage.getItem(name)
    }
    return null
  },
  setStore: (name: string, value: any) => {
    localStorage.setItem(name, value)
  },
  setStoreJson: (name: string, value: any) => {
    let json = JSON.stringify(value)
    localStorage.setItem(name, json)
  },
  getStoreJson: (name: string) => {
    if (localStorage.getItem(name)) {
      let result: any = localStorage.getItem(name)
      return JSON.parse(result)
    }
    return null
  },
  deleteStore: (name: string) => {
    if (localStorage.getItem(name)) {
      localStorage.removeItem(name)
    }
    return null
  },
  ACCESS_TOKEN: 'accessToken',
  USER_LOGIN: 'userLogin'
}
export const {
  setCookie,
  getCookie,
  deleteCookie,
  getStore,
  setStore,
  setStoreJson,
  getStoreJson,
  deleteStore,
  ACCESS_TOKEN,
  USER_LOGIN
} = config

const DOMAIN = 'https://elearningnew.cybersoft.edu.vn/api'
const TOKEN_CYBERSOFT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMCIsIkhldEhhblN0cmluZyI6IjIyLzAyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY3NzAyNDAwMDAwMCIsIm5iZiI6MTY0ODIyNzYwMCwiZXhwIjoxNjc3MTcxNjAwfQ.-t8lwJCJRmcg7R5XSaDSitfHVVjFTYi63aEmtnzN9SQ'

/* Cấu hình request cho tất cả api - response cho tất cả kết quả từ api trả về */

//Cấu hình domain gửi đi
export const http = axios.create({
  baseURL: DOMAIN,
  timeout: 30000
})
//Cấu hình request header
http.interceptors.request.use(
  (config: any) => {
    const token = getStore(ACCESS_TOKEN)
    config.headers = {
      ...config.headers,
      ['Authorization']: `Bearer ${token}`,
      ['TokenCybersoft']: TOKEN_CYBERSOFT
    }
    // config.headers['Content-Type'] = 'application/json';
    return config
  },
  error => {
    Promise.reject(error)
  }
)
//Cấu hình kết quả trả về
http.interceptors.response.use(
  response => {
    console.log(response)
    return response
  },
  err => {
    // const originalRequest = error.config;
    console.log(err.response.status)
    if (err.response.status === 500) {
      return Promise.reject(err)
    }
    if (err.response.status === 400 || err.response.status === 404) {
      // history.push('/');
      return Promise.reject(err)
    }
    if (err.response.status === 401 || err.response.status === 403) {
      alert('Token không hợp lệ ! Vui lòng đăng nhập lại !')
      // history.push('/login');
      return Promise.reject(err)
    }
  }
)
