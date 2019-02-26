<!-- 人员能级管理/操作详情 -->
<template>
	<div>
		<div style="position: relative">
			<div class="title-group">
				<div class="icon-title img-title">操作信息</div>
			</div>
			<div class="btn-group clearfix" style="padding: 10px">
				<div class="btn-export" @click="exportExcel"><span class="img-extend">导出</span></div>
			</div>
			<div class="clearfix">
				<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
					<el-table-column prop='vin' label="VIN">
					</el-table-column>
					<el-table-column prop="type" label="车型">
					</el-table-column>
					<el-table-column prop="planName" label="业务类别">
					</el-table-column>
					<el-table-column prop="activityName" label="作业活动">
					</el-table-column>
					<el-table-column prop="taskStartTime" label="开始时间">
					</el-table-column>
					<el-table-column prop="taskEndDate" label="截止时间">
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
		serviceInfo,
		serviceExport
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
			};
		},
		methods: {
			//导出
			exportExcel() {
				serviceExport({
					"pageNum": this.pageNum,
					"pageSize": this.pageSize,
					"uid": this.id
				}).then(res => {
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
			handleSelectionChangeY(val) {
				console.log(val);
			},
			loadData() {
				var self = this
				serviceInfo({
					"pageNum": this.pageNum,
					"pageSize": this.pageSize,
					"uid": this.id,
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
