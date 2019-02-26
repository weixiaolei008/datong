<!-- 人员权限管理/编辑 -->
<template>
	<div style="height: 100%;overflow: auto;">
		<div style="position: relative;float: left;">
			<div class="title-group">
				<div class="icon-title img-title">基础信息</div>
			</div>
			<div style="padding-right: 180px" class="clearfix">
				<!-- input 输入框 -->
				<div class="input-box">
					<label class="input-label"><span>*</span>用户名</label>
					<el-input placeholder="用户名" clearable v-model='base.userName' disabled='disabled'></el-input>
				</div>
				<!-- input 输入框 -->
				<div class="input-box" style="clear: both;">
					<label class="input-label"><span>*</span>姓名</label>
					<el-input placeholder="姓名" clearable :maxlength=10 v-model='base.idName'></el-input>
				</div>
				<!-- 单选下拉框 -->
				<div class="input-box">
					<label class="input-label">性别</label>
					<el-select v-model="base.sex" placeholder="请选择性别">
						<el-option v-for="item in sexList" :key="item.code" :label="item.name" :value="item.code">
						</el-option>
					</el-select>
				</div>
				<!-- input 输入框 -->
				<div class="input-box">
					<label class="input-label">身份证号</label>
					<el-input placeholder="身份证号" :maxlength=18 clearable v-model='base.idNo'></el-input>
				</div>
				<!-- input 输入框 -->
				<!-- <div class="input-box">
					<label class="input-label">户籍</label>
					<el-input placeholder="户籍" clearable v-model='base.householdRegister'></el-input>
				</div> -->
				<!-- input 输入框 -->
				<div class="input-box">
					<label class="input-label">手机号</label>
					<el-input placeholder="手机号" :maxlength=11 clearable v-model='base.phone'></el-input>
				</div>
				<!-- input 输入框 -->
				<div class="input-box">
					<label class="input-label">家庭地址</label>
					<el-input placeholder="家庭地址" clearable v-model='base.address'></el-input>
				</div>
				<!-- 单选下拉框 -->
				<div class="input-box">
					<label class="input-label">省/自治区</label>
					<el-select v-model="base.province" placeholder="请选择省/自治区" @change='provinceChange'>
						<el-option v-for="item in provinceList" :key="item.tsRegionId" :label="item.regionName" :value="item.tsRegionId">
						</el-option>
					</el-select>
				</div>
				<!-- 单选下拉框 -->
				<div class="input-box">
					<label class="input-label">市</label>
					<el-select v-model="base.city" placeholder="请选择市" @change='cityChange'>
						<el-option v-for="item in cityList" :key="item.tsRegionId" :label="item.regionName" :value="item.tsRegionId">
						</el-option>
					</el-select>
				</div>
			</div>
			<div style="position: absolute; top: 60px;right: 30px;">
				<div class="img">
					<img class="imgStyle" alt="" :src="base.imgUrl" />
				</div>
			</div>
			<div class="identityStyle">
				<img style="position: absolute;top: 0;left: 0;width: 300px;height: 160px;" :src="base.idUrlA" alt="" />
			</div>
			<div class="identityStyle">
				<img style="position: absolute;top: 0;left: 0;width: 300px;height: 160px;" :src="base.idUrlB" alt="" />
			</div>
		</div>
		<div style="float: left;">
			<div class="title-group">
				<div class="icon-title img-title">归属信息</div>
				<div class="radio-box" style="left: 130px">
					<el-radio-group v-model="radio" @change='switching(radio)'>
						<el-radio :label="1">主机厂</el-radio>
						<el-radio :label="2">服务商</el-radio>
					</el-radio-group>
				</div>
			</div>

			<!-- 单选下拉框 -->
			<div class="input-box" v-show="flag">
				<label class="input-label">所属事业部</label>
				<el-select v-model="hostPlant.tsDivisionId" placeholder="请选择所属事业部" @change='division'>
					<el-option v-for="item in tsDivisionList" :key="item.tsDivisionId" :label="item.divisionName" :value="item.tsDivisionId">
					</el-option>
				</el-select>
			</div>
			<!-- 单选下拉框 -->
			<div class="input-box" v-show="flag">
				<label class="input-label">所属公司</label>
				<el-select v-model="hostPlant.tsCompanyId" placeholder="请选择所属公司" @change='company'>
					<el-option v-for="item in tsCompanyList" :key="item.tsCompanyId" :label="item.companyName" :value="item.tsCompanyId">
					</el-option>
				</el-select>
			</div>
			<!-- 单选下拉框 -->
			<div class="input-box" v-show="flag">
				<label class="input-label">所属工厂</label>
				<el-select v-model="hostPlant.tsFactoryId" placeholder="请选择所属工厂" @change='factoryChange'>
					<el-option v-for="item in tsFactoryList" :key="item.tsFactoryId" :label="item.factoryName" :value="item.tsFactoryId">
					</el-option>
				</el-select>
			</div>
			<!-- 单选下拉框 -->
			<div class="input-box" v-show="flag">
				<label class="input-label">所属仓库</label>
				<el-select v-model="hostPlant.tsWareHouseId" placeholder="请选择所属仓库">
					<el-option v-for="item in tsWarehouseList" :key="item.tsWareHouseId" :label="item.wareHouseName" :value="item.tsWareHouseId">
					</el-option>
				</el-select>
			</div>
			<!-- 单选下拉框 -->
			<div class="input-box" v-show="flag">
				<label class="input-label">所属部门</label>
				<el-select v-model="hostPlant.department" placeholder="请选择所属部门" @change='depar'>
					<el-option v-for="item in departmentList" :key="item.tsDataDicId" :label="item.name" :value="item.tsDataDicId">
					</el-option>
				</el-select>
			</div>
			<!-- 单选下拉框 -->
			<div class="input-box" v-show="flag">
				<label class="input-label">所属科室</label>
				<el-select v-model="hostPlant.office" placeholder="请选择所属科室" @change='Department'>
					<el-option v-for="item in officeList" :key="item.tsDataDicId" :label="item.name" :value="item.tsDataDicId">
					</el-option>
				</el-select>
			</div>
			<!-- 单选下拉框 -->
			<div class="input-box" v-show="flag">
				<label class="input-label">所属股</label>
				<el-select v-model="hostPlant.thigh" placeholder="请选择所属股" @change='thigh'>
					<el-option v-for="item in thighList" :key="item.tsDataDicId" :label="item.name" :value="item.tsDataDicId">
					</el-option>
				</el-select>
			</div>
			<!-- 单选下拉框 -->
			<div class="input-box" v-show="flag">
				<label class="input-label">所属工段</label>
				<el-select v-model="hostPlant.section" placeholder="请选择所属工段" @change='sectionChange'>
					<el-option v-for="item in sectionList" :key="item.tsDataDicId" :label="item.name" :value="item.tsDataDicId">
					</el-option>
				</el-select>
			</div>
			<!-- 单选下拉框 -->
			<div class="input-box" v-show="flag">
				<label class="input-label">所属班组</label>
				<el-select v-model="hostPlant.team" placeholder="请选择所属班组" @change='trams'>
					<el-option v-for="item in teamList" :key="item.tsDataDicId" :label="item.name" :value="item.tsDataDicId">
					</el-option>
				</el-select>
			</div>
			<!-- 单选下拉框 -->
			<div class="input-box" v-show="flag">
				<label class="input-label">岗位</label>
				<el-select v-model="hostPlant.post" placeholder="请选择岗位">
					<el-option v-for="item in postList" :key="item.tsDataDicId" :label="item.name" :value="item.tsDataDicId">
					</el-option>
				</el-select>
			</div>


			<!-- 服务商 -->
			<!-- 单选下拉框 -->
			<div class="input-box" v-show="!flag">
				<label class="input-label">服务商名称</label>
				<el-select v-model="serviceProvider.tsServiceProviderId" placeholder="请选择" @change='tsService'>
					<el-option v-for="item in tsServiceProviderList" :key="item.tsServiceProviderId" :label="item.serviceProviderName"
					 :value="item.tsServiceProviderId">
					</el-option>
				</el-select>
			</div>
			<!-- 单选下拉框 -->
			<div class="input-box" v-show="!flag">
				<label class="input-label">部门</label>
				<el-select v-model="serviceProvider.department" placeholder="请选择" @change='tment'>
					<el-option v-for="item in sdepartmentList" :key="item.tsDataDicId" :label="item.name" :value="item.tsDataDicId">
					</el-option>
				</el-select>
			</div>
			<!-- 单选下拉框 -->
			<div class="input-box" v-show="!flag">
				<label class="input-label">工段</label>
				<el-select v-model="serviceProvider.section" placeholder="请选择" @change='tion'>
					<el-option v-for="item in ssectionList" :key="item.tsDataDicId" :label="item.name" :value="item.tsDataDicId">
					</el-option>
				</el-select>
			</div>
			<!-- 单选下拉框 -->
			<div class="input-box" v-show="!flag">
				<label class="input-label">班组</label>
				<el-select v-model="serviceProvider.team" placeholder="请选择" @change='tram'>
					<el-option v-for="item in steamList" :key="item.tsDataDicId" :label="item.name" :value="item.tsDataDicId">
					</el-option>
				</el-select>
			</div>
			<!-- 单选下拉框 -->
			<div class="input-box" v-show="!flag">
				<label class="input-label">岗位</label>
				<el-select v-model="serviceProvider.post" placeholder="请选择">
					<el-option v-for="item in spostList" :key="item.tsDataDicId" :label="item.name" :value="item.tsDataDicId">
					</el-option>
				</el-select>
			</div>
		</div>
		<div style="text-align: center;float: left;width: 100%;margin-bottom: 30px;">
			<el-button class="" style="margin-right: 10px;" size="medium" @click="retu">返回</el-button>
			<el-button class="" style="margin-right: 15px;" type="primary" @click="saveAdd" size="medium">保存</el-button>
		</div>
	</div>
