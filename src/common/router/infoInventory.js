// 库存中心
const infoInventory = [
  {
    path: '/InventoryBoard',
    name: '库存中心／库存看板',
    component: () => import('@/view/InfoInventory/InventoryBoard')
  },
  {
    path: '/InventoryDetail',
    name: '库存中心／库存看板／库存详情',
    component: () => import('@/view/InfoInventory/InventoryDetail')
  },
	{
		path: '/RepositoryVisualization',
		name: '库存中心／库位可视化／库存看板／库存详情',
		component: () => import('@/view/InfoInventory/RepositoryVisualization')
	},
]
export default infoInventory;
