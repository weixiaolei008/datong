import request from './../axios'
//-----------------------------------打印单
export function loadPrintList(data) {
  return request({
    url: 'service/plan/handoverList/select',
    method: 'post',
    data
  })
}
export function updatePrintList(data) {
  return request({
    url: 'service/plan/handoverList/updateList',
    method: 'post',
    data
  })
}
export function delPrintList(data) {
  return request({
    url: 'service/plan/handoverList/deleteList',
    method: 'post',
    data
  })
}
export function importPrintList(data) {
  return request({
    url: 'service/plan/handoverList/importList',
    method: 'post',
    data
  })
}
export function exportPrintList(data) {
  return request({
    url: 'service/plan/handoverList/exportList',
    method: 'post',
    data
  })
}
//车辆入库计划管理-列表
export function loadCarInStorage(data) {
  return request({
    url: 'service/inbound/select',
    method: 'post',
    data
  })
}
//车辆入库计划管理-导出
export function exportCarInStorage(data) {
  return request({
    url: 'service/inbound/export',
    method: 'post',
    data
  })
}
//銷售車導入
export function importSaleCar(data) {
  return request({
    url: 'service/inbound/import',
    method: 'post',
    data
  })
}
//----------------------------------------国内车/海外车未创建-列表--------------------
export function delCarOutStorage(data) {
  return request({
    url: 'service/outbound/delete/advancePlan',
    method: 'post',
    data
  })
}

export function importCarOutStorage(data) {
  return request({
    url: 'service/outbound/import',
    method: 'post',
    data
  })
}
export function loadCarOutStorageN(data) {
  return request({
    url: 'service/outbound/select/notCreate',
    method: 'post',
    data
  })
}
//国内车/海外车未创建-导出
export function exportDomesticN(data) {
  return request({
    url: 'service/outbound/export/advanceInland',
    method: 'post',
    data
  })
}
export function exportOverseasCarN(data) {
  return request({
    url: 'service/outbound/export/advanceOversea',
    method: 'post',
    data
  })
}
//国内车已创建-列表
export function loadDomesticY(data) {
  return request({
    url: 'service/outbound/select/createdInland',
    method: 'post',
    data
  })
}
//国内车已创建-导出
export function exportDomesticY(data) {
  return request({
    url: 'service/outbound/export/createdInland',
    method: 'post',
    data
  })
}
//国内车创建计划
export function creatDomesticPlan(data) {
  return request({
    url: 'service/outbound/add/inland',
    method: 'post',
    data
  })
}
//海外车已创建-列表
export function loadOverseasCarY(data) {
  return request({
    url: 'service/outbound/select/createdOversea',
    method: 'post',
    data
  })
}
//海外车已创建-导出
export function exportOverseasCarY(data) {
  return request({
    url: 'service/outbound/export/createdOversea',
    method: 'post',
    data
  })
}
//海外车创建计划
export function creatOverseaPlan(data) {
  return request({
    url: 'service/outbound/add/oversea',
    method: 'post',
    data
  })
}
//出库计划删除-公用
export function delOutStorage(data) {
  return request({
    url: 'service/outbound/delete',
    method: 'post',
    data
  })
}
export function holdOutStorage(data) {
  return request({
    url: 'service/outbound/isHold',
    method: 'post',
    data
  })
}
export function holdOutStorageN(data) {
  return request({
    url: 'service/outbound/cancelHold',
    method: 'post',
    data
  })
}

