<!-- 封装频道组件
    不止要实现功能，还要实现组建的双向绑定，因为需要提交到后台（通过v-model指令实现）
 -->
<template>
<div class='channel-container'>
      <!-- 下拉框 -->
      <!--
        <el-select :clearable="true" v-modle="value" placeholder="请选择">
      -->
          <el-select :clearable="true" @change="fn" :value="value" placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
</div>
</template>
<script>
// 计算属性使用场景，当你需要一个新数据，要依赖data中的数据
// watch侦听器的使用场景：当你需要监听某一个属性的变化，去做一些开销较大的操作，（异步操作）
// watch: {
//   'reqParams.channel_id': function (newval, oldval) {
//     if (newval === '') {
//       this.reqParams.channel_id = null
//     }
//   }
// },
// 注意：当选择清空内容的时候，值为空字符，处理为null数据
// props Down 向下传递  父传子 不能修改，只能使用（能改。但是不建议这样用）
// events Up 向上传递  子传父  发布订阅者     $emit(发布)    $on（监听）
// 发布订阅者
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
    //   myvalue: null,
      channelOptions: null
    }
  },
  created () {
    // 获取频道下拉选项数据，定义方法
    this.getChangeOptions()
  },
  methods: {
    // 定义获取后台获取数据的方法，并将其赋予data数据
    async getChangeOptions () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    fn (val) {
      // 空字符串处理成null
      if (val === '') val = null
      // 要将数据交给父组件使用
      // 子组件修改了。需要告诉父组件，订阅了我的事件的人
      this.$emit('input', val)
    }
  }
}
</script>
<style scoped lang='less'></style>
