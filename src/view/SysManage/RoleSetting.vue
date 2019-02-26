<!-- 角色资格设置 -->
<template>
	<el-container style="width: 100%;height: 100%;">
		<el-header style="height: auto; padding: 0;">
			<!-- search-group -->
			<div class="search-group clearfix">
				<!-- input 输入框 -->
				<div class="input-box">
					<label class="input-label">名称</label>
					<el-input placeholder="请输入名称" clearable v-model='name'></el-input>
				</div>
				<div class="input-box">
					<label class="input-label">角色名称</label>
					<el-input placeholder="请输入角色名称" clearable v-model='roleName'></el-input>
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
		<el-dialog title="限制条件设置" :visible.sync="popAddVisible" width="680px" center>
			<div class="clearfix">
				<!-- input 输入框 -->
				<div class="input-box">
					<label class="input-label"><span>*</span>名称</label>
					<el-input v-model="addName" placeholder="名称" clearable></el-input>
				</div>
				<!-- 单选下拉框 -->
				<div class="input-box">
					<label class="input-label"><span>*</span>角色名称</label>
					<el-select v-model="roleId" placeholder="请选择角色">
						<el-option v-for="item in roleList" :key="item.tsRoleId" :label="item.roleName" :value="item.tsRoleId">
						</el-option>
					</el-select>
				</div>
				<!-- 单选下拉框 -->
				<div class="input-box">
					<label class="input-label">运输方式</label>
					<el-select v-model="dataDicId" placeholder="请选择运输方式">
						<el-option v-for="item in options.transportation_mode2" :key="item.tsDataDicId" :label="item.name" :value="item.tsDataDicId">
						</el-option>
					</el-select>
				</div>
				<!-- 单选下拉框 -->
				<div class="input-box">
					<label class="input-label">证件类型</label>
					<el-select v-model="tsLicensesId" placeholder="请选择证件类型">
						<el-option v-for="item in tsLicensesList" :key="item.tsLicensesId" :label="item.licensesName" :value="item.tsLicensesId">
						</el-option>
					</el-select>
				</div>

				<!-- input 输入框 -->
				<div class="input-box">
					<label class="input-label">可抢任务数</label>
					<el-input v-model="maxTaskNumber" placeholder="长度" clearable></el-input>
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
		roleSettingList,
		roleModify,
		roleQuery,
		roleDelete,
		licensesList
	} from "@/common/config/api/SysManage";
	import {
		loadDicValList,
	} from "@/common/config/api/basic"
	export default {
		name: 'Example',
		components: {
			Table
		},
		data() {
			return {
				name: '', //名称
				roleName: '', //角色名称
				roleList: [], //角色下拉
				roleId: '', //角色下拉id
				dataDic: [], //运输方式下拉
				dataDicId: '', //运输方式id
				maxTaskNumber: '', //可抢任务最大数
				addName: '', //新增编辑名称
				trRoleQualificationId: '', //编辑角色id
				tsLicensesId: '', //证照类型Id
				tsLicensesList: [], //证件类型下拉
				listIds: '', //删除list
				popAddVisible: false, //编辑弹框
				selectValue1: '',
				options1: [],
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
							name: '名称',
							value: 'name',
							// show: 'template'
						}, {
							name: '角色名称',
							value: 'roleName',
							// show: 'template'
						},
						{
							name: '运输方式',
							value: 'transportMode'
						},
						{
							name: '证件类型',
							value: 'licensesType'
						},
						{
							name: '可抢最大任务数',
							value: 'maxTaskNumber',
						},
					], //表头
				},
			};
		},
		computed: {
			options: {
				get() {
					return this.$store.state.codeOptions.options;
				},
			}
		},
		methods: {
			treeInfo() {
				//角色
				roleQuery({
					"pageNum": 0,
					"pageSize": 0,
					"roleName": ""
				}).then(res => {
					this.roleList = res.repData.list
				})
				//证照下拉
				licensesList().then(res => {
					this.tsLicensesList = res.repData
				})
			},
			//编辑
			handleEdit(data) {
				this.popAddVisible = true;
				console.log(data.row)
				this.treeInfo()
				this.maxTaskNumber = data.row.maxTaskNumber,
					this.addName = data.row.name,
					this.trRoleQualificationId = data.row.trRoleQualificationId,
					this.dataDicId = data.row.tsDataDicId,
					this.tsLicensesId = data.row.tsLicensesId,
					this.roleId = data.row.tsRoleId
			},
			//重置
			reset() {
				this.name = '';
				this.roleName = '';
			},
			//搜索
			search() {
				this.loadData()
			},
			//新增编辑保存
			saveAdd() {
				// this.popAddVisible = false;
				let self = this;
				if (this.addName == '') {
					this.$message({
						message: '请填写名称',
						type: 'warning'
					});
					return false
				}
				if( this.roleId == ''){
					this.$message({
						message: '请选择角色',
						type: 'warning'
					});
					return false
				}
				let p = {
					"maxTaskNumber": this.maxTaskNumber,
					"name": this.addName,
					"trRoleQualificationId": this.trRoleQualificationId,
					"tsDataDicId": this.dataDicId,
					"tsLicensesId": this.tsLicensesId,
					"tsRoleId": this.roleId
				}
				roleModify(p).then(res => {
					this.$message({
						message: '保存成功',
						type: 'success'
					});
					setTimeout(function() {
						self.popAddVisible = false
						self.loadData()
					}, 500)
				})
			},
			//新增
			add() {
				this.popAddVisible = true;
				this.trRoleQualificationId = '',
				this.maxTaskNumber = '',
				this.addName = '',
				this.dataDicId = '',
				this.tsLicensesId = '',
				this.roleId = ''
				this.treeInfo()
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
					ids.push(this.listIds[i].trRoleQualificationId)
				}
				this.$confirm('请确认是否删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					//RFID删除
					roleDelete({
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
			//checkbox选中
			handleSelectionChange(val) {
				this.listIds = val;
			},
			//分页
			handleSizeChange(val) {
				console.log(val);
			},
			handleCurrentChange(val) {
				console.log(val);
			},
			loadData() {
				let self = this;
				let p = {
					"name": this.name,
					"roleName": this.roleName,
					"pageNum": 1,
					"pageSize": 30
				}
				roleSettingList(p).then(res => {
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

</style>
