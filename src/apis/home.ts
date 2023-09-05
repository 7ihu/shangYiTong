import http from '@/utils/http'


/**
 *首页医院展示
 * @param page 当前请求页数
 * @param limit 当前请求数量
 * @api   '/hosp/hospital/'
 * @returns
 */
export const getHomeHospitalAPI = (page: number, limit: number) => http.get(`/hosp/hospital/${page}/${limit}`)

/**
 * 首页等级-地址展示
 * @param dictCode 请求地址字符串
 * @api   '/cmn/dict/findByDictCode/'
 * @returns
 */
export const getLevelAPI = (dictCode:string)=>http.get(`/cmn/dict/findByDictCode/${dictCode}`)