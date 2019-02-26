// 基础信息
const app = [
  {
    path: '/AppLevel',
    name: 'App个人信息',
    component: () =>
      import('@/view/App/AppLevel')
  },
  {
    path: '/AppWarehouse',
    name: 'App库位可视化',
    component: () =>
      import('@/view/App/AppWarehouse')
  },
  {
    path: '/ApkDownload',
    name: 'App下载',
    component: () =>
      import('@/view/App/AppDownload')
  },
  {
    path: '/AppVersion',
    name: 'App版本',
    component: () =>
      import('@/view/App/AppVersion')
  },
]
export default app;
