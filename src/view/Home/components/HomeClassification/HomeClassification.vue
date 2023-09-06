<script setup lang="ts">
import HomeHospital from '@/view/Home/components/HomeHospital/HomeHospital.vue'
import { ref, onMounted } from 'vue'
import { getHomeLevelAPI } from '@/apis/home'

// 点击选择等级、地址
const activeChoice = ref('')
const activeAddress = ref('')

// 请求等级数据
const levelChoiceList = ref<any>([])
const levelAddressList = ref<any>([])

const getHomeLevel = async (data: string) => {
  const { data: res } = await getHomeLevelAPI(data)
  if (data === 'HosType') return (levelChoiceList.value = res)
  return (levelAddressList.value = res)
}

// 选择等级事件
const onClickChoice = (i: string) => {
  activeChoice.value = i
}
// 选择地址事件
const onClickAddress = (i: string) => {
  activeAddress.value = i
}
onMounted(async () => {
  await Promise.all([getHomeLevel('HosType'), getHomeLevel('Beijin')])
})
</script>

<template>
  <div class="classification" v-if="levelChoiceList.length && levelAddressList.length">
    <div class="hospitalInfo">
      <div>
        <h2>医院</h2>
      </div>
      <div class="choice">
        <div>等级：</div>
        <ul class="grade">
          <li :class="{ active: activeChoice === '' }" @click="activeChoice = ''">全部</li>
          <li v-for="item in levelChoiceList" :key="item.id" :class="{ active: activeChoice === item.value }" @click="onClickChoice(item.value)">{{ item.name }}</li>
        </ul>
      </div>
      <div class="address">
        <div>地区：</div>
        <ul class="grade">
          <li :class="{ active: activeAddress === '' }" @click="activeAddress = ''">全部</li>
          <li v-for="item in levelAddressList" :key="item.id" :class="{ active: activeAddress === item.id }" @click="onClickAddress(item.id)">{{ item.name }}</li>
        </ul>
      </div>
    </div>
    <div>
      <HomeHospital :activeChoice="activeChoice" :activeAddress="activeAddress" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.classification {
  .hospitalInfo {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
    font-size: 14px;

    h2 {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 20px;
    }

    .choice,
    .address {
      display: flex;
      align-content: start;
      width: 100%;
      color: #666;
      margin: 10px 0;

      div {
        width: 60px;
        margin-top: 10px;
      }

      .grade {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        width: 930px;

        li {
          margin: 10px;

          &:hover {
            color: #55a6f1;
          }
        }
      }
    }
  }
}

.active {
  color: #55a6f1;
  font-weight: 600;
}
</style>