</template>
<script>
	import {
		getUserInfo,
		divisionAll,
		companyLoadData,
		factory,
		wareHouse,
		loadSeviceList,
		updateSystemUser
	} from "@/common/config/api/InfoBase"
	import {
		loadProCityList,
		loadDicValList,
		getByParentValueId
	} from "@/common/config/api/basic"
	import UploadImg from "@/components/UploadImg"
	import {
		sGet
	} from "@/common/config/utils"
	export default {
		name: '',
		components: {
			UploadImg
		},
		data() {
			return {
				headers: {
					token: ''
				},
				imgFlag: true,
				id: '',
				radio: '',
				flag: true,
				sexList: [{
						"name": '男',
						"code": 1
					},
					{
						"name": '女',
						"code": 2
					}
				],
				//基础信息
				baseFlag: true,
				base: {
					address: '', //地址
					belongType: '', //归属类型:1是主机厂，2是服务商 ,
					city: '', //市
					cityName: '', // 市名称,
					// householdRegister: '', //户籍
					idName: '', //用户名
					idNo: '', //身份证
					imgUrl: '', // 员工照片,
					idUrl: '', // 身份证照片地址，多种逗号,
					idUrlA: '', // 身份证照片地址，多种逗号,
					idUrlB: '', // 身份证照片地址，多种逗号,
					phone: '', //手机
					province: '', //省
					provinceName: '', // 省名称 ,
					userName: '', //用户登录名
					sex: '', //性别
				},
				provinceList: [], //省
				cityList: [], //市
				//服务商
				serviceProviderFlag: false,
				serviceProvider: {
					department: '', //服务商部门
					post: '', //岗位
					section: '', //服务商工段
					team: '', //班组
					tsServiceProviderId: '', //服务商id
				},
				tsServiceProviderList: [], //服务商list
				sdepartmentList: [], //服务商部门list
				ssectionList: [], //服务商工段list
				steamList: [], //服务商班组list
				spostList: [], //岗位
				//主机厂
				hostPlantFlag: true,
				hostPlant: {
					department: "", //主机厂部门id
					office: "", //科室
					post: "", //岗位
					section: "", //所属工段
					team: "", //所属班组
					thigh: "", //所属股
					tsCompanyId: "", //主机厂公司id
					tsDivisionId: "", //主机厂事业部id
					tsFactoryId: "", //主机厂工厂id
					tsWareHouseId: "", //主机厂仓库
				},
				tsDivisionList: [], //主机厂事业部list
				tsCompanyList: [], //主机厂公司list
				tsFactoryList: [], //主机厂工厂list
				tsWarehouseList: [], //主机厂仓库
				departmentList: [], //主机厂部门
				officeList: [], //科室list
				thighList: [], //所属股list
				sectionList: [], //所属工段
				teamList: [], //所属班组
				postList: [], //岗位
				imageUrl: ''
			};
		},
		watch: {
			//基础信息
			base: {
				handler: function() {
					this.baseFlag = true
				},
				deep: true
			},
			//服务商
			serviceProvider: {
				handler: function() {
					this.serviceProviderFlag = true
				},
				deep: true
			},
			//主机厂
			hostPlant: {
				handler: function() {
					this.hostPlantFlag = true
				},
				deep: true
			}
		},
		methods: {
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isPNG = file.type === 'image/png';
				const isLt1M = file.size / 1024 / 1024 < 8
				if (!isJPG && !isPNG) {
					this.$confirm('上传图片暂时只支持JPG/PNG格式', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'error',
						callback: action => {}
					})
				}
				if (!isLt1M) {
					this.$confirm('上传图片大小不能超过 1MB!', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'error',
						callback: action => {}
					})
				}
				return isJPG || isPNG && isLt1M;
			},
			//服务商切换
			switching(val) {
				let self = this
				//主机厂
				if (val == 1) {
					this.flag = true
					self.base.belongType = val
					self.serviceProviderFlag = false
					divisionAll().then(res => {
						self.tsDivisionList = res.repData.list
					})
					//所属部门
					loadDicValList({
						"code": "belongs_department"
					}).then(res => {
						self.departmentList = res.repData
					})
				} else {
					//服务商
					this.flag = false
					self.hostPlantFlag = false
					//服务商
					loadSeviceList({
						"pageNum": 1,
						"pageSize": 9999,
						"serviceProviderName": ""
					}).then(res => {
						self.tsServiceProviderList = res.repData.list
					})
					self.base.belongType = val

				}
			},
			//省下拉接口
			province() {
				loadProCityList('p', {}).then(res => {
					if (res.success) {
						this.provinceList = res.repData;
					}
				})
			},
			//市下拉
			city(parentId) {
				let self = this
				loadProCityList('c', {
					id: parentId
				}).then(res => {
					if (res.success) {
						self.cityList = res.repData;
					}
				})
			},
			//省下拉事件
			provinceChange(val) {
				this.cityList = []
				this.base.city = ''
				this.city(val)
				let obj = {}
				obj = this.provinceList.find((item) => { //this.ruleForm  
					return item.tsRegionId === val; //筛选出匹配数据  
				});
				this.base.provinceName = obj.regionName
				this.base.city = ''
				this.base.cityName = ''
				// console.log(obj.regionName); //我这边的name就是对应label的  
			},
			//市下拉事件
			cityChange(val) {
				let obj = {}
				obj = this.cityList.find((item) => { //this.ruleForm  
					return item.tsRegionId === val; //筛选出匹配数据  
				});
				this.base.cityName = obj.regionName
			},
			//主机厂所属事业部选择
			division(val) {
				this.hostPlant.tsCompanyId = null
				this.tsCompanyList = []
				this.hostPlant.tsFactoryId = null
				this.tsFactoryList = []
				this.hostPlant.tsWareHouseId = null
				this.tsWarehouseList = []
				let p = {
					"pageNum": 1,
					"pageSize": 999,
					"tsDivisionIds": [val]
				}
				companyLoadData(p).then(res => {
					this.tsCompanyList = res.repData.list
				})
			},
			//主机厂所属公司选择
			company(val) {
				this.hostPlant.tsFactoryId = null
				this.tsFactoryList = []
				this.hostPlant.tsWareHouseId = null
				this.tsWarehouseList = []
				let p = {
					"tsCompanyId": val
				}
				factory(p).then(res => {
					this.tsFactoryList = res.repData
				})
			},
			//主机厂工厂下拉
			factoryChange(val) {
				this.hostPlant.tsWareHouseId = null
				this.tsWarehouseList = []
				let p = {
					"tsFactoryId": val
				}
				wareHouse(p).then(res => {
					this.tsWarehouseList = res.repData
				})
			},
			//所属部门下拉
			depar(val) {
				//所属科室
				getByParentValueId({
					"id": val
				}).then(res => {
					this.officeList = res.repData
				})
				this.hostPlant.office = null
				this.thighList = []
				this.hostPlant.thigh = null
				this.sectionList = []
				this.hostPlant.section = null
				this.teamList = []
				this.hostPlant.team = null
				this.postList = []
				this.hostPlant.post = null
			},
			//所属科室下拉
			Department(val) {
				//所属股
				getByParentValueId({
					"id": val
				}).then(res => {
					this.thighList = res.repData
				})
				this.hostPlant.thigh = null
				this.sectionList = []
				this.hostPlant.section = null
				this.teamList = []
				this.hostPlant.team = null
				this.postList = []
				this.hostPlant.post = null
			},
			//所属股
			thigh(val) {
				//所属工段
				getByParentValueId({
					"id": val
				}).then(res => {
					this.sectionList = res.repData
				})
				this.hostPlant.section = null
				this.teamList = []
				this.hostPlant.team = null
				this.postList = []
				this.hostPlant.post = null
			},
			//所属工段下拉
			sectionChange(val) {
				//所属班组
				getByParentValueId({
					"id": val
				}).then(res => {
					this.teamList = res.repData
				})
				this.teamList = []
				this.hostPlant.team = null
				this.postList = []
				this.hostPlant.post = null
			},
			//所属班组
			trams(val) {
				//所属班组
				getByParentValueId({
					"id": val
				}).then(res => {
					this.postList = res.repData
				})
				this.postList = []
				this.hostPlant.post = null
			},
			//服务商------服务商名称下拉
			tsService(val) {
				//服务商部门
				loadDicValList({
					"code": "department"
				}).then(res => {
					this.sdepartmentList = res.repData
				})
				this.serviceProvider.department = null
				this.ssectionList = []
				this.serviceProvider.section = null
				this.steamList = []
				this.serviceProvider.team = null
				this.spostList = []
				this.serviceProvider.post = null
			},
			//服务商部门下拉
			tment(val) {
				//服务商工段
				getByParentValueId({
					"id": val
				}).then(res => {
					this.ssectionList = res.repData
				})
				this.serviceProvider.section = null
				this.steamList = []
				this.serviceProvider.team = null
				this.spostList = []
				this.serviceProvider.post = null
			},
			//服务商工段下拉
			tion(val) {
				//服务商班组
				getByParentValueId({
					"id": val
				}).then(res => {
					this.steamList = res.repData
				})
				this.serviceProvider.team = null
				this.spostList = []
				this.serviceProvider.post = null

			},
			//班组下拉
			tram(val) {
				//服务商岗位
				getByParentValueId({
					"id": val
				}).then(res => {
					this.spostList = res.repData
				})
				this.serviceProvider.post = null

			},
			//返回
			retu() {
				this.$router.push({
					path: '/Personnel',
					query: {}
				});
			},
			//保存
			saveAdd() {
				let self = this
				let flag = ''
				let insertSystemUserBaseInfoRequest = this.base
				let InsertUserHostPlantRequest = this.hostPlant
				let InsertUserServiceProviderRequest = this.serviceProvider
				this.base.idUrl = this.base.idUrlA + "," + this.base.idUrlB
				if (this.base.idName == '' || this.base.idName == null) {
					this.$message({
						message: '请输入姓名',
						type: 'warning'
					});
					return
				}
				var regu = "^[ ]+$";
				var re = new RegExp(regu);
				if(re.test(this.base.idName)){
					this.$message({
						message: '姓名不能为空',
						type: 'warning'
					});
					return false
				}
				if (this.base.idName.length > 10) {
					this.$message({
						message: '请输入10个汉字以内的角色名称',
						type: 'warning'
					});
					return
				}
				if(this.base.idNo != ''&&this.base.idNo != null){
					if(this.base.idNo.length != 18){
						this.$message({
							message: '请输入18位数的身份证号码',
							type: 'warning'
						});
						return
					}
				}
				if(this.base.phone != ''&&this.base.phone!= null){
					if(this.base.phone.length != 11){
						this.$message({
							message: '请输入11位数的手机号码',
							type: 'warning'
						});
						return
					}
				}
				
				if (this.baseFlag == true) {
					if (this.serviceProviderFlag == true || this.hostPlantFlag == true) {
						flag = 3
						if (self.base.belongType == 1) {
							InsertUserServiceProviderRequest = null
						} else {
							InsertUserHostPlantRequest = null
						}
					} else {
						flag = 1
						InsertUserServiceProviderRequest = null
						InsertUserHostPlantRequest = null
					}
				} else {
					if (this.serviceProviderFlag == false && this.hostPlantFlag == false) {
						flag = 0
						InsertUserServiceProviderRequest = null
						InsertUserHostPlantRequest = null
					} else {
						flag = 2
						if (self.base.belongType == 1) {
							InsertUserServiceProviderRequest = null
						} else {
							InsertUserHostPlantRequest = null
						}
					}
				}
				let p = {
					"flag": flag,
					"insertSystemUserBaseInfoRequest": insertSystemUserBaseInfoRequest,
					"insertUserHostPlantRequest": InsertUserHostPlantRequest,
					"insertUserServiceProviderRequest": InsertUserServiceProviderRequest,
					"tsUserId": this.id
				}
				updateSystemUser(p).then(res => {
					if (res.repCode != '0000') {
						this.$message({
							message: res.repMsg,
							type: 'warning'
						});
						return false
					} else if (res.repCode == '0000') {
						this.$message({
							message: '修改成功',
							type: 'success'
						});
						setTimeout(function() {
							self.$router.push({
								path: '/Personnel',
								query: {}
							});
						}, 500)
					}
				})
			},
			loadData() {
				var self = this
				getUserInfo({
					"userId": this.id
				}).then(res => {
					//基础信息
					this.base.idNo = res.repData.idNo //身份证
					this.base.userName = res.repData.userName //登录名
					this.base.idName = res.repData.idName //姓名
					// this.base.householdRegister = res.repData.householdRegister //户籍
					this.base.phone = res.repData.phone //手机
					this.base.imgUrl = res.repData.imgUrl
					if (res.repData.imgUrl != '') {
						this.imgFlag = false
					}
					if (res.repData.city != 0 && res.repData.city != null) {
						this.base.city = Number(res.repData.city) //市
					} else {
						this.base.city = '' //市
					}
					this.base.cityName = res.repData.cityName //市
					if (res.repData.idUrl != null) {
						res.repData.idUrl.split(",")
						this.base.idUrlA = res.repData.idUrl.split(",")[0]
						this.base.idUrlB = res.repData.idUrl.split(",")[1]
					}
					this.base.address = res.repData.address //地址
					if (res.repData.sex != 0 && res.repData.sex != null) {
						this.base.sex = res.repData.sex //性别
					} else {
						this.base.sex = '' //性别
					}
					if (res.repData.province != 0 && res.repData.province != null) {
						this.base.province = Number(res.repData.province) //省
					} else {
						this.base.province = '' //省
					}
					this.base.provinceName = res.repData.provinceName //省
					if (res.repData.province != '') {
						self.city(Number(res.repData.province))
						this.base.cityName = res.repData.cityName //省
					}
					this.radio = res.repData.belongType
					this.base.belongType = res.repData.belongType
					// this.radio = 2
					this.switching(res.repData.belongType)
					//主机厂
					if (res.repData.belongType == 1) {
						self.hostPlant.tsDivisionId = res.repData.tsDivisionId
						if (res.repData.tsDivisionId != null && res.repData.tsDivisionId != 0) { //服务商不为空加载公司list
							self.division(res.repData.tsDivisionId)
						}
						if (res.repData.tsCompanyId != null && res.repData.tsCompanyId != 0) { //所属公司不为空加载工厂list
							self.company(res.repData.tsCompanyId)
							self.hostPlant.tsCompanyId = res.repData.tsCompanyId
						} else {
							self.hostPlant.tsCompanyId = ''
						}
						if (res.repData.tsFactoryId != null && res.repData.tsFactoryId != 0) { //所属工厂不为空加载仓库
							self.factoryChange(res.repData.tsFactoryId)
							self.hostPlant.tsFactoryId = res.repData.tsFactoryId
						} else {
							self.hostPlant.tsFactoryId = ''
						}
						if(res.repData.tsWareHouseId!= null&&res.repData.tsWareHouseId != 0){//所属仓库
							this.hostPlant.tsWareHouseId = res.repData.tsWareHouseId
						}else{
							this.hostPlant.tsWareHouseId = ''
						}
						if (res.repData.tsMotorcadeId != null && res.repData.tsMotorcadeId != 0) {
							self.hostPlant.tsMotorcadeId = Number(res.repData.tsMotorcadeId)
						} else {
							self.hostPlant.tsMotorcadeId = ''
						}
						if (res.repData.department != null && res.repData.department != 0) { //部门不为空加载科室
							self.hostPlant.department = Number(res.repData.department)
							self.depar(res.repData.department)
						} else {
							self.hostPlant.department = ''
						}
						if (res.repData.office != null && res.repData.office != 0) { //科室不为空加载股
							self.Department(res.repData.office)
							self.hostPlant.office = Number(res.repData.office)
						} else {
							self.hostPlant.office = ''
						}
						if (res.repData.thigh != null && res.repData.thigh != 0) { //股不为空加载工段
							self.hostPlant.thigh = Number(res.repData.thigh)
							self.thigh(res.repData.thigh)
						} else {
							self.hostPlant.thigh = ''
						}
						if (res.repData.section != null && res.repData.section != 0) { //所属工段不为空加载班组
							self.sectionChange(res.repData.section)
							self.hostPlant.section = Number(res.repData.section)
						} else {
							self.hostPlant.section = ''
						}
						if (res.repData.team != null && res.repData.team != 0) { //所属工段不为空加载班组
							self.trams(res.repData.section)
							self.hostPlant.team = Number(res.repData.team)
						} else {
							self.hostPlant.team = ''
						}
						if (res.repData.post != null && res.repData.post != 0) {
							self.hostPlant.post = Number(res.repData.post)
						} else {
							self.hostPlant.post = ''
						}
					} else if (res.repData.belongType == 2) {
						if (res.repData.tsServiceProviderId != null&&res.repData.tsServiceProviderId!=0) { //服务商不为空加载部门
							self.serviceProvider.tsServiceProviderId = Number(res.repData.tsServiceProviderId)
							loadDicValList({
								"code": "department"
							}).then(res => {
								this.sdepartmentList = res.repData
							})
						}else{
							self.serviceProvider.tsServiceProviderId = ''
						}
						if (res.repData.sdepartment != null && res.repData.sdepartment != 0) { //部门不为空加载工段
							self.tment(res.repData.sdepartment)
							self.serviceProvider.department = Number(res.repData.sdepartment)
						} else {
							self.serviceProvider.department = ''
						}
						if (res.repData.ssection != null && res.repData.ssection != 0) { //工段不为空加载班组
							self.tion(res.repData.ssection)
							self.serviceProvider.section = Number(res.repData.ssection)
						} else {
							self.serviceProvider.section = ''
						}
						if (res.repData.steam != null && res.repData.steam != 0) { //班组不为空加载岗位
							self.tram(res.repData.steam)
							self.serviceProvider.team = Number(res.repData.steam)
						} else {
							self.serviceProvider.team = ''
						}
						if(res.repData.spost!=null && res.repData.spost!=0){
							self.serviceProvider.post = Number(res.repData.spost)
						}else{
							self.serviceProvider.post = ''
						}
					}

					this.province()
					setTimeout(function() {
						self.baseFlag = false
						self.serviceProviderFlag = false
						self.hostPlantFlag = false
					}, 500)
				})
			}
		},
		mounted() {

		},
		created() {
			this.id = this.$route.query.id
			let user = sGet('_WHUser');
			this.headers.token = user.token;
			this.loadData()
		}
	};
