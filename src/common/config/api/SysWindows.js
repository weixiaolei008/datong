import request from './../axios'

//4S店返修车辆窗口计划--列表--查询
export function loadSshopPlanList(data) {
  return request({
    url: 'service/window/fours/queryWindow',
    method: 'post',
    data
  })
}
//4S店返修车辆窗口计划--确认收车
export function loadSshopPlanReceiveCar(data) {
  return request({
    url: 'service/window/fours/receiveCar',
    method: 'post',
    data
  })
}
//4S店返修车辆窗口计划--通知提车
export function loadSshopPlanDeliveryCar(data) {
  return request({
    url: 'service/window/fours/deliveryCar',
    method: 'post',
    data
  })
}
//4S店返修车辆窗口计划--导出
export function loadSshopPlanExport(data) {
  return request({
    url: 'service/window/fours/exportWindow',
    method: 'post',
    data
  })
}
//4S店返修车辆历史查询--导出
export function loadSshopPlanQueryHistoryExport(data) {
  return request({
    url: 'service/window/fours/exportHistoryWindow',
    method: 'post',
    data
  })
}
//---------------------------------------------二次报交返修车辆返修窗口-----------------------------

///二次报交返修车辆返修窗口--列表--查询
export function loadTwicePlanList(data) {
  return request({
    url: 'service/window/twice/queryWindow',
    method: 'post',
    data
  })
}
//二次报交返修车辆返修窗口--导出
export function loadTwicePlanExportWindow(data) {
  return request({
    url: 'service/window/twice/exportWindow',
    method: 'post',
    data
  })
}
//二次报交返修车辆返修窗口--通知提车
export function loadTwicePlanDeliveryCar(data) {
  return request({
    url: 'service/window/twice/deliveryCar',
    method: 'post',
    data
  })
}
//二次报交返修车辆返修窗口--确认收车
export function loadTwicePlanReceiveCar(data) {
  return request({
    url: 'service/window/twice/receiveCar',
    method: 'post',
    data
  })
}
//二次报交历史查询--导出
export function loadTwiceQueryExportHistoryWindow(data) {
  return request({
    url: 'service/window/twice/exportHistoryWindow',
    method: 'post',
    data
  })
}
//---------------------------------------------质损返修车辆返修窗口-----------------------------
///质损返修车辆返修窗口--列表--查询
export function loadLossPlanList(data) {
  return request({
    url: 'service/window/massloss/select',
    method: 'post',
    data
  })
}
//质损返修车辆返修窗口--导出
export function loadLossPlanExportWindow(data) {
  return request({
    url: 'service/window/massloss/export',
    method: 'post',
    data
  })
}
//质损返修车辆返修窗口--创建计划
export function loadLossPlanMasslossAdd(data) {
  return request({
    url: 'service/plan/massloss/add',
    method: 'post',
    data
  })
}
//质损返修车辆返修窗口--通知提车
export function loadLossPlanDeliveryCar(data) {
  return request({
    url: 'service/window/massloss/extractCar',
    method: 'post',
    data
  })
}
//质损返修车辆返修窗口--确认收车
export function loadLossPlanReceiveCar(data) {
  return request({
    url: 'service/window/massloss/receiveCar',
    method: 'post',
    data
  })
}
//---------------------------------------------批量返修车辆返修窗口-----------------------------
///批量返修车辆返修窗口--列表--查询
export function loadBatchPlanList(data) {
  return request({
    url: 'service/window/batchrepair/select',
    method: 'post',
    data
  })
}
//批量返修车辆返修窗口--导出
export function loadBatchPlanExportWindow(data) {
  return request({
    url: 'service/window/batchrepair/export',
    method: 'post',
    data
  })
}
//批量返修车辆返修窗口--导入
export function loadBatchPlanExportInWindow(data) {
  return request({
    url: 'service/window/batchrepair/import',
    method: 'post',
    data
  })
}
//批量返修车辆返修窗口--通知提车
export function loadBatchPlanDeliveryCar(data) {
  return request({
    url: 'service/window/batchrepair/extractCar',
    method: 'post',
    data
  })
}
//批量返修车辆返修窗口--确认收车
export function loadBatchPlanReceiveCar(data) {
  return request({
    url: 'service/window/batchrepair/receiveCar',
    method: 'post',
    data
  })
}
//批量返修车辆返修--创建计划
export function loadBatchAdd(data) {
  return request({
    url: 'service/window/batchrepair/add',
    method: 'post',
    data
  })
}
//批量返修车辆返修--删除
export function loadBatchDelete(data) {
  return request({
    url: 'service/window/batchrepair/delete',
    method: 'post',
    data
  })
}
//---------------------------------------------领用车窗口-----------------------------
//领用窗口接收车辆查询
export function receivecarList(data) {
  return request({
    url: 'service/window/receivecar/select',
    method: 'post',
    data
  })
}
//领用窗口接受车辆新增
export function receivecarAdd(data) {
  return request({
    url: 'service/window/receivecar/add',
    method: 'post',
    data
  })
}
//领用窗口接受车辆修改
export function receivecarUpdateVin(data) {
  return request({
    url: 'service/window/receivecar/updateVin',
    method: 'post',
    data
  })
}
//领用窗口接收车辆删除
export function receivecarDelete(data) {
  return request({
    url: 'service/window/receivecar/delete',
    method: 'post',
    data
  })
}
//领用窗口接收车辆--接收车辆按钮
export function receiveCar(data) {
  return request({
    url: 'service/window/receivecar/receiveCar',
    method: 'post',
    data
  })
}
//领用窗口仓库下拉
export function wareHouse(data) {
  return request({
    url: 'wareHouse/query/all',
    method: 'post',
    data
  })
}
//领用窗口导出
export function receivecarExport(data) {
  return request({
    url: 'service/window/receivecar/export',
    method: 'post',
    responseType: 'blob',
		data
  })
}
//领用窗口通知提车
export function extractCar(data) {
  return request({
    url: 'service/window/receivecar/extractCar',
    method: 'post',
    data
  })
}
//领用窗口 ---- 导出
export function exportExcel(data) {
  return request({
    url: 'service/window/receivecar/export',
    method: 'post',
    data
  })
}
//领用窗口 ---- 导入
export function receivecarImport(data) {
  return request({
    url: 'service/window/receivecar/import',
    method: 'post',
    data
  })
}
//------------------------------------------------------------------------------氢能源---------------------------------------------计划，历史
//氢能源---删除
export function hydPhDeleteApi(data) {
  return request({
    url: 'service/wiondow/windowHydrogenvehicle/deletePlan',
    method: 'post',
    data
  })
}
//氢能源---计划导出
export function hydPlanExportApi(data) {
  return request({
    url: 'service/wiondow/windowHydrogenvehicle/exportWindow',
    method: 'post',
    data
  })
}
//氢能源---计划导入
export function hydPlanInportApi(data) {
  return request({
    url: 'service/wiondow/windowHydrogenvehicle/importPlan',
    method: 'post',
    data
  })
}
//氢能源---计划列表
export function hydQPlanueryAllApi(data) {
  return request({
    url: 'service/wiondow/windowHydrogenvehicle/select',
    method: 'post',
    data
  })
}
//氢能源---计划创建
export function hydCreateAllApi(data) {
  return request({
    url: 'service/wiondow/windowHydrogenvehicle/insert',
    method: 'post',
    data
  })
}
//氢能源---修改
export function hydUpdateAllApi(data) {
  return request({
    url: 'service/wiondow/windowHydrogenvehicle/updatePlan',
    method: 'post',
    data
  })
}
//氢能源---计划氢能源窗口提车
export function hydLiftCarApi(data) {
  return request({
    url: 'service/wiondow/windowHydrogenvehicle/liftCarPlan',
    method: 'post',
    data
  })
}
//氢能源---计划氢能源窗口接车
export function hydReceiveCarApi(data) {
  return request({
    url: 'service/wiondow/windowHydrogenvehicle/receiveCar',
    method: 'post',
    data
  })
}
//氢能源---历史导出
export function hydHistoryExportApi(data) {
  return request({
    url: 'service/wiondow/windowHydrogenvehicle/exportHistoryWindow',
    method: 'post',
    data
  })
}
//氢能源---历史氢能源历史计划条件查询
export function hydHistoryListApi(data) {
  return request({
    url: 'service/wiondow/windowHydrogenvehicle/selectHistory',
    method: 'post',
    data
  })
}
//------------------------------------------------------------------------------房车窗口---------------------------------------------计划，历史
//房车---删除
export function rvWdroDeleteApi(data) {
  return request({
    url: 'service/window/windowTouringcar/deletePlan',
    method: 'post',
    data
  })
}
//房车---计划导出
export function rvPlanExportApi(data) {
  return request({
    url: 'service/window/windowTouringcar/exportWindow',
    method: 'post',
    data
  })
}
//房车---计划导入
export function rvPlanImportApi(data) {
  return request({
    url: 'service/window/windowTouringcar/importPlan',
    method: 'post',
    data
  })
}
//房车---计划创建
export function rvPlanCreateApi(data) {
  return request({
    url: 'service/window/windowTouringcar/insert',
    method: 'post',
    data
  })
}
//房车---更改
export function rvPlanUpdateApi(data) {
  return request({
    url: 'service/window/windowTouringcar/updatePlan',
    method: 'post',
    data
  })
}
//房车---计划列表条件查询
export function rvPlanListApi(data) {
  return request({
    url: 'service/window/windowTouringcar/select',
    method: 'post',
    data
  })
}
//房车---房车窗口接车计划
export function rvReceiveCarApi(data) {
  return request({
    url: 'service/window/windowTouringcar/receiveCar',
    method: 'post',
    data
  })
}
//房车---历史房车历史计划条件查询
export function rvHistoryListApi(data) {
  return request({
    url: 'service/window/windowTouringcar/selectHistory',
    method: 'post',
    data
  })
}
//房车---历史导出
export function rvHistoryExportApi(data) {
  return request({
    url: 'service/window/windowTouringcar/exportHistoryWindow',
    method: 'post',
    data
  })
}
//------------------------------------------------------------------------------Svo---------------------------------------------计划，历史
//svo---列表查询
export function svoPlanListApi(data) {
  return request({
    url: 'service/window/svo/queryall',
    method: 'post',
    data
  })
}
//svo---导出
export function svoPlanExportApi(data) {
  return request({
    url: 'service/window/svo/export',
    method: 'post',
    data
  })
}
//svo---导入
export function svoPlanImportApi(data) {
  return request({
    url: 'service/window/svo/import',
    method: 'post',
    data
  })
}
//创建-编辑
export function svoPlanCreateApi(data) {
  return request({
    url: 'service/window/svo/create',
    method: 'post',
    data
  })
}
//接收车辆
export function svoPlanReceivecarApi(data) {
  return request({
    url: 'service/window/svo/receivecar',
    method: 'post',
    data
  })
}
//通知提车
export function svoPlanDeliveryCarApi(data) {
  return request({
    url: 'service/window/svo/deliveryCar',
    method: 'post',
    data
  })
}
//计划-删除
export function svoPlanDeleteApi(data) {
  return request({
    url: 'service/window/svo/delete',
    method: 'post',
    data
  })
}
//svo---历史列表查询
export function svoHistoryListApi(data) {
  return request({
    url: 'service/window/svo/queryallhistory',
    method: 'post',
    data
  })
}
//svo---历史导出
export function svoPlanHidtoryExportApi(data) {
  return request({
    url: 'service/window/svo/exporthistory',
    method: 'post',
    data
  })
}
//------------------------------------------------------------------------------Ppo---------------------------------------------计划，历史
//ppo---计划列表查询
export function ppoPlanListApi(data) {
  return request({
    url: 'service/window/ppo/queryall',
    method: 'post',
    data
  })
}
//ppo---创建或编辑
export function ppoPlanCreateApi(data) {
  return request({
    url: 'service/window/ppo/create',
    method: 'post',
    data
  })
}
//ppo---删除
export function ppoPlanDeleteApi(data) {
  return request({
    url: 'service/window/ppo/delete',
    method: 'post',
    data
  })
}
//ppo---通知提车
export function ppoPlanDeliveryCarApi(data) {
  return request({
    url: 'service/window/ppo/deliveryCar',
    method: 'post',
    data
  })
}
//ppo---导出（计划）
export function ppoPlanExportApi(data) {
  return request({
    url: 'service/window/ppo/export',
    method: 'post',
    data
  })
}
//ppo---导入（计划）
export function ppoPlanImportApi(data) {
  return request({
    url: 'service/window/ppo/import',
    method: 'post',
    data
  })
}
//ppo---接收车辆
export function ppoPlanReceivecarApi(data) {
  return request({
    url: 'service/window/ppo/receivecar',
    method: 'post',
    data
  })
}
//ppo---历史列表查询
export function ppoHistoryListApi(data) {
  return request({
    url: 'service/window/ppo/queryallhistory',
    method: 'post',
    data
  })
}
//ppo---导出（历史）
export function ppoPlanExportHistoryApi(data) {
  return request({
    url: 'service/window/ppo/exporthistory',
    method: 'post',
    data
  })
}
//-----------------------------------------------------------------------------缺件车窗口（出库）---------------------------------------------计划，历史
//缺件---计划列表查询
export function lostPlandListApi(data) {
  return request({
    url: 'service/window/lack/select',
    method: 'post',
    data
  })
}
//缺件---创建或编辑
export function lostPlandCreatApi(data) {
  return request({
    url: 'service/window/lack/add/lack',
    method: 'post',
    data
  })
}
//缺件---删除
export function lostPlandDeleteApi(data) {
  return request({
    url: '/service/window/lack/delete',
    method: 'post',
    data
  })
}
//缺件---接收车辆
export function lostPlandReceivecarApi(data) {
  return request({
    url: 'service/window/lack/reception',
    method: 'post',
    data
  })
}
//缺件---历史查询
export function lostPlandHistoryApi(data) {
  return request({
    url: 'service/window/lack/select/history',
    method: 'post',
    data
  })
}
//缺件---计划导出
export function lostPlandExportApi(data) {
  return request({
    url: 'service/window/lack/export/windowLack',
    method: 'post',
    data
  })
}
//缺件---计划导入
export function lostPlandImportApi(data) {
  return request({
    url: 'service/window/lack/import',
    method: 'post',
    data
  })
}
//缺件---历史导出
export function lostHistoryExportApi(data) {
  return request({
    url: 'service/window/lack/export/windowHistory',
    method: 'post',
    data
  })
}
//------------------------------------------------------------------------------库改车辆窗口（出库）---------------------------------------------
//库改车辆窗口（出库)---计划条件查询
export function garaQuSelectApi(data) {
  return request({
    url: 'service/window/windowRefitcar/select',
    method: 'post',
    data
  })
}
//库改车辆窗口（出库)---删除计划
export function garaQuDeleteApi(data) {
  return request({
    url: 'service/window/windowRefitcar/deletePlan',
    method: 'post',
    data
  })
}
//库改车辆窗口（出库)---计划导出
export function garaQuExportWindowApi(data) {
  return request({
    url: 'service/window/windowRefitcar/exportWindow',
    method: 'post',
    data
  })
}
//库改车辆窗口（出库)---计划导入
export function garaQuImportWindowApi(data) {
  return request({
    url: 'service/window/windowRefitcar/importPlan',
    method: 'post',
    data
  })
}
//库改车辆窗口（出库)---创建库改车辆出库计划
export function garaQuInsertApi(data) {
  return request({
    url: 'service/window/windowRefitcar/insert',
    method: 'post',
    data
  })
}
//库改车辆窗口（出库)---提车计划
export function garaQuLiftCartApi(data) {
  return request({
    url: 'service/window/windowRefitcar/liftCarPlan',
    method: 'post',
    data
  })
}
//库改车辆窗口（出库)---接车计划
export function garaQuReceiveCartApi(data) {
  return request({
    url: 'service/window/windowRefitcar/receiveCar',
    method: 'post',
    data
  })
}
//库改车辆窗口（出库)---改VIN
export function garaQuUpdateApi(data) {
  return request({
    url: 'service/window/windowRefitcar/updatePlan',
    method: 'post',
    data
  })
}
//库改车辆窗口（出库)---历史计划条件查询
export function garaQuSelectHistoryApi(data) {
  return request({
    url: 'service/window/windowRefitcar/selectHistory',
    method: 'post',
    data
  })
}
//库改车辆窗口（出库)---历史计划导出
export function garaEdExportHistoryWindowApi(data) {
  return request({
    url: 'service/window/windowRefitcar/exportHistoryWindow',
    method: 'post',
    data
  })
}
//上传附件—（图片）
export function uploadImg(data) {
  return request({
    url: '/file/nfs/uploadImg',
    method: 'post',
    data
  })
}
//------------------------------------------------------------------------------PDI车辆返修窗口---------------------------------------------
//PDI---pdi返修窗口导出
export function pdiPlanExpoetApi(data) {
  return request({
    url: 'service/window/pdi/export',
    method: 'post',
    data
  })
}
//PDI---pdi返修窗口通知提车
export function pdiPlanExtractCarApi(data) {
  return request({
    url: '/service/window/pdi/extractCar',
    method: 'post',
    data
  })
}
//PDI---pdi返修窗口接收车辆
export function pdiPlanReceiveCarApi(data) {
  return request({
    url: '/service/window/pdi/receiveCar',
    method: 'post',
    data
  })
}
//PDI---pdi返修窗口分页查询
export function pdiPlanSelectApi(data) {
  return request({
    url: '/service/window/pdi/select',
    method: 'post',
    data
  })
}
