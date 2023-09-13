<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getPatientAPI } from '@/apis/hospital'

const router = useRouter()

const regInfo = ref()
const getPatient = async () => {
  const res = await getPatientAPI()
  regInfo.value = res.data
}

onMounted(() => getPatient())
</script>

<template>
  <div class="info" v-if="regInfo">
    <h2>就诊人信息管理</h2>
    <div class="visit-info">
      <el-row align="middle">
        <el-col :span="24" class="el-col" v-for="item in regInfo" :key="item.id">
          <el-card class="box-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <div>
                  <span>{{ item.name }}</span>
                  <span>{{ item.sex === 0 ? '女' : '男' }} </span>
                  <span>{{ item.param.certificatesTypeString }}</span>
                </div>
                <span>卡号：{{ item.userId }}</span>
                <div>
                  <p>查看详情&gt;</p>
                </div>
              </div>
            </template>
            <div class="text">
              <span>{{ item.isInsure === 0 ? '自费' : '医保' }}</span>
              <span>{{ item.certificatesNo }} </span>
              <span>{{ item.param.fullAddress }}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row align="middle">
        <el-col :span="24" class="el-col">
          <el-card class="box-card" shadow="hover">
            <div class="add" @click="router.push('/user/add')">+ 添加就诊人</div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped lang="scss">
.info {
  h2{
    font-weight: 600;
  }
  .visit-info {
    margin: 30px 0;
    padding: 0 20px;
    .el-col {
      padding-bottom: 20px;
      .card-header {
        display: flex;
        justify-content: space-between;
        color: #4990f1;
        font-weight: 600;
        & > div:first-child {
          span {
            margin-right: 30px;
          }
        }
        & > div:last-child {
          color: black;
          &:hover {
            color: #4990f1;
          }
        }
      }
    }
    :deep(.el-card__body) {
      background-color: #f4f9ff;
    }
    .text {
      display: flex;
      align-items: center;
      font-size: 13px;
      font-weight: 600;
      span {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 30px;
        &:first-child {
          width: 50px;
          height: 20px;
          border-radius: 10px;
          background-color: #ffeaa7;
        }
      }
    }
  }
}

.add {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #4990f1;
  width: 100%;
  font-weight: 600;
}
</style>
