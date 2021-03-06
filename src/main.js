import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/style/index.less'

import axios from '@/api'

import router from '@/router'

// 挂载自己设置的组件为全局组件
import myCom from '@/components'
Vue.use(myCom)

Vue.prototype.$http = axios

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
