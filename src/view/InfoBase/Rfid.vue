<!-- RFID信息设置 -->
<template>
	<el-container style="width: 100%;height: 100%;">
		<el-header style="height: auto; padding: 0;">
			<!-- search-group -->
			<div class="search-group clearfix">
				<!-- input 输入框 -->
				<div class="input-box">
					<label class="input-label">编号</label>
					<el-input placeholder="请输入编号" clearable v-model='rfidNo'></el-input>
				</div>
				<div class="input-box">
					<label class="input-label">位置名称</label>
					<el-input placeholder="请输入位置名称" clearable v-model='locationName'></el-input>
				</div>
				<div class="search-box">
					<div class="search-reset" @click="reset"><span class="img-reset">清空</span></div>
					<div class="search-sub" @click="search"><span class="img-sub">搜索</span></div>
				</div>
			</div>
			</div>
			<!-- btn-group -->
			<div class="btn-group clearfix">
				<div class="btn-add" @click="add"><span class="img-add">新增</span></div>
				<div class="btn-del" @click="del"><span class="img-del">删除</span></div>
			</div>
		</el-header>
		<el-main class="table" style='padding: 10px;'>
			<Table :data='tableData' @selection-change="handleSelectionChange" @size-change="handleSizeChange" @current-change="handleCurrentChange"
			 @handleEdit='handleEdit'>
				<template slot-scope="{scope}" slot="name">
					<div>{{scope.row.name}}</div>
				</template>
			</Table>
		</el-main>
		<!--新增弹框-->
		<el-dialog :title="title" :visible.sync="popAddVisible" width="680px" center>
			<div class="clearfix">
				<!-- input 输入框 -->
				<div class="input-box">
					<label class="input-label"><span>*</span>编号</label>
					<el-input v-model="addRfidNo" placeholder="请输入编号" clearable></el-input>
				</div>
				<!-- input 输入框 -->
				<div class="input-box">
					<label class="input-label"><span>*</span>位置名称</label>
					<el-input v-model="addLocationName" placeholder="请输入位置名称" clearable></el-input>
				</div>
				<!-- input 输入框 -->
				<div class="input-box">
					<label class="input-label"><span>*</span>TermiallD</label>
					<el-input v-model='addTermialId' placeholder="请输入TermiallD" clearable></el-input>
				</div>
				<div class="input-box">
					<label class="input-label"><span>*</span>方向</label>
					<el-select v-model="directionId" placeholder="请选择方向">
						<el-option v-for="item in options.rfid_direction" :key="item.tsDataDicId" :label="item.name" :value="item.tsDataDicId">
						</el-option>
					</el-select>
				</div>
				<!-- 单选下拉框 -->
				<div class="input-box">
					<label class="input-label"><span>*</span>RFID类型</label>
					<el-select v-model="typeId" placeholder="请选择RFID类型">
						<el-option v-for="item in options.rfid_type" :key="item.tsDataDicId" :label="item.name" :value="item.tsDataDicId">
						</el-option>
					</el-select>
				</div>
				<!-- input 输入框 -->
				<div class="input-box">
					<label class="input-label">备注</label>
					<el-input v-model="addRfidNote" placeholder="请输入备注" clearable></el-input>
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
		rfidList,
		rfidAdd,
		rfidDelete
	} from "@/common/config/api/InfoBase"
	import {
		loadDicValList,
	} from "@/common/config/api/basic"


	export default {
		name: 'Rfid',
		components: {
			Table,
		},
		data() {
			return {
				title:"",
				pageNum:1,
				pageSize: 30,
				tsRfidId:'',//编辑id
				directionId: '', //方向ID
				directionList: [], //方向
				typeId: '', //类型ID
				typeList: [], //类型
				addRfidNo: '', //新增编号
				addRfidNote: '', //新增备注
				addLocationName: '', //新增位置 
				addTermialId: '', // 新增termialId 
				popAddVisible: false, //编辑弹框
				rfidNo: '', //查询编号
				locationName: '', //位置
				listIds: '', //删除list
				selectValue1: '',
				tableData: {
					selectShow: true, //Checkbox
					tableHeight: 0, //高度
					currentPage: 1, //总数
					total: 0, //列表总数
					listData: [],
					operations: [{
						label: '操作',
						width: '100',
						data: [{
							icon: 'icon-edit',
							Fun: 'handleEdit',
							id: '1',
						}]
					}],
					tableHead: [{
							name: 'RFID编号',
							value: 'rfidNo',
							// show: 'template'
						},
						{
							name: '位置名称',
							value: 'locationName'
						},
						{
							name: '方向',
							value: 'direction'
						},
						{
							name: 'RFID类型',
							value: 'rfidType',
						},
						{
							name: '备注',
							value: 'rfidNote',
						},
					], //表头
				},
			};
		},
		computed:{
			options: {
				get(){
					return this.$store.state.codeOptions.options;
				},
			}
		},
		methods: {
			//tree
			treeInfo() {
				//方向
				loadDicValList({
					"code": "door_direction"
				}).then(res => {
					this.directionList = res.repData
				})
				// 				//RFID类型
				loadDicValList({
					"code": "rfid_type"
				}).then(res => {
					this.typeList = res.repData
				})
			},
			//编辑
			handleEdit(data) {
				this.title="编辑RFID设置";
				this.popAddVisible = true;
				this.addRfidNo = data.row.rfidNo;
				this.addLocationName = data.row.locationName;
				this.addRfidNote = data.row.rfidNote;
				this.directionId = data.row.directionId;
				this.typeId = data.row.rfidTypeId;
				this.addTermialId = data.row.termialId;
				this.tsRfidId = data.row.tsRfidId
				this.treeInfo()	
			},
			//重置
			reset() {
				this.rfidNo = '';
				this.locationName = '';
			},
			//搜索
			search() {
				this.loadData()
			},
			//新增保存
			saveAdd() {
				let self = this
				var regu = "^[ ]+$";
				var re = new RegExp(regu);
				if(re.test(this.addRfidNo)){
					this.$message({
						message: '编号不能为空格',
						type: 'warning'
					});
					return false
				}
				if(re.test(this.addLocationName)){
					this.$message({
						message: '位置名称不能为空格',
						type: 'warning'
					});
					return false
				}
				if(re.test(this.addTermialId)){
					this.$message({
						message: 'TermialId不能为空格',
						type: 'warning'
					});
					return false
				}
				if (this.addRfidNo == '') {
					this.$message({
						message: '编号不能为空',
						type: 'warning'
					});
					return false
				}
				if( this.addLocationName == ''){
					this.$message({
						message: '位置名称不能为空',
						type: 'warning'
					});
					return false
				}
				if( this.addTermialId == ''){
					this.$message({
						message: 'TermialId不能为空',
						type: 'warning'
					});
					return false
				}
				if( this.directionId == ''){
					this.$message({
						message: '方向不能为空',
						type: 'warning'
					});
					return false
				}
				if( this.typeId == ''){
					this.$message({
						message: 'RFID类型不能为空',
						type: 'warning'
					});
					return false
				}
				let addList = {
					"rfidNo": this.addRfidNo,
					"locationName": this.addLocationName,
					"termialId": this.addTermialId,
					"directionId": this.directionId,
					"rfidTypeId": this.typeId,
					"rfidNote": this.addRfidNote,
					"tsRfidId":this.tsRfidId,
				}
				rfidAdd(addList).then(res => {
					this.$message({
						message: '新增成功',
						type: 'success'
					});
					setTimeout(function() {
						self.popAddVisible = false
						self.loadData()
					}, 500)
				})
			},
			//新增
			add() {
				this.title="新增RFID设置";
				this.popAddVisible = true;
				this.addRfidNo = '';
				this.addLocationName = '';
				this.addTermialId = '';
				this.directionId = '';
				this.typeId = '';
				this.addRfidNote = '';
				this.tsRfidId = '';
				this.treeInfo()	
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
					ids.push(this.listIds[i].tsRfidId)
				}
				this.$confirm('请确认是否删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
				}).then(() => {
					//RFID删除
					rfidDelete({
						"listIds": ids
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
			//checkbox选中
			handleSelectionChange(val) {
				this.listIds = val;
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
				let self = this;
				let p = {
					"rfidNo": this.rfidNo,
					"locationName": this.locationName,
					"pageNum": this.pageNum,
					"pageSize": this.pageSize
				}
				rfidList(p).then(res => {
					self.tableData.listData = res.repData.list;
					self.tableData.total = res.repData.total;
				})
			}
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
