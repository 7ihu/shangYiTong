<script setup lang="ts">
</script>

<template>
  <div class="banner">
    <el-carousel :interval="4000" type="card" height="300px">
    <el-carousel-item v-for="item in 4" :key="item">
      <img src="@/assets/images/web-banner-1.png" alt="">
    </el-carousel-item>
  </el-carousel>
  </div>
</template>

<style scoped lang='scss'>
.banner{
  padding-top:10px;
img {
  width: 700px;
  height: 300px;
}}
</style>