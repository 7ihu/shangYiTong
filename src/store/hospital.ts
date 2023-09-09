import { defineStore } from 'pinia'
import { ref } from 'vue'

import { getHospitalAPI, getHospitalDepartmentAPI } from '@/apis/hospital.ts'

export const useHospitalStore = defineStore('hospital', () => {
  const hospitalInfo = ref()
  const hospitalDepartment = ref()

  // 获取医院信息
  const getHospital = async (id: string) => {
    const { data: res } = await getHospitalAPI(id)
    hospitalInfo.value = res
  }
  // 获取医院科室信息
  const getHospitalDepartment = async (id: string) => {
    const { data: res } = await getHospitalDepartmentAPI(id)
    hospitalDepartment.value = res
    console.log(hospitalDepartment.value)
  }
  return {
    hospitalInfo,
    hospitalDepartment,
    getHospital,
    getHospitalDepartment,
  }
})