//-----------------------------------------缺件车出库-列表--------------------------
export function loadLackCarOutN(data) {
  return request({
    url: 'service/outbound/select/advanceLack',
    method: 'post',
    data
  })
}
export function exportLackCarOutN(data) {
  return request({
    url: 'service/outbound/export/advanceLack',
    method: 'post',
    data
  })
}
export function loadLackCarOut(data) {
  return request({
    url: 'service/outbound/select/lack',
    method: 'post',
    data
  })
}
//缺件车出库-导出
export function exportLackCarOut(data) {
  return request({
    url: 'service/outbound/export/lack',
    method: 'post',
    data
  })
}
export function creatLackCarOut(data) {
  return request({
    url: 'service/outbound/create/lack',
    method: 'post',
    data
  })
}
//-----------------------------------------房车计划----------------------------------
export function importHomeCar(data) {
  return request({
    url: 'service/plan/planTouringcar/importPlan',
    method: 'post',
    data
  })
}
export function loadHomeCar(data) {
  return request({
    url: 'service/plan/planTouringcar/select',
    method: 'post',
    data
  })
}
export function exportHomeCar(data) {
  return request({
    url: 'service/plan/planTouringcar/exportPlan',
    method: 'post',
    data
  })
}
export function creatHomeCar(data) {
  return request({
    url: 'service/plan/planTouringcar/insert',
    method: 'post',
    data
  })
}
export function delHomeCar(data) {
  return request({
    url: 'service/plan/planTouringcar/deletePlan',
    method: 'post',
    data
  })
}
export function holdHomeCar(data) {
  return request({
    url: 'service/plan/planTouringcar/isHold',
    method: 'post',
    data
  })
}

//-----------------------------------------库改车出库-列表--------------------------
export function loadChangeCarOut(data) {
  return request({
    url: 'service/plan/planRefitcar/select',
    method: 'post',
    data
  })
}
export function exportChangeCarOut(data) {
  return request({
    url: 'service/plan/planRefitcar/exportPlan',
    method: 'post',
    data
  })
}
export function creatChangeCarOut(data) {
  return request({
    url: 'service/plan/planRefitcar/insert',
    method: 'post',
    data
  })
}
export function delChangeCarOut(data) {
  return request({
    url: 'service/plan/planRefitcar/deletePlan',
    method: 'post',
    data
  })
}
// ---------------------------------------库内作业-车辆维保----------------------------------
//库内导入胡传杰
export function importHuN(data) {
  return request({
    url: 'service/plan/repertory/import',
    method: 'post',
    data
  })
}

export function loadCarMaintenanceN(data) {
  return request({
    url: 'service/plan/repertory/maintainprequery',
    method: 'post',
    data
  })
}
export function loadCarMaintenanceY(data) {
  return request({
    url: 'service/plan/repertory/maintainquery',
    method: 'post',
    data
  })
}
export function exportCarMaintenanceN(data) {
  return request({
    url: 'service/plan/repertory/exportmaintainpreplan',
    method: 'post',
    data
  })
}
export function exportCarMaintenanceY(data) {
  return request({
    url: 'service/plan/repertory/exportmaintainplan',
    method: 'post',
    data
  })
}
// ----------------------------------------库内作业-车辆清洗----------------------------------
export function loadCarWashN(data) {
  return request({
    url: 'service/plan/repertory/cleanprequery',
    method: 'post',
    data
  })
}
export function loadCarWashY(data) {
  return request({
    url: 'service/plan/repertory/cleanquery',
    method: 'post',
    data
  })
}
export function exportCarWashN(data) {
  return request({
    url: 'service/plan/repertory/exportcleanpreplan',
    method: 'post',
    data
  })
}
export function exportCarWashY(data) {
  return request({
    url: 'service/plan/repertory/exportcleanplan',
    method: 'post',
    data
  })
}
export function creatCarWash(data) {
  return request({
    url: 'service/plan/repertory/createplan',
    method: 'post',
    data
  })
}
export function delCarWash(data) {
  return request({
    url: 'service/plan/repertory/deleteplan',
    method: 'post',
    data
  })
}
// --------------------------------------------库内作业-车辆移位------------------------------------
export function loadCarMoveN(data) {
  return request({
    url: 'service/plan/repertory/shiftprequery',
    method: 'post',
    data
  })
}
export function loadCarMoveY(data) {
  return request({
    url: 'service/plan/repertory/shiftquery',
    method: 'post',
    data
  })
}
export function delCarMoveN(data) {
  return request({
    url: 'service/plan/repertory/deleteshiftplan',
    method: 'post',
    data
  })
}
export function exportCarMoveN(data) {
  return request({
    url: 'service/plan/repertory/exportshiftpreplan',
    method: 'post',
    data
  })
}
export function exportCarMoveY(data) {
  return request({
    url: 'service/plan/repertory/exportshiftplan',
    method: 'post',
    data
  })
}
export function creatCarMove(data) {
  return request({
    url: 'service/plan/repertory/createshiftplan',
    method: 'post',
    data
  })
}
// --------------------------------------------库内作业-质损批量返修------------------------------------
export function importLossCarRepair(data) {
  return request({
    url: 'service/plan/massloss/import',
    method: 'post',
    data
  })
}

