<script setup lang="ts"></script>

<template>
  <div class="querycancel">
    <h1>此医院挂号信息</h1>
    <div class="content" v-if="false"></div>
    <el-empty description="暂无数据" :image-size="300" v-else />
  </div>
</template>

<style scoped lang="scss">
.querycancel {
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-size: 30px;
    font-weight: 700;
    padding: 0px 0 20px;
  }
}
</style>
