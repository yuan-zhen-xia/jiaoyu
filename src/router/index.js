import VueRouter from 'vue-router'
import Vue from 'vue'

import Login from '@/views/login'

import Home from '@/views/home'

import Welcome from '@/views/welcome'

import Article from '@/views/article'

import err from '@/views/err'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    // 登录页路由
    { path: '/login', name: 'login', component: Login },
    // 进入欢迎页面的路由
    { path: '/',
      name: 'home',
      component: Home,
      // redirect:'/welcome' 重定向路由 是当路径为/时，自动去二级路由下设置的模块，当二级路由改变，redirect匹配不到设置的二级路由，则会带着一级路由去二级路由下寻找匹配项，当路径为"/"时，如果有redirect，则直接去匹配redrict的路径。
      // 定义欢迎页面子路由
      children: [
        {
          path: '/', name: 'welcome', component: Welcome
        },
        {
          path: '/article', name: 'article', component: Article
        }
      ] },
    // 根据路由处理404报错页面
    { path: '*', name: 'err', component: err }
  ]
})

export default router
