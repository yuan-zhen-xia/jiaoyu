<template>
  <div class="article-container">
    <!-- 筛选条件 -->
    <el-card>
      <!-- 卡片分层 -->
      <div slot="header" class="clearfix">
        <!-- 面包屑摸板 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form label-width="80px" size="small">
        <el-form-item label="状态:">
          <!-- 单选框 -->
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="频道:">
          <!-- 下拉框 -->
          <el-select v-model="reqParams.channel_id" placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期:">
          <!-- 日期 -->
           <el-date-picker
      v-model="dataArr"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选结果 -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 筛选表单数据，提交给后台的参数
      reqParams: {
        status: null,
        channel_id: null
      },
      // 频道下拉数据，不需要提交到后台
      channelOptions: [{
        value: 1,
        label: 'js'
      }],
      // 日期数据
      dataArr: []
    }
  }
}
</script>
<style scoped lang='less'></style>
