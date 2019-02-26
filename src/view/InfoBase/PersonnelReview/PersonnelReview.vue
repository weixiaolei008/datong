<!-- 库内人员审核 -->
<template>
	<el-container style="width: 100%;height: 100%;">
		<el-header style="height: auto; padding: 0;">
			<!-- search-group -->
			<div class="search-group clearfix">
				<div :class="pop?'search-up':'search-more'" @click="searchMore"></div>
				<el-collapse-transition>
					<div v-show="pop" class="search-pop clearfix">
						<!-- 多选下拉框 -->
						<div class="input-box">
							<label class="input-label">服务商名称</label>
							<el-select v-model="tsServiceProviderId" multiple collapse-tags placeholder="请选择">
								<el-option v-for="item in tsServiceProviderList" :key="item.tsServiceProviderId" :label="item.serviceProviderName"
								 :value="item.tsServiceProviderId">
								</el-option>
							</el-select>
						</div>
						<!-- 多选下拉框 -->
						<div class="input-box">
							<label class="input-label">部门</label>
							<el-select v-model="department" multiple collapse-tags placeholder="请选择" @change='tment'>
								<el-option v-for="item in departmentList" :key="item.tsDataDicId" :label="item.name" :value="item.tsDataDicId">
								</el-option>
							</el-select>
						</div>
						<!-- 多选下拉框 -->
						<div class="input-box">
							<label class="input-label">工段</label>
							<el-select v-model="section" multiple collapse-tags placeholder="请选择" @change='tion'>
								<el-option v-for="item in sectionList" :key="item.tsDataDicId" :label="item.name" :value="item.tsDataDicId">
								</el-option>
							</el-select>
						</div>
						<!-- 多选下拉框 -->
						<div class="input-box">
							<label class="input-label">班组</label>
							<el-select v-model="team" multiple collapse-tags placeholder="请选择" @change='tram'>
								<el-option v-for="item in teamList" :key="item.tsDataDicId" :label="item.name" :value="item.tsDataDicId">
								</el-option>
							</el-select>
						</div>
						<!-- 多选下拉框 -->
						<div class="input-box">
							<label class="input-label">岗位</label>
							<el-select v-model="post" multiple collapse-tags placeholder="请选择">
								<el-option v-for="item in postList" :key="item.tsDataDicId" :label="item.name" :value="item.tsDataDicId">
								</el-option>
							</el-select>
						</div>
					</div>
				</el-collapse-transition>
				<!-- input 输入框 -->
				<div class="input-box">
					<label class="input-label">姓名</label>
					<el-input placeholder="请输入姓名" clearable v-model='idName'></el-input>
				</div>
				<!-- <div class="input-sm-box">
					<label class="input-label">能级</label>
					<el-input placeholder="能级" clearable v-model='energyLevelMax'></el-input>
					<label style="width: 30px" class="input-label">至</label>
					<el-input placeholder="能级" clearable v-model='energyLevelMin'></el-input>
				</div> -->
				<!-- 多选下拉框 -->
				<div class="input-box">
					<label class="input-label">驾驶证</label>
					<el-select v-model="driverLicenses" multiple collapse-tags placeholder="请选择" @change='driverLicensesChange'>
						<el-option v-for="item in driverLicensesList" :key="item.tsLicensesId" :label="item.licensesType" :value="item.tsLicensesId">
						</el-option>
					</el-select>
				</div>
				<!-- 多选下拉框 -->
				<div class="input-box">
					<label class="input-label">动车证</label>
					<el-select v-model="motorLicenses" multiple collapse-tags placeholder="请选择" @change='motorLicensesChange'>
						<el-option v-for="item in motorLicensesList" :key="item.tsLicensesId" :label="item.licensesType" :value="item.tsLicensesId">
						</el-option>
					</el-select>
				</div>
				<!-- 多选下拉框 -->
				<div class="input-box">
					<label class="input-label">PDI</label>
					<el-select v-model="pdiLicenses" multiple collapse-tags placeholder="请选择" @change='pdiLicensesChange'>
						<el-option v-for="item in pdiLicensesList" :key="item.tsLicensesId" :label="item.licensesType" :value="item.tsLicensesId">
						</el-option>
					</el-select>
				</div>
				<!-- 单选下拉框 -->
				<div class="input-box">
					<label class="input-label">用户状态</label>
					<el-select v-model="authFlag" placeholder="请选择" :disabled="userDisabled">
						<el-option v-for="item in authFlagList" :key="item.code" :label="item.name" :value="item.code">
						</el-option>
					</el-select>
				</div>
				<div class="search-box">
					<div class="search-reset" @click="reset"><span class="img-reset">清空</span></div>
					<div class="search-sub" @click="search"><span class="img-sub">搜索</span></div>
				</div>
			</div>
			</div>
			<!-- btn-group -->
			<div class="btn-group clearfix">
				<div class="btn-import" @click="jurisdiCtion"><span class="icon-user">角色权限</span></div>
				<div class="btn-inform" @click='certificates'><span class="icon-certificates">证件信息</span></div>
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
		<el-dialog title="证件信息" :visible.sync="popAddVisible" width="950px">
			<div class="title-group" style="width: 200px;float: left;margin: 10px 0;">
				<div class="icon-title img-title">证件信息</div>
			</div>
			<div class="btn-group clearfix" style="display: inline-block;float: right;margin:10px 0;">
				<div class="btn-import" @click="history"><span class="icon-event">历史信息</span></div>
			</div>
			<div class="clearfix">
				<div>
					<el-table ref="multipleTable" stripe :data="data" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChangeY"
					 @current-change="handleCurrentChangeVal">
						<el-table-column type="selection" width="55">
						</el-table-column>
						</el-table-column>
						<el-table-column prop="licensesName" label="证件信息" width="100">
						</el-table-column>
						<el-table-column prop="licensesType" label="证件类型" width="100">
						</el-table-column>
						<el-table-column prop="licensesNo" label="证件号码">
						</el-table-column>
						<el-table-column prop="issueDate" label="发证日期">
						</el-table-column>
						<el-table-column prop="deadline" label="截止日期">
						</el-table-column>
						<el-table-column prop="status" label="有限状态">
						</el-table-column>
					</el-table>
				</div>
				<div style="text-align: right;float: left;width: 100%;margin-top: 20px;">
					<el-button class="" style="margin-right: 10px;" @click="popAddVisible = false" size="medium">返回</el-button>
				</div>
			</div>
		</el-dialog>

		<!--新增弹框-->
		<el-dialog title="证件信息" :visible.sync="historyType" width="950px">
			<div class="title-group" style="width: 200px;float: left;margin: 10px 0;">
				<div class="icon-title img-title">历史信息</div>
			</div>
			<div class="clearfix">
				<div>
					<el-table ref="multipleTable" stripe :data="dataList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChangeY"
					 @current-change="handleCurrentChangeVal">
						<el-table-column type="selection" width="55">
						</el-table-column>
						</el-table-column>
						<el-table-column prop="modifyType" label="修改类型" width="100">
						</el-table-column>
						<el-table-column prop="modifyDate" label="操作时间" width="100">
						</el-table-column>
						<el-table-column prop="befLicensesName" label="修改前证件名称">
						</el-table-column>
						<el-table-column prop="befLicensesType" label="修改前证件类型">
						</el-table-column>
						<el-table-column prop="aftLicensesName" label="修改后证件名称">
						</el-table-column>
						<el-table-column prop="aftLicensesType" label="修改后证件类型">
						</el-table-column>
					</el-table>
				</div>
				<div style="text-align: right;float: left;width: 100%;margin-top: 20px;">
					<el-button class="" style="margin-right: 10px;" @click="historyClick" size="medium">返回</el-button>
				</div>
			</div>
		</el-dialog>
	</el-container>
