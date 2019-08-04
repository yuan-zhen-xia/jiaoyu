// 用于存储信息
// 约定好key是什么  heima-user
// 存储的信息是什么  用户信息对象，字符串格式的json
const KEY = 'heima-user'

export default {
  setUser (user) {
    //   储存用户信息到sessionStorage中
    window.sessionStorage.setItem(KEY, JSON.stringify(user))
  },
  git () {
    //   获取用户信息从sessionStorage中
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  }
}
