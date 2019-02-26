<!-- 人员权限管理/信用 -->
<template>
	<el-container style="width: 100%;height: 100%;overflow: auto;">
		<el-header style="height: auto; padding: 0;margin: 0 8px;min-width: 900px;">
			<div class="headInformation">
				<div class="title-group">
					<div class="icon-title img-title">基础信息</div>
					<span style="font-size: 14px;margin-left:30px;">黑名单:</span>
					<el-switch style='margin-left: 30px;' v-model="authFlag" :active-value="1" :inactive-value="0" active-text="启用黑名单"
					 inactive-text="撤销黑名单" @change='switchChange'>
					</el-switch>
					<div class="btn-group clearfix" style="display: inline-block;float: right;">
						<div class="btn-del" @click="del"><span class="img-del">删除</span></div>
						<div class="btn-add" @click="add"><span class="img-add">新增</span></div>
					</div>
				</div>
			</div>
		</el-header>
		<div>
			<el-table ref="multipleTable" :data="data" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange"
			 @size-change="handleSizeChange" @current-change="handleCurrentChange">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column prop="illegalTypeName" label="违规类型">
				</el-table-column>
				<el-table-column prop="illegalDescribe" label="描述">
				</el-table-column>
				<el-table-column prop="handler" label="处理人" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="handleDate" label="处理时间">
				</el-table-column>
			</el-table>
		</div>
		<div>
			<div style="text-align: center;float: left;width: 100%;margin-top: 20px;">
				<el-button class="" style="margin-right: 10px;" size="medium" @click="retu">返回</el-button>
				<!-- <el-button class="" style="margin-right: 15px;" type="primary" @click="saveAdd" size="medium">保存</el-button> -->
			</div>
		</div>

		<!--新增弹框-->
		<el-dialog title="新增用户违规信息" :visible.sync="popAddVisible" width="680px" center>
			<div class="clearfix">
				<!-- 单选下拉框 -->
				<div class="input-box">
					<label class="input-label"><span>*</span>违规类型</label>
					<el-select v-model="illegalType" placeholder="请选择违规类型">
						<el-option v-for="item in options.criminal_type" :key="item.tsDataDicId" :label="item.name" :value="item.tsDataDicId">
						</el-option>
					</el-select>
				</div>
				<!-- input 输入框 -->
				<div class="input-box">
					<label class="input-label"><span>*</span>描述</label>
					<el-input v-model="illegalDescribe" placeholder="请输入描述" clearable></el-input>
				</div>
				<!-- input 输入框 -->
				<div class="input-box">
					<label class="input-label"><span>*</span>处理人</label>
					<el-input v-model="handler" :maxlength=6 placeholder="请输入处理人" clearable></el-input>
				</div>
				<!-- input 输入框 -->
				<div class="input-box">
					<label class="input-label"><span>*</span>处理时间</label>
					<el-input v-model="handleDate" disabled='disabled'></el-input>
					</el-date-picker>
				</div>
				<div style="text-align: right;float: left;width: 100%;">
					<el-button class="" style="margin-right: 10px;" @click="popAddVisible = false" size="medium">返回</el-button>
					<el-button class="" style="margin-right: 15px;" type="primary" @click="saveUser"  :disabled='mediumClick' size="medium">保存</el-button>
				</div>
			</div>
		</el-dialog>
		<!--新增弹框-->
		<el-dialog title="撤销原因" :visible.sync="reasonType" width="425px" center>
			<div class="clearfix">
				<!-- input 输入框 -->
				<div class="input-box">
					<label class="input-label"><span>*</span>撤销原因</label>
					<el-input v-model="reason" :maxlength=50 placeholder="请输入撤销原因" clearable></el-input>
				</div>
				<div style="text-align: center;float: left;width: 100%;">
					<el-button class="" style="margin-right: 10px;" @click="reasonReturn" size="medium">返回</el-button>
					<el-button class="" style="margin-right: 15px;" type="primary" @click="reasonConfirm" size="medium">保存</el-button>
				</div>
			</div>
		</el-dialog>
	</el-container>
