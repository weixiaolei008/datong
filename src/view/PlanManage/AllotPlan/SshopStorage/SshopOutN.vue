<!--4S店返修车辆入库计划 （）-->
<template>
  <el-container style="width: 100%;height: 100%;">
    <el-header style="height: auto; padding: 0;">
      <!-- search-group -->
      <div class="search-group clearfix">
        <!--搜索弹框-->
        <div :class="pop?'search-up':'search-more'" @click="searchMore"></div>
        <el-collapse-transition>
          <div v-show="pop" class="search-pop clearfix">
            <div class="input-box">
              <label class="input-label">车型</label>
              <el-select v-model="formData.vehicleType" placeholder="请选择车型">
                <el-option
                  v-for="option in options.vehicle_type"
                  :key="option.code"
                  :label="option.name"
                  :value="option.code">
                </el-option>
              </el-select>
            </div>
            <div class="input-box">
              <label class="input-label">车型级</label>
              <el-select v-model="formData.typeLevel" placeholder="请选择车型级">
                <el-option
                  v-for="option in options.vehicle_type_level"
                  :key="option.code"
                  :label="option.name"
                  :value="option.code">
                </el-option>
              </el-select>
            </div>
            <div class="input-box">
              <label class="input-label">车辆种类</label>
              <el-select v-model="formData.category" placeholder="请选择车辆种类">
                <el-option
                  v-for="option in options.vehicle_category"
                  :key="option.code"
                  :label="option.name"
                  :value="option.code">
                </el-option>
              </el-select>
            </div>
            <div class="input-box">
              <label class="input-label">当前仓库</label>
              <el-select v-model="formData.currentWarehouseId" placeholder="请选择当前仓库">
                <el-option
                  v-for="option in options.warehouse_code"
                  :key="option.code"
                  :label="option.name"
                  :value="option.code">
                </el-option>
              </el-select>
            </div>
            <div class="input-box">
              <label class="input-label">点位信息</label>
              <el-select v-model="formData.pointLocation" placeholder="请选择点位信息">
                <el-option
                  v-for="option in options.point_location"
                  :key="option.code"
                  :label="option.name"
                  :value="option.code">
                </el-option>
              </el-select>
            </div>
            <div class="input-box">
              <label class="input-label">立即修/缓修</label>
              <el-select v-model="formData.repairMethod" placeholder="请选择立即修/缓修">
                <el-option
                  v-for="item in options.repair_method"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
            </div>
          </div>
        </el-collapse-transition>
        <!--搜索-->
        <div class="clearfix">
          <div class="input-box">
            <label class="input-label">VIN码</label>
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入VIN码"
              v-model="formData.vin">
            </el-input>
          </div>
          <div class="input-box">
            <label class="input-label">问题提报时间</label>
            <el-date-picker
              v-model="formData.issueReportDate"
              type="datetimerange"
              value-format="yyyy-MM-dd HH-mm-ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <div class="input-box">
            <label class="input-label">颜色</label>
            <el-select v-model="formData.color" placeholder="请选择颜色">
              <el-option
                v-for="option in options.color"
                :key="option.code"
                :label="option.name"
                :value="option.code">
              </el-option>
            </el-select>
          </div>
          <div class="input-box">
            <label class="input-label">驱动方式</label>
            <el-select v-model="formData.driveMode" placeholder="请选择驱动方式">
              <el-option
                v-for="option in options.drive_mode"
                :key="option.code"
                :label="option.name"
                :value="option.code">
              </el-option>
            </el-select>
          </div>
          <div class="input-box">
            <label class="input-label">销售区域</label>
            <el-select v-model="formData.salesArea" placeholder="请选择销售区域">
              <el-option
                v-for="option in options.sales_area"
                :key="option.code"
                :label="option.name"
                :value="option.code">
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
        <div class="btn-add" @click="handleCreate('currentWarehouseId','repairMethod')"><span class="img-add">执行计划</span></div>
        <!--<div class="btn-del" @click="handleDel"><span class="img-del">删除</span></div>-->
        <div class="btn-export "@click="handelExport"><span class="img-extend">导出</span></div>
        <div class="btn-repair-first" @click="sureRepairFirst('repairMethod')"><span class="img-repair-first">立即修</span></div>
        <div class="btn-repair-second" @click="sureRepairSecond('repairMethod')"><span class="img-repair-second">缓修</span></div>
      </div>
    </el-header>
    <el-main class="table" style='padding: 10px;'>
      <Table :data='tableData'
             @handleLook="handleLook"
             @selection-change="handleSelectionChange"
             @current-change="handleCurrentChange">
      </Table>
    </el-main>
    <!--附件详情-->
    <el-dialog title="附件详情" :visible.sync="popAddVisible" align="center">
        <img style="width:32%;margin-left: 0.5%" :width="imgWidth" :src="item" alt="" v-for="item in accessory">
    </el-dialog>
  </el-container>
