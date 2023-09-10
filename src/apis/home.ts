import http from '@/utils/http'

/**
 * @description 首页医院展示
 * @param page 当前请求页数
 * @param limit 当前请求数量
 * @api   '/hosp/hospital/'
 * @returns
 */
export const getHomeHospitalAPI = (page: number, limit: number, hostype: string, districtCode: string) => http.get(`/hosp/hospital/${page}/${limit}?hostype=${hostype}&districtCode=${districtCode}`)

/**
 * @description 首页等级-地址展示
 * @param dictCode 请求地址字符串
 * @api   '/cmn/dict/findByDictCode/'
 * @returns
 */
export const getHomeLevelAPI = (dictCode: string) => http.get(`/cmn/dict/findByDictCode/${dictCode}`)

/**
 * @description 首页搜索展示
 * @param hosname 搜索输入值
 * @returns
 */
export const getHomeSearchAPI = (hosname:string)=>http.get(`/hosp/hospital/findByHosname/${hosname}`)