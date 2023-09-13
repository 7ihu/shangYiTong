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
      <el-menu :default-active="route.path" class="el-menu-vertical-demo" :router="true">
        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>会员中心</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-menu-item :index="route.fullPath === `/user` ? `/user` : `/user/realname`">
          <el-icon><document /></el-icon>
          <span>实名认证</span>
        </el-menu-item>
        <el-menu-item :index="`/user/info`">
          <el-icon><Notification /></el-icon>
          <span>就诊人管理</span>
        </el-menu-item>
        <el-menu-item :index="`/user/order`">
          <el-icon><Calendar /></el-icon>
          <span>挂号订单</span>
        </el-menu-item>
        <el-menu-item :index="`/user/account`">
          <el-icon><Message /></el-icon>
          <span>账号信息</span>
        </el-menu-item>
        <el-menu-item :index="`/user/feedback`">
          <el-icon><Search /></el-icon>
          <span>意见反馈</span>
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
    letter-spacing: 3px;
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
