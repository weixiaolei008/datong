<!-- 领用车辆出库计划-已创建 -->
<template>
	<el-container style="width: 100%;height: 100%;">
		<el-header style="height: auto; padding: 0;">
			<!-- search-group -->
			<div class="search-group clearfix">
				<div :class="pop?'search-up':'search-more'" @click="searchMore"></div>
				<el-collapse-transition>
					<div v-show="pop" class="search-pop clearfix">
						<!-- 单选下拉框 -->
						<div class="input-box">
							<label class="input-label">按车型</label>
							<el-select v-model="type" placeholder="请选择车型">
								<el-option v-for="item in options.vehicle_type" :key="item.code" :label="item.name" :value="item.code">
								</el-option>
							</el-select>
						</div>
						<!-- 单选下拉框 -->
						<div class="input-box">
							<label class="input-label">点位信息</label>
							<el-select v-model="pointLocation" placeholder="请选择点位信息">
								<el-option v-for="item in options.point_location" :key="item.code" :label="item.name" :value="item.code">
								</el-option>
							</el-select>
						</div>
						<!-- 单选下拉框 -->
						<div class="input-box">
							<label class="input-label">按颜色</label>
							<el-select v-model="color" placeholder="请选择颜色">
								<el-option v-for="item in options.color" :key="item.code" :label="item.name" :value="item.code">
								</el-option>
							</el-select>
						</div>
						<!-- 单选下拉框 -->
						<div class="input-box">
							<label class="input-label">车型级</label>
							<el-select v-model="typeLevel" placeholder="请选择车型级">
								<el-option v-for="item in options.vehicle_type_level" :key="item.code" :label="item.name" :value="item.code">
								</el-option>
							</el-select>
						</div>
						<!-- 单选下拉框 -->
						<div class="input-box">
							<label class="input-label">车辆种类</label>
							<el-select v-model="category" placeholder="请选择车辆种类">
								<el-option v-for="item in options.vehicle_category" :key="item.code" :label="item.name" :value="item.code">
								</el-option>
							</el-select>
						</div>
						<!-- 单选下拉框 -->
						<div class="input-box">
							<label class="input-label">销售区域</label>
							<el-select v-model="salesArea" placeholder="请选择运输方式">
								<el-option v-for="item in options.sales_area" :key="item.code" :label="item.name" :value="item.code">
								</el-option>
							</el-select>
						</div>
						<!-- 单选下拉框 -->
						<div class="input-box">
							<label class="input-label">按驱动方式</label>
							<el-select v-model="driveMode" placeholder="请选择驱动方式">
								<el-option v-for="item in options.drive_mode" :key="item.code" :label="item.name" :value="item.code">
								</el-option>
							</el-select>
						</div>
					</div>
				</el-collapse-transition>
				<!-- 文本域 -->
				<div class="input-box">
					<label class="input-label">VIN码</label>
					<el-input type="textarea" :rows="2" placeholder="请输入VIN" v-model="textarea">
					</el-input>
				</div>
				<!-- 时间 -->
				<div class="input-box">
					<label class="input-label">计划创建时间</label>
					<el-date-picker v-model="commond" type="datetimerange"  value-format="yyyy-MM-dd HH-mm-ss" range-separator="至" start-placeholder="开始日期"
					 end-placeholder="结束日期">
					</el-date-picker>
				</div>
				<!-- 单选下拉框 -->
				<div class="input-box">
					<label class="input-label">当前仓库</label>
					<el-select v-model="currentWarehouseId" placeholder="请选择当前仓库">
						<el-option v-for="item in options.warehouse_code" :key="item.code" :label="item.name" :value="item.code">
						</el-option>
					</el-select>
				</div>
				<!-- 单选下拉框 -->
				<div class="input-box">
					<label class="input-label">状态</label>
					<el-select v-model="status" placeholder="请选择状态">
						<el-option v-for="item in options.plan_status" :key="item.code" :label="item.name" :value="item.code">
						</el-option>
					</el-select>
				</div>
				<!-- 单选下拉框 -->
				<div class="input-box">
					<label class="input-label">是否超期</label>
					<el-select v-model="isOverdue" placeholder="请选择是否超期">
						<el-option v-for="item in options.yes_or_no" :key="item.code" :label="item.name" :value="item.code">
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
			<Table :data='tableData' @selection-change="handleSelectionChange" @size-change="handleSizeChange" @current-change="handleCurrentChange">
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
		getSplitString,
		w200,
		w150
	} from "@/common/config/utils"
	import {
		wareHouse
	} from "@/common/config/api/SysWindows"
	import {
		receivecarSelect,
		receivecarCreate,
		receivecarExcel
	} from "@/common/config/api/PlanManage"
	export default {
		name: 'Example',
		components: {
			Table,
		},
		data() {
			return {
				listIds:[],
				ids:[],//导出id集合
				pageNum:1,
				pageSize:30,
				type: '', //车型
				pointLocation: '', //点位
				color: '', //颜色
				typeLevel: '', //车型级
				category: '', //车辆种类
				salesArea: '', //销售区域
				driveMode: '', //驱动方式
				currentWarehouseId: '', //当前仓库
				status:"",//状态
				isOverdue :'',//是否超期
				isOverdueList:[
					{"name":"否","code":0},
					{"name":"是","code":1},
				],
				pop: false,
				textarea: '',
				commond: [],//指令下达时间
				expectBorrow:[],//预计借车时间
				expectReturn:[],//库改时间
				selectValue1: '',
				options1: [{
						value: '选项1',
						label: '长安VDC'
					},
					{
						value: '选项2',
						label: '张泾VDC'
					}
				],
				editFormData: {
					name: "",
					description: "",
					length: "",
					remark: ""
				},
				tableData: {
					selectShow: true, //Checkbox
					tableHeight: 0, //高度
					currentPage: 1, //总数
					total: 3, //列表总数
					listData:[],
					operations: [],
					tableHead: [{
							name: '申请用途',
							value: 'purpose',
						},
						{
							name: '申请部门',
							value: 'applyDepartment'
						},
						{
							name: 'VIN码',
							value: 'vin',
							width:w200
						},
						{
							name: '车型',
							value: 'vehicleType',
						},
						{
							name: '车型级',
							value: 'typeLevel',
						},
						{
							name: '车辆种类',
							value: 'category',
						},
						{
							name: '颜色',
							value: 'color',
							width:w150
						},
						{
							name: '销售区域',
							value: 'salesArea',
						},
						{
							name: '驱动方式',
							value: 'driveMode',
						},
						{
							name: '点位信息',
							value: 'pointLocation',
							width:100
						},
						{
							name: '始发仓库',
							value: 'origWarehouse',
						},
						{
							name: '目标仓库',
							value: 'desWarehouseId',
						},
						{
							name: '当前仓库',
							value: 'currentWarehouseId',
						},
						{
							name: '当前库区',
							value: 'currentFunctionalZone',
							width:100
						},
						{
							name: '当前库位',
							value: 'currentLocation',
							width:100
						},
						{
							name: '申请人',
							value: 'applicant',
						},
						{
							name: '联系方式',
							value: 'contact',
							width:w150
						},
						
						{
							name: '计划创建时间',
							value: 'createDate',
							width: w200
						},
						{
							name: '状态',
							value: 'status',
						},
						{
							name: '是否超期',
							value: 'isOverdue',
						},
						{
							name: '要求完成时间',
							value: 'requestFinishDate',
							width: w200
						},
						{
							name: '实际完成时间',
							value: 'actualFinishDate',
							width: w200
						},
						{
							name: '超期时长',
							value: 'overdueDuration',
							width: w200
						},

					], //表头
				},
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
			//导出
			exportExcel(){
				let self = this;
				let p;
				self.ids = []
				if(this.listIds.length){
					this.listIds.forEach((item) => {
						self.ids.push(item.ttPlanReceivecarId);
					})
					p = {
						"ids":self.ids,
						"listType": 1, //1 出库 2 预出库计划 3 入库 , ,
					}
				}else{
					p = {
						"category":this.category,// 车辆种类,
						"color":this.color,// 颜色,
						"commondEndDate":this.commond[1] ,//申请开始时间
						"commondStartDate":this.commond[0],// 申请开始时间 
						"currentWarehouseId":this.currentWarehouseId,// 当前仓库,
						"driveMode":this.driveMode,// 驱动方式,
						"expectBorrowEndDate":this.expectBorrow[1],// 预计领用借车时间结束时间 yyyy - mm - dd hh - mm - ss,
						"expectBorrowStartDate":this.expectBorrow[0],// 预计领用借车时间开始时间 yyyy - mm - dd hh - mm - ss,
						"expectReturnEndDate":this.expectReturn[1],// 预计领用归还时间结束时间 yyyy - mm - dd hh - mm - ss,
						"expectReturnStartDate":this.expectReturn[0],// 预计领用归还时间开始时间 yyyy - mm - dd hh - mm - ss,
						"isOverdue":this.isOverdue,// 是否超期0: 否1: 是,
						"listType":1,// 列表类型 1 出库 2 预出库计划 3 入库,
						"pageNum":this.pageNum,
						"pageSize":this.pageSize,
						"pointLocation":this.pointLocation,// 点位信息,
						"salesArea":this.salesArea,// 销售区域,
						"status":this.status,// 计划状态 1: 未执行2: 执行中3: 已执行,
						"transportWay":this.transportWay,// 运输方式,
						"type":this.type,// 车型,
						"typeLevel":this.typeLevel,// 车型级,
						"vin":getSplitString(this.textarea),// vin码
					}
				}
				receivecarExcel(p).then(res => {
					window.location.href = res.repData
				})
			},
			//重置
			reset() {
				this.category = ''// 车辆种类,
				this.color = ''// 颜色,
				this.commond = [] //申请开始时间
				this.currentWarehouseId = ''// 当前仓库,
				this.driveMode = ''// 驱动方式,
				this.expectBorrow = []// 预计领用借车时间结束时间 yyyy - mm - dd hh - mm - ss,
				this.expectReturn = []// 预计领用归还时间结束时间 yyyy - mm - dd hh - mm - ss,
				this.isOverdue = ''// 是否超期0: 否1: 是,
				this.pointLocation = ''// 点位信息,
				this.salesArea = ''// 销售区域,
				this.status = ''// 计划状态 1: 未执行2: 执行中3: 已执行,
				this.transportWay = ''// 运输方式,
				this.type = ''// 车型,
				this.typeLevel = ''// 车型级,
				this.textarea = ''// vin码
			},
			search(){
				this.loadData()
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
				this.pageNum = val
				this.loadData()
			},
			loadData() {
				var self = this
				let p = {
					"category":this.category,// 车辆种类,
					"color":this.color,// 颜色,
					"commondEndDate":this.commond[1] ,//申请开始时间
					"commondStartDate":this.commond[0],// 申请开始时间 
					"currentWarehouseId":this.currentWarehouseId,// 当前仓库,
					"driveMode":this.driveMode,// 驱动方式,
					"expectBorrowEndDate":this.expectBorrow[1],// 预计领用借车时间结束时间 yyyy - mm - dd hh - mm - ss,
					"expectBorrowStartDate":this.expectBorrow[0],// 预计领用借车时间开始时间 yyyy - mm - dd hh - mm - ss,
					"expectReturnEndDate":this.expectReturn[1],// 预计领用归还时间结束时间 yyyy - mm - dd hh - mm - ss,
					"expectReturnStartDate":this.expectReturn[0],// 预计领用归还时间开始时间 yyyy - mm - dd hh - mm - ss,
					"ids":[],// 领用车辆计划ID集合,
					"isOverdue":this.isOverdue,// 是否超期0: 否1: 是,
					"listType":1,// 列表类型 1 出库 2 预出库计划 3 入库,
					"pageNum":this.pageNum,
					"pageSize":this.pageSize,
					"pointLocation":this.pointLocation,// 点位信息,
					"salesArea":this.salesArea,// 销售区域,
					"status":this.status,// 计划状态 1: 未执行2: 执行中3: 已执行,
					"type":this.type,// 车型,
					"typeLevel":this.typeLevel,// 车型级,
					"vin":getSplitString(this.textarea),// vin码
				};
				receivecarSelect(p).then(res => {
					self.tableData.listData = res.repData.list;
					self.tableData.total = res.repData.total;
				})
			},
			searchMore() {
				this.pop = !this.pop
			},
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

</style>