</script>

<style scoped lang="less">
	.img {
		width: 130px;
		display: inline-block;
		height: 160px;
		border: 2px dashed #CCCCCC;
		position: relative;
		text-align: center;
	}

	.icon {
		line-height: 160px;
		font-size: 50px;
		color: #ccc;
	}

	.imgStyle {
		width: 130px;
		height: 160px;
		position: absolute;
		top: 0;
		left: 0;
	}

	.deleteImg {
		position: absolute;
		right: 5px;
		top: 0;
		font-size: 20px;
		color: red;
		cursor: pointer;
		z-index: 9999;
	}

	.identityStyle {
		width: 300px;
		height: 160px;
		border: 2px dashed #CCCCCC;
		float: left;
		margin-left: 30px;
		text-align: center;
		position: relative;
	}

	.headInformation {
		width: 100%;
		height: 60px;
	}

	.headImg {
		height: 25px;
		width: 25px;
		margin: 17px 0 0 17px;
		float: left;
	}

	.baseInformation {
		line-height: 60px;
		margin-left: 20px;
		color: #356FF2;
		font-weight: 900;
	}

	//图片上传
	.avatar-uploader {
		width: 130px;
		display: inline-block;
		height: 160px;
		border: 2px dashed #CCCCCC;
		/*margin-left: 200px;*/
	}

	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 130px;
		height: 160px;
		line-height: 160px;
		text-align: center;
	}

	.avatar {
		width: 130px;
		height: 160px;
		display: block;
	}

	.title-group {
		padding-top: 20px;
	}
</style>
