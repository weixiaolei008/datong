import request from './../axios'
//库间运输活动看板
export function loadTransportBoard(data) {
  return request({
    url: 'service/task/transport/board',
    method: 'post',
    data
  })
}
//任务看板
export function loadTaskBoard(data) {
  return request({
    url: 'service/task/board',
    method: 'post',
    data
  })
}
//任务详情
export function loadTaskDetail(data) {
  return request({
    url: 'service/task/task/detail',
    method: 'post',
    data
  })
}
//活动详情
export function loadTActivityDetail(data) {
  return request({
    url: 'service/task/activity/detail',
    method: 'post',
    data
  })
}
//活动详情--按钮操作
export function loadTActivityDetailStatus(data) {
  return request({
    url: 'service/task/activity/change/plan/status',
    method: 'post',
    data
  })
}
