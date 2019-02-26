import request from './../axios'
//新增编辑
export function roleModify(data) {
  return request({
    url: '/roleQualification/insertOrUpdate',
		method: 'post',
		data
  })
}
//角色资本列表
export function roleSettingList(data) {
  return request({
    url: '/roleQualification/getRoleQualiList',
		method: 'post',
		data
  })
}
//角色下拉
export function roleQuery(data) {
  return request({
    url: '/role/query/all',
		method: 'post',
		data
  })
}
//证照下拉
export function licensesList(data) {
  return request({
    url: '/licenses/getLicenses',
		method: 'post',
		data
  })
}
//角色删除
export function roleDelete(data) {
  return request({
    url: '/roleQualification/delete',
		method: 'post',
		data
  })
}
//参数设置list
export function parameterList(data) {
  return request({
    url: '/parameter/getInfo',
		method: 'post',
		data
  })
}
//参数设置保存
export function parameterUpdate(data) {
  return request({
    url: '/parameter/update',
		method: 'post',
		data
  })
}


//库位推荐规则
export function loadLocationRecommend(data) {
  return request({
    url: 'recommendRule/queryAllByCondition',
    method: 'post',
    data
  })
}

export function editLocationRecommend(data) {
  return request({
    url: 'recommendRule/getById',
    method: 'post',
    data
  })
}

export function addLocationRecommend(data) {
  return request({
    url: 'recommendRule/addRule',
    method: 'post',
    data
  })
}

export function updateLocationRecommend(data) {
  return request({
    url: 'recommendRule/updateRule',
    method: 'post',
    data
  })
}

export function delLocationRecommend(data) {
  return request({
    url: 'recommendRule/deleteByIds',
    method: 'post',
    data
  })
}

export function initLocationRecommend(data) {
  return request({
    url: 'recommendRule/init',
    method: 'post',
    data
  })
}
