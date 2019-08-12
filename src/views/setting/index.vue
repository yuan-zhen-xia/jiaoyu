<template>
  <div class="setting">
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <!-- 布局 -->
      <el-row>
        <el-col :span="12">
          <!-- from表单 -->
          <el-form label-width="120px">
            <el-form-item label="编号:">{{userForm.id}}</el-form-item>
            <el-form-item label="手机号:">{{userForm.mobile}}</el-form-item>
            <el-form-item label="用户名称:">
              <el-input v-model="userForm.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍:">
              <el-input type="textarea" rows="3" v-model="userForm.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱:">
              <el-input v-model="userForm.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="savaUser()">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            action=""
            :http-request="myUpload"
          >
            <img v-if="userForm.photo" :src="userForm.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
            <p style="text-align:center;font-size:16px">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import store from '@/store'
import eventBus from '@/components/eventBus'
export default {
  data () {
    return {
      userForm: {
        id: '',
        name: '',
        // 头条号简介
        intro: '',
        email: '',
        photo: '',
        // 手机号
        mobile: ''
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    myUpload (result) {
      // 选中图片后 触发函数  选择的结果result
      // 文件信息获取 result.file
      // axios + formdata 进行上传
      const formData = new FormData()
      formData.append('photo', result.file)
      this.$http.patch('user/photo', formData).then(res => {
        // 上传头像成功
        this.$message.success('修改头像成功')
        // 预览
        this.userForm.photo = res.data.data.photo
        // 同步本地存储
        store.setUser({ photo: this.userForm.photo })
        // 同步HOME组件
        eventBus.$emit('updatePhoto', this.userForm.photo)
      })
    },
    async getData () {
      const { data: { data } } = await this.$http.get('user/profile')
      this.userForm = data
    },
    async savaUser () {
      await this.$http.patch('user/profile', {
        name: this.userForm.name,
        intro: this.userForm.intro,
        email: this.userForm.email
      })
      this.$message.success('保存设置成功')
      //   当刷新页面时，HOME组件使用本地存储的数据，更新本地存储
      store.setUser({ name: this.userForm.name })
      // 更新HOME组件用户名
      eventBus.$emit('updateName', this.userForm.name)
    }
  }
}

</script>
<style scoped lang='less'></style>
