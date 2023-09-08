import { defineStore } from 'pinia'
import { ref } from 'vue'

import { getHospitalAPI } from '@/apis/hospital.ts'

export const useHospitalStore = defineStore('hospital', () => {
  const hospitalInfo = ref()

  // 获取医院信息
  const getHospital = async (id: string) => {
    const { data: res } = await getHospitalAPI(id)
    hospitalInfo.value = res
    console.log(hospitalInfo.value)
  }
  return {
    hospitalInfo,
    getHospital,
  }
})
