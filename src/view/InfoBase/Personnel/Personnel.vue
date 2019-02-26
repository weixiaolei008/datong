<!-- 人员权限管理 -->
<template>
	<el-container style="width: 100%;height: 100%;">
		<el-header style="height: auto; padding: 0;">
			<!-- search-group -->
			<div class="search-group clearfix">
				<!-- radio -->
				<div class="input-box">
					<el-radio-group v-model="radio" @change='switching(radio)'>
						<el-radio :label="1">主机厂</el-radio>
						<el-radio :label="2">服务商</el-radio>
					</el-radio-group>
				</div>
				<!-- input 输入框 -->
				<div class="input-box" v-show="flagUser">
					<label class="input-label">姓名</label>
					<el-input placeholder="请输入姓名" :disabled='disabled' clearable v-model='idName'></el-input>
				</div>
				<!-- input 输入框 -->
				<div class="input-box"  v-show="flagUser">
					<label class="input-label">手机号</label>
					<el-input placeholder="请输入手机号" :disabled='disabled' clearable v-model='phone'></el-input>
				</div>
				<!-- 单选下拉框 -->
				<div class="input-box"  v-show="flagUser">
					<label class="input-label">用户状态</label>
					<el-select v-model="authFlag" placeholder="请选择" :disabled='disabled'>
						<el-option v-for="item in authFlagList" :key="item.code" :label="item.name" :value="item.code">
						</el-option>
					</el-select>
				</div>
				<!-- 单选下拉框 -->
				<div class="input-box" v-show="flag">
					<label class="input-label">所属事业部</label>
					<el-select v-model="tsDivisionId" placeholder="请选择" @change='division'>
						<el-option v-for="item in tsDivisionList" :key="item.tsDivisionId" :label="item.divisionName" :value="item.tsDivisionId">
						</el-option>
					</el-select>
				</div>
				<!-- 单选下拉框 -->
				<div class="input-box" v-show="flag">
					<label class="input-label">所属公司</label>
					<el-select v-model="tsCompanyId" placeholder="请选择" @change='company'>
						<el-option v-for="item in tsCompanyList" :key="item.tsCompanyId" :label="item.companyName" :value="item.tsCompanyId">
						</el-option>
					</el-select>
				</div>
				<!-- 单选下拉框 -->
				<div class="input-box" v-show="flag">
					<label class="input-label">所属工厂</label>
					<el-select v-model="tsFactoryId" placeholder="请选择" @change='factoryChange'>
						<el-option v-for="item in tsFactoryList" :key="item.tsFactoryId" :label="item.factoryName" :value="item.tsFactoryId">
						</el-option>
					</el-select>
				</div>
				<!-- 多选下拉框 -->
				<div class="input-box" v-show="flag">
					<label class="input-label">所属仓库</label>
					<el-select v-model="tsWarehouseId" multiple collapse-tags placeholder="请选择" @change='warehouseChange'>
						<el-option v-for="item in tsWarehouseList" :key="item.tsWareHouseId" :label="item.wareHouseName" :value="item.tsWareHouseId">
						</el-option>
					</el-select>
				</div>
				<!-- 多选下拉框 -->
				<div class="input-box" v-show="factory">
					<label class="input-label">所属部门</label>
					<el-select v-model="department" multiple collapse-tags placeholder="请选择" @change='depar'>
						<el-option v-for="item in departmentList" :key="item.tsDataDicId" :label="item.name" :value="item.tsDataDicId">
						</el-option>
					</el-select>
				</div>
				<!-- 多选下拉框 -->
				<div class="input-box" v-show="factory">
					<label class="input-label">所属科室</label>
					<el-select v-model="office" multiple collapse-tags placeholder="请选择" @change='Department'>
						<el-option v-for="item in officeList" :key="item.tsDataDicId" :label="item.name" :value="item.tsDataDicId">
						</el-option>
					</el-select>
				</div>
				<!-- 多选下拉框 -->
				<div class="input-box" v-show="factory">
					<label class="input-label">所属股</label>
					<el-select v-model="thigh" multiple collapse-tags placeholder="请选择">
						<el-option v-for="item in thighList" :key="item.tsDataDicId" :label="item.name" :value="item.tsDataDicId">
						</el-option>
					</el-select>
				</div>



				<!-- 多选下拉框 -->
				<div class="input-box" v-show="warehouse">
					<label class="input-label">所属工段</label>
					<el-select v-model="section" multiple collapse-tags placeholder="请选择" @click='tiois'>
						<el-option v-for="item in sectionList" :key="item.tsDataDicId" :label="item.valueName" :value="item.tsDataDicId">
						</el-option>
					</el-select>
				</div>
				<!-- 多选下拉框 -->
				<div class="input-box" v-show="warehouse">
					<label class="input-label">所属班组</label>
					<el-select v-model="team" multiple collapse-tags placeholder="请选择" @change='trams'>
						<el-option v-for="item in teamList" :key="item.tsDataDicId" :label="item.valueName" :value="item.tsDataDicId">
						</el-option>
					</el-select>
				</div>

				<!-- 多选下拉框 -->
				<div class="input-box" v-show="warehouse">
					<label class="input-label">岗位</label>
					<el-select v-model="post" multiple collapse-tags placeholder="请选择">
						<el-option v-for="item in postList" :key="item.tsDataDicId" :label="item.valueName" :value="item.tsDataDicId">
						</el-option>
					</el-select>
				</div>


				<!-- 服务商 -->
				<!-- 多选下拉框 -->
				<div class="input-box" v-show="flagType">
					<label class="input-label">服务商名称</label>
					<el-select v-model="tsServiceProviderId" multiple collapse-tags placeholder="请选择">
						<el-option v-for="item in tsServiceProviderList" :key="item.tsServiceProviderId" :label="item.serviceProviderName"
						 :value="item.tsServiceProviderId">
						</el-option>
					</el-select>
				</div>
				<!-- 多选下拉框 -->
				<div class="input-box" v-show="flagType">
					<label class="input-label">部门</label>
					<el-select v-model="sdepartment" multiple collapse-tags placeholder="请选择" @change='tment'>
						<el-option v-for="item in sdepartmentList" :key="item.tsDataDicId" :label="item.name" :value="item.tsDataDicId">
						</el-option>
					</el-select>
				</div>
				<!-- 多选下拉框 -->
				<div class="input-box" v-show="flagType">
					<label class="input-label">工段</label>
					<el-select v-model="ssection" multiple collapse-tags placeholder="请选择" @change='tion'>
						<el-option v-for="item in ssectionList" :key="item.tsDataDicId" :label="item.name" :value="item.tsDataDicId">
						</el-option>
					</el-select>
				</div>
				<!-- 多选下拉框 -->
				<div class="input-box" v-show="flagType">
					<label class="input-label">班组</label>
					<el-select v-model="steam" multiple collapse-tags placeholder="请选择" @change='tram'>
						<el-option v-for="item in steamList" :key="item.tsDataDicId" :label="item.name" :value="item.tsDataDicId">
						</el-option>
					</el-select>
				</div>
				<!-- 多选下拉框 -->
				<div class="input-box" v-show="flagType">
					<label class="input-label">岗位</label>
					<el-select v-model="spost" multiple collapse-tags placeholder="请选择">
						<el-option v-for="item in spostList" :key="item.tsDataDicId" :label="item.name" :value="item.tsDataDicId">
						</el-option>
					</el-select>
				</div>


				<div class="search-box">
					<div class="search-reset" @click="reset"><span class="img-reset">清空</span></div>
					<div class="search-sub" @click="search"><span class="img-sub">搜索</span></div>
				</div>
			</div>
			<!-- btn-group -->
			<div class="btn-group clearfix">
				<!-- <div class="btn-add" @click="add"><span class="img-add">新增</span></div> -->
				<!-- <div class="btn-receive" @click="edit"><span class="img-add">编辑</span></div> -->
				<div class="btn-import" @click="jurisdiCtion"><span class="icon-user">角色权限</span></div>
				<div class="btn-inform" @click="credit"><span class="icon-credit">信用</span></div>
				<!-- <div class="btn-del"><span class="img-del">删除</span></div> -->
				<div class="btn-export" @click="exportExcel"><span class="img-extend">导出</span></div>
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
	</el-container>
