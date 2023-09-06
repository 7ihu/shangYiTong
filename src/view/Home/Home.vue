<script setup lang="ts">
import HomeBanner from './components/HomeBanner/HomeBanner.vue'
import HomeSearch from './components/HomeSearch/HomeSearch.vue'
import HomeClassification from './components/HomeClassification/HomeClassification.vue'
</script>

<template>
  <div class="home">
    <!-- 轮播图 -->
    <HomeBanner />
    <HomeSearch />
    <div class="hospital">
      <el-row :gutter="10">
        <el-col :span="20">
          <HomeClassification/>
        </el-col>
        <el-col :span="4">
          <div style="border-left: 1px solid red; height: 500px">456</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  width: 1200px;
  margin: 0 auto;

  .hospital {
    min-height: 500px;
    margin: 60px 0 20px;
  }
}
</style>
