<template>
  <div class="container">
    <el-card class="my-card">
      <div slot="header" class="clearfix">
        <img src="../../assets/images/logo_index.png" alt />
        <!-- 表单提交，与loginForm进行双向绑定 -->
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" status-icon>
          <!-- 手机号输入框 -->
           <!-- From组件提供了表单验证的功能，至于要通过rules属性传入约定的验证规则，并将Form-Item的prop属性设置为要效验的字段名即可 -->
          <el-form-item prop="mobile">
            <!-- placeholder默认显示文本 -->
            <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <!-- 验证码输入框 -->
          <el-form-item prop="code">
            <el-input
              v-model="loginForm.code"
              placeholder="请输入验证码"
              style="width:236px; margin-right:10px;"
            ></el-input>
            <!-- 发送验证码按钮 -->
            <el-button>发送验证码</el-button>
          </el-form-item>
          <!--  -->
          <el-form-item>
            <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button style="width:100%;" @click="login()">登 录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    // 申明效验函数 在return之前
    // 函数约定 rule 使用当前字段的校验对象   不会使用
    //          value 字段的值
    //          callback - 校验成功  callback()
    //         校验失败 callback( new Error('将来提示内容') )

    let checkMobile = (rule, value, callback) => {
      // 设置正则表达式，来判断手机号格式是否正确
      if (!/^1[3-9]\d{9}$/.test(value)) return callback(new Error('手机号格式错误'))
      callback()
    }
    return {
      // 表单对象数据
      loginForm: {
        // 绑定from表单中的手机号
        mobile: '',
        // 绑定from表单中的验证码
        code: ''
      },
      // 表单效验规则数据
      // 得到： el-form加属性rules绑定数据，传入约定的验证规则
      // el-form-item指定一个属性prop值是字段的名称
      loginRules: {
        // 效验手机号数据，
        mobile: [
          {
            required: true,
            // 错误的提示信息
            message: '请输入手机号',
            // 触发条件：失去焦点事件
            trigger: 'blur'
          },
          // validator是一种效验规则,指向后面的校验方法
          { validator: checkMobile, trigger: 'blur' }
        ],
        // 效验验证码
        code: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          }, {
            // 设置长度，错误信息和触发条件
            len: 6, message: '验证码不正确', trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    login () {
      // 效验整个表单
      // 方案：调用form组件提供的方法validate
      // validate 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise
      // $refs.loginForm会找到带有ref的元素， 如果获取成功
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          console.log('校验success')
        }
      })
    }
  }
}
</script>
<style scope lang='less'>
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(../../assets/images/login_bg.jpg) no-repeat center/cover;
  .my-card {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -60%);
    width: 400px;
    height: 350px;
    img {
      display: block;
      margin: 0 auto;
      margin-bottom: 20px;
    }
  }
}
</style>