export function loadLossCarRepair(data) {
  return request({
    url: 'service/plan/massloss/select',
    method: 'post',
    data
  })
}
export function exportLossCarRepair(data) {
  return request({
    url: 'service/plan/massloss/export',
    method: 'post',
    data
  })
}
export function creatLossCarRepair(data) {
  return request({
    url: 'service/plan/massloss/createInWarehouse',
    method: 'post',
    data
  })
}
export function delLossCarRepair(data) {
  return request({
    url: 'service/plan/massloss/delete',
    method: 'post',
    data
  })
}
export function repairLossCar(data) {
  return request({
    url: 'service/plan/massloss/out',
    method: 'post',
    data
  })
}
// 立即修/缓修
export function repairLossCarF(data) {
  return request({
    url: 'service/plan/massloss/updateRepairMothod',
    method: 'post',
    data
  })
}
// --------------------------------------------库内作业-原位移位返修------------------------------------
export function loadfunArea(data) {
  return request({
    url: 'wareHouse/getFunctionAreaListByWareHouseCode',
    method: 'post',
    data
  })
}
//-----原位移位list
export function loadBatchRepair(data) {
  return request({
    url: 'service/plan/batchrepair/select',
    method: 'post',
    data
  })
}
//-----原位移位导出
export function exportBatchRepair(data) {
  return request({
    url: 'service/plan/batchrepair/export',
    method: 'post',
    data
  })
}
//移位创建
export function creatMoveBatchRepair(data) {
  return request({
    url: 'service/plan/batchrepair/createInWarehouseShifting',
    method: 'post',
    data
  })
}
//原位创建
export function creatSituBatchRepair(data) {
  return request({
    url: 'service/plan/batchrepair/createInWarehouseSitu',
    method: 'post',
    data
  })
}


// --------------------------------------------库内作业-pdi------------------------------------
export function loadPdiPlan(data) {
  return request({
    url: 'service/plan/pdi/select',
    method: 'post',
    data
  })
}
export function exportPdiPlan(data) {
  return request({
    url: 'service/plan/pdi/export',
    method: 'post',
    data
  })
}
export function importPdiPlan(data) {
  return request({
    url: 'service/plan/pdi/import',
    method: 'post',
    data
  })
}
export function creatPdiPlan(data) {
  return request({
    url: 'service/plan/pdi/createInWarehouse',
    method: 'post',
    data
  })
}
export function delPdiPlan(data) {
  return request({
    url: 'service/plan/pdi/delete',
    method: 'post',
    data
  })
}
export function repairPdiPlan(data) {
  return request({
    url: 'service/plan/pdi/out',
    method: 'post',
    data
  })
}
export function repairPdiPlanF(data) {
  return request({
    url: 'service/plan/pdi/updateRepairMothod',
    method: 'post',
    data
  })
}
//---------------------------------------------库内4s-------------------------------------------
//4S店库内返修计划--列表 查询
export function loadSshopCune(data) {
  return request({
    url: 'service/plan/foursKuhne/queryPlan',
    method: 'post',
    data
  })
}
export function exportSshopCuneN(data) {
  return request({
    url: 'service/plan/foursKuhne/exportPrePlan',
    method: 'post',
    data
  })
}
export function exportSshopCuneY(data) {
  return request({
    url: 'service/plan/foursKuhne/exportPlan',
    method: 'post',
    data
  })
}
export function creatSshopCune(data) {
  return request({
    url: 'service/plan/foursKuhne/createPlan',
    method: 'post',
    data
  })
}
export function repairSshopCune(data) {
  return request({
    url: 'service/plan/foursKuhne/outBoundPlan',
    method: 'post',
    data
  })
}
export function repairSshopCuneF(data) {
  return request({
    url: 'service/plan/foursKuhne/immediatelyPlan',
    method: 'post',
    data
  })
}
export function repairSshopCuneS(data) {
  return request({
    url: 'service/plan/foursKuhne/postponePlan',
    method: 'post',
    data
  })
}
export function delSshopCune(data) {
  return request({
    url: 'service/plan/foursKuhne/deletePrePlan',
    method: 'post',
    data
  })
}
// -------------------------------------------仓储车辆移库出库计划--vdc-vsc----------------------------------

