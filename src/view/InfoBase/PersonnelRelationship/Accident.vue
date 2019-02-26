<!-- 人员能级管理/事故详情 -->
<template>
	<div>
		<div style="position: relative">
			<div class="title-group">
				<div class="icon-title img-title">事故信息</div>
			</div>
			<div class="btn-group clearfix" style="padding: 10px">
				<div class="btn-export"  @click="exportExcel"><span class="img-extend">导出</span></div>
			</div>
			<div class="clearfix">
				<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column prop='vin' label="VIN" width="200">
					</el-table-column>
					<el-table-column prop="carType" label="车型">
					</el-table-column>
					<el-table-column prop="businessType" label="业务类别">
					</el-table-column>
					<el-table-column prop="activity" label="作业活动">
					</el-table-column>
					<el-table-column prop="startDate" label="开始时间">
					</el-table-column>
					<el-table-column prop="endDate" label="截止时间">
					</el-table-column>
					<el-table-column prop="responsibility" label="事故责任">
					</el-table-column>
					<el-table-column prop="accidentType" label="事故类型">
					</el-table-column>
					<el-table-column prop="accidentPlace" label="事故地点">
					</el-table-column>
					<el-table-column prop="reportDescribe" label="事故描述">
					</el-table-column>
					<el-table-column prop="decideDescribe" label="处理结果">
					</el-table-column>
					<el-table-column prop="status" label="状态">
					</el-table-column>
				</el-table>
			</div>
			<div class="block">
				<span class="demonstration"></span>
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage"
				:page-size="pageSize" layout="prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>
		<div style="text-align: center;float: left;width: 100%;margin-top:20px ;">
			<el-button class="" style="margin-right: 10px;" size="medium" @click="retu">返回</el-button>
		</div>
	</div>
</template>

<script>
	import Table from '@/components/Table';
	import {
		getAccidentInfo,
		webExportUserAccInfo
	} from "@/common/config/api/InfoBase"
	export default {
		components: {
			Table
		},
		data() {
			return {
				id: '',
				pageNum: 1,
				pageSize: 30,
				tableData: [],
				currentPage:1,
				total:1,
				tsUserIds:[],
				idList:[]
			};
		},
		methods: {
			//导出
			exportExcel() {
				let self = this;
				let p;
				self.tsUserIds = [] 
				if (this.idList.length) {
					this.idList.forEach((item) => {
						self.tsUserIds.push(item.tsAbnormalReportId);
					})
					p = {
						"ids": self.tsUserIds,
						"userId": self.id
					}
				}
				webExportUserAccInfo(p).then(res => {
					window.location.href = res.repData
				})
			},
			//返回
			retu() {
				this.$router.push({
					path: '/RelationshipEdit',
					query: {
						id: this.id
					}
				});
			},
			//checkbox选中
			handleSelectionChange(val) {
				this.idList = val
				console.log(val)
			},
			//分页
			handleSizeChange(val) {
				
			},
			handleCurrentChange(val) {
				this.pageNum = val
				this.loadData()
			},
			handleSelectionChangeY(val) {
				console.log(val);
			},
			loadData() {
				var self = this
				getAccidentInfo({
					"pageNum": this.pageNum,
					"pageSize": this.pageSize,
					"userId": this.id,
					"ids": []
				}).then(res => {
					self.tableData = res.repData.list;
					self.total = res.repData.total;
				})
			}
		},
		mounted() {

		},
		created() {
			this.id = this.$route.query.id
			this.loadData()
		}
	}
</script>

<style scoped lang="less">
	.title-group {
		padding-top: 20px;
	}
	.el-pagination{
		text-align: center;
	}
</style>
