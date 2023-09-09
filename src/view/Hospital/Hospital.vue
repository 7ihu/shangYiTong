<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Document, Calendar, Notification, Message, Search } from '@element-plus/icons-vue'
import { useHospitalStore } from '@/store/hospital.ts'

const route = useRoute()
const hospitalStore = useHospitalStore()
// 当前医院id
const id = <string>route.params.id

onMounted(() => {
  hospitalStore.getHospital(id)
  hospitalStore.getHospitalDepartment(id)
})
</script>

<template>
  <div class="hospital">
    <div class="left">
      <el-menu :default-active="route.fullPath" class="el-menu-vertical-demo" :router="true">
        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>医院</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-menu-item :index="route.fullPath === `/hospital/${id}` ? `/hospital/${id}` : `/hospital/${id}/info`">
          <el-icon><document /></el-icon>
          <span>医院详情</span>
        </el-menu-item>
        <el-menu-item :index="`/hospital/${id}/registration`">
          <el-icon><Calendar /></el-icon>
          <span>预约挂号</span>
        </el-menu-item>
        <el-menu-item :index="`/hospital/${id}/notice`">
          <el-icon><Notification /></el-icon>
          <span>预约须知</span>
        </el-menu-item>
        <el-menu-item :index="`/hospital/${id}/diagnosis`">
          <el-icon><Message /></el-icon>
          <span>停诊信息</span>
        </el-menu-item>
        <el-menu-item :index="`/hospital/${id}/querycancel`">
          <el-icon><Search /></el-icon>
          <span>查询/取消</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="right">
      <routerView />
    </div>
  </div>
</template>

<style scoped lang="scss">
.hospital {
  display: flex;
  justify-content: center;
  width: 1200px;
  margin: 0 auto;
  padding-top: 25px;
  .left {
    flex: 1;
    .breadcrumb {
      padding-left: 22px;
      :deep(.el-breadcrumb) {
        display: flex;
        align-items: center;
        height: 30px;
      }
    }
  }
  .right {
    flex: 4;
    margin: 25px 0 0 30px;
  }
}
:deep(.el-menu) {
  border: 0;
}
</style>
