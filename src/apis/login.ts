import http from '@/utils/http.ts'

/**
 * @description 用户请求验证码
 * @param phone 请求验证码的手机号
 * @api /sms/send/
 * @retuens
 */
export const getPhoneCodeAPI = (phone: string) => http.get(`/sms/send/${phone}`)

/**
 * @description 用户登录
 * @param user 用户手机号
 * @param phoneCode 用户验证码
 * @api /user/login
 * @returns
 */
export const getLoginAPI = (data: { phone: string; code: string }) => http.post(`/user/login`, data)
