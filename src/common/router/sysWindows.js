// 系统窗口
const sysWindows = [
  {
    path: '/PdiPlanWindows',
    name: '系统窗口／PDI车辆返修窗口／PDI车辆返修计划',
    component: () => import('@/view/SysWindows/PdiVehicle/PdiPlanWindows')
  },
  {
    path: '/PdiQuery',
    name: '系统窗口／PDI车辆返修窗口／PDI车辆返修历史查询',
    component: () => import('@/view/SysWindows/PdiVehicle/PdiQuery')
  },
  {
    path: '/LossPlan',
    name: '系统窗口／质损车辆返修窗口／质损车辆返修计划',
    component: () => import('@/view/SysWindows/LossVehicle/LossPlan')
  },
  {
    path: '/LossQuery',
    name: '系统窗口／质损车辆返修窗口／质损车辆返修历史查询',
    component: () => import('@/view/SysWindows/LossVehicle/LossQuery')
  },
  {
    path: '/BatchPlan',
    name: '系统窗口／批量返修车辆窗口／批量返修车辆计划',
    component: () => import('@/view/SysWindows/BatchVehicle/BatchPlan')
  },
  {
    path: '/BatchQuery',
    name: '系统窗口／批量返修车辆窗口／批量返修车辆历史查询',
    component: () => import('@/view/SysWindows/BatchVehicle/BatchQuery')
  },
  {
    path: '/TwicePlan',
    name: '系统窗口／二次报交车辆窗口／二次报交车辆计划',
    component: () => import('@/view/SysWindows/TwiceVehicle/TwicePlan')
  },
  {
    path: '/TwiceQuery',
    name: '系统窗口／二次报交车辆窗口／二次报交车辆历史查询',
    component: () => import('@/view/SysWindows/TwiceVehicle/TwiceQuery')
  },
  {
    path: '/SshopPlan',
    name: '系统窗口／4S店返修车辆窗口／4S店返修车辆计划',
    component: () => import('@/view/SysWindows/SshopVehicle/SshopPlan')
  },
  {
    path: '/SshopQuery',
    name: '系统窗口／4S店返修车辆窗口／4S店返修车辆历史查询',
    component: () => import('@/view/SysWindows/SshopVehicle/SshopQuery')
  },

  {
    path: '/HydroPlan',
    name: '系统窗口／氢能源窗口／氢能源计划',
    component: () => import('@/view/SysWindows/HydroWindow/HydroPlan')
  },
  {
    path: '/HydroHtry',
    name: '系统窗口／氢能源窗口／氢能源历史查询',
    component: () => import('@/view/SysWindows/HydroWindow/HydroHtry')
  },
  {
    path: '/SvoPlan',
    name: '系统窗口／SVO窗口／SVO计划',
    component: () => import('@/view/SysWindows/SvoWindow/SvoPlan')
  },
  {
    path: '/SvoHtry',
    name: '系统窗口／SVO窗口／SVO历史查询',
    component: () => import('@/view/SysWindows/SvoWindow/SvoHtry')
  },
  {
    path: '/PpoPlan',
    name: '系统窗口／PPO窗口／PPO计划',
    component: () => import('@/view/SysWindows/PpoWindow/PpoPlan')
  },
  {
    path: '/PpoHtry',
    name: '系统窗口／PPO窗口／PPO历史查询',
    component: () => import('@/view/SysWindows/PpoWindow/PpoHtry')
  },
  {
    path: '/garagePlan',
    name: '系统窗口／库改车辆窗口（库间调拨）／库改车辆计划',
    component: () => import('@/view/SysWindows/garageMove/garagePlan')
  },
  {
    path: '/garageHtry',
    name: '系统窗口／库改车辆窗口（库间调拨）／库改车辆历史查询',
    component: () => import('@/view/SysWindows/garageMove/garageHtry')
  },
   {
    path: '/garageQuery',
    name: '系统窗口／库改车辆窗口（出库）／库改车辆计划',
    component: () => import('@/view/SysWindows/garageMoved/garageQuery')
  },
  {
    path: '/garageAudit',
    name: '系统窗口／库改车辆窗口（出库）／库改车辆历史查询',
    component: () => import('@/view/SysWindows/garageMoved/garageAudit')
  },
  {
    path: '/RvPlan',
    name: '系统窗口／房车窗口／房车计划(窗口)',
    component: () => import('@/view/SysWindows/RvWindow/RvPlan')
  },
  {
    path: '/RvHtry',
    name: '系统窗口／房车窗口／房车历史查询',
    component: () => import('@/view/SysWindows/RvWindow/RvHtry')
  },
  {
    path: '/LostPlan',
    name: '系统窗口／缺件车窗口（库间调拨）／缺件车计划',
    component: () => import('@/view/SysWindows/LostWindow/LostPlan')
  },
  {
    path: '/LostHtry',
    name: '系统窗口／缺件车窗口（库间调拨）／缺件车历史查询',
    component: () => import('@/view/SysWindows/LostWindow/LostHtry')
  },
  {
    path: '/LostPland',
    name: '系统窗口／缺件车窗口（出库）／缺件车计划（窗口）',
    component: () => import('@/view/SysWindows/LostWindowd/LostPland')
  },
  {
    path: '/LostHtryd',
    name: '系统窗口／缺件车窗口（出库）／缺件车历史查询',
    component: () => import('@/view/SysWindows/LostWindowd/LostHtryd')
  },
	{
		path: '/CollarPlan',
		name: '系统窗口／领用窗口／领用车辆计划',
		component: () => import('@/view/SysWindows/CollarWindows/CollarPlan')
	},
	{
		path: '/CollarHistory',
		name: '系统窗口／领用窗口／领用车辆历史查询',
		component: () => import('@/view/SysWindows/CollarWindows/CollarHistory')
	},
	{
		path: '/QrCode',
		name: '系统窗口／二维码打印窗口',
		component: () => import('@/view/SysWindows/QrCode')
	},
]
export default sysWindows;
