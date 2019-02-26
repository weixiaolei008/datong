import request from './../axios'

//业务中心
export function loadBusinessCenterList(data) {
  return request({
    url: 'service/task/history/select',
    method: 'post',
    data
  })
}
//业务中心--详情
export function loadBusinessCenterDetail(data) {
  return request({
    url: 'service/task/history/business/detail',
    method: 'post',
    data
  })
}
//业务中心--活动详情
export function loadBActivityDetail(data) {
  return request({
    url: 'service/task/history/detail',
    method: 'post',
    data
  })
}
