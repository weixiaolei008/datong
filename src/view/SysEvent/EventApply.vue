<!-- 异常事件申诉管理 -->
<template>
	<el-container style="width: 100%;height: 100%;">
		<el-header style="height: auto; padding: 0;">
			<!-- search-group -->
		<div class="search-group clearfix">
      <div class="input-box">
        <label class="input-label">VIN码</label>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入VIN码"
          v-model="fromData.vin">
        </el-input>
      </div>
      <div class="input-box">
        <label class="input-label">状态</label>
        <el-select placeholder="请选择" v-model="fromData.status" >
          <el-option
            v-for="item in statusList"
            :key="item.code"
            :label="item.name"
            :value="item.code">
            </el-option>
        </el-select>
      </div>
      <div class="input-box">
        <label class="input-label">事故类型</label>
        <el-select placeholder="请选择"
          multiple
          collapse-tags
        	v-model="fromData.tsDataDicIds">
          <el-option
            v-for="item in options.accident_type"
            :key="item.tsDataDicId"
            :label="item.name"
            :value="item.tsDataDicId">
          </el-option>
        </el-select>
      </div>
      <div class="input-box select-ul">
        <label class="input-label">作业活动</label>
        <el-select placeholder="请选择"
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
		</div>
		<div class="btn-group clearfix">
			<div class="btn-export" @click="exportBtn"><span class="img-extend">导出</span></div>
		</div>
		</el-header>
		<el-main class="table" style='padding: 10px;'>
			<Table :data='tableData' 
				@selection-change="handleSelectionChange" 
				@current-change="handleCurrentChange"
			 	@handleEdit="handleEdit"
			 	@handLook="handLook">
				<template slot-scope="{scope}" slot="name">
					<div>{{scope.row.name}}</div>
				</template>
			</Table>
		</el-main>
	</el-container>
</template>

<script>
	import Table from '@/components/Table';
	import {getAppealList, getActivityInfo, webExportAppeal} from "@/common/config/api/SysEvent"
	export default {
		name: 'EventApply',
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
					activityCodes: [], //作业活动
					tsDataDicIds: [],//事故类型
					commandDate: null, //申诉时间
					status: null//状态
				},
				statusList: [
					{code: 0, name: '未处理'},
					{code: 1, name: '已处理'}
				],
				tableData: {
					selectShow: true,
          tableHeight: 0,
          currentPage: 1,
          total: 0, //列表总数
          listData: [],
					operations: [
            {
              label: '操作',
              width: '160',
              data: [
                {
                  label: '编辑',
                  Fun: 'handleEdit',
                  type:'editor',
                  size: 'mini',
                  id: '1',
                  classname: 'show',
                  icon: 'icon-edit'
                },
                {
                  label: '查看',
                  Fun: 'handLook',
                  type:'look',
                  size: 'mini',
                  id: '2',
                  classname: 'show',
                  icon: 'icon-eye'
                }
              ]
            }
          ],
					tableHead: [
						{
							name: 'VIN',
							value: 'vin',
							width: '200'
						},
						{
							name: '申诉人',
							value: 'appealPerson'
						},
						{
							name: '申诉结果',
							value: 'result'
						},
						{
							name: '处理意见',
							value: 'dealOpinion',
							width: '200'
						},
						{
							name: '处理人',
							value: 'dealBy',
						},
						{
							name: '车型',
							value: 'vehicleType',
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
							name: '异常提报描述',
							value: 'reportDescribe',
							width: '200'
						},
						{
							name: '判责描述',
							value: 'decideDescribe',
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
					commandDate: null,
					status: null,
					activityCodes: [],
					tsDataDicIds: []
				};
				// this.loadList();
			},
			//编辑
			handleEdit(data) {
				this.$router.push({
          path: "/EventApplyEdit",
          query: {
            id: data.row.tsAbnormalAppealId,
            active: 'edit'
          }
        });
			},
			//查看
			handLook(data) {
				this.$router.push({
          path: "/EventApplyEdit",
          query: {
            id: data.row.tsAbnormalAppealId,
            active: 'check'
          }
        });
			},
			fromVal(num) {
        var p = {
          "pageNum": this.currentPage,
			    "pageSize": 30,
					"activityCodes":this.fromData.activityCodes.length > 0 ? this.fromData.activityCodes : null, //作业活动
			    "status": this.fromData.status,
			    "tsDataDicIds": this.fromData.tsDataDicIds.length > 0 ? this.fromData.tsDataDicIds : null, //事故类型
			    "endDate": this.fromData.commandDate ? this.fromData.commandDate[1] : null,
			    "startDate": this.fromData.commandDate ? this.fromData.commandDate[0] : null,
			    "vin": this.fromData.vin
        }
        if(num == 2) {
          let arr = [];
          if(this.tableSelectId.length > 0){
            this.tableSelectId.forEach((item) => {
              arr.push(item.tsAbnormalAppealId);
            })
          }
          p.ids = arr.length > 0 ? arr : null;
        }
        return p;
      },
      getActivityInfoList() {
      	getActivityInfo({}).then(res => {
      		if(res.repData) {
      			this.activityInfoList = res.repData;
      		}
      	})
      },
			loadList() {
				getAppealList(this.fromVal(1)).then(res => {
					if(res.repData) {
						this.tableData.total = res.repData.total;
						this.tableData.listData = res.repData.list;
					}
				})
			},
			exportBtn() {
        webExportAppeal(this.fromVal(2)).then(res => {
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