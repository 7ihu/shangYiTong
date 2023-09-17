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
 * @data {  certificatesNo 用户身份id
 *          certificatesType 用户验证身份类型
 *          certificatesUrl 照片实名路径
 *          name 用户姓名
 *      }
 * @api /user/auth/userAuah
 * @returns
 */
export const getUserAuahAPI = (data: any) => http.post(`/user/auth/userAuah`, data)

/**
 * @description 获取订单详情
 * @param id 创建的订单号
 * @api /order/orderInfo/auth/getOrderInfo/
 * @returns
 */
export const getOrderInfoAPI = (id: string) => http.get(`/order/orderInfo/auth/getOrderInfo/${id}`)

/**
 * @discription 取消预约
 * @param id 订单号
 * @api /order/orderInfo/auth/cancelOrder/
 * @returns
 */
export const getCancelOrder = (id: string) => http.get(`/order/orderInfo/auth/cancelOrder/${id}`)

/**
 * @description 获取支付二维码
 * @param id 订单号
 * @api /order/weixin/createNative
 * @returns
 */
export const getPayAPI = (id: string) => http.get(`/order/weixin/createNative/${id}`)

/**
 * @description 查询支付状态
 * @param id 订单号
 * @api /order/weixin/queryPayStatus/
 * @returns
 */
export const getPayStatusAPI = (id: string) => http.get(`/order/weixin/queryPayStatus/${id}`)

/**
 * @description 获取订单数据
 * @param page 当前页码
 * @param limit 每页数据数量
 * @param patientId 就诊人
 * @param orderStatus 订单状态
 * @api /order/orderInfo/auth/
 * @returns
 */
export const getOrderAllInfoAPI = (page: number, limit: number, patientId?: string, orderStatus?: string) => http.get(`/order/orderInfo/auth/${page}/${limit}?patientId=${patientId}&orderStatus=${orderStatus}`)

/**
 * @description 获取就诊人
 * @api /user/patient/auth/findAll
 * @returns
 */
export const getfindAllAPI = () => http.get(`/user/patient/auth/findAll`)

/**
 * @description 获取订单状态
 * @api /order/orderInfo/auth/getStatusList
 * @returns
 */
export const getStatusListAPI = () => http.get(`/order/orderInfo/auth/getStatusList`)
