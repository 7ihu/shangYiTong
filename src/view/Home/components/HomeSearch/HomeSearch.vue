<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getHomeSearchAPI } from '@/apis/home'

// 创建路由实例
const router = useRouter()
// 搜索值
const searchValue = ref('')
// 搜索时建议组件
const querySearch = async (inputValue: string, cb?: any) => {
  const { data: res } = await getHomeSearchAPI(inputValue)
  if (!res.length && searchValue.value) {
    ElMessage({ type: 'error', message: '输入错误' })
    return setTimeout(() => elComplete.value.close(), 1000)
  }
  cb(
    res.map((item: { hosname: string; hoscode: string }) => {
      return {
        value: item.hosname,
        link: item.hoscode,
      }
    })
  )
}
// 点击搜索建议栏事件
const handleSelect = (data: { value: string; link: string }) => router.push({ path: `/hospital/${data.link}` })
// 点击搜索按钮触发
const elComplete = ref()
const onClickSearch = () => {
  searchValue.value = ''
  alert('请输入搜索内容')
}
</script>

<template>
  <div class="search">
    <div class="search-input">
      <el-icon size="18" color="gray">
        <Search />
      </el-icon>
      <el-autocomplete v-model="searchValue" clearable class="inline-input w-50" placeholder="点击搜索医院名称" :fetch-suggestions="querySearch" :trigger-on-focus="false" @select="handleSelect" ref="elComplete" />
      <button class="btn" @click="onClickSearch">搜索</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.search {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  .search-input {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 800px;
    height: 60px;
    margin-top: 50px;
    padding: 0 20px;
    border-bottom: 1px solid #eee;

    :deep(.el-input__wrapper) {
      width: 680px;
      height: 50px;
      font-size: 16px;
      box-shadow: none;
    }

    .btn {
      height: 50px;
      border: 0;
      color: #4490f1;
      font-weight: 600;
      background-color: #fff;

      &:hover {
        color: rgba(68, 144, 241, 0.8);
      }
    }
  }
}
</style>
