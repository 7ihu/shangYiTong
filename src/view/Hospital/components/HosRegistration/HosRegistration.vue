<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
//引入医院详情仓库的数据
import { useHospitalStore } from '@/store/hospital.ts'
import { useUserStore } from '@/store/user'
const hospitalStore = useHospitalStore()
const userStore = useUserStore()

const activeIndex = ref(0)
const activeliIndex = ref('')
const selectDepartment = ref({
  left: '专科',
  right: '',
})

const scrolladdress = ref()
const onActiveIndex = (i: number, name: string) => {
  activeIndex.value = i
  selectDepartment.value.left = name
  selectDepartment.value.right = ''
  activeliIndex.value = ''
  scrolladdress.value.scrollTop = 0
}

const onActiveliIndex = (item: { depcode: string; depname: string }) => {
  activeliIndex.value = item.depcode
  selectDepartment.value.right = item.depname
}

const router = useRouter()
// 点击预约门诊
const onDiagnosis = () => {
  if (selectDepartment.value.left === '' || selectDepartment.value.right === '') return ElMessage({ type: 'warning', message: '请先选择科室' })
  if (!userStore.userInfo.token) {
    ElMessage({ type: 'warning', message: '请先登录' })
    setTimeout(() => {
      userStore.userStateChange(true)
    }, 500)
    return
  } else if (!userStore.realInfo) {
    setTimeout(() => {
      router.push('/user/realname')
    }, 500)
    return
  }

  router.push(`department?depcode=${activeliIndex.value}`)
}
</script>

<template>
  <div class="registration" v-if="hospitalStore.hospitalInfo">
    <h1>{{ hospitalStore.hospitalInfo.hospital?.hosname }}预约挂号</h1>
    <div class="department">
      <div>
        <h2>已选择：</h2>
        <span v-if="selectDepartment.right">{{ selectDepartment.left }} - {{ selectDepartment.right }}</span>
      </div>
      <button @click="onDiagnosis">预约门诊</button>
    </div>
    <div class="content">
      <div class="left">
        <ul>
          <li v-for="(item, i) in hospitalStore.hospitalDepartment" :ket="item.depcode" :class="{ active: activeIndex === i }" @click="onActiveIndex(i, item.depname)">{{ item.depname }}</li>
        </ul>
      </div>
      <div class="right" ref="scrolladdress">
        <h2>科室：</h2>
        <ul v-if="hospitalStore.hospitalDepartment">
          <li v-for="item in hospitalStore.hospitalDepartment[activeIndex].children" :key="item.depcode" :class="{ activeli: activeliIndex === item.depcode }" @click="onActiveliIndex(item)">{{ item.depname }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.registration {
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  h1 {
    font-size: 30px;
    font-weight: 700;
    margin: 0 auto;
    padding-bottom: 50px;
  }
  .department {
    display: flex;
    justify-content: space-between;
    align-items: start;
    & > div {
      display: flex;
      justify-content: start;
      align-items: center;
      font-size: 18px;
      font-weight: 500;
      padding-bottom: 20px;
      span {
        line-height: 18px;
        font-size: 15px;
        color: red;
      }
    }
    button {
      color: #4490f1;
      font-weight: 600;
      padding: 5px 10px;
      margin-right: 20px;
      border: 1px solid #f0f0f0;
      border-radius: 10px;

      &:hover {
        color: red;
        background-color: #ced6e0;
        cursor: pointer;
      }
    }
  }
  .content {
    display: flex;
    padding-left: 20px;
    .left {
      width: 150px;
      ul {
        padding: 3px 2px;
        border: 1px solid #d4e7ff;
        background-color: #f4f9ff;
        li {
          padding: 0 10px;
          cursor: pointer;
          transition: all 0.2s ease;
          height: 50px;
          line-height: 50px;
          text-align: center;
        }
      }
    }
    .right {
      flex: 1;
      height: 608px;
      padding-left: 20px;
      background-color: #fafafa;
      overflow-y: scroll;
      scrollbar-width: thin;
      scrollbar-color: transparent transparent;
      &::-webkit-scrollbar {
        width: 5px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.2);
      }
      &::-webkit-scrollbar-thumb:hover {
        background-color: rgba(32, 31, 31, 0.3);
      }
      h2 {
        font-size: 18px;
        font-weight: 600;
        padding: 20px 0;
        color: #55a6f1;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        padding-left: 20px;
        li {
          min-width: 180px;
          height: 40px;
          line-height: 40px;
          font-size: 13px;
          padding: 0 15px 0 20px;
          margin: 5px;
          &:hover {
            color: #55a6f1;
            font-weight: 600;
            cursor: pointer;
          }
        }
      }
    }
  }
}
.active {
  width: 151px;
  color: #55a6f1;
  font-size: 16px;
  font-weight: 700;
  border-top: 1px solid #d4e7ff;
  border-bottom: 1px solid #d4e7ff;
  background: #fafafa;
}

.activeli {
  color: #55a6f1;
  font-weight: 600;
  border-radius: 10px;
  background-color: #ecf0f1;
}
</style>
