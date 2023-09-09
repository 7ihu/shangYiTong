// 医院信息的请求API

import http from '@/utils/http.ts'

/**
 * 获取当前医院基础数据
 * @param hoscode 当前页面医院标识
 * @api   /hosp/hospital/
 * @returns
 */
export const getHospitalAPI = (hoscode: string) => http.get(`/hosp/hospital/${hoscode}`)

/**
 * 获取当前医院的科室
 * @param hoscode 当前页面医院标识
 * @api   /hosp/hospital/department/
 * @returns
 */
export const getHospitalDepartmentAPI = (hoscode: string) => http.get(`/hosp/hospital/department/${hoscode}`)
