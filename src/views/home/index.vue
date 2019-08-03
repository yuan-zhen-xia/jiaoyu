<template>
  <div class="home-container">
    <el-container class="hear">
      <el-aside :width="isCollapse?'64px':'200px'">
        <div class="logo" :class="{miniLogo:isCollapse}">
        </div>
        <!-- 左侧菜单导航 -->
        <el-menu
         :collapse="isCollapse"
         :collapse-transition=false
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#002033"
          text-color="#fff"
          active-text-color="#ffd04b"
        >

          <el-menu-item index="1">
            <i class="el-icon-house"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-reading"></i>
            <span slot="title">内容管理</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-money"></i>
            <span slot="title">素材管理</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-truck"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-chat-square"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
          <el-menu-item index="6">
            <i class="el-icon-present"></i>
            <span slot="title">粉丝管理</span>
          </el-menu-item>
          <el-menu-item index="7">
            <i class="el-icon-setting"></i>
            <span slot="title">个人设置</span>
          </el-menu-item>
        </el-menu>
        <!-- 左侧模板结束 -->
      </el-aside>
      <!-- 顶部区域 -->
      <el-container>
        <el-header>
          <span class="el-icon-s-fold" @click="toggleMenu()"></span>
          <span class="text">江苏传智播客科技教育有限公司</span>
          <!-- 下拉菜单模板开始 -->
          <el-dropdown class="fl">
            <span class="el-dropdown-link">
              <img src="../../assets/images/avatar.jpg" alt />
              下拉菜单
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人设置</el-dropdown-item>
              <el-dropdown-item>用户登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- 下拉菜单模板结束 -->
        </el-header>
        <el-main>
            <!-- 二级路由的出口 -->
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isCollapse: true
    }
  },
  methods: {
    toggleMenu () {
      // 侧边栏的展开和收缩 默认展开
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>
<style scoped lang='less'>
.hear {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  .el-aside {
    background: #002033;
  }
  .el-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
  }
  .el-icon-s-fold {
    font-size: 24px;
    vertical-align: middle;
  }
  .text {
    vertical-align: middle;
    padding-left: 10px;
  }
  .fl {
    float: right;
      img{
          vertical-align: middle;
      }
  }
  .logo{
      width: 100%;
      height: 60px;
      background:#002244 url(../../assets/images/logo_admin.png) no-repeat center/140px auto;
  }
//   根据用户的点击来设置显示的图片，默认为大图，所以小图样式写在大图样式后，当用户点击，覆盖大图样式
  .miniLogo {
    //   单纯设置图片，否则会覆盖背景色
      background-image: url(../../assets/images/logo_admin_01.png);
      background-size: 40px auto;
  }
  .el-menu{
      border:none;
  }
}
</style>