export function delMoveOut(data) {
  return request({
    url: 'service/plan/warehouse/outbound/deletepreplan',
    method: 'post',
    data
  })
}
export function importVdscN(data) {
  return request({
    url: 'service/plan/warehouse/outbound/import',
    method: 'post',
    data
  })
}

export function loadMoveList(data) {
  return request({
    url: 'service/plan/warehouse/outbound/queryplan',
    method: 'post',
    data
  })
}
export function loadVdcMoveListN(data) {
  return request({
    url: 'service/plan/warehouse/outbound/queryvdcpreplan',
    method: 'post',
    data
  })
}
export function creatMovePlan(data) {
  return request({
    url: 'service/plan/warehouse/outbound/createplan',
    method: 'post',
    data
  })
}
export function delMovePlan(data) {
  return request({
    url: 'service/plan/warehouse/outbound/deleteplan',
    method: 'post',
    data
  })
}
export function exportVscMoveOutN(data) {
  return request({
    url: 'service/plan/warehouse/outbound/vscexportpreplan',
    method: 'post',
    data
  })
}
export function exportVscMoveOutY(data) {
  return request({
    url: 'service/plan/warehouse/outbound/vscexportplan',
    method: 'post',
    data
  })
}
export function exportVdcMoveOutN(data) {
  return request({
    url: 'service/plan/warehouse/outbound/vdcexportpreplan',
    method: 'post',
    data
  })
}
export function exportVdcMoveOutY(data) {
  return request({
    url: 'service/plan/warehouse/outbound/vdcexportplan',
    method: 'post',
    data
  })
}
export function holdVscMoveOut(data) {
  return request({
    url: 'service/plan/warehouse/outbound/hold',
    method: 'post',
    data
  })
}
export function holdVscMoveOutN(data) {
  return request({
    url: 'service/plan/warehouse/outbound/removehold',
    method: 'post',
    data
  })
}