</template>

<script>
	import Table from '@/components/Table';
	import {
		energyInfo,
		loadSeviceList,
		loadLicensesList,
		userSkill,
		getModifyLog
	} from "@/common/config/api/InfoBase"
	import {
		loadDicValList,
		getByParentValueId
	} from "@/common/config/api/basic"
	import {
		w150,
		w180
	} from "@/common/config/utils"
	export default {
		name: 'Example',
		components: {
			Table
		},
		data() {
			return {
				data: [],
				dataList: [],
				userDisabled: false,
				popAddVisible: false,
				historyType: false,
				authFlag: 1, // 用户状态: 0 - 禁用 1 - 启用,
				authFlagList: [{
						"name": "启用",
						"code": 1
					},
					{
						"name": "禁用",
						"code": 0
					}
				],
				department: [], // 部门,
				departmentList: [], //部门list
				driverLicenses: [], //驾驶证,
				driverLicensesList: [], //驾驶证list,
				// energyLevelMax: '', // 能级等级最大值,
				// energyLevelMin: '', // 能级等级最小值,
				idName: '', // 姓名,
				motorLicenses: [], // 动车证,
				motorLicensesList: [], // 动车证,
				pageNum: 1,
				pageSize: 30,
				pdiLicenses: [], // PDI,
				pdiLicensesList: [], // PDI,
				phone: '', // 手机号,
				post: [], // 岗位,
				postList: [], // 岗位list,
				section: [], // 工段,
				sectionList: [], //工段list
				team: [], // 班组,
				teamList: [], // 班组,
				tsServiceProviderId: [], //服务商,
				tsServiceProviderList: [], //服务商list
				type: 0, // 请求类型： 1 根据驾驶证查询， 2 根据动车证查询， 3 根据PDI证查询， 0 根据其他条件查询
				idList: [],
				tableData: {
					selectShow: true, //Checkbox
					tableHeight: 0, //高度
					currentPage: 1, //总数
					total: 0, //列表总数
					listData: [],
					operations: [{
						label: '操作',
						width: '70',
						data: [{
							icon: 'icon-eye',
							Fun: 'handleEdit',
							id: '1',
						}]
					}],
					tableHead: [{
							name: '姓名',
							value: 'idName',
						},
						{
							name: '用户状态',
							value: 'authFlagName'
						},
						{
							name: '黑名单',
							value: 'inBlackListName',
						},
						{
							name: '身份证号',
							value: 'idNo',
							width: w180
						},
						{
							name: '手机',
							value: 'phone',
							width: w150
						},
						{
							name: '驾驶证',
							value: 'driverLicenses',
						},
						{
							name: '动车证',
							value: 'motorLicenses',
							width: w150
						},
						{
							name: 'PDI',
							value: 'pdiLicense',
						},
						{
							name: '籍贯(省)',
							value: 'provinceName',
						},
						{
							name: '籍贯(市)',
							value: 'cityName',
						},
						{
							name: '家庭地址',
							value: 'address',
						},

					], //表头
				},
				listH: 0,
				tableHeight: 0,
				pop: false,
				selectValue1: '',
				selectValue2: '',
				textarea: '',
				timeValue: [],
				radio: 1,
				currentPage: 1,
				historyList: [],
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
			//驾驶证选择事件
			driverLicensesChange() {
				this.type = 1
				this.motorLicenses = []
				this.pdiLicenses = []
				this.userDisabled = true
				this.empty()
			},
			//动车站选择
			motorLicensesChange() {
				this.type = 2
				this.pdiLicenses = []
				this.driverLicenses = []
				this.userDisabled = true
				this.empty()
			},
			//PDI
			pdiLicensesChange() {
				this.type = 3
				this.driverLicenses = []
				this.motorLicenses = []
				this.userDisabled = true
				this.empty()
			},
			//历史信息
			history() {
				if (this.historyList.length == 0) {
					this.$message({
						message: '请选择一条用户信息',
						type: 'warning'
					});
					return false
				} else if (this.historyList.length > 1) {
					this.$message({
						message: '只能选择一条用户信息',
						type: 'warning'
					});
					return false
				}
				getModifyLog({
					"id": this.historyList[0].tsUserId
				}).then(res => {
					this.dataList = res.repData
				})

				this.popAddVisible = false
				this.historyType = true
			},
			//返回
			historyClick() {
				this.popAddVisible = true
				this.historyType = false
			},
			//查看详情
			handleEdit(data) {
				this.$router.push({
					path: '/Details',
					query: {
						id: data.row.tsUserId
					}
				});
			},
			//重置
			reset() {
				this.department = [], // 部门,
					this.driverLicenses = [], //驾驶证,
					// this.energyLevelMax = '', // 能级等级最大值,
					// this.energyLevelMin = '', //能级等级最小值
					this.idName = '', // 姓名,
					this.motorLicenses = [], // 动车证,
					this.pdiLicenses = [], // PDI,
					this.phone = '', // 手机号,
					this.post = [], // 岗位,
					this.section = [], // 工段,
					this.team = [], // 班组,
					this.tsServiceProviderId = [], //服务商,
					this.pop = false;
				this.authFlag = 1
				this.userDisabled = false
				this.type = 0
			},
			empty() {
				this.department = [] // 部门,
					this.idName = '' // 姓名,
					this.post = [] // 岗位,
					this.section = [] // 工段,
					this.team = [] // 班组,
					this.tsServiceProviderId = [] //服务商,
			},
			//搜索
			search() {
				if(this.driverLicenses.length!=0 || this.motorLicenses.length!=0||this.pdiLicenses.length!=0){
					this.empty()
				}else{
					this.type = 0
				}
				this.loadData()
			},
			//服务商部门下拉
			tment() {
				if (this.department.length == 1) {
					//服务商工段
					loadDicValList({
						"code": "section"
					}).then(res => {
						this.sectionList = res.repData
					})
				} else {
					this.sectionList = []
					this.section = []
					this.teamList = []
					this.team = []
					this.postList = []
					this.post = []
				}

			},
			//服务商部门下拉
			tment(val) {
				if (this.department.length == 1) {
					//服务商工段
					getByParentValueId({
						"id": val.toString()
					}).then(res => {
						this.sectionList = res.repData
					})
				} else {
					this.sectionList = []
					this.section = []
					this.teamList = []
					this.team = []
					this.postList = []
					this.post = []
				}

			},
			//服务商工段下拉
			tion(val) {
				if (this.section.length == 1) {
					//服务商班组
					getByParentValueId({
						"id": val.toString()
					}).then(res => {
						this.teamList = res.repData
					})
				} else {
					this.teamList = []
					this.team = []
					this.postList = []
					this.post = []
				}

			},
			//班组下拉
			tram(val) {
				if (this.team.length == 1) {
					//服务商岗位
					getByParentValueId({
						"id": val.toString()
					}).then(res => {
						this.postList = res.repData
					})
				} else {
					this.postList = []
					this.post = []
				}

			},
			//角色权限
			jurisdiCtion() {
				if (this.idList.length == 0) {
					this.$message({
						message: '请选择一条用户信息',
						type: 'warning'
					});
					return false
				} else if (this.idList.length > 1) {
					this.$message({
						message: '只能选择一条用户信息',
						type: 'warning'
					});
					return false
				}
				this.$router.push({
					path: '/StaffEditor',
					query: {
						id: this.idList[0].tsUserId,
						url: 'PersonnelReview'
					}
				});
			},
			//证照信息
			certificates() {
				if (this.idList.length == 0) {
					this.$message({
						message: '请选择一条用户信息',
						type: 'warning'
					});
					return false
				} else if (this.idList.length > 1) {
					this.$message({
						message: '只能选择一条用户信息',
						type: 'warning'
					});
					return false
				}
				this.popAddVisible = true
				userSkill({
					"id": Number(this.idList[0].tsUserId)
				}).then(res => {
					this.data = res.repData
				})
			},
			//riado切换
			switching(val) {
				if (val == 1) {
					this.flag = false;
				} else {
					this.flag = true;
				}
			},
			//checkbox选中
			handleSelectionChange(val) {
				console.log(val);
				this.idList = val
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
			handleCurrentChangeVal(val) {
				console.log(val);
			},
			handleSelectionChangeY(val) {
				console.log(val);
				this.historyList = val
			},
			searchMore() {
				this.pop = !this.pop;
			},
			loadData() {
				var self = this
				let p = {
					"authFlag": this.authFlag, // 用户状态: 0 - 禁用 1 - 启用,
					"department": this.department, // 部门,
					"driverLicenses": this.driverLicenses, //驾驶证,
					// "energyLevelMax": this.energyLevelMax, // 能级等级最大值,
					// "energyLevelMin": this.energyLevelMin, // 能级等级最小值,
					"idName": this.idName, // 姓名,
					"motorLicenses": this.motorLicenses, // 动车证,
					"pageNum": this.pageNum,
					"pageSize": this.pageSize,
					"pdiLicenses": this.pdiLicenses, // PDI,
					"phone": this.phone, // 手机号,
					"post": this.post, // 岗位,
					"section": this.section, // 工段,
					"team": this.team, // 班组,
					"tsServiceProviderId": this.tsServiceProviderId, //服务商,
					"type": this.type, // 请求类型： 1 根据驾驶证查询， 2 根据动车证查询， 3 根据PDI证查询， 0 根据其他条件查询
				}
				energyInfo(p).then(res => {
					let list = res.repData.list;
					for (var i = 0; i < list.length; i++) {
						if (list[i].authFlag == 1) {
							list[i].authFlagName = '启用'
						} else {
							list[i].authFlagName = '禁用'
						}
						if (list[i].inBlackList == 1) {
							list[i].inBlackListName = '是'
						} else {
							list[i].inBlackListName = '否'
						}
					}
					self.tableData.listData = res.repData.list;
					self.tableData.total = res.repData.total;
				})
				//服务商
				loadSeviceList({
					"pageNum": 1,
					"pageSize": 9999,
					"serviceProviderName": ""
				}).then(res => {
					self.tsServiceProviderList = res.repData.list
				})
				//所属部门
				loadDicValList({
					"code": "department"
				}).then(res => {
					this.departmentList = res.repData
				})
				//驾驶证
				loadLicensesList({
					"licensesName": "驾驶证"
				}).then(res => {
					this.driverLicensesList = res.repData
				})
				//动车证
				loadLicensesList({
					"licensesName": "动车证"
				}).then(res => {
					this.motorLicensesList = res.repData
				})
				//PDI
				loadLicensesList({
					"licensesName": "PDI"
				}).then(res => {
					this.pdiLicensesList = res.repData
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
	.el-radio-group {
		height: 40px;
		margin-left: 40px;

		label {
			height: 40px;
			line-height: 40px;
		}
	}
</style>
