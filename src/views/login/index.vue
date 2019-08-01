<template>
  <div class="container">
    <el-card class="my-card">
      <div slot="header" class="clearfix">
        <img src="../../assets/images/logo_index.png" alt />
      </div>
    </el-card>
  </div>
</template>
<script>
export default {}
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
    height: 300px;
    img {
      display: block;
      margin: 0 auto;
    }
  }
}
</style>
