<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { CircleCloseFilled, WarningFilled, Promotion } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const time = ref(10)

let timer: any = null

onMounted(() => {
  timer = setInterval(() => {
    if (time.value === 0) {
      clearInterval(timer)
      return router.replace('/')
    }
    time.value--
  }, 1000)
})
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <div class="cotent">
    <h1>404 not found</h1>
    <a href="/">点击进入首页</a>
    <div style="width: 220px; background: linear-gradient(135deg, #ffefba, #f0f6c4)" :title="time + ' 秒'">
      <el-icon><Promotion /></el-icon>
      <span>倒计时：{{ time > 9 ? time : time < 1 ? time : '0' + time }} 后进入首页</span>
    </div>
    <div title="The current path cannot be found">
      <el-icon><CircleCloseFilled /></el-icon>
      <span>The current path cannot be found</span>
    </div>
    <div title="Looks like we've got some broken links">
      <el-icon><WarningFilled /></el-icon>
      <span>Looks like we've got some broken links</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cotent {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1200px;
  margin: 200px auto 20px;
  padding-bottom: 102px;
  a {
    color: #ff6348;
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 10px;
    text-decoration: none;
    padding: 10px;
    border-radius: 10px;
    &:hover {
      color: #55a6f1;
      font-weight: 600;
      cursor: pointer;
    }
  }
  h1 {
    font-size: 50px;
    font-weight: 600;
    margin: 0px auto 30px;
  }
  div {
    display: flex;
    justify-content: start;
    align-items: center;
    height: 50px;
    width: 340px;
    margin: 20px;
    padding: 0 20px;
    border-radius: 10px;
    background: linear-gradient(161deg, #c9d6ff, #e2e2e2);
    span {
      font-size: 14px;
      color: gray;
      margin-left: 10px;
    }
  }
}
</style>
