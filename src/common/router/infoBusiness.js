// 业务中心
const infoBusiness = [
  {
    path: '/BusinessCenter',
    name: '任务历史／业务中心',
    component: () => import('@/view/InfoBusiness/BusinessCenter')
  },
  {
    path: '/BusinessDetail',
    name: '任务历史／业务详情',
    component: () => import('@/view/InfoBusiness/BusinessDetail')
  },
  {
    path: '/BActivityDetail',
    name: '任务历史／活动详情',
    component: () => import('@/view/InfoBusiness/BActivityDetail')
  },
]
export default infoBusiness;
