<script setup lang="ts">
//引入医院详情仓库的数据
import { useHospitalStore } from '@/store/hospital.ts'
const hospitalStore = useHospitalStore()
</script>

<template>
  <div class="diagnosis">
    <h1>{{ hospitalStore.hospitalInfo.hospital?.hosname }}停诊信息须知</h1>
    <div class="content" v-if="false"></div>
    <el-empty description="暂无数据" :image-size="300" v-else />
  </div>
</template>

<style scoped lang="scss">
.diagnosis {
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
