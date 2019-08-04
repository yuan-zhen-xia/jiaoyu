// 配置一个axios，导出一个配置好的axios
import axios from 'axios'
import store from '@/store'

// 进行配置根路径
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 编辑请求，成为接口参数格式
axios.defaults.headers = {
  Authorization: `Bearer ${store.getUser().token}`
}
// 进行导出
export default axios
