<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ArrowDown } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/user'
const useUser = useUserStore()

const router = useRouter()
const onClear = () => {
  useUser.clearUserInfo()
  router.replace('/')
}
</script>

<template>
  <div class="top">
    <div class="container">
      <div class="left">
        <a href="/">
          <img src="../../assets/images/logo.png" alt="" />
          <p>尚医通 &nbsp; 预约挂号同一平台</p>
        </a>
      </div>
      <div class="right" v-if="useUser">
        <p @click="router.push('/')">帮助中心</p>
        <el-dropdown v-if="useUser.userInfo.name" size="large">
          <span class="el-dropdown-link" @click="router.push('/user')">
            {{ useUser.userInfo.name }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="router.push('/user/realname')">实名认证</el-dropdown-item>
              <el-dropdown-item @click="router.push('/user/order')">挂号订单</el-dropdown-item>
              <el-dropdown-item @click="router.push('/user/info')">就诊人管理</el-dropdown-item>
              <el-dropdown-item divided @click="onClear">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <p @click="useUser.userStateChange(true)" v-else>账户登录</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.top {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 70px;
  background-color: #fff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1200px;

    .left {
      a {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 22px;
        color: #4490f1;
        text-decoration: none;

        img {
          width: 50px;
          height: 50px;
          margin-right: 10px;
        }
      }
    }

    .right {
      display: flex;
      justify-content: center;
      align-items: center;
      color: grey;
      cursor: pointer;

      p {
        &:nth-child(1) {
          margin-right: 15px;
        }

        &:hover {
          color: #4490f1;
        }
      }
    }
  }
}
:deep(.example-showcase .el-dropdown-link) {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
