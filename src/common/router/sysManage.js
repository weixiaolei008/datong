// 系统管理
const sysManage = [
	{
		path: '/Parameter',
		name: '参数设置',
		component: () => import('@/view/SysManage/Parameter')
	},
	{
		path: '/RoleSetting',
		name: '角色资格设置',
		component: () => import('@/view/SysManage/RoleSetting')
	},
  {
    path: '/LocationRecommend',
    name: '库位推荐规则',
    component: () => import('@/view/SysManage/LocationRecommend')
  },
]
export default sysManage;