</template>

<script>
	import Table from '@/components/Table';
	import {
		userListInfo,
		loadSeviceList,
		divisionAll,
		companyLoadData,
		factory,
		wareHouse,
		systemInfoExcel
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
			Table,
		},
		data() {
			return {
				id: '',
				tsUserIds: [], //选择id集合
				disabled: false, //禁用
				authFlag: 1, //用户状态：0是禁用，1是启用				
				authFlagList: [{
						"name": "禁用",
						"code": 0
					},
					{
						"name": "启用",
						"code": 1
					}
				], //用户状态
				belongType: '', //:1是主机厂，2是服务商 ,
				department: [], //主机厂字段：所属部门 ,
				departmentList: '', //所属部门list
				office: [], //主机厂字段：所属科室 ,
				officeList: [], //所属科室list
				post: [], //主机厂字段：岗位
				postList: [], //岗位list
				section: [], //主机厂字段：所属工段 ,
				sectionList: [], //所属工段
				team: [], //主机厂字段：所属班组
				teamList: [], //班组
				thigh: [], // 主机厂字段：所属股 
				thighList: [], //所属股list
				tsCompanyId: "", //主机厂字段：公司ID ,
				tsCompanyList: [], //公司list
				tsDivisionId: "", //主机厂字段：事业部ID 
				tsDivisionList: [], //事业部list
				tsFactoryId: "", //主机厂字段：工厂ID ,
				tsFactoryList: [], //工厂list
				tsWarehouseId: [], //主机厂字段：仓库ID ,
				tsWarehouseList: [], //仓库list
				idName: "", //姓名
				pageNum: 1,
				pageSize: 30,
				phone: "", //手机号码
				sdepartment: [], //服务商字段：部门
				sdepartmentList: [], //部门list
				spost: [], //服务商字段：岗位
				spostList: [], //岗位list
				ssection: [], //服务商字段： 工段 
				ssectionList: [], //工段list
				steam: [], //服务商字段：班组
				steamList: [], //班组
				tsServiceProviderId: [], //服务商字段：服务商ID ,
				tsServiceProviderList: [], //服务商list
				type: 1, //1是根据手机号姓名用户状态查询，2是根据主机厂信息查询，3是根据服务商信息查询
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
							name: '用户名',
							value: 'userName',
							width:w150
						}, {
							name: '姓名',
							value: 'idName',
						},
						{
							name: '性别',
							value: 'sexName'
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
							name: '手机号',
							value: 'phone',
							width: w150
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
							name: '家庭住址',
							value: 'address',
						},
					], //表头
				},
				flag: false,
				flagType:false,
				flagUser:true,
				factory: false, //工厂显示影藏状态
				warehouse: false, //仓库显示影藏状态
				listH: 0,
				tableHeight: 0,
				pop: false,
				radio: '',
				currentPage: 1,
			};
		},
		methods: {
			//导出
			exportExcel() {
				let self = this;
				let p;
				self.tsUserIds = []
				if (this.id.length) {
					this.id.forEach((item) => {
						self.tsUserIds.push(item.tsUserId);
					})
					p = {
						"tsUserIds": self.tsUserIds,
					}
				} else {
					p = {
						"authFlag": this.authFlag, //用户状态：0是禁用，1是启用
						"belongType": this.belongType, //1是主机厂，2是服务商 ,
						"department": this.department, //主机厂字段：所属部门 ,
						"idName": this.idName, //姓名
						"office": this.office, //主机厂字段：所属科室 ,
						"pageNum": this.pageNum,
						"pageSize": this.pageSize,
						"phone": this.phone, //手机号码
						"post": this.post, //主机厂字段：岗位
						"sdepartment": this.sdepartment, //
						"section": this.section, //主机厂字段：所属工段 ,
						"spost": this.spost, //服务商字段：岗位
						"ssection": this.ssection, //服务商字段： 工段 
						"steam": this.steam, //服务商字段：班组
						"team": this.team, //主机厂字段：所属班组
						"thigh": this.thigh, // 主机厂字段：所属股 
						"tsCompanyId": this.tsCompanyId, //主机厂字段：公司ID ,
						"tsDivisionId": this.tsDivisionId, //主机厂字段：事业部ID 
						"tsFactoryId": this.tsFactoryId, //主机厂字段：工厂ID ,
						"tsServiceProviderId": this.tsServiceProviderId, //服务商字段：服务商ID ,
						"tsWarehouseId": this.tsWarehouseId, //主机厂字段：仓库ID ,
						"type": this.type, //1是根据手机号姓名用户状态查询，2是根据主机厂信息查询，3是根据服务商信息查询
					}
				}
				systemInfoExcel(p).then(res => {
					window.location.href = res.repData
				})
			},
			//清空数据
			empty() {
				this.factory = false
				this.warehouse = false
				this.idName = "", //姓名
					this.phone = "", //手机号码
					this.authFlag = 1,
					this.belongType = '', //0, 归属类型:1是主机厂，2是服务商 ,
					this.department = [], //主机厂字段：所属部门 ,
					this.departmentList = [], //所属部门list
					this.office = [], //主机厂字段：所属科室 ,
					this.officeList = [], //所属科室list
					this.post = [], //主机厂字段：岗位
					this.postList = [], //岗位list
					this.section = [], //主机厂字段：所属工段 ,
					this.sectionList = [], //所属工段
					this.team = [], //主机厂字段：所属班组
					this.teamList = [], //班组
					this.thigh = [], // 主机厂字段：所属股 
					this.thighList = [], //所属股list
					this.tsCompanyId = "", //主机厂字段：公司ID ,
					this.tsCompanyList = [], //公司list
					this.tsDivisionId = "", //主机厂字段：事业部ID 
					this.tsDivisionList = [], //事业部list
					this.tsFactoryId = "", //主机厂字段：工厂ID ,
					this.tsFactoryList = [], //工厂list
					this.tsWarehouseId = [], //主机厂字段：仓库ID ,
					this.tsWarehouseList = [], //仓库list
					this.sdepartment = [], //服务商字段：部门
					this.sdepartmentList = [], //部门list
					this.spost = [], //服务商字段：岗位
					this.spostList = [], //岗位list
					this.ssection = [], //服务商字段： 工段 
					this.ssectionList = [], //工段list
					this.steam = [], //服务商字段：班组
					this.steamList = [], //班组
					this.tsServiceProviderId = [], //服务商字段：服务商ID ,
					this.tsServiceProviderList = [] //服务商list
				this.type = 1 //
				this.belongType = ""
			},
			//所属事业部选择
			division(val) {
				this.tsCompanyId = ''
				this.tsFactoryId = ''
				this.tsWarehouseId = []
				let p = {
					"pageNum": 1,
					"pageSize": 999,
					"tsDivisionIds": [val]
				}
				companyLoadData(p).then(res => {
					this.tsCompanyList = res.repData.list
				})
			},
			//所属公司选择
			company(val) {
				this.tsFactoryId = ''
				this.tsWarehouseId = []
				let p = {
					"tsCompanyId": val
				}
				factory(p).then(res => {
					this.tsFactoryList = res.repData
				})
			},
			//工厂下拉
			factoryChange(val) {
				this.tsWarehouseId = []
				let p = {
					"tsFactoryId": val
				}
				wareHouse(p).then(res => {
					this.tsWarehouseList = res.repData
				})
				//所属部门
				loadDicValList({
					"code": "belongs_department"
				}).then(res => {
					this.departmentList = res.repData
				})
				this.factory = true
				this.warehouse = false
			},
			//所属部门下拉
			depar(val) {
				if (this.department.length == 1) {
					//所属科室
					getByParentValueId({
						"id": val.toString()
					}).then(res => {
						this.officeList = res.repData
					})
				} else {
					this.officeList = []
					this.office = []
					this.thighList = []
					this.thigh = []
				}

			},
			//所属科室下拉
			Department(val) {
				if (this.office.length == 1) {
					//所属股
					getByParentValueId({
						"id": val.toString()
					}).then(res => {
						this.thighList = res.repData
					})
				} else {
					this.thighList = []
					this.thigh = []
				}
			},
			//仓库下拉
			warehouseChange() {
				if (this.tsWarehouseId.length == 1) {
					//主机厂工段
					loadDicValList({
						"code": "belongs_section"
					}).then(res => {
						this.ssectionList = res.repData
					})
					this.factory = false;
					this.warehouse = true
				} else {
					this.ssectionList = []
					this.ssection = []
				}

			},
			//主机厂所属工段
			tiois(val) {
				if (this.section.length == 1) {
					//主机厂班组
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
			//主机厂所属班组下拉
			trams(val) {
				if (this.team.length == 1) {
					//主机厂岗位
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
			//服务商部门下拉
			tment(val) {
				if (this.sdepartment.length == 1) {
					//服务商工段
					getByParentValueId({
						"id": val.toString()
					}).then(res => {
						this.ssectionList = res.repData
					})
				} else {
					this.ssectionList = []
					this.ssection = []
					this.steamList = []
					this.steam = []
					this.spostList = []
					this.spost = []
				}

			},
			//服务商工段下拉
			tion(val) {
				if (this.ssection.length == 1) {
					//服务商班组
					getByParentValueId({
						"id": val.toString()
					}).then(res => {
						this.steamList = res.repData
					})
				} else {
					this.steamList = []
					this.steam = []
					this.spostList = []
					this.spost = []
				}

			},
			//班组下拉
			tram(val) {
				if (this.steam.length == 1) {
					//服务商岗位
					getByParentValueId({
						"id": val.toString()
					}).then(res => {
						this.spostList = res.repData
					})
				} else {
					this.spostList = []
					this.spost = []
				}

			},
			//riado切换
			switching(val) {
				var self = this
				this.pop = true
				this.disabled = true
				this.empty()
				if (val == 1) {
					//主机厂
					this.flag = true;
					this.flagType = false,
					this.flagUser = false,
					this.type = 2
					this.belongType = 1
					//所属事业部
					divisionAll().then(res => {
						self.tsDivisionList = res.repData.list
					})
				} else {
					//服务商
					this.type = 3
					this.flag = false;
					this.flagType = true,
					this.flagUser = false,
					this.factory = false;
					this.warehouse = false;
					this.belongType = 2

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
						this.sdepartmentList = res.repData
					})
				}
				console.log(val)
				this.belongType = val;
			},
			//新增
			add() {

			},
			//角色权限
			jurisdiCtion() {
				if (this.id.length == 0) {
					this.$message({
						message: '请选择一条用户信息',
						type: 'warning'
					});
					return false
				} else if (this.id.length > 1) {
					this.$message({
						message: '只能选择一条用户信息',
						type: 'warning'
					});
					return false
				}
				this.$router.push({
					path: '/StaffEditor',
					query: {
						id: this.id[0].tsUserId,
						url: 'Personnel'
					}
				});
			},
			//编辑
			handleEdit(data) {
				this.$router.push({
					path: '/NewPersonnel',
					query: {
						id: data.row.tsUserId
					}
				});
			},
			//信用
			credit() {
				if (this.id.length == 0) {
					this.$message({
						message: '请选择一条用户信息',
						type: 'warning'
					});
					return false
				} else if (this.id.length > 1) {
					this.$message({
						message: '只能选择一条用户信息',
						type: 'warning'
					});
					return false
				}
				this.$router.push({
					path: '/StaffCredit',
					query: {
						id: this.id[0].tsUserId
					}
				});
			},
			//重置
			reset() {
				this.empty()
				this.pop = false;
				this.disabled = false
				this.flag = false;
				this.flagType = false
				this.flagUser = true
				this.radio = ''
			},
			//搜索
			search() {
				if (this.idName != '' || this.phone != '') {
					this.type = 1
				}
				this.loadData()
			},
			//checkbox选中
			handleSelectionChange(val) {
				this.id = val
			},
			//分页
			handleSizeChange(val) {

			},
			handleCurrentChange(val) {
				this.pageNum = val
				this.loadData()

			},
			//顶部展开
			searchMore() {
				var self = this
				if (this.radio != '') {
					self.pop = !this.pop;
				}
			},
			loadData() {
				let self = this;
				let p = {
					"authFlag": this.authFlag, //用户状态：0是禁用，1是启用
					"belongType": this.belongType, //0, 归属类型:1是主机厂，2是服务商 ,
					"department": this.department, //主机厂字段：所属部门 ,
					"idName": this.idName, //姓名
					"office": this.office, //主机厂字段：所属科室 ,
					"pageNum": this.pageNum,
					"pageSize": this.pageSize,
					"phone": this.phone, //手机号码
					"post": this.post, //主机厂字段：岗位
					"sdepartment": this.sdepartment, //
					"section": this.section, //主机厂字段：所属工段 ,
					"spost": this.spost, //服务商字段：岗位
					"ssection": this.ssection, //服务商字段： 工段 
					"steam": this.steam, //服务商字段：班组
					"team": this.team, //主机厂字段：所属班组
					"thigh": this.thigh, // 主机厂字段：所属股 
					"tsCompanyId": this.tsCompanyId, //主机厂字段：公司ID ,
					"tsDivisionId": this.tsDivisionId, //主机厂字段：事业部ID 
					"tsFactoryId": this.tsFactoryId, //主机厂字段：工厂ID ,
					"tsServiceProviderId": this.tsServiceProviderId, //服务商字段：服务商ID ,
					"tsWarehouseId": this.tsWarehouseId, //主机厂字段：仓库ID ,
					"type": this.type, //1是根据手机号姓名用户状态查询，2是根据主机厂信息查询，3是根据服务商信息查询
				}
				userListInfo(p).then(res => {
					self.tableData.listData = res.repData.list;
					self.tableData.total = res.repData.total;
					for (var i = 0; i < res.repData.list.length; i++) {
						if (res.repData.list[i].sex == 1) {
							res.repData.list[i].sexName = '男'
						} else if (res.repData.list[i].sex == 2) {
							res.repData.list[i].sexName = '女'
						}
						if (res.repData.list[i].authFlag == 1) {
							res.repData.list[i].authFlagName = '启用'
						} else if (res.repData.list[i].authFlag == 0) {
							res.repData.list[i].authFlagName = '禁用'
						}
						if (res.repData.list[i].inBlackList == 1) {
							res.repData.list[i].inBlackListName = '是'
						} else if (res.repData.list[i].inBlackList == 0) {
							res.repData.list[i].inBlackListName = '否'
						}
					}
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
