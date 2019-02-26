import request from './../axios'
// 登录
export function Login(data) {
	return request({
		url: 'user/noauth/login',
		method: 'post',
		data
	})
}
// Sso登录
export function getUserInfoSso(data) {
  return request({
    url: 'user/sso/getUserInfo',
    method: 'post',
    data
  })
}
export function LoginSso(data) {
  return request({
    url: 'user/noauth/ssoLogin',
    method: 'post',
    data
  })
}

export function LoginOut(data) {
  return request({
    url: 'user/sso/logout',
    method: 'post',
    data
  })
}
// 获得导航
export function getMenu() {
	return request({
		url: 'auth/menu/getList',
		method: 'post',
	})
}
export function loadOption() {
	let data = {
		"pageNum": 1,
		"pageSize": 30,
		"parameter": data.row.code
	}
	request({
			url: 'dataDic/getValueList',
			method: 'post',
			data
		}).then(res => {
			return res.repData;
		})
		.catch(error => {
			self.msgError(error.repMsg)
		})
}

//数字字典——下拉框数据
export function loadDicValList(data) {
	return request({
		url: 'dataDic/getValueList',
		method: 'post',
		data
	})
}
//根据id查询当前数据所属下拉数据
export function getByParentValueId(data) {
	return request({
		url: '/dataDic/getByParentValueId',
		method: 'post',
		data
	})
}
//省（自治区）/市
export function loadProCityList(api, data) {
	let ci = 'region/getCity';
	let pi = 'region/getProvince';
	return request({
		url: api == 'c' ? ci : pi,
		method: 'post',
		data
	})
}
//导入通用接口
export function importFile(data) {
  return request({
    url: 'fileUpload/uploadExcel',
    method: 'post',
    data,
  })
}
//app-version
export function loadVersion(data) {
  return request({
    url: 'forcedUpdate/getVersionInfo',
    method: 'post',
    data,
  })
}
export function updateVersion(data) {
  return request({
    url: 'forcedUpdate/updateNewestVersion',
    method: 'post',
    data,
  })
}
