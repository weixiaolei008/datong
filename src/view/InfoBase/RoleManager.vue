<!-- 角色管理 -->
<template>
	<el-container style="width: 100%;height: 100%;">
		<el-header style="height: auto; padding: 0;">
			<!-- search-group -->
			<div class="search-group clearfix">
				<!-- input 输入框 -->
				<div class="input-box">
					<label class="input-label">角色</label>
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
			 @handleEdit="handleEdit">
				<template slot-scope="{scope}" slot="name">
					<div>{{scope.row.name}}</div>
				</template>
			</Table>
		</el-main>
		<!--新增弹框-->
		<el-dialog title="角色信息" :visible.sync="popAddVisible" width="680px" center>
			<div class="clearfix">
				<!-- input 输入框 -->
				<div class="input-box">
					<label class="input-label"><span>*</span>角色名称</label>
					<el-input v-model="addRoleName" placeholder="角色名称" clearable></el-input>
				</div>
				<div class="addTree">
					<div class="tree">
						<div class="webStyle">
							<span>Web:</span>
							<div class="radio" @change='radioChange'>
								<el-radio v-model="radio" label="1">启用</el-radio>
								<el-radio v-model="radio" label="2">禁用</el-radio>
							</div>
							<div style="float: left;">
								<el-tree :data="webList" show-checkbox ref="tree" node-key="tsAuthId" default-expand-all :default-checked-keys="tsAuthIds"
								 :props="webProps">
								</el-tree>
							</div>

						</div>
					</div>
					<div class="tree" style="margin-left: 15px;">
						<div class="webStyle">
							<span>App:</span>
							<div class="radio">
								<el-checkbox v-model="checkedApp">APP用户角色</el-checkbox>
							</div>
							<div>
								<el-tree :data="appList" show-checkbox ref="treeA" node-key="code" default-expand-all :default-checked-keys="activityCodes"
								 :props="appProps">
								</el-tree>
							</div>
						</div>
					</div>
				</div>
				<div style="text-align: right;float: left;width: 100%;">
					<el-button class="" style="margin-right: 10px;" @click="cancel" size="medium">返回</el-button>
					<el-button class="" style="margin-right: 15px;" type="primary" @click="saveAdd" size="medium">保存</el-button>
				</div>
			</div>
		</el-dialog>
	</el-container>
</template>

