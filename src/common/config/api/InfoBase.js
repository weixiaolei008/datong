import request from './../axios'

export function companyLoadData(data) {
  return request({
    url: '/company/query/all',
		method: 'post',
		data
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
    url: 'dataDic/getByParentId',
    method: 'post',
    data
  })
}
export function updateDicValList(data) {
  return request({
    url: 'dataDic/insertOrUpdate',
    method: 'post',
    data
  })
}
// 证照管理
export function loadLicensesList(data) {
  return request({
    url: 'licenses/getList',
    method: 'post',
    data
  })
}
export function LicensesUpdate(data) {
  return request({
    url: 'licenses/update',
    method: 'post',
    data
  })
}
export function LicensesAdd(data) {
  return request({
    url: 'licenses/insert',
    method: 'post',
    data
  })
}
//库位管理列表
export function loadLocationList(data) {
  return request({
    url: 'storageLocation/queryAllByCondition',
    method: 'post',
    data
  })
}
//库位管理--初始化
export function loadLocationInit(data) {
  return request({
    url: 'storageLocation/init',
    method: 'post',
    data
  })
}
//库位管理--新增库位
export function loadLocationAdd(data) {
  return request({
    url: 'storageLocation/addStorageLocation',
    method: 'post',
    data
  })
}
//库位管理--删除
export function loadLocationDel(data) {
  return request({
    url: 'storageLocation/deleteByIds',
    method: 'post',
    data
  })
}
//库位管理--编辑
export function loadLocationEdit(data) {
  return request({
    url: 'storageLocation/updateStorageLocation',
    method: 'post',
    data
  })
}
//库位管理--详情
export function loadLocationDetail(data) {
  return request({
    url: 'storageLocation/getById',
    method: 'post',
    data
  })
}
//库位管理--导入
export function loadLocationImport(data) {
  return request({
    url: 'storageLocation/batchAdd',
    method: 'post',
    data
  })
}
//服务商管理--列表
export function loadSeviceList(data) {
  return request({
    url: 'serviceProvider/queryAllByCondition',
    method: 'post',
    data
  })
}
//服务商管理--初始化
export function loadSeviceInit(data) {
  return request({
    url: 'serviceProvider/init',
    method: 'post',
    data
  })
}
//服务商管理--删除
export function loadSeviceDel(data) {
  return request({
    url: 'serviceProvider/deleteServiceProvider',
    method: 'post',
    data
  })
}
//服务商管理--新增
export function loadSeviceAdd(data) {
  return request({
    url: 'serviceProvider/addServiceProvider',
    method: 'post',
    data
  })
}
//服务商管理--编辑初始化
export function loadSeviceEditInit(data) {
  return request({
    url: 'serviceProvider/getById',
    method: 'post',
    data
  })
}
//服务商管理--编辑
export function loadSeviceEdit(data) {
  return request({
    url: 'serviceProvider/updateServiceProvider',
    method: 'post',
    data
  })
}
//服务商管理新增--资质列表
export function loadSeviceAptitudeLisList(data) {
  return request({
    url: 'serviceProvider/updateAptitudeList',
    method: 'post',
    data
  })
}
//服务商管理新增--运力信息列表
export function loadSeviceTransportCapacityList(data) {
  return request({
    url: 'serviceProvider/updateTransportCapacityList',
    method: 'post',
    data
  })
}
// ----------------------------------------------------------------人员信息
//人员能级-----操作详情
export function serviceInfo(data) {
  return request({
    url: 'service/task/service/info',
    method: 'post',
    data
  })
}
//人员能级
export function getModifyLog(data) {
  return request({
    url: 'userSkill/getModifyLog',
    method: 'post',
    data
  })
}
//人员能级-----事故详情
export function getAccidentInfo(data) {
  return request({
    url: 'abnormal/getAccidentInfo',
    method: 'post',
    data
  })
}
//人员能级-----培训详情
export function getUserTrainList(data) {
  return request({
    url: 'user/getUserTrainList',
    method: 'post',
    data
  })
}
//人员能级-----次数
export function getSystemUserInfo(data) {
  return request({
    url: 'user/getSystemUserInfo',
    method: 'post',
    data
  })
}
//人员审核-----证照信息
export function userSkill(data) {
  return request({
    url: 'userSkill/getList',
    method: 'post',
    data
  })
}
//角色编辑---查询角色信息
export function getUserInfo(data) {
  return request({
    url: 'user/getUserInfo',
    method: 'post',
    data
  })
}
//角色编辑-保存
export function updateSystemUser(data) {
  return request({
    url: 'user/updateSystemUser',
    method: 'post',
    data
  })
}
//RFID
export function rfidList(data) {
  return request({
    url: 'rfid/getList',
    method: 'post',
    data
  })
}

