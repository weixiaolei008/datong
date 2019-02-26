// 计划管理
const planManage = [
  {
    path: '/PrintList',
    name: '交接单',
    component: () => import('@/view/PlanManage/PrintList')
  },
  {
    path: '/Print',
    name: '打印',
    component: () => import('@/view/PlanManage/Print')
  },
  {
    path: '/NormalCarIn',
    name: '计划管理／车辆入库计划管理／正常车辆下线入库计划',
    component: () => import('@/view/PlanManage/CarInStorage/NormalCarIn')
  },
  {
    path: '/LackCarIn',
    name: '计划管理／车辆入库计划管理／缺件车辆入库计划',
    component: () => import('@/view/PlanManage/CarInStorage/LackCarIn')
  },
  {
    path: '/ChangeCarIn',
    name: '计划管理／车辆入库计划管理／库改车辆入库计划',
    component: () => import('@/view/PlanManage/CarInStorage/ChangeCarIn')
  },
  {
    path: '/SaleCarIn',
    name: '计划管理／车辆退库入库计划管理／销售车辆退库入库计划',
    component: () => import('@/view/PlanManage/CarInStorage/SaleCarIn')
  },
  {
    path: '/DomesticCar',
    name: '计划管理／车辆出库计划管理／国内车出库计划',
    component: () => import('@/view/PlanManage/CarOutStorage/DomesticCar')
  },
  {
    path: '/OverseasCar',
    name: '计划管理／车辆出库计划管理／海外车出库计划',
    component: () => import('@/view/PlanManage/CarOutStorage/OverseasCar')
  },
  {
    path: '/HomeCar',
    name: '计划管理／车辆出库计划管理／房车出库计划',
    component: () => import('@/view/PlanManage/CarOutStorage/HomeCar')
  },
  {
    path: '/LackCarOut',
    name: '计划管理／车辆退工厂计划管理／缺件车辆出库计划',
    component: () => import('@/view/PlanManage/CarOutFactory/LackCarOut')
  },
  {
    path: '/ChangeCarOut',
    name: '计划管理／车辆退工厂计划管理／库改车辆出库计划',
    component: () => import('@/view/PlanManage/CarOutFactory/ChangeCarOut')
  },
  {
    path: '/CarMaintenance',
    name: '计划管理／库内作业计划／车辆维保计划',
    component: () => import('@/view/PlanManage/StorageWork/CarMaintenance')
  },
  {
    path: '/CarWash',
    name: '计划管理／库内作业计划／车辆清洗计划',
    component: () => import('@/view/PlanManage/StorageWork/CarWash')
  },
  {
    path: '/CarMove',
    name: '计划管理／库内作业计划／车辆移位计划',
    component: () => import('@/view/PlanManage/StorageWork/CarMove')
  },
  {
    path: '/LossCarRepair',
    name: '计划管理／库内作业计划／质损车辆返修',
    component: () => import('@/view/PlanManage/StorageWork/LossCarRepair')
  },
  {
    path: '/MoveBatchRepair',
    name: '计划管理／库内作业计划／移位批量返修车辆计划',
    component: () => import('@/view/PlanManage/StorageWork/MoveBatchRepair')
  },
  {
    path: '/SituBatchRepair',
    name: '计划管理／库内作业计划／原位批量返修车辆计划',
    component: () => import('@/view/PlanManage/StorageWork/SituBatchRepair')
  },
  {
    path: '/InventoryPlan',
    name: '计划管理／库内作业计划／盘点计划',
    component: () => import('@/view/PlanManage/StorageWork/InventoryPlan/InventoryPlan')
  },
  {
    path: '/NewInventoryPlan',
    name: '计划管理／库内作业计划／创建盘点计划单',
    component: () => import('@/view/PlanManage/StorageWork/InventoryPlan/NewInventoryPlan')
  },
  {
    path: '/InventoryPlanOrder',
    name: '计划管理／库内作业计划／盘点清单',
    component: () => import('@/view/PlanManage/StorageWork/InventoryPlan/InventoryPlanOrder')
  },
  {
    path: '/VscMoveOut',
    name: '计划管理／库间调拨计划管理／仓储车辆移库计划(VSC)／仓储车辆移库出库计划',
    component: () => import('@/view/PlanManage/AllotPlan/CarMove/VscMoveOut')
  },
  {
    path: '/VdcMoveOut',
    name: '计划管理／库间调拨计划管理／仓储车辆移库计划(VDC)／仓储车辆移库出库计划',
    component: () => import('@/view/PlanManage/AllotPlan/CarMove/VdcMoveOut')
  },
  {
    path: '/VdcMoveIn',
    name: '计划管理／库间调拨计划管理／仓储车辆移库计划(VDC)／仓储车辆移库入库计划',
    component: () => import('@/view/PlanManage/AllotPlan/CarMove/VdcMoveIn')
  },
  {
    path: '/AllotLackOut',
    name: '计划管理／库内作业计划／缺件车辆计划／缺件车辆出库计划',
    component: () => import('@/view/PlanManage/AllotPlan/LackCar/AllotLackOut')
  },
  {
    path: '/AllotLackIn',
    name: '计划管理／库内作业计划／缺件车辆计划／缺件车辆入库计划',
    component: () => import('@/view/PlanManage/AllotPlan/LackCar/AllotLackIn')
  },
  {
    path: '/PdiIn',
    name: '计划管理／库间调拨计划管理／PDI车辆返修计划／PDI车辆返修入库计划',
    component: () => import('@/view/PlanManage/AllotPlan/PdiStorage/PdiIn')
  },
  {
    path: '/PdiOut',
    name: '计划管理／库间调拨计划管理／PDI车辆返修计划／PDI车辆返修出库计划',
    component: () => import('@/view/PlanManage/AllotPlan/PdiStorage/PdiOut')
  },
  {
    path: '/LossIn',
    name: '计划管理／库间调拨计划管理／质损车辆返修计划／质损车辆返修入库计划',
    component: () => import('@/view/PlanManage/AllotPlan/LossStorage/LossIn')
  },
  {
    path: '/LossOut',
    name: '计划管理／库间调拨计划管理／质损车辆返修计划／质损车辆返修出库计划',
    component: () => import('@/view/PlanManage/AllotPlan/LossStorage/LossOut')
  },
  {
    path: '/BatchIn',
    name: '计划管理／库间调拨计划管理／批量车辆返修计划／批量车辆返修入库计划',
    component: () => import('@/view/PlanManage/AllotPlan/BatchStorage/BatchIn')
  },
  {
    path: '/BatchOut',
    name: '计划管理／库间调拨计划管理／批量车辆返修计划／批量车辆返修出库计划',
    component: () => import('@/view/PlanManage/AllotPlan/BatchStorage/BatchOut')
  },
  {
    path: '/TwiceIn',
    name: '计划管理／库间调拨计划管理／二次报交车辆计划／二次报交车辆入库计划',
    component: () => import('@/view/PlanManage/AllotPlan/TwiceStorage/TwiceIn')
  },
  {
    path: '/TwiceOut',
    name: '计划管理／库间调拨计划管理／二次报交车辆计划／二次报交车辆出库计划',
    component: () => import('@/view/PlanManage/AllotPlan/TwiceStorage/TwiceOut')
  },

  {
    path: '/SshopIn',
    name: '计划管理／库间调拨计划管理／4S店返修车辆调拨计划／4S店返修车辆调拨入库计划',
    component: () => import('@/view/PlanManage/AllotPlan/SshopStorage/SshopIn')
  },
  {
    path: '/SshopOut',
    name: '计划管理／库间调拨计划管理／4S店返修车辆调拨计划／4S店返修车辆调拨出库计划',
    component: () => import('@/view/PlanManage/AllotPlan/SshopStorage/SshopOut')
  },

  {
    path: '/SvoOut',
    name: '计划管理／库间调拨计划管理／SVO车辆计划／SVO车辆出库计划',
    component: () => import('@/view/PlanManage/AllotPlan/SvoStorage/SvoOut')
  },
  {
    path: '/SvoIn',
    name: '计划管理／库间调拨计划管理／SVO车辆计划／SVO车辆入库计划',
    component: () => import('@/view/PlanManage/AllotPlan/SvoStorage/SvoIn')
  },
  {
    path: '/PpoOut',
    name: '计划管理／库间调拨计划管理／PPO车辆计划／PPO车辆出库计划',
    component: () => import('@/view/PlanManage/AllotPlan/PpoStorage/PpoOut')
  },
  {
    path: '/PpoIn',
    name: '计划管理／库间调拨计划管理／PPO车辆计划／PPO车辆入库计划',
    component: () => import('@/view/PlanManage/AllotPlan/PpoStorage/PpoIn')
  },
  // {
  //   path: '/DepotOut',
  //   name: '计划管理／库间调拨计划管理／库改车辆计划／库改车辆出库计划',
  //   component: () => import('@/view/PlanManage/AllotPlan/DepotStorage/DepotOut')
  // },
  // {
  //   path: '/DepotIn',
  //   name: '计划管理／库间调拨计划管理／库改车辆计划／库改车辆入库计划',
  //   component: () => import('@/view/PlanManage/AllotPlan/DepotStorage/DepotIn')
  // },
  {
    path: '/HydIn',
    name: '计划管理／氢能源车辆计划／氢能源车辆入库计划',
    component: () => import('@/view/PlanManage/AllotPlan/HydStorage/HydIn')
  },
  {
    path: '/HydOut',
    name: '计划管理／氢能源车辆计划／氢能源车辆出库计划',
    component: () => import('@/view/PlanManage/AllotPlan/HydStorage/HydOut')
  },
  {
    path: '/SshopCune',
    name: '计划管理／库内作业计划／4S店库内返修计划',
    component: () => import('@/view/PlanManage/StorageWork/SshopCune')
  },
	{
		path: '/OutgoingPlan',
		name: '计划管理／库间调拨计划管理／领用车辆计划／领用车辆出库计划',
		component: () => import('@/view/PlanManage/AllotPlan/CollarCar/OutgoingPlan')
	},
	{
		path: '/WarehousingPlan',
		name: '计划管理／库间调拨计划管理／领用车辆计划／领用车辆入库计划',
		component: () => import('@/view/PlanManage/AllotPlan/CollarCar/WarehousingPlan')
	},
	{
		path: '/PdiPlan',
		name: '计划管理／库内作业计划／PDI车辆返修计划',
		component: () => import('@/view/PlanManage/StorageWork/PdiPlan')
	},
]
export default planManage;
