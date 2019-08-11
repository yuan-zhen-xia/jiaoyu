<!-- 该页面为复制粘贴，周末一定要写好备注 -->
<template>
  <div class="my-img">
    <!-- 图片按钮 -->
    <!-- 给图片添加点击事件 -->
    <div class="img-btn" @click="openDialog">
      <!-- 设置默认图片 -->
      <img :src="value||tpimg" alt />
    </div>
    <!-- 使用对话框组件 并设置动态绑定属性，当点击的时候决定该选项的显示和隐藏 -->
    <el-dialog title="选择封面" :visible.sync="dialogVisible" width="700px">
      <!-- 设置选项卡，并绑定键为第一个盒子 -->
      <el-tabs v-model="activeName" type="card">
        <!-- 当绑定的activeName的值为这个盒子的name值时，显示默认显示该盒子，该盒子为单选框 -->
        <el-tab-pane label="素材库" name="image">
          <!-- 绑定该元素，并设置时间 -->
          <el-radio-group v-model="reqParams.collect" size="mini" @change="collectChange">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <div class="img-list">
            <div
              class="img-item"
              :class="{selected:selectedImgUrl===item.url}"
              @click="selectedImg(item.url)"
              v-for="item in images"
              :key="item.id"
            >
              <img :src="item.url" alt />
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
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <!-- 使用组件 -->
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :on-success="handleSuccess"
            :headers="uploadHeaders"
            name="image"
          >
            <img v-if="loadImgUrl" :src="loadImgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="okImg()">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import store from '@/store'
import tpimg from '../assets/images/default.png'
export default {
  name: 'MyImg',
  props: ['value'],
  data () {
    return {
      dialogVisible: false,
      // 控制选中的选项卡  选项卡name的值
      activeName: 'image',
      // 传递参数
      reqParams: {
        //   是否收藏
        collect: false,
        // 显示页数
        page: 1,
        // 单页显示的数量
        per_page: 6
      },
      // 图片列表数据
      images: [],
      // 总条数
      total: 0,
      // 记录选中的图片地址
      selectedImgUrl: null,
      // token格式处理
      uploadHeaders: {
        Authorization: `Bearer ${store.getUser().token}`
      },
      // 图片路径地址
      loadImgUrl: null,
      tpimg
    }
  },
  methods: {
    // 点击确认事件
    okImg () {
      if (this.activeName === 'image') {
        this.$emit('input', this.selectedImgUrl)
      } else {
        this.$emit('input', this.loadImgUrl)
      }
      this.dialogVisible = false
    },
    // 图片上传成功的函数
    handleSuccess (res) {
      this.loadImgUrl = res.data.url
    },
    // 图片选中打钩事件
    selectedImg (url) {
      this.selectedImgUrl = url
    },
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 默认图片点击函数
    openDialog () {
      this.dialogVisible = true
      this.selectedImgUrl = null
      this.loadImgUrl = null
      // 获取素材列表数据
      this.getImages()
    },
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    collectChange () {
      this.reqParams.page = 1
      this.getImages()
    }
  }
}
</script>
<style scoped lang='less'>
.my-img{
  display: inline-block;
  margin-right: 20px;
}
.img-btn {
  width: 160px;
  height: 160px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.dialog-footer {
  display: block;
  text-align: center;
  width: 100%;
}
.img-list {
  margin-top: 10px;
}
.img-item {
  width: 160px;
  height: 120px;
  border: 1px dashed #ddd;
  display: inline-block;
  margin-right: 15px;
  margin-bottom: 10px;
  position: relative;
  &.selected {
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.2) url(../assets/images/selected.png)
        no-repeat center/50px 50px;
    }
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
  }
}
</style>
