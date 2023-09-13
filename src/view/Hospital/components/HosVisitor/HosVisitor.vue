<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPatientAPI, getScheduleIdAPI } from '@/apis/hospital'
import { Warning, User, Eleme } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

const flag = ref(true)
const submit = () => {
  flag.value = false
  setTimeout(() => {
    router.push(`/user/order?order=${1}`)
  }, 3000)
}

// 获取当前账号就诊人信息
const regInfo = ref()
const getPatient = async () => {
  const res = await getPatientAPI()
  console.log(res)
  regInfo.value = res.data
}
// 获取当前挂号医生信息
const scheduleId = ref()
const getScheduleId = async () => {
  const res = await getScheduleIdAPI(route.query.doctor as string)
  scheduleId.value = res.data
}

// 点击选择就诊人
const nowRegInfo = ref()
const onClickItem = (item: any) => (nowRegInfo.value = item)

onMounted(() => {
  getPatient()
  getScheduleId()
})
</script>

<template>
  <div class="visitor">
    <p>确认挂号信息</p>
    <div class="people">
      <div class="visit">
        <div>
          <div></div>
          <h2>选择就诊人</h2>
        </div>
        <p @click="router.push('/user/info')">
          <el-icon size="14"><User /></el-icon>
          <span>添加就诊人</span>
        </p>
      </div>

      <div class="people-content" v-if="regInfo">
        <el-row justify="start" align="middle">
          <el-col :span="5" v-for="item in regInfo" :key="item.id" class="el-col" @click="onClickItem(item)">
            <el-card class="box-card" :class="{ active: nowRegInfo === item }">
              <h2>{{ item.name }}</h2>
              <p>{{ item.param.fullAddress }}</p>
              <p>{{ item.certificatesNo }}</p>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div class="info" v-else>请先选择就诊人</div>
    </div>
    <div class="visitCard">
      <div class="visit">
        <div>
          <div></div>
          <h2>选择就诊卡</h2>
          <span>
            <el-icon size="15"><Warning /></el-icon>
            <i>如您持社保卡就诊，请务必选择医保预约挂号，以保证正常医保报销。</i>
          </span>
        </div>
      </div>
      <div class="visit-info" v-if="nowRegInfo">
        <el-row :gutter="1" justify="start" align="middle">
          <el-col :span="7" class="el-col">
            <el-card class="box-card" shadow="hover"  >
              <template #header>
                <div class="card-header">
                  <span>{{ nowRegInfo!.name }}</span>
                  <span>{{ nowRegInfo!.param.certificatesTypeString }}</span>
                  <span style="font-size: 13px">卡号：{{ nowRegInfo.id }}</span>
                </div>
              </template>
              <div class="text">
                <span>{{ nowRegInfo.isInsure === 0 ? '自费' : '医保' }}</span>
                <span>
                  <i>{{ nowRegInfo!.certificatesNo }}</i>
                </span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div class="info" v-else>请先选择就诊人</div>
    </div>
    <div class="reginfo">
      <div class="visit">
        <div>
          <div></div>
          <h2>挂号信息</h2>
        </div>
      </div>
      <div class="reg-info" v-if="scheduleId">
        <el-descriptions :column="1">
          <el-descriptions-item label="就诊日期：">{{ scheduleId.workDate }} &nbsp;&nbsp;&nbsp; {{ scheduleId.param.dayOfWeek }}</el-descriptions-item>
          <el-descriptions-item label="就诊医院：">{{ scheduleId.param.hosname }}</el-descriptions-item>
          <el-descriptions-item label="就诊科室：">{{ scheduleId.param.depname }}</el-descriptions-item>
          <el-descriptions-item label="医生姓名：">{{ scheduleId.docname }}</el-descriptions-item>
          <el-descriptions-item label="医生职称：">{{ scheduleId.title }}</el-descriptions-item>
          <el-descriptions-item label="医生专长：">{{ scheduleId.skill }}</el-descriptions-item>
          <el-descriptions-item label="服务费用：">{{ scheduleId.amount }}元</el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
    <div class="userinfo">
      <div class="visit">
        <div>
          <div></div>
          <h2>用户信息</h2>
        </div>
      </div>
      <div class="user-info" v-if="nowRegInfo">
        <el-descriptions :column="1">
          <el-descriptions-item label="就诊人手机号：">{{ nowRegInfo.phone }}</el-descriptions-item>
        </el-descriptions>
      </div>
      <div class="info" v-else>请先选择就诊人</div>
    </div>
    <div class="btn" v-if="nowRegInfo">
      <el-button type="primary" v-if="flag" @click="submit">确认挂号</el-button>
      <el-button type="primary" :loading-icon="Eleme" loading v-else>正在提交</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.visitor {
  & > p {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 30px;
  }
  .people {
    .people-content {
      padding: 0 20px;
      margin: 30px 0;
      .el-col {
        margin: 0 18px;
        padding-bottom: 20px;
      }
      .box-card {
        font-size: 12px;
        border: 1px solid #ccc;
        h2 {
          font-size: 16px;
        }
        p {
          padding-top: 10px;
        }
      }
    }
  }
  .visit {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    & > div {
      display: flex;
      align-items: center;
      div {
        width: 3px;
        height: 12px;
        border-radius: 10px;
        margin-right: 8px;
        background-color: #4990f1;
      }
      h2 {
        font-size: 15px;
        color: #999;
      }
      span {
        display: flex;
        align-items: center;
        padding-left: 30px;
        color: red;
        font-size: 13px;
        i {
          margin-left: 5px;
        }
      }
    }
    p {
      display: flex;
      font-size: 14px;
      padding: 8px 15px;
      border-radius: 5px;
      color: #fff;
      background-color: #63b439;
      span {
        margin-left: 5px;
      }
      &:hover {
        background-color: #4990f1;
      }
    }
  }
  .visitCard {
    .visit-info {
      margin: 30px 0;
      padding: 0 20px;
      .el-col {
        margin: 0 18px;
        padding-bottom: 20px;
        .card-header {
          display: flex;
          justify-content: space-between;
          color: #4990f1;
          font-weight: 600;
        }
      }
      :deep(.el-card__body) {
        background-color: #f4f9ff;
      }
      .text {
        display: flex;
        justify-content: space-around;
        font-size: 13px;
        color: #bdc3c7;
        font-weight: 600;
        span {
          display: flex;
          justify-content: center;
          align-items: center;
          &:first-child {
            width: 50px;
            height: 20px;
            border-radius: 10px;
            background-color: #7f8c8d;
          }
        }
      }
    }
  }
  .reginfo {
    .reg-info {
      display: flex;
      margin-left: 50%;
      transform: translateX(-50%);
      align-items: center;
      padding: 40px 0;
    }
  }
  .userinfo {
    .user-info {
      display: flex;
      margin-left: 50%;
      transform: translateX(-50%);
      align-items: center;
      padding: 20px 0;
    }
  }
  .btn {
    display: flex;
    margin-left: 50%;
    transform: translateX(-50%);
    align-items: center;
    padding: 50px 0 30px;
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 150px;
      height: 50px;
    }
  }
}
.info {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
  padding: 20px 0;
  font-size: 20px;
  color: #999;
}

.active {
  font-weight: 600;
  color: #fff;
  background-color: #4990f1;
}
</style>
