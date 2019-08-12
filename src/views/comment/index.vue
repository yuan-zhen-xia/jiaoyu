<template>
  <div class="comment">
    <el-card>
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <el-table :data="comment">
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{scope.row.comment_status?'正常':'关闭'}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="changestate(scope.row)" v-if="!scope.row.comment_status" type="success" size="small">打开评论</el-button>
            <el-button @click="changestate(scope.row)" v-else type="danger" size="small">关闭评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页功能 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
         @current-change="changePager"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
      ></el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      reqParams: {
        response_type: 'comment',
        // 页数
        page: 1,
        // 每页数量
        per_page: 20
      },
      comment: [],
      // 文章总数
      total: null
    }
  },
  created () {
    this.getComment()
  },
  methods: {
    async changestate (row) {
      const { data: { data } } = await this.$http.put(`comments/status?article_id=${row.id}`, {
        allow_comment: !row.comment_status
      })
      this.$message.success(data.allow_comment ? '打开评论成功' : '关闭评论成功')
      row.comment_status = data.allow_comment
    },
    changePager (newPager) {
      this.reqParams.page = newPager
      this.getComment()
    },
    async getComment () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      this.comment = data.results
      this.total = data.total_count
    }
  }
}
</script>
<style scoped lang='less'></style>
