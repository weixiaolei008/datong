// 异常事件管理
const sysEvent = [
  	{
   	 	path: '/EventQuery',
    	name: '异常事件查询',
    	component: () => import('@/view/SysEvent/EventQuery')
    },
	{
		path: '/EventApply',
		name: '异常事件申诉管理',
		component: () => import('@/view/SysEvent/EventApply')
	},
	{
		path: '/EventApplyEdit',
		name: '异常事件申诉管理(编辑/查看)',
		component: () => import('@/view/SysEvent/EventApplyEdit')
	}
]
export default sysEvent;
