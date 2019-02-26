<!-- 参数设置 -->
<template>
	<el-container style="width: 100%;height: 100%;">
		<el-main class="table" style='padding: 10px;'>
			<div style="float: left;width: 100%;" v-for="(o,index) in dataList">
				<span style="display: block;text-indent: 30px;margin: 15px 0;" v-text="o[index-index].name"></span>
				<!-- input 输入框 -->
				<div class="input-box" v-for="(x,index) in o">
					<label class="input-label" v-text="x.description"></label>
					<el-input placeholder="请输入名称" :maxlength=4 type="text" clearable v-model="x.value"></el-input>
					<span v-text="x.unit" style="display: inline-block;line-height: 40px;width: 50px;text-align: center;font-size: 14px;"></span>
				</div>
			</div>
			<div style="text-align: center;" v-show="flag">
				<el-button style="margin-right: 10px;" @click="cancle">重置</el-button>
				<el-button type="primary" @click="save">保存</el-button>
			</div>
		</el-main>
	</el-container>
</template>

<script>
	import {
		parameterList,
		parameterUpdate
	} from "@/common/config/api/SysManage";
	export default {
		name: 'Example',
		data() {
			return {
				name: '',
				dataList: [],
				flag:false
			};
		},
		methods: {
			save() {
				let self = this
				let repData = []
				for (var i = 0; i < this.dataList.length; i++) {
					if (this.dataList[i].length == 1) {
						if (!isNaN(this.dataList[i][i - i].value)) {
							if (Math.floor(this.dataList[i][i-i].value) == this.dataList[i][i-i].value) {
								repData.push({
									"value": +this.dataList[i][i - i].value,
									"tsParameterId": this.dataList[i][i - i].tsParameterId
								})
							} else {
								this.$message({
									message: '参数值只允许大于等于0的整数',
									type: 'warning'
								});
								return
							}
						} else {
							this.$message({
								message: '参数值只允许大于等于0的整数',
								type: 'warning'
							});
							return
						}

					} else if (this.dataList[i].length > 1) {
						for (var k = 0; k < this.dataList[i].length; k++) {
							if (!isNaN(this.dataList[i][k].value)) {
								if (Math.floor(this.dataList[i][k].value) == this.dataList[i][k].value) {
									repData.push({
										"value": +this.dataList[i][k].value,
										"tsParameterId": this.dataList[i][k].tsParameterId
									})
								} else {
									this.$message({
										message: '参数值只允许大于等于0的整数',
										type: 'warning'
									});
									return
								}

							} else {
								this.$message({
									message: '参数值只允许大于等于0的整数',
									type: 'warning'
								});
								return
							}

						}
					}
				}
				parameterUpdate({
					"list": repData
				}).then(res => {
					if (res.repCode) {
						this.$message({
							message: '保存成功',
							type: 'success'
						});
						setTimeout(function() {
							self.loadData()
						}, 500)
					} else {
						this.msgInfo(res.repMsg);
					}
				})
			},
			cancle() {
				this.loadData()
			},
			//重置
			reset() {
				this.parameter = '';
				this.loadData()
			},
			//搜索
			search() {
				this.loadData()
			},
			loadData() {
				let self = this;
				parameterList().then(res => {
					this.dataList = res.repData;
          self.flag = true;
				})
			}
		},
		mounted() {

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

	.input-box .input-label {
		width: 190px;
		line-height: 40px;
		float: left;
		display: block;
		text-align: left;
		text-indent: 30px;
		margin-right: 15px;
		color: #666;
		font-size: 14px;
	}
</style>