//--------------------------------------------------仓储车辆移库入库计划--vdc-----
export function loadVdcMoveInN(data) {
  return request({
    url: 'service/plan/warehouse/inbound/querypreplan',
    method: 'post',
    data
  })
}
export function exportVdcMoveInN(data) {
  return request({
    url: 'service/plan/warehouse/inbound/exportpreplan',
    method: 'post',
    data
  })
}
export function creatVdcMoveInN(data) {
  return request({
    url: 'service/plan/warehouse/inbound/createplan',
    method: 'post',
    data
  })
}
export function loadVdcMoveIn(data) {
  return request({
    url: 'service/plan/warehouse/inbound/querynewplan',
    method: 'post',
    data
  })
}
export function exportVdcMoveIn(data) {
  return request({
    url: 'service/plan/warehouse/inbound/exportplan',
    method: 'post',
    data
  })
}
//------------------------------------------------4S店返修车辆调拨入库计划--------------------------------------------------------
//4S店返修车辆调拨入库计划--列表
export function loadSshopInList(data) {
  return request({
    url: 'service/plan/fours/queryPlan',
    method: 'post',
    data
  })
}
//4S店返修车辆调拨入库计划--删除
export function loadSshopInDeletePrePlan(data) {
  return request({
    url: 'service/plan/fours/deletePrePlan',
    method: 'post',
    data
  })
}
//4S店返修车辆调拨入库计划--导出
export function loadSshopInExport(data) {
  return request({
    url: 'service/plan/fours/exportPlan',
    method: 'post',
    data
  })
}
//4S店返修车辆调拨入库计划--预计划导出
export function loadSshopInExportPre(data) {
  return request({
    url: 'service/plan/fours/exportPrePlan',
    method: 'post',
    data
  })
}
//4S店返修车辆调拨入库计划--创建计划
export function loadSshopInCreate(data) {
  return request({
    url: 'service/plan/fours/createPlan',
    method: 'post',
    data
  })
}
//4S店返修车辆调拨入库计划--立即修
export function loadSshopImmediatelyPlan(data) {
  return request({
    url: 'service/plan/fours/immediatelyPlan',
    method: 'post',
    data
  })
}
//4S店返修车辆调拨入库计划--缓修
export function loadSshopInpostPonePlan(data) {
  return request({
    url: 'service/plan/fours/postponePlan',
    method: 'post',
    data
  })
}
//------------------------------------------------二次报交车辆计划--------------------------------------------------------
//二次报交车辆计划--列表 --查询
export function loadTwiceInList(data) {
  return request({
    url: 'service/plan/twice/queryPlan',
    method: 'post',
    data
  })
}
//二次报交车辆计划--创建计划
export function loadTwiceInCreate(data) {
  return request({
    url: 'service/plan/twice/createPlan',
    method: 'post',
    data
  })
}
//二次报交车辆计划--导出
export function loadTwiceInExport(data) {
  return request({
    url: 'service/plan/twice/exportPlan',
    method: 'post',
    data
  })
}
//二次报交车辆计划--导出 （预计划）
export function loadTwiceInExportPre(data) {
  return request({
    url: 'service/plan/twice/exportPrePlan',
    method: 'post',
    data
  })
}
//二次报交车辆计划--导入
export function loadTwiceInExportIn(data) {
  return request({
    url: 'service/plan/twice/importPrePlan',
    method: 'post',
    data
  })
}
//二次报交车辆计划--删除
export function loadTwiceInDeletet(data) {
  return request({
    url: 'service/plan/twice/deletePrePlan',
    method: 'post',
    data
  })
}
//------------------------------------------------ PDI车辆返修计划--------------------------------------------------------
//PDI车辆返修计划--列表
export function loadPdiInList(data) {
  return request({
    url: 'service/plan/pdi/select',
    method: 'post',
    data
  })
}
//PDI车辆返修计划--导出
export function loadPdiInExport(data) {
  return request({
    url: 'service/plan/pdi/export',
    method: 'post',
    data
  })
}
//PDI车辆返修计划--导入
export function loadPdiInExportIn(data) {
  return request({
    url: 'service/plan/pdi/import',
    method: 'post',
    data
  })
}
//PDI车辆返修计划--删除
export function loadPdiInDelete(data) {
  return request({
    url: 'service/plan/pdi/delete',
    method: 'post',
    data
  })
}
//PDI车辆返修计划--新增
export function loadPdiOutAdd(data) {
  return request({
    url: 'service/plan/pdi/add',
    method: 'post',
    data
  })
}
//PDI入库车辆返修计划--预创建计划（入库）
export function loadPdiInNCreatInWarehouseForIn(data) {
  return request({
    url: 'service/plan/pdi/createInWarehouseForIn',
    method: 'post',
    data
  })
}
//PDI入库车辆返修计划--预创建计划（出库）
export function loadPdiInNCreatOutWarehouseForOut(data) {
  return request({
    url: 'service/plan/pdi/createOutWarehouseForOut',
    method: 'post',
    data
  })
}
//PDI入库车辆返修计划--立即修/缓修
export function loadPdiInNUpdateRepairMothod(data) {
  return request({
    url: 'service/plan/pdi/updateRepairMothod',
    method: 'post',
    data
  })
}
//------------------------------------------------ 质损车辆返修计划--------------------------------------------------------
//质损车辆返修计划--列表
export function loadLossList(data) {
  return request({
    url: 'service/plan/massloss/select',
    method: 'post',
    data
  })
}
//质损车辆返修计划--导出
export function loadLossExport(data) {
  return request({
    url: 'service/plan/massloss/export',
    method: 'post',
    data
  })
}
//质损车辆返修计划--导入
export function loadLossExportIn(data) {
  return request({
    url: 'service/plan/massloss/import',
    method: 'post',
    data
  })
}
//质损车辆返修计划--删除
export function loadLossDelete(data) {
  return request({
    url: 'service/plan/massloss/delete',
    method: 'post',
    data
  })
}
//质损车辆返修计划--入库创建计划(预计划)
export function loadLossInNCreat(data) {
  return request({
    url: 'service/plan/massloss/createInWarehouseForIn',
    method: 'post',
    data
  })
}
//质损车辆返修计划--出库创建计划(预计划)
export function loadLossOutNCreat(data) {
  return request({
    url: 'service/plan/massloss/createOutWarehouseForOut',
    method: 'post',
    data
  })
}
//质损车辆返修计划--立即修/缓修
export function loadLossUpdateRepairMothod(data) {
  return request({
    url: 'service/plan/massloss/updateRepairMothod',
    method: 'post',
    data
  })
}
//------------------------------------------------ 批量车辆返修计划--------------------------------------------------------
//批量车辆返修计划--列表
export function loadBatchList(data) {
  return request({
    url: 'service/plan/batchrepair/select',
    method: 'post',
    data
  })
}
//批量车辆返修计划--导出
export function loadBatchExport(data) {
  return request({
    url: 'service/plan/batchrepair/export',
    method: 'post',
    data
  })
}
//批量车辆返修计划--删除
export function loadBatchDelete(data) {
  return request({
    url: 'service/plan/batchrepair/delete',
    method: 'post',
    data
  })
}
//批量车辆返修计划--出库创建计划(预计划)
export function loadBatchOutNCreat(data) {
  return request({
    url: 'service/plan/batchrepair/createOutWarehouseForOut',
    method: 'post',
    data
  })
}

