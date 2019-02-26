import request from './../axios'
// ------------------------------------------------------------------------------------------------------------------------------------事件申诉
//异常申诉列表查询
export function getAppealList(data) {
  return request({
    url: 'abnormal/getAppealList',
		method: 'post',
		data
  })
}
//详情
export function getAppealDetail(data) {
  return request({
    url: 'abnormal/getAppealDetail',
		method: 'post',
		data
  })
}
//申诉处理
export function handlingAppeal(data) {
  return request({
    url: 'abnormal/handlingAppeal',
		method: 'post',
		data
  })
}
//作业活动数字字典
export function getActivityInfo(data) {
  return request({
    url: 'abnormal/getActivityInfo',
		method: 'post',
		data
  })
}
//导出
export function webExportAppeal(data) {
  return request({
    url: 'abnormal/webExportAppeal',
		method: 'post',
		data
  })
}
//责任人
export function getAllUserApi(data) {
  return request({
    url: 'user/getAllUser',
    method: 'post',
    data
  })
}
// ------------------------------------------------------------------------------------------------------------------------------------事件查询
//查询
export function getReportList(data) {
  return request({
    url: 'abnormal/getReportList',
		method: 'post',
		data
  })
}
//导出
export function webExportAbnormal(data) {
  return request({
    url: 'abnormal/webExportAbnormal',
    method: 'post',
    data
  })
}