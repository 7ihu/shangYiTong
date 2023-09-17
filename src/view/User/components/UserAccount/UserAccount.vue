<script setup lang="ts">
import { ref, onMounted } from 'vue'

const account = ref()

const getAccountInfo = () => (account.value = JSON.parse(localStorage.getItem('realInfo') as string) || {})

onMounted(() => {
  getAccountInfo()
})
</script>

<template>
  <div class="querycancel">
    <h1>账户信息</h1>
    <div class="content" v-if="account">
      <p>
        <span>账户名：{{ account.name }}</span>
        <span>电话：{{ account.phone }}</span>
      </p>
      <img :src="account.certificatesUrl" alt="" />
    </div>
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
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
    p{
      color: #4490f1;
      font-size: 18px;
      font-weight: 600;
      span{
        margin-right: 10px;
      }
    }
    img {
      width: 240px;
      height: 240px;
      border-radius: 10%;
      margin-top: 20px;
    }
  }
}
</style>
