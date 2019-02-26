<!-- 人员权限管理/权限 -->
<template>
	<el-container style="width: 100%;height: 100%;overflow: auto;">
		<el-header style="height: auto; padding: 0;margin: 0 8px;min-width: 900px;">
			<div class="headInformation">
				<div class="title-group">
					<div class="icon-title img-title">基础信息</div>
					<el-switch style='margin-left: 30px;' v-model="authFlag" :active-value="1" :inactive-value="0" active-color="#13ce66"
					 inactive-color="#ff4949" active-text="启用" inactive-text="禁用" @change='switchChange'>
					</el-switch>
				</div>

			</div>
			<div>
				<div class="tree">
					<span>作业点设置:</span>
					<div style="width: 500px;height: 30px;float: right;">

					</div>
					<div style="width: 498px;height: 300px;float: right;border: 1px solid #ccc;overflow: auto;">
						<el-tree :data="data" ref="tree" show-checkbox node-key="primaryKey" :default-checked-keys="userInfo" :props="defaultProps">
						</el-tree>
					</div>
					<div style="width: 500px;height: 30px;float: left;font-size: 12px;color: #ccc;margin-top: 10px;">
						<!-- 用户提示:请对应选择您需要授权的用户权限对应的层级范围，只需选择需要的层级内容，否则按照最小层内容为准 -->
					</div>
				</div>
				<div class="tree">
					<span><i style="width:20px;text-align: center;display:inline-block;color: red;">*</i>操作角色:</span>
					<div style="width: 500px;height: 30px;float: right;">
					</div>
					<div style="width: 498px;height: 300px;float: right;border: 1px solid #ccc;overflow: auto;">
						<el-tree :data="data1" ref="tree1" show-checkbox node-key="tsRoleId" :default-expanded-keys="[]"
						 :default-checked-keys="userInfoList" :props="defaultProp">
						</el-tree>
					</div>
				</div>
				<div style="text-align: center;float: left;width: 100%;">
					<el-button class="" style="margin-right: 10px;" size="medium" @click="retu">返回</el-button>
					<el-button class="" style="margin-right: 15px;" type="primary" @click="saveAdd" size="medium">保存</el-button>
				</div>
			</div>

		</el-header>


	</el-container>
</template>
<script>
	import {
		getTreeList,
		roleList,
		userStatu,
		userWorkLocation,
		userRole,
		userRoleLocation
	} from "@/common/config/api/InfoBase"
	export default {
		name: '',
		data() {
			return {
				id: '',
				url: '',
				authFlag: 0,
				radio: '',
				data: [],
				userInfo: [],
				userInfoList: [],
				defaultProps: {
					children: 'childList',
					label: 'name'
				},
				defaultProp: {
					children: 'childList',
					label: 'roleName'
				},
				data1: [],
				num: 1,
			};
		},
		methods: {
			//启用禁用
			switchChange(val) {

			},
			//返回
			retu() {
				this.$router.push(this.url)
			},
			//保存
			saveAdd() {
				let self = this
				let userList = this.$refs.tree.getCheckedNodes(true, true)
				let data = this.$refs.tree1.getCheckedNodes(true, true)
				this.num = 1
				if (data.length == 0) {
					this.$message({
						message: '角色不能为空',
						type: 'warning'
					});
					return false
				}
				let idList = []
				for (var i = 0; i < data.length; i++) {
					idList.push(data[i].tsRoleId)
				}
				//作业点
				userWorkLocation({
					"orgRequestList": userList,
					"userId": this.id
				}).then(res => {
					if (res.repCode != '0000') {
						this.msgInfo(res.repMsg)
					} else {
						//角色
						userRole({
							"roleIds": idList,
							"tsUserId": this.id
						}).then(res => {
							if (res.repCode != "0000") {
								this.msgInfo(res.repMsg)
							} else {
								//启用禁用
								userStatu({
									"authFlag": this.authFlag,
									"tsUserId": this.id
								}).then(res => {
									if (res.repCode != "0000") {
										this.msgInfo(res.repMsg)
									} else {
										this.$message({
											message: '保存成功',
											type: 'success'
										});
										setTimeout(function() {
											self.$router.push(self.url)
										}, 500)
									}
								})
							}
						})
					}
				})
				
			},

			loadData() {
				var self = this
				setTimeout(function() {
					//作业点树
					getTreeList().then(res => {
						self.data = res.repData
					})
					//角色树
					roleList({
						"pageNum": 1,
						"pageSize": 9999,
						"roleName": ""
					}).then(res => {
						self.data1 = res.repData.list
					})
				}, 200)

				//角色作业点反选
				userRoleLocation({
					"tsUserId": this.id
				}).then(res => {
					self.authFlag = res.repData.authFlag
					this.userInfo = res.repData.workLocationList
					this.userInfoList = res.repData.roleList
				})
			},
		},
		mounted() {

		},
		created() {
			this.id = this.$route.query.id
			this.url = this.$route.query.url
			this.loadData()
		}
	};
</script>

<style scoped lang="less">
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

	.tree {
		width: 600px;
		height: 360px;
		float: left;
		margin-bottom: 30px;
	}

	.tree span {
		display: inline-block;
		width: 100px;
		height: 360px;
		text-align: center;
		font-size: 14px;
		line-height: 30px;
		color: #666;
		float: left;
	}

	.title-group {
		margin-top: 20px;
	}

	.title-group .icon-title {
		font-size: 16px;
		font-weight: bold;
		color: #796AC1;
		padding-left: 30px;
		display: inline-block;
		position: relative;
	}
</style>
