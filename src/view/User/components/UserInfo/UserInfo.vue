<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import { getPatientAPI } from '@/apis/hospital'
import { getRemoveUserAPI } from '@/apis/user'

const router = useRouter()

const regInfo = ref()
const getPatient = async () => {
  const res = await getPatientAPI()
  regInfo.value = res.data
}
// 点击查看详情
const drawer = ref(false)
const itemInfo = ref()
const visitDetails = (item: any) => {
  itemInfo.value = item
  drawer.value = true
}
// 关闭详情
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('是否关闭就诊详情?')
    .then(() => {
      done()
      ElMessage({ type: 'success', message: '已关闭' })
    })
    .catch((e) => {
      ElMessage({ type: 'warning', message: e === 'cancel' ? '已取消' : e })
    })
}
// 删除就诊人
const confirmEvent = async () => {
  const res = await getRemoveUserAPI(itemInfo.value.id)
  getPatient()
  drawer.value = false
  if (res.data) return ElMessage({ type: 'success', message: '已删除' })
}
// 更改就诊人
const getUpdateUser = () => router.push('/user/addinfo?id=' + itemInfo.value.id)

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
                <span>就诊ID：{{ item.id }}</span>
                <div @click="visitDetails(item)">
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
            <div class="add" @click="router.push('/user/addinfo')">+ 添加就诊人</div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-drawer v-model="drawer" :before-close="handleClose">
      <template #header>
        <h4>就诊人详情</h4>
      </template>
      <template #default>
        <div v-if="itemInfo">
          <el-descriptions :column="1" border size="large">
            <el-descriptions-item label="姓名：">{{ itemInfo.name }}</el-descriptions-item>
            <el-descriptions-item label="性别：">{{ itemInfo.sex === 0 ? '女' : '男' }}</el-descriptions-item>
            <el-descriptions-item label="账户ID：">{{ itemInfo.userId }}</el-descriptions-item>
            <el-descriptions-item label="就诊ID：">{{ itemInfo.id }}</el-descriptions-item>
            <el-descriptions-item label="自费/医保：">{{ itemInfo.isInsure === 0 ? '自费' : '医保' }}</el-descriptions-item>
            <el-descriptions-item label="实名证件：">{{ itemInfo.param.certificatesTypeString }}</el-descriptions-item>
            <el-descriptions-item label="出生日期：">{{ itemInfo.birthdate }}</el-descriptions-item>
            <el-descriptions-item label="证件号码：">{{ itemInfo.certificatesNo }} </el-descriptions-item>
            <el-descriptions-item label="手机号码：">{{ itemInfo.phone }}</el-descriptions-item>
            <el-descriptions-item label="家庭住址：">{{ itemInfo.param.fullAddress }}</el-descriptions-item>
            <el-descriptions-item label="紧急联系人姓名：">{{ itemInfo.contactsName || '无' }}</el-descriptions-item>
            <el-descriptions-item label="紧急联系人手机号：">{{ itemInfo.contactsPhone || '无' }}</el-descriptions-item>
          </el-descriptions>
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-popconfirm title="是否删除就诊人?" @confirm="confirmEvent">
            <template #reference>
              <el-button type="danger" size="large" plain>删除就诊人</el-button>
            </template>
          </el-popconfirm>

          <el-button type="primary" size="large" plain @click="getUpdateUser">修改就诊人</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<style scoped lang="scss">
.info {
  h2 {
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

.aaa {
  td {
    &:first-child {
      background-color: pink !important;
    }
  }
}
</style>
