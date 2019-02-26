import request from "./axios";
let  zhushi = [
  {
    "code": "storage_status",
    "name": "库位状态",
  },
  {
    "code": "rfid_type",
    "name": "RFID 类型",
  },
  {
    "code": "rfid_direction",
    "name": "RFID方向",
  },
  {
    "code": "criminal_type",
    "name": "违规类型",
  },
  {
    "code": "warehouse_type",
    "name": "仓库类型",
  },
  {
    "code": "storage_type",
    "name": "仓储类型",
  },
  {
    "code": "accurate_reservoir_models",
    "name": "准储车型",
  },
  {
    "code": "site_type",
    "name": "场地类型",
  },
  {
    "code": "sales_area",
    "name": "销售区域",
  },
  {
    "code": "vehicle_type_level",
    "name": "车型级",
  },
  {
    "code": "transportation_mode2",
    "name": "运输类型2",
  },
  {
    "code": "aptitude_type",
    "name": "资质",
  },
  {
    "code": "operation_type",
    "name": "作业点类型",
  },
  {
    "code": "accident_type",
    "name": "事故类型",
  },
  {
    "code": "accident_responsibility",
    "name": "事故责任",
  },
  {
    "code": "department",
    "name": "部门（服务商）",
  },
  {
    "code": "section",
    "name": "工段（服务商）",
  },
  {
    "code": "team",
    "name": "班组（服务商）",
  },
  {
    "code": "post",
    "name": "岗位（服务商）",
  },
  {
    "code": "belongs_department",
    "name": "部门（主机厂）",
  },
  {
    "code": "belongs_office",
    "name": "科室（主机厂）",
  },
  {
    "code": "belongs_thigh",
    "name": "股（主机厂）",
  },
  {
    "code": "color",
    "name": "颜色",
  },
  {
    "code": "drive_mode",
    "name": "驱动方式",
  },
  {
    "code": "vehicle_type",
    "name": "车型",
  },
  {
    "code": "vehicle_category",
    "name": "车辆种类",
  },
  {
    "code": "point_location",
    "name": "点位信息",
  },
  {
    "code": "window_status",
    "name": "窗口状态",
  },
  {
    "code": "plan_status",
    "name": "计划状态",
  },
  {
    "code": "is_dekete",
    "name": "是否删除",
  },
  {
    "code": "yes_or_no",
    "name": "是否判断",
  },
  {
    "code": "warehouse_code",
    "name": "仓库代码",
  },
  {
    "code": "functional_zone",
    "name": "功能区",
  },
  {
    "code": "plan_type",
    "name": "计划类型",
  },
  {
    "code": "transport_way",
    "name": "运输方式",
  },
  {
    "code": "create_type",
    "name": "计划来源",
  },
  {
    "code": "activity_status",
    "name": "活动状态",
  },
  {
    "code": "belongs_section",
    "name": "工段（主机厂）",
  },
  {
    "code": "belongs_team",
    "name": "班组（主机厂）",
  },
  {
    "code": "belongs_post",
    "name": "岗位（主机厂）",
  },
  {
    "code": "repair_site",
    "name": "返修地点",
  },
  {
    "code": "window_status",
    "name": "窗口状态",
  },
  {
    "code": "window_status_inform",
    "name": "通知车辆窗口状态",
  }
]
export function Init() {
  let data = {list: ["stock_type","window_status","window_status_inform","handover_list","data_sources","repair_site","repair_method", "storage_status", "rfid_type", "rfid_direction", "criminal_type", "warehouse_type", "storage_type", "accurate_reservoir_models", "site_type", "sales_area", "vehicle_type_level", "transportation_mode2", "aptitude_type", "operation_type", "accident_type", "accident_responsibility", "department", "section", "team", "post", "belongs_department", "belongs_office", "belongs_thigh", "color", "drive_mode", "vehicle_type", "vehicle_category", "point_location", "plan_status", "is_dekete", "yes_or_no", "warehouse_code", "functional_zone", "plan_type", "transport_way", "create_type", "activity_status", "belongs_section", "belongs_team", "belongs_post"]}
  return request({
    url: 'dataDic/getByCodeList',
    method: 'post',
    data
  })
}