//RFID新增
export function rfidAdd(data) {
  return request({
    url: 'rfid/insertOrUpdate',
    method: 'post',
    data
  })
}
//RFID删除
export function rfidDelete(data) {
  return request({
    url: 'rfid/delete',
    method: 'post',
    data
  })
}
//作业点列表
export function jobList(data) {
  return request({
    url: 'operatePoint/getList',
    method: 'post',
    data
  })
}
//作业点新增
export function jobAdd(data) {
  return request({
    url: 'operatePoint/insertOrUpdate',
    method: 'post',
    data
  })
}
//作业点删除
export function jobDel(data) {
  return request({
    url: 'operatePoint/delete',
    method: 'post',
    data
  })
}
//根据公司查所属工厂列表下拉框
export function factory(data) {
  return request({
    url: 'factory/getFactoryByCompanyId',
    method: 'post',
    data
  })
}
//根据工厂查所属仓库列表下拉框
export function wareHouse(data) {
  return request({
    url: 'wareHouse/getWareHouseByFactoryId',
    method: 'post',
    data
  })
}
//角色list
export function roleList(data) {
  return request({
    url: 'role/query/all',
    method: 'post',
    data
  })
}
//角色新增web权限树
export function allMenu(data) {
  return request({
    url: 'auth/getAllMenu',
    method: 'post',
    data
  })
}
//角色新增app权限树
export function activities(data) {
  return request({
    url: 'auth/getActivities',
    method: 'post',
    data
  })
}
//角色新增修改
export function roleUpdate(data) {
  return request({
    url: 'role/insertOrUpdate',
    method: 'post',
    data
  })
}
//角色删除
export function roleDelete(data) {
  return request({
    url: 'role/delete',
    method: 'post',
    data
  })
}
//角色信息获取
export function roleInfo(data) {
  return request({
    url: 'role/getRoleInfo',
    method: 'post',
    data
  })
}
//人员权限管理列表
export function userListInfo(data) {
  return request({
    url: 'user/query/systemInfo',
    method: 'post',
    data
  })
}
//库内人员    人员能级列表
export function energyInfo(data) {
  return request({
    url: '/user/query/energyInfo',
    method: 'post',
    data
  })
}
//人员权限管-tree
export function getTreeList(data) {
  return request({
    url: 'division/getTreeList',
    method: 'post',
    data
  })
}
//人员权限管-tree启用禁用
export function userStatu(data) {
  return request({
    url: 'user/updateUserAuthInfo',
    method: 'post',
    data
  })
}
//人员权限管-tree 作业点
export function userWorkLocation(data) {
  return request({
    url: 'user/setUserWorkLocation',
    method: 'post',
    data
  })
}
//人员权限管-tree 角色
export function userRole(data) {
  return request({
    url: 'user/setUserRole',
    method: 'post',
    data
  })
}
//人员权限管-tree 角色作业点查询
export function userRoleLocation(data) {
  return request({
    url: 'user/getUserRoleLocation',
    method: 'post',
    data
  })
}
//人员权限管-信用列表查询
export function userCredit(data) {
  return request({
    url: 'user/query/all',
    method: 'post',
    data
  })
}
//人员权限管-信用新增
export function userAdd(data) {
  return request({
    url: 'user/addUserIllegalInfo',
    method: 'post',
    data
  })
}
//人员权限管-信用删除
export function userDelete(data) {
  return request({
    url: 'user/delete',
    method: 'post',
    data
  })
}
//人员权限管-启用禁用
export function updateUserBlack(data) {
  return request({
    url: 'user/updateUserBlackList',
    method: 'post',
    data
  })
}
//RFID编号
export function rfidGetList(data) {
  return request({
    url: 'rfid/getList',
    method: 'post',
    data
  })
}
//人员能级管理导出
export function downloadUserEnergyInfo(data) {
  return request({
    url: 'user/downloadUserEnergyInfo',
    method: 'post',
    data
  })
}
//系统用户导出
export function systemInfoExcel(data) {
  return request({
    url: 'user/downloadUserSystemInfo',
    method: 'post',
    data
  })
}
//事故信息导出
export function webExportUserAccInfo(data) {
  return request({
    url: 'abnormal/webExportUserAccInfo',
    method: 'post',
    data
  })
}
//事故信息导出
export function downloadUserTrainList(data) {
  return request({
    url: 'user/downloadUserTrainList',
    method: 'post',
    data
  })
}
//操作信息导出
export function serviceExport(data) {
  return request({
    url: '/service/task/service/info/export',
    method: 'post',
    data
  })
}
// ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// ----------------------------------------------------------------事业部Api
//事业部（列表表格删除）
export function divisionDeleteApi(data) {
  return request({
    url: 'division/delete',
    method: 'post',
    data
  })
}
//事业部（新增）
export function divisionInsertApi(data) {
  return request({
    url: 'division/insert',
    method: 'post',
    data
  })
}
//事业部（列表）
export function divisionAll(data) {
  return request({
    url: 'division/query/all',
    method: 'post',
    data
  })
}
//事业部（根据ID查询详情）
export function divisiongetById(data) {
  return request({
    url: 'division/getById',
    method: 'post',
    data
  })
}
//事业部（修改信息）
export function divisionUpdate(data) {
  return request({
    url: 'division/update',
    method: 'post',
    data
  })
}
// ----------------------------------------------------------------公司管理Api
//公司（列表查询）
export function companyQuerryAllApi(data) {
  return request({
    url: 'company/query/all',
    method: 'post',
    data
  })
}
//公司（详情查询）
export function companyGetByIdApi(data) {
  return request({
    url: 'company/getById',
    method: 'post',
    data
  })
}
//公司（根据事业部查询公司）
export function getCompanyByDivisionIdApi(data) {
  return request({
    url: 'company/getCompanyByDivisionId',
    method: 'post',
    data
  })
}
//公司（新增）
export function companyInsertApi(data) {
  return request({
    url: 'company/insert',
    method: 'post',
    data
  })
}
//公司（删除）
export function companyDeleteApi(data) {
  return request({
    url: 'company/delete',
    method: 'post',
    data
  })
}
//公司（更新）
export function companyUpdateApi(data) {
  return request({
    url: 'company/update',
    method: 'post',
    data
  })
}
// ----------------------------------------------------------------工厂管理Api
//工厂（列表查询）
export function factoryQuerryAllApi(data) {
  return request({
    url: 'factory/query/all',
    method: 'post',
    data
  })
}
//工厂（详情查询）
export function factoryGetByIdApi(data) {
  return request({
    url: 'factory/getById',
    method: 'post',
    data
  })
}
//工厂（from查询-根据公司查询工厂）
export function getFactoryByCompanyIdApi(data) {
  return request({
    url: 'factory/getFactoryByCompanyId',
    method: 'post',
    data
  })
}
//工厂（新增）
export function factoryInsertApi(data) {
  return request({
    url: 'factory/insert',
    method: 'post',
    data
  })
}
//工厂（删除）
export function factoryDeleteApi(data) {
  return request({
    url: 'factory/delete',
    method: 'post',
    data
  })
}
//工厂（更新）
export function factoryUpdateApi(data) {
  return request({
    url: 'factory/update',
    method: 'post',
    data
  })
}
// ----------------------------------------------------------------仓库管理Api
//仓库（列表查询）
export function wareHouseQuerryAllApi(data) {
  return request({
    url: 'wareHouse/query/all',
    method: 'post',
    data
  })
}
//仓库（名称-下拉列表）
export function wareHouseNameAllApi(data) {
  return request({
    url: 'wareHouse/queryAll',
    method: 'post',
    data
  })
}
//仓库（详情查询）
export function wareHouseGetByIdApi(data) {
  return request({
    url: 'wareHouse/getById',
    method: 'post',
    data
  })
}
//仓库（初始化新增仓库信息）
export function wareHouseInitApi(data) {
  return request({
    url: 'wareHouse/init',
    method: 'post',
    data
  })
}
//仓库（from查询）
export function getwareHouseByDivisionIdApi(data) {
  return request({
    url: 'wareHouse/getwareHouseByDivisionId',
    method: 'post',
    data
  })
}
//仓库（新增）
export function wareHouseInsertApi(data) {
  return request({
    url: 'wareHouse/insert',
    method: 'post',
    data
  })
}
//仓库（删除）
export function wareHouseDeleteApi(data) {
  return request({
    url: 'wareHouse/delete',
    method: 'post',
    data
  })
}
//仓库（更新）
export function wareHouseUpdateApi(data) {
  return request({
    url: 'wareHouse/update',
    method: 'post',
    data
  })
}
//仓库（更新仓库大门列表信息）
export function wareHouseDoorApi(data) {
  return request({
    url: 'wareHouse/updateDoor',
    method: 'post',
    data
  })
}
//仓库（更新仓库功能区列表信息）
export function wareHouseAreaApi(data) {
  return request({
    url: 'wareHouse/updateFunctionArea',
    method: 'post',
    data
  })
}
//仓库 （根据仓库Id查询功能区列表）
export function wareHouseAreaListByTsWareHouse(data) {
  return request({
    url: 'wareHouse/getFunctionAreaListByTsWareHouseId',
    method: 'post',
    data
  })
}