</template>

<script>
  import {loadDicValList} from "@/common/config/api/basic"
  import {getSplitString,exportFile,confirmPop,w200,w120}from "@/common/config/utils"
  import Table from "@/components/Table"
  import {loadSshopInList,loadSshopInExportPre,loadSshopInCreate,loadSshopImmediatelyPlan,loadSshopInpostPonePlan,loadSshopInDeletePrePlan} from "@/common/config/api/PlanManage"
  import {loadRefresh, creatRepair2, delPlan, repairAll} from '../PlanJs/mixIn'

  export default {
    name: "SshopOutN",
    mixins: [loadRefresh, creatRepair2, delPlan, repairAll],
    components: {
      Table
    },
    data() {
      return {
        isSaveFlag: true,
        pop: false, //弹框
        popAddVisible: false,
        accessory :[],
        selectRows: [], //导出选中数据
        tableData: {
          selectShow: true,
          tableHeight: 0,
          currentPage: 1,
          total: 0, //列表总数
          listData: [],
          tableHead: [
            {
              name: "问题描述",
              value: 'issueDescribe'
            },
            {
              name: "VIN码",
              value: 'vin',
              width: w200
            },
            {
              name: "车型",
              value: 'vehicleType'
            },
            {
              name: "车型级",
              value: 'typeLevel'
            },
            {
              name: "车辆种类",
              value: 'category'
            },
            {
              name: "颜色",
              value: 'color'
            },
            {
              name: "销售区域",
              value: 'salesArea'
            },
            {
              name: "驱动方式",
              value: 'driveMode'
            },
            {
              name: "点位信息",
              value: 'pointLocation'
            },
            {
              name: "当前仓库",
              value: 'currentWarehouseId',
              width: w120
            },
            {
              name: "当前库区",
              value: 'currentFunctionalZoneId',
              width: w120
            },
            {
              name: "当前库位",
              value: 'currentLocationId',
              width: w120
            },
            {
              name: "问题提报人",
              value: 'issueReported',
              width: '120'
            },
            {
              name: "立即修/缓修",
              value: 'repairMethod',
              width: '100'
            },
            {
              name: "问题提报时间",
              value: 'issueReportDate',
              width: '180'
            }
          ],
          operations: [
            {
              label: '附件',
              width: '80',
              data: [
                {
                  icon: 'icon-eye',
                  Fun: 'handleLook',
                  id: '1',
                }

              ]
            }
          ],
        },
        //查询
        formData: {
          vin: '', //VIN码
          vehicleType: '', //车型
          typeLevel: '', //车型级
          category: '', //车辆种类
          color: '', //颜色
          salesArea: '', //销售区域
          driveMode: '', //驱动方式
          pointLocation: '', //点位信息
          currentWarehouseId: '', //当前仓库
          issueReportDate: '', //问题提报时间
          status: '', //状态
          isOverdue: null, //是否超期
          repairMethod: '', //返修内容
        },
        //创建计划
        createPlanData:{
          planFoursIds: '' //vin码
        },
      }
    },
    methods: {
      //查看附件
      handleLook(data) {
        this.accessory = data.row.accessory;
        if(!this.accessory){
          this.msgInfo('暂无附件');
          return
        }
        else{
          this.accessory = this.accessory.split('¥');
        }
        this.popAddVisible = true;
      },
      //创建计划保存
      saveCreate() {
        confirmPop('请确认创建计划',this.saveCreateData)
      },
      /*/////////////////////////////////////////////////////////////////////////*/
      //删除接口
      handleDelData(){
        if(this.selectRows.length == 0){
          this.msgError('请至少勾选一条数据');
          return;
        }
        let self = this;
        let p;
        let arr = [];
        if(self.selectRows.length){
          self.selectRows.forEach((item) => {
            arr.push(item.ttPlanFoursId);
          })
          p = {
            "planFoursIds": arr,//勾选时导出的列表
          }
        }
        loadSshopInDeletePrePlan(p).then(res => {
          res && res.success && self.msgInfo(res.repMsg);
          this.loadDataList();
        })
      },
      //导出接口
      handelExport(){
        let self = this;
        let p;
        if(self.selectRows.length){
          let arr = [];
          self.selectRows.forEach((item) => {
            arr.push(item.ttPlanFoursId);
          })
          p = {
            "planFoursId": arr,//勾选时导出的列表
            "type": 53
          }
        }else{
          p = {
            type: 53,
            vin: getSplitString(self.formData.vin), //VIN码
            vehicleType: self.formData.vehicleType, //车型
            typeLevel: self.formData.typeLevel, //车型级
            category: self.formData.category, //车辆种类
            color: self.formData.color, //颜色
            salesArea: self.formData.salesArea, //销售区域
            driveMode: self.formData.driveMode, //驱动方式
            pointLocation: self.formData.pointLocation, //点位信息
            currentWarehouseId: self.formData.currentWarehouseId, //当前仓库
            startIssueReportDate: self.formData.issueReportDate !== null ? self.formData.issueReportDate[0] : '', //指令下达开始时间
            endIssueReportDate: self.formData.issueReportDate !== null ? self.formData.issueReportDate[1] : '', //指令下达结束时间
            status: self.formData.status, //状态
            isOverdue: self.formData.isOverdue, //是否超期
            repairMethod: self.formData.repairMethod //立即修/缓修
          }
        }
        loadSshopInExportPre(p).then(res => {
          res && res.success && (window.location.href = res.repData)
        })
      },
      //列表接口
      loadDataList() {
        let self = this;
        let p = {
          pageNum: self.tableData.currentPage,
          pageSize: 30,
          type: 53,
          vin: getSplitString(self.formData.vin), //VIN码
          vehicleType: self.formData.vehicleType, //车型
          typeLevel: self.formData.typeLevel, //车型级
          category: self.formData.category, //车辆种类
          color: self.formData.color, //颜色
          salesArea: self.formData.salesArea, //销售区域
          driveMode: self.formData.driveMode, //驱动方式
          pointLocation: self.formData.pointLocation, //点位信息
          currentWarehouseId: self.formData.currentWarehouseId, //当前仓库
          startIssueReportDate: self.formData.issueReportDate !== null ? self.formData.issueReportDate[0] : '', //指令下达开始时间
          endIssueReportDate: self.formData.issueReportDate !== null ? self.formData.issueReportDate[1] : '', //指令下达结束时间
          status: self.formData.status, //状态
          isOverdue: self.formData.isOverdue, //是否超期
          repairMethod: self.formData.repairMethod //立即修/缓修
        }
        loadSshopInList(p).then(res => {
          if(res&&res.repData){
            self.tableData.listData = res.repData.list;
            self.tableData.total = res.repData.total;
          }
        })
      },
      //创建计划保存接口
      saveCreateData() {
        let self = this;
        if(self.isSaveFlag){
          this.isSaveFlag = false;
          setTimeout(()=>{
            self.isSaveFlag = true;
          }, 1000)
          let arr = [];
          this.selectRows.forEach((item) => {
            arr.push(item.ttPlanFoursId);
          })
          let p = {
            "type": 32,
            "planFoursIds": arr
          }
          loadSshopInCreate(p).then(res => {
            res && res.success && self.msgInfo(res.repData);
            self.popAddVisible = false;
            self.loadDataList();
          })
        }
      },
      //立即修接口
      handleRepairFirst(repair = 'repairMethod', id = 'ttPlanFoursId'){
        let self = this;
        let arr = [];
        this.selectRows.forEach((item) => {
          arr.push(item[id]);
        })
        let p = {
          "planFoursIds": arr,
          "repairMethod": 1
        }
        loadSshopImmediatelyPlan(p).then(res => {
          res && res.success && this.msgInfo(res.repData);
          this.loadDataList();
        })
      },
      //缓修接口
      handleRepairSecond(repair = 'repairMethod', id = 'ttPlanFoursId'){
        let self = this;
        let arr = [];
        this.selectRows.forEach((item) => {
          arr.push(item[id]);
        })
        let p = {
          "planFoursIds": arr,
          "repairMethod": 2
        }
        loadSshopInpostPonePlan(p).then(res => {
          res && res.success && this.msgInfo(res.repData);
          this.loadDataList();
        })

      },
    },
    watch: {
    },
    computed:{
      options: {
        get(){
          return this.$store.state.codeOptions.options;
        },
        set(){
        }
      },
      imgWidth: {
        get(){
          let len = this.accessory.length
          return 98.5/len + '%';
        },
        set(){
        }
      }

    },
    created() {

    }
  }
</script>

<style lang="less">

</style>



