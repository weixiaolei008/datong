// 任务中心
const infoTask = [
  {
    path: '/TransportBoard',
    name: '任务看板／库间运输活动看板',
    component: () =>
      import('@/view/InfoTask/TransportBoard')
  },
  {
    path: '/TaskBoard',
    name: '任务看板／任务中心',
    component: () =>
      import('@/view/InfoTask/TaskBoard')
  },
  {
    path: '/TaskDetail',
    name: '任务看板／任务详情',
    component: () =>
      import('@/view/InfoTask/TaskDetail')
  },
  {
    path: '/TActivityDetail',
    name: '任务看板／活动详情',
    component: () =>
      import('@/view/InfoTask/TActivityDetail')
  },
]
export default infoTask;
