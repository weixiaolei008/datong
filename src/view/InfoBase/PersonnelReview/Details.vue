<!-- 人员能级管理/详情 -->
<template>
	<div style="height: 100%;overflow: auto;">
		<div style="position: relative">
			<div class="title-group">
				<div class="icon-title img-title">基础信息</div>
			</div>
			<div style="padding-right: 165px" class="clearfix">
				<!-- input 输入框 -->
				<div class="input-box">
					<label class="input-label">姓名</label>
					<span class="input-span" v-text="base.idName"></span>
				</div>
				<!-- input 输入框 -->
				<div class="input-box">
					<label class="input-label">性别</label>
					<span class="input-span" v-text="base.sex"></span>
				</div>

				<!-- input 输入框 -->
				<div class="input-box">
					<label class="input-label">身份证号</label>
					<span class="input-span" v-text="base.idNo"></span>
				</div>
				<!-- input 输入框 -->
				<div class="input-box">
					<label class="input-label">手机号</label>
					<span class="input-span" v-text="base.phone"></span>
				</div>
				<!-- input 输入框 -->
				<div class="input-box">
					<label class="input-label">家庭地址</label>
					<span class="input-span" v-text="base.address"></span>
				</div>
				<!-- input 输入框 -->
				<div class="input-box">
					<label class="input-label">省/自治区</label>
					<span class="input-span" v-text="base.province"></span>
				</div>
				<!-- input 输入框 -->
				<div class="input-box">
					<label class="input-label">市</label>
					<span class="input-span" v-text="base.city"></span>
				</div>
				<!-- input 输入框 -->
				<!-- <div class="input-box">
					<label class="input-label">户籍</label>
					<span style="width: 400px;" class="input-span" v-text="base.householdRegister"></span>
				</div> -->
			</div>
			<div style="position: absolute; top: 60px;right: 30px;">
				<div class="avatar-uploader">
					<img alt="" :src="imageUrl" class="avatar">
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
			</div>
			<!-- input 输入框 -->
			<div class="input-box">
				<label class="input-label">服务商名称</label>
				<span class="input-span" v-text="serviceProvider.serviceProviderName"></span>
			</div>
			<!-- input 输入框 -->
			<div class="input-box">
				<label class="input-label">部门</label>
				<span class="input-span" v-text="serviceProvider.department"></span>
			</div>
			<!-- input 输入框 -->
			<div class="input-box">
				<label class="input-label">工段</label>
				<span class="input-span" v-text="serviceProvider.section"></span>
			</div>
			<!-- input 输入框 -->
			<div class="input-box">
				<label class="input-label">班组</label>
				<span class="input-span" v-text="serviceProvider.team"></span>
			</div>
			<!-- input 输入框 -->
			<div class="input-box">
				<label class="input-label">岗位</label>
				<span class="input-span" v-text="serviceProvider.post"></span>
			</div>
		</div>
		<div style="text-align: center;float: left;width: 100%;margin-bottom: 30px;">
			<el-button class="" style="margin-right: 10px;" size="medium" @click="retu">返回</el-button>
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
		updateSystemUser,
		getSystemUserInfo
	} from "@/common/config/api/InfoBase"
	import {
		loadProCityList,
		loadDicValList,
		getByParentValueId
	} from "@/common/config/api/basic"

	export default {
		name: 'eCharts',
		components: {
		},
		data() {
			return {
				id: '',
				//基础信息
				baseFlag: true,
				base: {
					address: '', //地址
					belongType: '', //归属类型:1是主机厂，2是服务商 ,
					city: '', //市
					cityName: '', // 市名称,
					householdRegister: '', //户籍
					idName: '', //用户名
					idNo: '', //身份证
					idUrl: '', // 身份证照片地址， 多种逗号隔开,
					idUrlA: '', // 身份证照片地址，多种逗号,
					idUrlB: '', // 身份证照片地址，多种逗号,
					phone: '', //手机
					province: '', //省
					provinceName: '', // 省名称 ,
					userName: '', //用户登录名
					sex: '', //性别
				},
				//服务商
				serviceProvider: {
					department: '', //服务商部门
					post: '', //岗位
					section: '', //服务商工段
					team: '', //班组
					serviceProviderName: '', //服务商
				},
				imageUrl: '',
				energyLevel: '',
				experienceValue: '',
				trainCount: '',
				safetyValue: '',
				professionalDegree: '',
				accidentCount: '',
				operationCount: '',
			};
		},
		methods: {
			//返回
			retu() {
				this.$router.push({
					path: '/PersonnelReview',
					query: {}
				});
			},
			loadData() {
				var self = this
				getUserInfo({
					"userId": this.id
				}).then(res => {
					//基础信息
					this.base.userName = res.repData.userName //登录名
					this.base.idName = res.repData.idName //姓名
					this.base.idNo = res.repData.idNo //身份证
					this.base.householdRegister = res.repData.householdRegister //户籍
					this.base.phone = res.repData.phone //手机
					this.base.address = res.repData.address //地址
					this.base.province = res.repData.provinceName
					this.base.city = res.repData.cityName 
					this.imageUrl = res.repData.imgUrl
					if (res.repData.idUrl != null) {
						res.repData.idUrl.split(",")
						this.base.idUrlA = res.repData.idUrl.split(",")[0]
						this.base.idUrlB = res.repData.idUrl.split(",")[1]
					}
					if (res.repData.sex == 1) {
						this.base.sex = '男' //性别
					} else if (res.repData.sex == 2) {
						this.base.sex = '女' //性别
					} else {
						this.base.sex = '性别' //性别
					}
					this.serviceProvider.serviceProviderName = res.repData.serviceProviderName 
					this.serviceProvider.department = res.repData.sdepartmentName
					this.serviceProvider.section = res.repData.ssectionName
					this.serviceProvider.team = res.repData.steamName
					this.serviceProvider.post = res.repData.spostName
				})
			}
		},
		mounted() {

		},
		created() {
			this.id = this.$route.query.id
			this.loadData()
		}
	};
</script>

<style scoped lang="less">
	.details {
		float: left;
		width: 100px;
		text-align: center;
		margin-left: 20px;
	}

	.details p {
		line-height: 30px;
		font-size: 14px;

	}

	.details p:nth-child(1) {
		background: #538EFF;
		color: #fff;
		border-radius: 5px 5px 0 0;
	}

	.details p:nth-child(2) {
		background: #fff;
		color: #538EFF;
		border-radius: 0 0 5px 5px;
		border: 1px solid #538EFF;
	}

	.details p:nth-child(3) {
		color: #538EFF;
		text-decoration: underline;
		cursor: pointer;
	}

	.input-span {
		display: inline-block;
		width: 200px;
		line-height: 40px;
		font-size: 14px;
		color: #666;
		text-indent: 20px;
	}

	.input-lev {
		display: inline-block;
		width: 100px;
		line-height: 40px;
		font-size: 14px;
		color: #666;
		text-indent: 20px;
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
	.identityStyle {
		width: 300px;
		height: 160px;
		border: 2px dashed #CCCCCC;
		float: left;
		margin-left: 30px;
		text-align: center;
		position: relative;
	}
</style>
