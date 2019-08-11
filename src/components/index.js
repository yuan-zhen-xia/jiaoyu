// 封装一个插件
// 注册所有的components下的组件为全局组件
import MyBread from '@/components/my-bread'
import MyChannel from '@/components/my-channel'
import MyImg from '@/components/my-img'

// vue插件 暴露一个对象，对象中有一个选项   install 安装的意思
export default {
  // 安装函数，当vue.use（使用插件）install被调用
  // vue全局的对象
  install (Vue) {
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyChannel.name, MyChannel)
    Vue.component(MyImg.name, MyImg)
  }
}
