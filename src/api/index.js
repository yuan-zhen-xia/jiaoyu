// 配置一个axios，导出一个配置好的axios
import axios from 'axios'
import store from '@/store'
import router from '@/router'

// 进行配置根路径
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 编辑请求，成为接口参数格式(这段代码只会执行一次)
// axios.defaults.headers = {
//   Authorization: `Bearer ${store.getUser().token}`
// }
// 应该在每次请求之前，获取token信息，然后追加到headers中
// 所以要用到请求拦截器，就是在每次请求之前，做一些事情

// 添加请求拦截器
axios.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  config.headers = {
    Authorization: `Bearer ${store.getUser().token}`
  }
  return config
}, (error) => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use((res) => {
  // 对响应数据做点什么
  return res
}, (err) => {
  // 对响应错误做点什么
  // 获取响应状态码，如果为401，则为错误
  // err对象包含响应对象，err.response,响应对象内包含状态码err.response.status
  if (err.response.status === 401) {
    // 跳转到登录页面
    // 方式一：
    // location.hash = '#/login'
    // 方式二：因为没有vue实例，$router对象获取不到所以没有办法直接this.$router.push进行跳转，但是可以在本模块直接引入router实例，然后进行跳转
    router.push('/login')
  }
  return Promise.reject(err)
})

// 进行导出
export default axios
