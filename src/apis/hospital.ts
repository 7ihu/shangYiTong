// 医院信息的请求API

import http from '@/utils/http.ts'

/**
 *
 * @param hoscode 当前页面医院标识
 * @api '/hosp/hospital/
 * @returns
 */
export const getHospitalAPI = (hoscode: string) => http.get(`/hosp/hospital/${hoscode}`)
