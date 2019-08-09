<template>
  <div class="my-img">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div class="btn-box">
        <el-radio-group v-model="reqParams.collect" @change="chengeCollect" size="small">
          <el-radio-button label="false">全部</el-radio-button>
          <el-radio-button label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button type="success" size="small" style="float:right" @click="openDialog()">添加素材</el-button>
      </div>
      <div class="img_list">
        <div class="img_item" v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="foot" v-show="!reqParams.collect">
            <span
              @click="toggleCollect(item)"
              class="el-icon-star-off"
              :class=" {selected:item.is_collected}"
            ></span>
            <span @click="deleteImg(item.id)" class="el-icon-delete"></span>
          </div>
        </div>
      </div>
      <el-pagination
        v-if="total>reqParams.per_page"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="changePager"
      ></el-pagination>
    </el-card>
    <!-- 隐藏的添加素材盒子 -->
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :show-file-list="false"
        :on-success="handleSuccess"
        :headers="uploadHeaders"
        name="image"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import store from '@/store'
export default {
  data () {
    return {
      // 提交参数（以下数据跟接口数据对应，方便请求）
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      //   图片列表数据
      images: [],
      total: 0,
      //   控制对话框的显示和隐藏
      dialogVisible: false,
      // 上传成功后的图片地址
      imageUrl: null,
      // 上传组件的头部
      uploadHeaders: {
        Authorization: `Bearer ${store.getUser().token}`
      }
    }
  },
  created () {
    //   获取素材列表
    this.getImages()
  },

  methods: {
    // 删除图片
    deleteImg (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete(`user/images/${id}`)
          this.$message.success('删除成功')
          this.getImages()
        })
        .catch(() => {})
    },
    // 添加收藏和取消收藏
    async toggleCollect (item) {
      const {
        data: { data }
      } = await this.$http.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      // 操作成功，提示
      this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功')
      // 更新当前图片的状态
      item.is_collected = data.collect
    },
    // 上传成功
    handleSuccess (res) {
      // console.log(res)
      // 1. 获取图片地址显示img标签
      // console.log(res) res.data.url 图片地址
      this.imageUrl = res.data.url
      // 2. 提示上传成功
      this.$message.success('上传成功')
      // 3. 过2s后关闭对话框，更新列表
      window.setTimeout(() => {
        this.dialogVisible = false
        this.reqParams.page = 1
        this.getImages()
      }, 2000)
    },
    //   打开对话框
    openDialog () {
      this.dialogVisible = true
    },
    // 分页实现方法
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    //   切换全部和收藏
    chengeCollect () {
      this.reqParams.page = 1
      this.getImages()
    },
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    }
  }
}
</script>
<style scoped lang='less'>
.img_list {
  margin-top: 20px;
  .img_item {
    width: 200px;
    height: 250px;
    border: 1px dashed #ddd;
    position: relative;
    display: inline-block;
    margin: 30px 70px 0 30px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .foot {
      position: absolute;
      width: 100%;
      height: 30px;
      line-height: 30px;
      left: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      text-align: center;
      span {
        margin: 0 20px;
        &.selected {
          color: red;
        }
      }
    }
  }
}
</style>
