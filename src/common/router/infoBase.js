// 基础信息
const infoBase = [{
		path: '/BaseUser',
		name: '列表',
		component: () =>
			import('@/view/InfoBase/BaseUser')
	},
	{
		path: '/LicenseManage',
		name: '证照管理',
		component: () =>
			import('@/view/InfoBase/LicenseManage')
	},
	{
		path: '/DataDictionary',
		name: '数据字典',
		component: () =>
			import('@/view/InfoBase/DataDictionary')
	},
	{
		path: '/Division',
		name: '事业部管理',
		component: () =>
			import('@/view/InfoBase/Division')
	},
	{
		path: '/Company',
		name: '公司管理',
		component: () =>
			import('@/view/InfoBase/Company')
	},
	{
		path: '/Factory',
		name: '工厂管理',
		component: () =>
			import('@/view/InfoBase/Factory')
	},
	{
		path: '/Warehouse',
		name: '仓库管理',
		component: () =>
			import('@/view/InfoBase/Warehouse')
	},
	{
		path: '/WarehouseAdd',
		name: '仓库管理（新增）',
		component: () =>
			import('@/view/InfoBase/WarehouseAdd')
	},
	{
		path: '/WarehouseEdit',
		name: '仓库管理（编辑）',
		component: () =>
			import('@/view/InfoBase/WarehouseEdit')
	},
	{
		path: '/WarehouseCheck',
		name: '仓库管理（查看）',
		component: () =>
			import('@/view/InfoBase/WarehouseCheck')
	},
	{
		path: '/Personnel',
		name: '人员权限管理',
		component: () =>
			import('@/view/InfoBase/Personnel/Personnel')
	},
	{
		path: '/NewPersonnel',
		name: '人员权限管理/新增',
		component: () =>
			import('@/view/InfoBase/Personnel/NewPersonnel')
	},
	{
		path: '/StaffEditor',
		name: '人员全权限管理/权限',
		component: () =>
			import('@/view/InfoBase/Personnel/StaffEditor')
	},
	{
		path: '/StaffCredit',
		name: '人员全权限管理/信用',
		component: () =>
			import('@/view/InfoBase/Personnel/StaffCredit')
	},
	{
		path: '/RoleManager',
		name: '角色管理',
		component: () =>
			import('@/view/InfoBase/RoleManager')
	},
	{
		path: '/JobPoint',
		name: '作业点管理',
		component: () =>
			import('@/view/InfoBase/JobPoint')
	},
	{
		path: '/Rfid',
		name: 'RFID信息管理',
		component: () =>
			import('@/view/InfoBase/Rfid')
	},
	{
		path: '/Location',
		name: '库位管理',
		component: () =>
			import('@/view/InfoBase/Location')
	},
	{
		path: '/Service',
		name: '服务商管理',
		component: () =>
			import('@/view/InfoBase/Service')
	},
	{
		path: '/ServiceAdd',
		name: '服务商管理新增',
		component: () =>
			import('@/view/InfoBase/ServiceAdd')
	},
	{
		path: '/ServiceEdit',
		name: '服务商管理编辑',
		component: () =>
			import('@/view/InfoBase/ServiceEdit')
	},
	{
		path: '/PersonnelReview',
		name: '库内人员审核',
		component: () =>
			import('@/view/InfoBase/PersonnelReview/PersonnelReview')
	},
	{
		path: '/Details',
		name: '库内人员审核/详情',
		component: () =>
			import('@/view/InfoBase/PersonnelReview/Details')
	},
	{
		path: '/AuditAuthority',
		name: '库内人员审核/权限',
		component: () =>
			import('@/view/InfoBase/PersonnelReview/AuditAuthority')
	},
	{
		path: '/PersonnelRelationship',
		name: '人员能级管理',
		component: () =>
			import('@/view/InfoBase/PersonnelRelationship/PersonnelRelationship')
	},
	{
		path: '/RelationshipEdit',
		name: '人员能级管理/详情',
		component: () =>
			import('@/view/InfoBase/PersonnelRelationship/RelationshipEdit')
	},
	{
		path: '/Train',
		name: '人员能级管理/培训详情',
		component: () =>
			import('@/view/InfoBase/PersonnelRelationship/Train')
	},
	{
		path: '/Accident',
		name: '人员能级管理/事故详情',
		component: () =>
			import('@/view/InfoBase/PersonnelRelationship/Accident')
	},
	{
		path: '/Operation',
		name: '人员能级管理/操作详情',
		component: () =>
			import('@/view/InfoBase/PersonnelRelationship/Operation')
	},
]
export default infoBase;
