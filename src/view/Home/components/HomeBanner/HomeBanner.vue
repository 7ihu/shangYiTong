<script setup lang="ts">
</script>

<template>
  <div class="banner">
    <el-carousel :interval="4000" type="card" height="240px">
    <el-carousel-item v-for="item in 4" :key="item">
      <img src="@/assets/images/web-banner-1.png" alt="">
    </el-carousel-item>
  </el-carousel>
  </div>
</template>

<style scoped lang='scss'>
.banner{
  padding-top:15px;
img {
  width: 600px;
  height: 240px;
}}
</style>