<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'
const searchValue = ref('')
const querySearch = () => { }
const handleSelect = (i: any) => {
  console.log(i);

}
</script>

<template>
  <div class="search">
    <div class="search-input">
      <el-icon size="18" color="gray">
        <Search />
      </el-icon>
      <el-autocomplete v-model="searchValue" clearable class="inline-input w-50"
        placeholder="点击搜索医院名称" :fetch-suggestions="querySearch" @select="handleSelect" />
      <button class="btn">搜索</button>
    </div>

  </div>
</template>

<style scoped lang='scss'>
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