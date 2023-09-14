import http from '@/utils/http'

/**
 * @description 创建订单id
 * @param hoscode 当前医院标识符
 * @param scheduleld 当前医生的id
 * @param patientld 就诊人id
 * @api /order/orderlnfo/auth/submitOrder/
 * @returns
 */
export const getOrderIdAPI = (hoscode: string, scheduleId: string, patientId: any) => http.post(`/order/orderInfo/auth/submitOrder/${hoscode}/${scheduleId}/${patientId}`)

/**
 * @description 获取用户实名信息
 * @api /user/auth/getUserInfo
 * @returns
 */
export const getUserInfoAPI = () => http.get(`/user/auth/getUserInfo`)

/**
 * @discription 获取实名上传图片类型
 * @api /cmn/dict/findByDictCode/
 * @returns
 */
export const getDictCodeAPI = () => http.get(`/cmn/dict/findByDictCode/CertificatesType`)

/**
 * @discription 用户认证
 */
export const getUserAuahAPI = (data: any) => http.post(`/user/auth/userAuah`, data)
