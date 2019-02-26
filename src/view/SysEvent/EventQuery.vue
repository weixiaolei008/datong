<!-- 异常事件申诉管理 -->
<template>
	<el-container style="width: 100%;height: 100%;">
		<el-header style="height: auto; padding: 0;">
			<!-- search-group -->
			<div class="search-group clearfix">
				<div class="input-box">
					<label class="input-label">VIN</label>
					<el-input type="textarea" :rows="2" v-model="fromData.vin">
					</el-input>
				</div>
				<div class="input-box">
		  <label class="input-label">作业活动</label>
		  <el-select style="width: 400px"
			  multiple
			collapse-tags
			v-model="fromData.activityCodes" >
			<el-option v-for="item in this.activityInfoList"
			  :key="item.code"
			  :label="item.name"
			  :value="item.code">
			</el-option>
		  </el-select>
		</div>
				<div class="input-box">
		  <label class="input-label">申诉时间</label>
		  <el-date-picker
			v-model="fromData.commandDate"
			type="datetimerange"
			value-format="yyyy-MM-dd HH-mm-ss"
			range-separator="至"
			start-placeholder="开始日期"
			end-placeholder="结束日期">
		  </el-date-picker>
		</div>
		<div class="search-box">
			<div class="search-reset" @click="cleanFrom"><span class="img-reset">清空</span></div>
		  <div class="search-sub" @click="searchFrom"><span class="img-sub">搜索</span></div>
		</div>
			</div>
			<div class="btn-group clearfix">
				<div class="btn-export" @click="exportBtn"><span class="img-extend">导出</span></div>
			</div>
		</el-header>
		<el-main class="table" style='padding: 10px;'>
			<Table :data='tableData'
				@selection-change="handleSelectionChange"
				@current-change="handleCurrentChange">
				<template slot-scope="{scope}" slot="name">
					<div>{{scope.row.name}}</div>
				</template>
			</Table>
		</el-main>
	</el-container>
</template>

<script>
	import Table from '@/components/Table';
	import {getReportList, getActivityInfo, webExportAbnormal} from "@/common/config/api/SysEvent";
	export default {
		name: 'EventQuery',
		components: { Table },
		watch: {
	  options: {
		handler: function(val) {
		},
		deep: true
	  }
	},
	computed:{
	  options: {
		get(){
		  return this.$store.state.codeOptions.options;
		}
	  }
	},
		data() {
			return {
				currentPage: 1,
				tableSelectId: [],
				activityInfoList: [],//作业活动
				fromData: {
					vin: null,
					activityCodes: [],
					commandDate: null
				},
				tableData: {
					selectShow: true,
		  tableHeight: 0,
		  currentPage: 1,
		  total: 0, //列表总数
		  listData: [],
					tableHead: [
						{
							name: 'VIN',
							value: 'vin',
							width: '200'
						},
						{
							name: '提报人',
							value: 'reportPerson'
						},
						{
							name: '车型',
							value: 'vehicleType'
						},
						{
							name: '作业活动',
							value: 'activityName',
							width: '200'
						},
						{
							name: '事故类型',
							value: 'accidentType',
						},
						{
							name: '责任人1',
							value: 'resUserName1',
						},
						{
							name: '责任1',
							value: 'responsibility1',
						},
						{
							name: '责任人2',
							value: 'resUserName2',
						},
						{
							name: '责任2',
							value: 'responsibility2',
						},
						{
							name: '车身',
							value: 'body',
						},
						{
							name: '车灯',
							value: 'headlights',
						},
						{
							name: '轮胎',
							value: 'tire',
						},
						{
							name: '玻璃',
							value: 'glass',
						},
						{
							name: '仪表',
							value: 'instrument',
						},
						{
							name: '座椅',
							value: 'seat',
						},
						{
							name: '其他',
							value: 'others',
							width: '200'
						}
					],
				},
			};
		},
		methods: {
			handleSelectionChange(val) {
				this.tableSelectId = val;
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.loadList();
			},
			searchFrom(){
				this.loadList();
			},
			cleanFrom(){
				this.fromData = {
					vin: null,
					activityCodes: [],
					commandDate: null
				};
				// this.loadList();
			},
			getActivityInfoList() {
				getActivityInfo({}).then(res => {
					if(res.repData) {
						this.activityInfoList = res.repData;
					}
				})
			},
			fromVal(num) {
				var p = {
					"pageNum": this.currentPage,
					"pageSize": 30,
					"activityCodes":this.fromData.activityCodes.length > 0 ? this.fromData.activityCodes : null, //作业活动
					"endDate": this.fromData.commandDate ? this.fromData.commandDate[1] : null,
					"startDate": this.fromData.commandDate ? this.fromData.commandDate[0] : null,
					"vin": jQuery.trim(this.fromData.vin),
				}
				if(num == 2) {
					let arr = [];
					if(this.tableSelectId.length > 0){
						this.tableSelectId.forEach((item) => {
							arr.push(item.tsAbnormalReportId);
						})
					}
					p.ids = arr.length > 0 ? arr : null;
				}
				return p;
			},
			loadList() {
				getReportList(this.fromVal(1)).then(res => {
					if(res.repData) {
						this.tableData.total = res.repData.total;
						this.tableData.listData = res.repData.list;
					}
				})
			},
			exportBtn() {
				webExportAbnormal(this.fromVal(2)).then(res => {
					if(res.repData){
						window.location.href = res.repData;
					}
				})
			}
		},
		created() {
			this.loadList();
			this.getActivityInfoList();
			}
		};
</script>

<style scoped lang="less">

</style>
