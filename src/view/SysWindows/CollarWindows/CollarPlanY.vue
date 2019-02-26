<!-- 领用窗口/领用车辆计划/通知提车 -->
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
							<label class="input-label">按销售区域</label>
							<el-select v-model="salesArea" placeholder="请选择销售区域">
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
				<!-- 单选下拉框 -->
				<div class="input-box">
					<label class="input-label">当前仓库</label>
					<el-select v-model="currentWarehouseId" placeholder="请选择当前仓库">
						<el-option v-for="item in options.warehouse_code" :key="item.code" :label="item.name" :value="item.code">
						</el-option>
					</el-select>
				</div>
				<!-- 时间 -->
				<div class="input-box">
					<label class="input-label">指令下达时间</label>
					<el-date-picker v-model="timeValue" type="datetimerange" value-format="yyyy-MM-dd HH-mm-ss" range-separator="至"
					 start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
				</div>
				<div class="search-box">
					<div class="search-reset" @click="reset"><span class="img-reset">清空</span></div>
					<div class="search-sub" @click="search"><span class="img-sub">搜索</span></div>
				</div>
			</div>
			</div>
			<!-- btn-group -->
			<div class="btn-group clearfix">
				<div class="btn-inform" @click="notice"><span class="img-inform">通知提车</span></div>
				<div class="btn-export" @click="exportExcel"><span class="img-extend">导出</span></div>
			</div>
		</el-header>
		<el-main class="table" style='padding: 10px;'>
			<Table :data='tableData' @selection-change="handleSelectionChange" @size-change="handleSizeChange" @current-change="handleCurrentChange"  @handleEdit="handleEdit">
				<template slot-scope="{scope}" slot="name">
					<div>{{scope.row.name}}</div>
				</template>
			</Table>
		</el-main>
		
		<!--附件详情-->
		<el-dialog title="附件详情" :visible.sync="popAddVisible" width="680px" center>
			<div class="clearfix" style="position: relative;width: 630px;height: 550px;">
				<img style="width:100% ;height: 100%;" :src="attachment " alt=""/>
			</div>
		</el-dialog>
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
		receivecarList,
		extractCar,
		exportExcel
	} from "@/common/config/api/SysWindows"
	import {
		exportFile
	} from "@/common/config/utils"

	export default {
		name: 'Example',
		components: {
			Table,
		},
		data() {
			return {
				attachment:'',
				pageNum: 1,
				pageSize: 30,
				pop: false,
				"currentWarehouseId": '', //当前仓库 ,
				"status": '', //状态
				type: '', //车型
				pointLocation: '', //点位
				color: '', //颜色
				typeLevel: '', //车型级
				category: '', //车辆种类
				salesArea: '', //销售区域
				driveMode: '', //驱动方式
				listIds: [], //通知提车list
				currentWarehouseId: '', //当前仓库
				pop: false,
				popAddVisible: false,
				textarea: '',
				timeValue: [],
				ids:[],//导出id集合
				tableData: {
					selectShow: true, //Checkbox
					tableHeight: 0, //高度
					currentPage: 1, //总数
					total: 3, //列表总数
					listData: [],
					operations: [{
						label: '查看附件',
						width: '100',
						data: [{
							icon: 'icon-eye',
							Fun: 'handleEdit',
							id: '1',
						}]
					}, ],
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
						},
						{
							name: '当前仓库',
							value: 'currentWarehouseId',
						},
						{
							name: '申请人',
							value: 'applicant',
							width: 100,
						},
						{
							name: '指令下达时间',
							value: 'backCommandDate',
							width: w200,
						},
						{
							name: '状态',
							value: 'status',
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
			//重置
			reset() {
				this.textarea = ''
					this.currentWarehouseId = ''
					this.timeValue = ''
					this.type = ''
					this.pointLocation = ''
					this.color = ''
					this.typeLevel = ''
					this.category = ''
					this.salesArea = ''
					this.driveMode = ''
			},
			//搜索
			search() {
				if (this.timeValue == null) {
					this.timeValue = []
				}
				this.loadData()
			},
			//数据
			data() {
				let p = {
					"pageNum": this.pageNum,
					"pageSize": this.pageSize,
					"listType": 2, //列表类型 1 接收 2 送还 3 历史 ,
					"vin": getSplitString(this.textarea), //vin信息
					"currentWarehouseId": this.currentWarehouseId, //当前仓库 ,
					// "status": this.status, //状态
					"status": this.status, //状态
					"commondStartDate": this.timeValue[0], // 指令下达开始时间 
					"commondEndDate": this.timeValue[1], // 指令下达结束时间 
					"type": this.type, //车型
					"pointLocation": this.pointLocation, //点位信息
					"color": this.color, //颜色
					"typeLevel": this.typeLevel, //车型级
					"category": this.category, //车辆种类
					"salesArea": this.salesArea, //销售区域
					"driveMode": this.driveMode, //驱动方式
				}
				return p
			},
			//导出
			exportExcel() {
				let self = this;
				let p;
				self.ids = []
				if(this.listIds.length){
					this.listIds.forEach((item) => {
						self.ids.push(item.ttWindowReceivecarId);
					})
					p = {
						"ids":self.ids,
						"listType": 2, //列表类型 1 接收 2 送还 3 历史 ,
					}
				}else{
					p = {
						"pageNum": this.pageNum,
						"pageSize": this.pageSize,
						"listType": 2, //列表类型 1 接收 2 送还 3 历史 ,
						"vin": getSplitString(this.textarea), //vin信息
						"currentWarehouseId": this.currentWarehouseId, //当前仓库 ,
						// "status": this.status, //状态
						"status": this.status, //状态
						"commondStartDate": this.timeValue[0], // 指令下达开始时间 
						"commondEndDate": this.timeValue[1], // 指令下达结束时间 
						"type": this.type, //车型
						"pointLocation": this.pointLocation, //点位信息
						"color": this.color, //颜色
						"typeLevel": this.typeLevel, //车型级
						"category": this.category, //车辆种类
						"salesArea": this.salesArea, //销售区域
						"driveMode": this.driveMode, //驱动方式
					}
				}
				exportExcel(p).then(res => {
					window.location.href = res.repData
				})
			},
			//通知提车
			notice() {
				//未执行可提车
				let self = this
				if (this.listIds.length == 0) {
					this.$message({
						message: '请选择一条数据',
						type: 'warning'
					});
					return false
				}
				let ids = [];
				for (var i = 0; i < this.listIds.length; i++) {
					if (this.listIds[i].statusCode != 1) {
						this.$message({
							message: '未执行任务才可通知提车',
							type: 'warning'
						});
						return false
					} else {
						ids.push(this.listIds[i].ttWindowReceivecarId)

					}
				}
				this.$confirm('通知提车?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
				}).then(() => {
					//删除
					extractCar({
						"ids": ids
					}).then(res => {
						this.$message({
							type: 'success',
							message: '提车成功!'
						});
						self.loadData()
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			//编辑
			handleEdit(data) {
				if(data.row.attachment == ''){
					this.$message({
						message: '暂无附件',
						type: 'warning'
					});
				}else{
					this.popAddVisible = true
					this.attachment = data.row.attachment
				}
			},
			//编辑确认
			saveEdit() {

			},
			//新增
			add() {
				this.popAddVisible = true;
			},
			//checkbox选中
			handleSelectionChange(val) {
				this.listIds = val
			},
			//分页
			handleSizeChange(val) {
				
			},
			handleCurrentChange(val) {
				this.pageNum = val
				this.loadData()
			},
			loadData() {
				let self = this;
				receivecarList(this.data()).then(res => {
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