</template>
<script>
	import {
		userCredit,
		userAdd,
		userDelete,
		updateUserBlack,
		getUserInfo
	} from "@/common/config/api/InfoBase"
	export default {
		name: '',
		data() {
			return {
				mediumClick:false,
				id: '',
				authFlag: 0,
				data: [],
				popAddVisible: false,
				reasonType: false,
				illegalType: '',
				illegalDescribe: '',
				handler: '',
				handleDate: '',
				listIds: [],
				reason: '',
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
			userBlack() {
				let self = this
				let p = {
					"inBlackList": this.authFlag,
					"reason": this.reason,
					"tsUserId": this.id
				}
				updateUserBlack(p).then(res => {
					if (res.repCode == '0000') {
						self.$message({
							message: '设置成功',
							type: 'success'
						});
						this.reasonType = false
						this.loadData()
					} else {
						this.msgInfo(res.repMsg)
					}
				})
			},
			//黑名单启用禁用
			switchChange(val) {
				this.reason = ''
				if (val == 0) {
					this.reasonType = true
				} else {
					this.userBlack()
				}
			},
			//启用原因确认
			reasonConfirm() {
				if (this.reason == '') {
					this.$message({
						message: '请输入撤销原因',
						type: 'warning'
					});
					return false
				}
				var regu = "^[ ]+$";
				var re = new RegExp(regu);
				if(re.test(this.reason)){
					this.$message({
						message: '撤销原因不能为空',
						type: 'warning'
					});
					return false
				}
				this.userBlack()
			},
			//取消
			reasonReturn() {
				this.reasonType = false;
				this.authFlag = 1;
			},
			//新增
			add() {
				this.mediumClick = false
				this.popAddVisible = true
				var date = new Date();
				var seperator1 = "-";
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var strDate = date.getDate();
				if (month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if (strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
				}
				this.handleDate = year + seperator1 + month + seperator1 + strDate;

				this.handler = '' // 处理人， 人工填写,
				this.illegalDescribe = '' // 描述,
				this.illegalType = '' // 违规类型,
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
				console.log(this.listIds)
				for (var i = 0; i < this.listIds.length; i++) {
					ids.push(this.listIds[i].trUserIllegalInfoId)
				}
				console.log(ids)
				this.$confirm('请确认是否删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
				}).then(() => {
					//删除
					userDelete({
						"trUserIllegalInfoIds": ids
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
			//返回
			retu() {
				this.$router.push('/Personnel')
			},
			//新增
			saveAdd() {

			},
			//新增保存
			saveUser() {
				console.log(this.handleDate)
				if (this.illegalType == "") {
					this.$message({
						message: '请选择选择违规类型',
						type: 'warning'
					});
					return false
				}
				if (this.illegalDescribe == "") {
					this.$message({
						message: '请输入描述',
						type: 'warning'
					});
					return false
				}
				if (this.handler == "") {
					this.$message({
						message: '请输入处理人',
						type: 'warning'
					});
					return false
				}
				if (this.handleDate == "") {
					this.$message({
						message: '请输入处理时间',
						type: 'warning'
					});
					return false
				}
				let p = {
					"handleDate": this.handleDate, // 处理时间， 人工填写,
					"handler": this.handler, // 处理人， 人工填写,
					"illegalDescribe": this.illegalDescribe, // 描述,
					"illegalType": this.illegalType, // 违规类型,
					"tsUserId": this.id, // 处理对象ID,
				}
				userAdd(p).then(res => {
					if (res.repCode == '0000') {
						this.mediumClick = true
						this.$message({
							message: '新建成功',
							type: 'success'
						});
						this.popAddVisible = false
						this.loadData()
					} else {
						this.msgInfo(res.repMsg)
					}
				})
			},
			//checkbox选中
			handleSelectionChange(val) {
				console.log(val);
				this.listIds = val
			},
			//分页
			handleSizeChange(val) {
				console.log(val);
			},
			handleCurrentChange(val) {
				console.log(val);
			},
			loadData() {
				let self = this
				userCredit({
					"pageNum": 1,
					"pageSize": 30,
					"tsUserId": this.id
				}).then(res => {
					self.data = res.repData.list
				})
				getUserInfo({
					"userId": this.id
				}).then(res => {
					self.authFlag = res.repData.inBlackList
				})
			},
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
