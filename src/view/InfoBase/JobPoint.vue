<!-- 作业点管理  -->
<template>
	<el-container style="width: 100%;height: 100%;">
		<el-header style="height: auto; padding: 0;">
			<!-- search-group -->
			<div class="search-group clearfix">
				<!-- input 输入框 -->
				<div class="input-box">
					<label class="input-label">作业点名称</label>
					<el-input v-model='operatePointName' placeholder="请输入作业点名称" clearable></el-input>
				</div>
				<div class="search-box">
					<div class="search-reset" @click="reset"><span class="img-reset">清空</span></div>
					<div class="search-sub" @click="search"><span class="img-sub">搜索</span></div>
				</div>
			</div>
			<!-- btn-group -->
			<div class="btn-group clearfix">
				<div class="btn-add" @click="add"><span class="img-add">新增</span></div>
				<div class="btn-del" @click="del"><span class="img-del">删除</span></div>
			</div>
		</el-header>
		<el-main class="table" style='padding: 10px;'>
			<Table :data='tableData' @selection-change="handleSelectionChange" @size-change="handleSizeChange" @current-change="handleCurrentChange"
			 @handleEdit='handleEdit'>
				<template slot-scope="{scope}" slot="name">
					<div>{{scope.row.name}}</div>
				</template>
			</Table>
		</el-main>
		<!--新增弹框-->
		<el-dialog :title="title" :visible.sync="popAddVisible" width="680px" center>
			<div class="clearfix">
				<!-- input 输入框 -->
				<div class="input-box">
					<label class="input-label"><span>*</span>作业点名称</label>
					<el-input v-model='addName' placeholder="作业点名称" clearable></el-input>
				</div>
				<!-- 单选下拉框 -->
				<div class="input-box">
					<label class="input-label">所属事业部</label>
					<el-select v-model="divisionId" placeholder="请选择所属事业部" @change='division(divisionId)'>
						<el-option v-for="item in divisionType" :key="item.tsDivisionId" :label="item.divisionName" :value="item.tsDivisionId">
						</el-option>
					</el-select>
				</div>
				<!-- 单选下拉框 -->
				<div class="input-box">
					<label class="input-label">所属公司</label>
					<el-select v-model="companyId" placeholder="请选择所属公司" @change='company(companyId)'>
						<el-option v-for="item in companyType" :key="item.tsCompanyId" :label="item.companyName" :value="item.tsCompanyId">
						</el-option>
					</el-select>
				</div>
				<!-- 单选下拉框 -->
				<div class="input-box">
					<label class="input-label">所属工厂</label>
					<el-select v-model="factoryId" placeholder="请选择所属工厂" @change='factory(factoryId)'>
						<el-option v-for="item in factoryType" :key="item.tsFactoryId" :label="item.factoryName" :value="item.tsFactoryId">
						</el-option>
					</el-select>
				</div>
				<!-- 单选下拉框 -->
				<div class="input-box">
					<label class="input-label">所属仓库</label>
					<el-select v-model="wareHouseId" placeholder="请选择所属仓库">
						<el-option v-for="item in wareHouseType" :key="item.tsWareHouseId" :label="item.wareHouseName" :value="item.tsWareHouseId">
						</el-option>
					</el-select>
				</div>

				<div style="text-align: right;float: left;width: 100%;">
					<el-button class="" style="margin-right: 10px;" @click="popAddVisible = false" size="medium">返回</el-button>
					<el-button class="" style="margin-right: 15px;" type="primary" @click="saveAdd" size="medium">保存</el-button>
				</div>
			</div>
		</el-dialog>
	</el-container>
</template>

