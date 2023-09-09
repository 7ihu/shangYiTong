<script setup lang="ts">
import { ref } from 'vue'
//引入医院详情仓库的数据
import { useHospitalStore } from '@/store/hospital.ts'
const hospitalStore = useHospitalStore()

const activeIndex = ref(0)
const activeliIndex = ref('')
const selectDepartment = ref({
  left: '专科',
  right: '',
})

const onActiveIndex = (i: number, name: string) => {
  activeIndex.value = i
  selectDepartment.value.left = name
  selectDepartment.value.right = ''
  activeliIndex.value = ''
}

const onActiveliIndex = (item: { depcode: string; depname: string }) => {
  activeliIndex.value = item.depcode
  selectDepartment.value.right = item.depname
}
</script>

<template>
  <div class="registration" v-if="hospitalStore.hospitalInfo">
    <h1>{{ hospitalStore.hospitalInfo.hospital?.hosname }}预约挂号</h1>
    <div class="department">
      <h2>已选择：</h2>
      <span v-if="selectDepartment.right">{{ selectDepartment.left }} - {{ selectDepartment.right }}</span>
    </div>
    <div class="content">
      <div class="left">
        <ul>
          <li v-for="(item, i) in hospitalStore.hospitalDepartment" :ket="item.depcode" :class="{ active: activeIndex === i }" @click="onActiveIndex(i, item.depname)">{{ item.depname }}</li>
        </ul>
      </div>
      <div class="right">
        <h2>科室：</h2>
        <ul>
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
    justify-content: start;
    align-items: center;
    font-size: 18px;
    font-weight: 700;
    padding-bottom: 20px;
    span {
      line-height: 18px;
      font-size: 16px;
      color: red;
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
        background-color: #d4e7ff;
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
      padding-left: 20px;
      background-color: #fafafa;
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
        li {
          height: 40px;
          line-height: 40px;
          font-size: 13px;
          padding: 0 10px;
          margin: 10px;
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
  background: #fafafa;
}

.activeli {
  color: #55a6f1;
  font-weight: 600;
  border-radius: 10px;
  background-color: #ecf0f1;
}
</style>
