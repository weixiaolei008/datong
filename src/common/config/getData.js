import request from './axios'

export function companyLoadData(data) {
  return request({
    url: '/company/query/all',
  })
}
//数据字典start
export function loadDicList(data) {
  return request({
    url: 'dataDic/getList',
    method: 'post',
    data
  })
}
export function loadDicUpdate(data) {
  return request({
    url: 'dataDic/update',
    method: 'post',
    data
  })
}
export function loadDicValList(data) {
  return request({
    url: 'dataDic/getValueList',
    method: 'post',
    data
  })
}
// 证照管理
export function loadLicensesList(data) {
  return request({
    url: 'licenses/getTypes',
    method: 'post',
    data
  })
}
export function loadLicensesUpdate(data) {
  return request({
    url: 'licenses/insertOrUpdate',
    method: 'post',
    data
  })
}
//库位管理列表
export function loadLocationList(data) {
  return request({
    url: '/storageLocation/queryAllByCondition',
    method: 'post',
    data
  })
}
//新增库位
export function loadLocationAdd(data) {
  return request({
    url: '/storageLocation/addStorageLocation',
    method: 'post',
    data
  })
}
//服务商管理列表
export function loadSeviceList(data) {
  return request({
    url: '/serviceProvider/queryAllByCondition',
    method: 'post',
    data
  })
}
// export function rfidList(data) {
//   return request({
//     url: '/rfid/getList',
//     method: 'post',
//     data
//   })
// }

// 默认全部导出
// export default {
//   index,
//   companyLoadData,
//   loadDicList,
//   loadDicUpdate,
//   loadDicValList,
//   // loadLocationManagementList, //服务商管理列表
//   // loadLocationManagementAdd, //新增库位,
//   divisionDeleteApi,
//   divisionInsertApi,
//   divisionAll,
//   divisionUpdate,
//   divisiongetById,
//   loadLicensesList,
//   loadLicensesUpdate,
//   loadLocationList, //库位管理列表
//   loadLocationAdd, //新增库位,
//   loadSeviceList, //服务商管理列表
//   // divisionTableListApi,
//   divisionDeleteApi,
//   divisionInsertApi,
//   // divisionDeleteApi,
//   // divisionInsertApi,
// 	rfidList,
// }