<script>
	import Table from '@/components/Table';
	import {
		roleList,
		allMenu,
		activities,
		roleUpdate,
		roleDelete,
		roleInfo
	} from "@/common/config/api/InfoBase"
	export default {
		name: 'Example',
		components: {
			Table,
		},
		data() {
			return {
				checkedApp:false,
				pageNum: 1,
				pageSize: 30,
				roleName: '', //名称
				addRoleName: '', //新增名称
				tsRoleId: '', //编辑id
				tsAuthIds: [], //反选web树
				activityCodes: [], //反选app树
				webList: [],
				webProps: {
					children: 'childList',
					label: 'name'
				},
				appList: [],
				appProps: {
					children: 'children',
					label: 'name'
				},
				listIds: '', //删除list
				radio: '',
				popAddVisible: false, //编辑弹框
				popAddVisibleType: '', //弹窗提示信息
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
						name: '角色名称',
						value: 'roleName',
						// show: 'template'
					}, ], //表头
				},
				allMenuIds: [],
				activitiesIds: [],
			};
		},
		methods: {
			radioChange() {
				if (this.radio == 1) {
					this.$refs.tree.setCheckedKeys(this.allMenuIds)
					this.$refs.treeA.setCheckedKeys(this.activitiesIds)
				} else {
					this.$refs.tree.setCheckedKeys([])
					this.$refs.treeA.setCheckedKeys([])
				}
			},
			//加载tree
			treeInfo() {
				var self = this
				self.allMenuIds = []
				allMenu().then(res => {
					self.webList = res.repData
					for (var i = 0; i < self.webList.length; i++) {
						self.allMenuIds.push(self.webList[i].tsAuthId)
					}
				})
				activities().then(res => {
					self.appList = res.repData
					for (var i = 0; i < self.appList.length; i++) {
						self.activitiesIds.push(self.appList[i].code)
					}
				})
			},
			//编辑
			handleEdit(data) {
				var self = this;
				this.popAddVisible = true;
				this.tsRoleId = data.row.tsRoleId;
				this.popAddVisibleType = '编辑成功'
				
				let p = {
					'id': data.row.tsRoleId
				}
				roleInfo(p).then(res => {
					this.addRoleName = res.repData.roleName
					this.tsAuthIds = res.repData.tsAuthIds
					this.activityCodes = res.repData.activityCodes
					if(res.repData.isTestPass == 1){
						this.checkedApp = true
					}else{
						this.checkedApp = false
					}
				})

				setTimeout(function() {
					self.treeInfo()
				}, 700)
			},
			//重置
			reset() {
				this.roleName = '';
			},
			//搜索
			search() {
				this.loadData()
			},
			//新增编辑保存
			saveAdd() {
				let self = this;
				if (this.addRoleName == '') {
					this.$message({
						message: '请输入角色名称',
						type: 'warning'
					});
					return false
				}
				if (this.addRoleName.length > 10) {
					this.$message({
						message: '请输入10个汉字以内的角色名称',
						type: 'warning'
					});
					return false
				}
				let isTestPass = ''
				if(this.checkedApp == false){
					isTestPass = 0
				}else{
					isTestPass = 1
				}
				let p = {
					"isTestPass":isTestPass,
					"activityCodes": this.$refs.treeA.getCheckedKeys(),
					"roleName": this.addRoleName,
					"tsAuthIds": this.$refs.tree.getCheckedKeys(),
					"tsRoleId": this.tsRoleId,
				}
				roleUpdate(p).then(res => {
					if (res.repCode) {
						this.$message({
							message: this.popAddVisibleType,
							type: 'success'
						});
						this.radio = '',
							setTimeout(function() {
								self.loadData()
								self.$refs.treeA.setCheckedKeys([])
								self.popAddVisible = false;
							}, 500)
					} else {
						this.msgInfo(res.repMsg);
					}
				})
			},
			cancel() {
				this.radio = '',
					this.allMenuIds = []
				this.activitiesIds = []
				this.$refs.tree.setCheckedKeys([])
				this.$refs.treeA.setCheckedKeys([])
				this.popAddVisible = false;
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
					ids.push(this.listIds[i].tsRoleId)
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
			//新增
			add() {
				let self = this
				this.addRoleName = '';
				this.tsRoleId = '';
				this.popAddVisible = true;
				this.checkedApp = false;
				this.webList = [];
				this.appList = [];
				this.tsAuthIds = [];
				this.activityCodes = [];
				this.popAddVisibleType = '新增成功'
				this.treeInfo()
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
				this.pageNum = val
				this.loadData()
			},
			loadData() {
				let self = this;
				let p = {
					"roleName": this.roleName,
					"pageNum": this.pageNum,
					"pageSize": this.pageSize
				}
				roleList(p).then(res => {
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
	.addTree {
		width: 100%;
		height: 300px;
		float: left;
		margin-bottom: 20px;
	}

	.tree {
		width: 300px;
		height: 300px;
		float: left;
	}

	.webStyle {
		width: 100%;
		height: 30px;
	}

	.webStyle span {
		display: inline-block;
		width: 50px;
		line-height: 30px;
		float: left;
		// text-align: center;
	}

	.radio {
		width: 200px;
		line-height: 30px;
		float: left;
	}

	.el-tree {
		width: 300px;
		height: 270px;
		float: left;
		border: 1px solid #e5e5e5;
		overflow: auto;
	}
</style>