//------------------------------------------------------------------------------svo-------------------------------------------------入库、出库
//Svo计划---创建
export function svoCreateApi(data) {
  return request({
    url: 'service/plan/svo/create',
    method: 'post',
    data
  })
}
//Svo计划---导出
export function svoExportApi(data) {
  return request({
    url: 'service/plan/svo/export',
    method: 'post',
    data
  })
}
//Svo计划---计划列表
export function svoQueryAllApi(data) {
  return request({
    url: 'service/plan/svo/queryall',
    method: 'post',
    data
  })
}
//Svo计划---预计划列表
export function svoQueryAllPreApi(data) {
  return request({
    url: 'service/plan/svo/queryallpre',
    method: 'post',
    data
  })
}
//Svo计划---预计划导出
export function svoExportPreApi(data) {
  return request({
    url: 'service/plan/svo/exportpre',
    method: 'post',
    data
  })
}
//------------------------------------------------------------------------------Ppo-------------------------------------------------入库、出库
//Ppo计划---创建
export function ppoCreateApi(data) {
  return request({
    url: 'service/plan/ppo/create',
    method: 'post',
    data
  })
}
//Ppo计划---导出
export function ppoExportApi(data) {
  return request({
    url: 'service/plan/ppo/export',
    method: 'post',
    data
  })
}
//Ppo计划---计划列表
export function ppoQueryAllApi(data) {
  return request({
    url: 'service/plan/ppo/queryall',
    method: 'post',
    data
  })
}
//Ppo计划---预计划列表
export function ppoQueryAllPreApi(data) {
  return request({
    url: 'service/plan/ppo/queryallpre',
    method: 'post',
    data
  })
}
//Ppo计划---预计划导出
export function ppoExportPreApi(data) {
  return request({
    url: 'service/plan/ppo/exportpre',
    method: 'post',
    data
  })
}
//------------------------------------------------------------------------------氢能源---------------------------------------------入库、出库
//氢能源---录入
export function hydInserttApi(data) {
  return request({
    url: 'service/plan/planHydrogenvehicle/insert',
    method: 'post',
    data
  })
}
//氢能源---导出
export function hydExportApi(data) {
  return request({
    url: 'service/plan/planHydrogenvehicle/exportPlan',
    method: 'post',
    data
  })
}
//氢能源---列表查询
export function hydQueryAllApi(data) {
  return request({
    url: 'service/plan/planHydrogenvehicle/select',
    method: 'post',
    data
  })
}
//------------------------------------------------ 领用车辆计划--------------------------------------------------------
//领用车辆出库计划
export function receivecarSelect(data) {
  return request({
    url: '/service/plan/receivecar/select',
    method: 'post',
    data
  })
}
//领用车辆出库计划-创建计划
export function receivecarCreate(data) {
  return request({
    url: '/service/plan/receivecar/create',
    method: 'post',
    data
  })
}
export function receivecarList(data) {
  return request({
    url: '/service/plan/receivecar/select',
    method: 'post',
    data
  })
}
//领用车辆-------导出
export function receivecarExcel(data) {
  return request({
    url: '/service/plan/receivecar/export',
    method: 'post',
    data
  })
}
