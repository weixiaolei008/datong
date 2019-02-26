<!-- 领用窗口/领用车辆计划/接收车辆 -->
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
						<el-option v-for="item in  options.warehouse_code" :key="item.code" :label="item.name" :value="item.code">
						</el-option>
					</el-select>
				</div>
				<!-- 单选下拉框 -->
				<div class="input-box">
					<label class="input-label">状态</label>
					<el-select v-model="status" placeholder="请选择状态">
						<el-option v-for="item in statusList" :key="item.code" :label="item.name" :value="item.code">
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
				<div class="btn-add" @click="add"><span class="img-add">创建计划</span></div>
				<div class="btn-receive" @click="receivecar"><span class="img-receive">接收车辆</span></div>
				<div class="btn-del" @click="del"><span class="img-del">删除</span></div>
				<!-- <div class="btn-import"><span class="img-import">导入数据</span></div> -->
				<UploadExcel @handle-success="importSuccess"></UploadExcel>
				<div class="btn-export" @click="exportExcel"><span class="img-extend">导出</span></div>
			</div>
		</el-header>
		<el-main class="table" style='padding: 10px;'>
			<Table :data='tableData' @selection-change="handleSelectionChange" @size-change="handleSizeChange" @current-change="handleCurrentChange"
			 @handleEdit="handleEdit">
				<template slot-scope="{scope}" slot="name">
					<div>{{scope.row.name}}</div>
				</template>
			</Table>
		</el-main>
		<!--新增弹框-->
		<el-dialog title="创建计划" :visible.sync="popAddVisible" width="680px" center>
			<div class="clearfix" style="position: relative;">
				<!-- input 输入框 -->
				<div class="input-box">
					<label class="input-label">申请部门</label>
					<el-input v-model="applyDepartment" placeholder="请输入申请部门" clearable></el-input>
				</div>
				<!-- input 输入框 -->
				<div class="input-box">
					<label class="input-label">申请人</label>
					<el-input v-model="applicant" placeholder="请输入申请人" clearable></el-input>
				</div>
				<!-- 时间 -->
				<div class="input-box">
					<label class="input-label">预计领用时间</label>
					<el-date-picker v-model="expectBorrow" type="datetimerange" value-format="yyyy-MM-dd HH-mm-ss" range-separator="至"
					 start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
				</div>
				<!-- input 输入框 -->
				<div class="input-box">
					<label class="input-label">联系方式</label>
					<el-input v-model="contact" :maxlength=20 placeholder="请输入联系方式" clearable></el-input>
				</div>
				<!-- 文本域 -->
				<div class="input-box">
					<label class="input-label">申请用途</label>
					<el-input type="textarea" :rows="2" placeholder="请输入申请用途" v-model="purpose">
					</el-input>
				</div>
				<!-- 文本域 -->
				<div class="input-box" style="margin:-50px 0 20px 0;">
					<label class="input-label"><span>*</span>VIN</label>
					<el-input type="textarea" :rows="2" placeholder="请输入VIN" v-model="vin">
					</el-input>
				</div>

				<div class="search-box" style="float: left;position: absolute;left:0;bottom: 0;">
					<ImgUpload @handle-success="ImgUpload"></ImgUpload>
				</div>
				<div style="text-align: right;float: left;width: 100%;">
					<el-button class="" style="margin-right: 10px;" @click="popAddVisible = false" size="medium">返回</el-button>
					<el-button class="" style="margin-right: 15px;" type="primary" @click="saveAdd" size="medium">保存</el-button>
				</div>
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
		receivecarAdd,
		receivecarDelete,
		receiveCar,
		exportExcel,
		receivecarImport,
		receivecarUpdateVin
	} from "@/common/config/api/SysWindows"
	import UploadExcel from "@/components/UploadExcel"
	import ImgUpload from "@/components/ImgUpload"

	export default {
		name: 'Example',
		components: {
			Table,
			UploadExcel,
			ImgUpload
		},
		data() {
			return {
				pageNum: 1,
				pageSize: 30,
				pop: false,
				vin: "", //
				type: '', //车型
				pointLocation: '', //点位
				color: '', //颜色
				typeLevel: '', //车型级
				category: '', //车辆种类
				salesArea: '', //销售区域
				driveMode: '', //驱动方式
				popAddVisible: false,
				textarea: '', //vin
				purpose: '', //用途
				contact: '', //联系方式
				applyDepartment: '', //申请部门
				applicant: '', //申请人
				attachment: '', // 附件
				currentWarehouseId: '', //当前仓库
				listIds: [], //删除list
				status: '', //状态
				ids: [], //导出id集合
				isSaveFlag: true,
				statusList: [{
						"name": "待执行",
						"code": "1"
					},
					{
						"name": "执行中",
						"code": "2"
					},
					{
						"name": "已执行",
						"code": "3"
					}
				], //状态list
				timeValue: [],
				expectBorrow: [],
				tableData: {
					selectShow: true, //Checkbox
					tableHeight: 0, //高度
					currentPage: 1, //总数
					total: 3, //列表总数
					listData: [],
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
							width: w200
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
							width: w150
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
							value: 'sendCommandDate',
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
			//上传附件img
			ImgUpload(res) {
				this.attachment = res
				this.$message({
					type: 'warning',
					message: '上传成功'
				});

			},
			//导入
			importSuccess(res) {
				receivecarImport({
					"filePath": res
				}).then(res => {
					if (res.repCode != "0000") {
						this.$message({
							type: 'warning',
							message: res.repMsg
						});
					} else {
						this.$message({
							type: 'warning',
							message: res.repData
						});
						this.loadData()
					}

				})
			},
			//导出
			exportExcel() {
				let self = this;
				let p;
				self.ids = []
				if (this.listIds.length) {
					this.listIds.forEach((item) => {
						self.ids.push(item.ttWindowReceivecarId);
					})
					p = {
						"ids": self.ids,
						"listType": 1, //列表类型 1 接收 2 送还 3 历史 ,
					}
				} else {
					p = {
						"pageNum": this.pageNum,
						"pageSize": this.pageSize,
						"listType": 1, //列表类型 1 接收 2 送还 3 历史 ,
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
			//重置
			reset() {
				this.textarea = ''
				this.currentWarehouseId = ''
				this.status = ''
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
			//编辑
			handleEdit() {
				this.popAddVisible = true;
			},
			//编辑确认
			saveEdit() {

			},
			//新增保存
			saveAdd() {
				let self = this
				if (this.vin == '') {
					this.$message({
						message: '请输入有效的vin码',
						type: 'warning'
					});
					return false
				}
				if (this.attachment == '') {
					this.$message({
						message: '请先上传附件',
						type: 'warning'
					});
					return false
				}
				if (self.isSaveFlag) {
					self.isSaveFlag = false;
					setTimeout(() => {
						self.isSaveFlag = true;
					}, 1000)
					if (this.listIds.length == 0) {
						receivecarAdd({
							"applicant": this.applicant, //申请人
							"applyDepartment": this.applyDepartment, //申请部门 ,
							"attachment": this.attachment, //附件 
							"contact": this.contact, //联系方式 ,
							"purpose": this.purpose, //申请通途
							"vin": getSplitString(this.vin), //vin
							"expectBorrowDate": this.expectBorrow[0], //预计借用时间
							"expectReturnDate": this.expectBorrow[1], //预计归还时间
							"id": '',
						}).then(res => {
							if (res.repCode != '0000') {
								this.$message({
									message: res.repData,
									type: 'warning'
								});
								return false
							} else {
								this.$message({
									type: 'warning',
									message: res.repData
								});
								self.loadData()
								self.popAddVisible = false;
							}
						})
					} else {
						receivecarUpdateVin({
							"applicant": this.applicant, //申请人
							"applyDepartment": this.applyDepartment, //申请部门 ,
							"attachment": this.attachment, //附件 
							"contact": this.contact, //联系方式 ,
							"purpose": this.purpose, //申请通途
							"vin": this.vin, //vin
							"expectBorrowDate": this.expectBorrow[0], //预计借用时间
							"expectReturnDate": this.expectBorrow[1], //预计归还时间
							"id": this.listIds[0].ttWindowReceivecarId,
						}).then(res => {
							if (res.repCode != '0000') {
								this.$message({
									message: res.repData,
									type: 'warning'
								});
								return false
							} else {
								this.$message({
									type: 'warning',
									message: res.repData
								});
								self.loadData()
								self.popAddVisible = false;
							}
						})
					}
				}
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
				for (var i = 0; i < this.listIds.length; i++) {
					ids.push(this.listIds[i].ttWindowReceivecarId)
				}
				this.$confirm('请确认是否删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
				}).then(() => {
					//删除
					receivecarDelete({
						"ids": ids
					}).then(res => {
						this.$message({
							type: 'warning',
							message: res.repData
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
			//接收车辆
			receivecar() {
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
					if (this.listIds[i].statusCode != 3) {
						this.$message({
							message: '已执行任务才可接收车辆',
							type: 'warning'
						});
						return false
					} else {
						ids.push(this.listIds[i].ttWindowReceivecarId)

					}
				}
				this.$confirm('请确认接收车辆', '接收车辆', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					dangerouslyUseHTMLString: true,
					center: true,
					showClose: false
				}).then(() => {
					receiveCar({
						"ids": ids
					}).then(res => {
						this.loadData();
					})
				}).catch(() => {});
			},
			//新增
			add() {
				if (this.listIds.length == 0) {
					this.popAddVisible = true;
					this.applicant = '' //申请人
					this.applyDepartment = '' //申请部门 ,
					this.attachment = '' //附件 
					this.contact = '' //联系方式 ,
					this.purpose = '' //申请通途
					this.vin = '' //vin
					this.expectBorrow = []
				} else if (this.listIds.length > 1) {
					this.$message({
						message: '请选择一条数据',
						type: 'warning'
					});
					return false
				} else {
					this.expectBorrow = []
					this.popAddVisible = true;
					this.applicant = this.listIds[0].applicant //申请人
					this.applyDepartment = this.listIds[0].applyDepartment //申请部门 ,
					this.attachment = this.listIds[0].attachment //附件 
					this.contact = this.listIds[0].contact //联系方式 ,
					this.purpose = this.listIds[0].purpose //申请通途
					this.vin = this.listIds[0].vin //vin
					if (this.listIds[0].expectBorrowDate != null && this.listIds[0].expectBorrowDate != '') {
						this.expectBorrow.push(this.listIds[0].expectBorrowDate)
					}
					if (this.listIds[0].expectReturnDate != null && this.listIds[0].expectReturnDate != '') {
						this.expectBorrow.push(this.listIds[0].expectReturnDate)
					}
				}

			},
			//checkbox选中
			handleSelectionChange(val) {
				this.listIds = val
				console.log(val)
			},
			//分页
			handleSizeChange(val) {

			},
			handleCurrentChange(val) {
				this.pageNum = val
				this.loadData()
			},
			//顶部展开
			searchMore() {
				this.pop = !this.pop;
			},
			loadData() {
				let self = this;
				let p = {
					"pageNum": this.pageNum,
					"pageSize": this.pageSize,
					"listType": 1, //列表类型 1 接收 2 送还 3 历史 ,
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
				receivecarList(p).then(res => {
					self.tableData.listData = res.repData.list;
					self.tableData.total = res.repData.total;
				})

			}
		},
		mounted() {
			this.tableData.tableHeight = document.getElementsByClassName('table')[0].clientHeight - 60;
		},
		created() {
			this.loadData();
		}
	};
</script>

<style scoped lang="less">

</style>
