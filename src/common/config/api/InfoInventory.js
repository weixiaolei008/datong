import request from './../axios'

//库存看板
export function loadInventoryBoard(data) {
  return request({
    url: 'service/stock/board',
    method: 'post',
    data
  })
}
export function searchInventoryDetail(data) {
  return request({
    url: 'service/stock/board/byVin',
    method: 'post',
    data
  })
}
export function loadInventoryDetail(data) {
  return request({
    url: 'service/stock/detail',
    method: 'post',
    data
  })
}

export function exportInventoryDetail(data) {
  return request({
    url: 'service/stock/detail/export',
    method: 'post',
    data
  })
}
export function updateVin(data) {
  return request({
    url: 'service/stock/detail/change',
    method: 'post',
    data
  })
}
export function getVinList(data) {
  return request({
    url: 'service/stock/board/getVinList',
    method: 'post',
    data
  })
}
export function vdcMove(data) {
  return request({
    url: 'service/plan/warehouse/outbound/createpreplan',
    method: 'post',
    data
  })
}

//库位可视化---工厂
export function factoryAll(data) {
  return request({
    url: 'factory/query/all',
    method: 'post',
    data
  })
}
//库位可视化---仓库
export function wareHouse(data) {
  return request({
    url: 'wareHouse/getWareHouseByFactoryId',
    method: 'post',
    data
  })
}
//库位可视化---区域
export function storageVisualization(data) {
  return request({
    url: 'storageVisualization/init',
    method: 'post',
    data
  })
}
//库位可视化---列表
export function queryStorageList(data) {
  return request({
    url: 'storageVisualization/queryStorageListForVisualization',
    method: 'post',
    data
  })
}
//库位可视化-vin查询
export function queryByStorageLocationNo(data) {
  return request({
    url: 'storageVisualization/queryByStorageLocationNo',
    method: 'post',
    data
  })
}
