<!-- 人员能级管理 -->
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
				<!-- input 输入框 -->
				<div class="input-box">
					<label class="input-label">手机号</label>
					<el-input placeholder="请输入手机号" clearable v-model='phone'></el-input>
				</div>
				<div class="input-sm-box">
					<label class="input-label">能级</label>
					<el-input placeholder="能级" clearable v-model='energyLevelMin'></el-input>
					<label style="width: 30px" class="input-label">至</label>
					<el-input placeholder="能级" clearable v-model='energyLevelMax'></el-input>
				</div>

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
				<div class="btn-export" @click="exportExcel"><span class="img-extend">导出</span></div>
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
	</el-container>
</template>

<script>
	import Table from '@/components/Table';
	import {
		energyInfo,
		loadSeviceList,
		loadLicensesList,
		userSkill,
		downloadUserEnergyInfo
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
				userDisabled: false,
				data: [],
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
				energyLevelMax: '', // 能级等级最大值,
				energyLevelMin: '', // 能级等级最小值,
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
						},
						{
							name: 'PDI',
							value: 'pdiLicense',
						},
						{
							name: '能级',
							value: 'energyLevel',
						},
						{
							name: '客户满意',
							value: 'serviceAttitude',
						},
						{
							name: '专业程度',
							value: 'professionalDegree',
						},
						{
							name: '经验值',
							value: 'experienceValue',
						},
						{
							name: '安全值',
							value: 'safetyValue',
						},
						{
							name: '培训次数',
							value: 'trainCount',
						},
						{
							name: '操作次数',
							value: 'operationCount',
						},
						{
							name: '物流质量',
							value: 'accidentCount',
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
				tsUserIds: []
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
			//导出
			exportExcel() {
				let self = this;
				let p;
				self.tsUserIds = []
				if (this.idList.length) {
					this.idList.forEach((item) => {
						self.tsUserIds.push(item.tsUserId);
					})
					p = {
						"tsUserIds": self.tsUserIds,
					}
				} else {
					p = {
						"authFlag": this.authFlag, // 用户状态: 0 - 禁用 1 - 启用,
						"department": this.department, // 部门,
						"driverLicenses": this.driverLicenses, //驾驶证,
						"energyLevelMax": this.energyLevelMax, // 能级等级最大值,
						"energyLevelMin": this.energyLevelMin, // 能级等级最小值,
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
				}
				downloadUserEnergyInfo(p).then(res => {
					window.location.href = res.repData
				})
			},
			//重置
			reset() {
				this.userDisabled = false
				this.department = [], // 部门,
					this.driverLicenses = [], //驾驶证,
					this.energyLevelMax = '', // 能级等级最大值,
					this.energyLevelMin = '', //能级等级最小值
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
				this.type = 0
			},
			empty() {
				this.department = [] // 部门,
				this.energyLevelMax = '' // 能级等级最大值,
				this.energyLevelMin = '' //能级等级最小值
				this.idName = '' // 姓名,
				this.phone = '' // 手机号,
				this.post = [] // 岗位,
				this.section = [] // 工段,
				this.team = [] // 班组,
				this.tsServiceProviderId = [] //服务商,
			},
			//查看
			handleEdit(data) {
				this.$router.push({
					path: '/RelationshipEdit',
					query: {
						id: data.row.tsUserId
					}
				});
			},
			//搜索
			search() {
				if(isNaN(this.energyLevelMin)){
					this.$message({
						message: '请输入正确的能级',
						type: 'warning'
					});
					return
				}
				if(isNaN(this.energyLevelMax)){
					this.$message({
						message: '请输入正确的能级',
						type: 'warning'
					});
					return
				}
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
			},
			handleSelectionChangeY(val) {
				console.log(val);
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
					"energyLevelMax": this.energyLevelMax, // 能级等级最大值,
					"energyLevelMin": this.energyLevelMin, // 能级等级最小值,
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
