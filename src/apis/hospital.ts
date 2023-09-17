// 医院信息的请求API
import http from '@/utils/http.ts'

/**
 * @description 获取当前医院基础数据
 * @param hoscode 当前页面医院标识
 * @api   /hosp/hospital/
 * @returns
 */
export const getHospitalAPI = (hoscode: string) => http.get(`/hosp/hospital/${hoscode}`)

/**
 * @description 获取当前医院的科室
 * @param hoscode 当前页面医院标识
 * @api   /hosp/hospital/department/
 * @returns
 */
export const getHospitalDepartmentAPI = (hoscode: string) => http.get(`/hosp/hospital/department/${hoscode}`)

/**
 * @description   获取当前医院挂号详情
 * @param page    请求当前页数
 * @param limit   每页请求数据个数
 * @param hoscode 当前医院的标识
 * @param depcode 当前医院的科室
 * @api   /hosp/hospital/auth/getBookingScheduleRule/
 * @returns
 */
export const getBookingScheduleRuleAPI = (page: number, limit: number, hoscode: string, depcode: string) => http.get(`/hosp/hospital/auth/getBookingScheduleRule/${page}/${limit}/${hoscode}/${depcode}`)

/**
 * @description     点击选择想要挂号的时间,并显示对应时间的医生
 * @param hoscode   当前医院的标识
 * @param depcode   当前医院的科室
 * @param workDate  选中要预约的时间
 * @api   /hosp/hospital/auth/findScheduleList/
 * @returns
 */
export const getfindScheduleListAPI = (hoscode: string, depcode: string, workDate: string) => http.get(`/hosp/hospital/auth/findScheduleList/${hoscode}/${depcode}/${workDate}`)

/**
 * @description 获取就诊人信息
 * @api /user/patient/auth/findAl
 */
export const getPatientAPI = () => http.get(`/user/patient/auth/findAll`)

/**
 * @description 根据id获取挂号医生信息
 * @param scheduleld 当前医生id
 * @api /hosp/hospital/getSchedule/
 * @returns
 */
export const getScheduleIdAPI = (scheduleld: string) => http.get(`/hosp/hospital/getSchedule/${scheduleld}`)