<script>
	import Table from '@/components/Table';
	import {
		jobList,
		divisionAll,
		companyLoadData,
		factory,
		jobAdd,
		wareHouse,
		jobDel
	} from "@/common/config/api/InfoBase"
	export default {
		name: 'JobPoint',
		components: {
			Table,
		},
		data() {
			return {
				pageNum: 1,
				pageSize: 30,
				title:'',
				tsOperatePointId: '', //编辑id
				addName: '', //新增作业点名称
				operatePointName: '', //作业点名称
				divisionType: [], //事业部类型
				divisionId: '', //事业部id
				companyType: [], //所属公司类型
				companyId: '', //所属公司Id
				factoryType: [], //所属工厂
				factoryId: '', //所属工厂Id
				wareHouseType: [], //仓库类型
				wareHouseId: [], //仓库类型Id
				popAddVisible: false, //编辑弹框
				listIds: [], //删除list
				selectValue1: '',
				options1: [{
						value: '选项1',
						label: '长安VDC'
					},
					{
						value: '选项2',
						label: '张泾VDC'
					}
				],
				tableData: {
					selectShow: true, //Checkbox
					tableHeight: 0, //高度
					currentPage: 1, //总数
					total: 0, //列表总数
					listData: [],
					operations: [{
						label: '操作',
						width: '100',
						data: [{
							icon: 'icon-edit',
							Fun: 'handleEdit',
							id: '1',
						}]
					}],
					tableHead: [{
							name: '作业点名称',
							value: 'operatePointName',
							// show: 'template'
						},
						{
							name: '所属仓库',
							value: 'wareHouseName'
						},
						{
							name: '所属工厂',
							value: 'factoryName',
						},
						{
							name: '所属公司',
							value: 'companyName',
						},
						{
							name: '所属事业部',
							value: 'divisionName',
						},
					], //表头
				},
			};
		},
		methods: {
			//tree
			treeInfo() {

				//所属事业部
				divisionAll().then(res => {
					this.divisionType = res.repData.list
				})
			},
			//编辑
			handleEdit(data) {
				this.popAddVisible = true;
				this.title = '编辑作业点'
				console.log(data.row)
				this.treeInfo()
				this.division(data.row.tsDivisionId) //所属公司
				this.company(data.row.tsCompanyId) //所属工厂
				this.factory(data.row.tsFactoryId) //所属仓库
				this.companyId = ''
				this.factoryId = ''
				this.wareHouseId = ''
				this.addName = data.row.operatePointName
				this.divisionId = String(data.row.tsDivisionId)
				if (data.row.tsCompanyId != null) {
					this.companyId = String(data.row.tsCompanyId)
				}
				if (data.row.tsFactoryId != null) {
					this.factoryId = String(data.row.tsFactoryId)
				}
				if (data.row.tsWareHouseId != null) {
					this.wareHouseId = String(data.row.tsWareHouseId)
				}
				this.tsOperatePointId = data.row.tsOperatePointId
			},
			//重置
			reset() {
				this.operatePointName = '';
			},
			//搜索
			search() {
				this.loadData()
			},
			//新增保存
			saveAdd() {
				let self = this
				if (this.addName == '') {
					this.$message({
						message: '作业点名称不能为空',
						type: 'warning'
					});
					return false
				}
				let p = {
					"operatePointName": this.addName,
					"tsDivisionId": this.divisionId,
					"tsCompanyId": this.companyId,
					"tsFactoryId": this.factoryId,
					"tsWareHouseId": this.wareHouseId,
					"tsOperatePointId": this.tsOperatePointId
				}
				jobAdd(p).then(res => {
					this.$message({
						message: '新增成功',
						type: 'success'
					});
					setTimeout(function() {
						self.popAddVisible = false
						self.loadData()
					}, 500)
				})
			},
			//删除
			del() {
				let self = this
				if (this.listIds.length == 0) {
					this.$message({
						message: '请选择一条要删除的数据',
						type: 'warning'
					});
					return false
				}
				let ids = [];
				for (var i = 0; i < this.listIds.length; i++) {
					ids.push(this.listIds[i].tsOperatePointId)
				}
				this.$confirm('请确认是否删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					//RFID删除
					jobDel({
						"listIds": ids
					}).then(res => {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						self.loadData()
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			//新增
			add() {
				this.title = '新增作业点'
				this.popAddVisible = true;
				this.divisionType = [];
				this.divisionId = '';
				this.companyType = [];
				this.companyId = '';
				this.factoryType = [];
				this.factoryId = '';
				this.wareHouseType = [];
				this.wareHouseId = '';
				this.tsOperatePointId = '';
				this.treeInfo()
			},
			//所属事业部选择
			division(val) {
				this.companyId = ''
				this.factoryId = ''
				this.wareHouseId = ''
				let p = {
					"pageNum": 1,
					"pageSize": 10,
					"tsDivisionIds": [val]
				}
				companyLoadData(p).then(res => {
					this.companyType = res.repData.list
				})
			},
			//所属公司选择
			company(val) {
				this.factoryId = ''
				this.wareHouseId = ''
				let p = {
					"tsCompanyId": val
				}
				factory(p).then(res => {
					this.factoryType = res.repData
				})
			},
			//所属工厂选择
			factory(val) {
				this.wareHouseId = ''
				let p = {
					"tsFactoryId": val
				}
				wareHouse(p).then(res => {
					this.wareHouseType = res.repData
				})
			},
			//checkbox选中
			handleSelectionChange(val) {
				console.log(val)
				this.listIds = val;
			},
			//分页
			handleSizeChange(val) {
				console.log(val);
			},
			handleCurrentChange(val) {
				console.log(val);
				this.pageNum = val
				this.loadData()
			},
			loadData() {
				let self = this;
				let p = {
					"parameter": this.operatePointName,
					"pageNum": this.pageNum,
					"pageSize": this.pageSize
				}
				jobList(p).then(res => {
					self.tableData.listData = res.repData.list;
					self.tableData.total = res.repData.total;
				})
			}
		},
		mounted() {
			this.tableData.tableHeight = document.getElementsByClassName('table')[0].clientHeight - 60;
		},
		created() {
			this.loadData()
		}
	};
</script>

<style scoped lang="less">
	.search-group {
		padding: 20px 0;
		margin: 0 15px;
		border-bottom: 1px solid #e5e5e5;
	}

	.btn-group {
		padding-top: 10px;
	}
</style>
