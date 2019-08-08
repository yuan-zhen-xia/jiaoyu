<template>
  <div class="article-container">
    <!-- 筛选条件 -->
    <el-card>
      <!-- 卡片分层 -->
      <div slot="header">
        <!-- 面包屑摸板 -->
        <my-bread>内容管理</my-bread>
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

        <el-form-item label="频道:" >
          <!-- 使用自己封装的组件 -->
          <!--
              v-model="reqParams.channel_id"
              就是  v-bind:value 和 v-on:input 的组合使用方式
              <my-channel v-model="reqParams.channel_id"></my-channel>
           -->
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期:">
          <!-- 日期 -->
          <!-- value-format="yyyy-MM-dd"组件自带更改日期格式的方法 -->
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选结果 -->
    <el-card>
      <div slot="header">根据筛选条件查询到{{total}}条结果</div>
      <!-- 表格组件 -->
      <el-table :data="articles">
        <!-- prop是指定字段显示该字段的值  -->
        <el-table-column prop="title" label="封面">
          <!-- 使用作用域插槽，results外部数据，articles传入了表格组件，帮我们做了遍历，每一项数据row=“每一项数据”        所有：使用每一项数据，其实是组件内部的数据 -->
          <template slot-scope="scope">
            <el-image
              fit="scale-down"
              :src="scope.row.cover.images[0]"
              style="width:120px;height:80px"
            >
              <div slot="error" class="image-slot">
                <img src="../../assets/images/error.gif" alt style="width:120px;height:80px" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失效</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger" @click="del(scope.row.id)">删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button type="primary" @click="edit(scope.row.id)" icon="el-icon-edit" circle plain></el-button>
            <el-button type="danger" @click="del(scope.row.id)" icon="el-icon-delete" circle plain></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <div style="text-align: center;margin-top:30px">
        <!-- :total="1000" 指定列表数据总条数 -->
        <!-- 每页默认显示10条数据，:page-size="reqParams.per_page" -->
        <!-- 更新数据后，当前页码需要修改，选中对应的按钮 current-page -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="reqParams.per_page"
          @current-change="changePager"
          :current-page="reqParams.page"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
// 引入封装好的面包屑组件
export default {
  // 使用面包屑组件

  data () {
    return {
      // 筛选表单数据，提交给后台的参数
      // axios提交的数据，如果值为null是不会提交参数的
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      // 频道下拉数据，不需要提交到后台
      channelOptions: [],
      // 日期数据
      dateArr: [],
      // 定义表格数据
      articles: [],
      // 总条数
      total: 0
    }
  },
  // 定义钩子函数，当组件函数都执行完毕后执行
  created () {
    // 获取文章列表 数据
    this.getArticles()
  },
  methods: {
    // 编辑函数
    edit (id) {
      this.$router.push('/publish?id=' + id)
    },
    // 删除函数
    del (id) {
      // 弹出确认框，点击确认，发出删除请求，响应成功更新列表即可
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
        //  点击确认，向后台发送删除请求
          await this.$http.delete(`articles/${id}`)
          // 提示用户删除成功
          this.$message.success('删除成功')
          // 更新列表
          this.getArticles()
        }).catch(() => {

        })
    },
    // 日期选择后的事件
    changeDate (dateArr) {
      // 将清除数据后筛选考虑在内
      if (dateArr) {
        // console.log(dateArr)

        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    // 筛选函数
    search () {
      // 筛选项为双向绑定，拿对应数据发松请求即可，注意，从新筛选到页码的第一页
      this.reqParams.page = 1
      this.getArticles()
    },
    // 改变分页事件对应函数
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getArticles()
    },
    async getArticles () {
      // axios的get传参  第一种，url？key=value&key1=value1
      // 第二种： 传入一个对象形式 ｛params：指定传参对象｝，发请求的时候自动拼接都地址栏后面
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      // console.log(data)
      // 列表数据
      this.articles = data.results
      // 总条数
      this.total = data.total_count
    }
  }
}
</script>
<style scoped lang='less'>
.el-card {
  margin-top: 20px;
}
</style>
