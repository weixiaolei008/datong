<!--系统窗口／氢能源窗口／氢能源计划(接收车辆)-->
<template>
  <el-container style="width: 100%;height: 100%;">
    <el-header style="height: auto; padding: 0;">
      <!-- search-group -->
      <div is="fromSearch" :data="dataFm" @searchChange="hydPlanList"></div>
      <!-- btn-group -->
      <div class="btn-group clearfix">
        <div class="btn-add" @click="addSvoConBtn"><span class="img-add">创建计划</span></div>
        <div class="btn-receive" @click="receiveCarBtn"><span class="img-receive">接收车辆</span></div>
        <div class="btn-del" @click="deltFactory"><span class="img-del">删除</span></div>
        <UploadExcel @handle-success="importExcal"></UploadExcel>
        <div class="btn-export" @click="exportBtn"><span class="img-extend">导出</span></div>
      </div>
    </el-header>
    <el-main class="table" style='padding: 10px;'>
       <Table :data='tableData'
        @selection-change="handleSelectionChange"
        @current-change="handleCurrentChange">
        <template slot-scope="{scope}" slot="code">
          <div>{{scope.row.code}}</div>
        </template>
      </Table>
    </el-main>
    <!--创建弹框-->
    <el-dialog
      :title="tialogTitle"
      :visible.sync="hydDialogVisible"
      width="400px">
      <div class="search-group clearfix">
        <div class="input-box">
          <label class="input-label"><span>*</span>VIN码</label>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入VIN码"
            v-model="addVins">
          </el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hydDialogVisible=!hydDialogVisible">返回</el-button>
        <el-button type="primary" @click="svoVisibleConfirm">保存</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
  import Table from "@/components/Table"
  import FromSearch from "../FromSearch"
  import UploadExcel from "@/components/UploadExcel"
  import { getSplitString, confirmPop }from "@/common/config/utils"
  import { hydPhDeleteApi, hydPlanExportApi, hydQPlanueryAllApi, hydCreateAllApi, hydUpdateAllApi, hydLiftCarApi,
    hydReceiveCarApi, hydHistoryExportApi, hydHistoryListApi, hydPlanInportApi } from "@/common/config/api/SysWindows"

  export default {
    name: "HydroIn",
    components: { FromSearch, Table, UploadExcel},
    data() {
      return {
        pop: false,
        currentPage: 1,
        pageSizeNum: 30,
        tableSelectId: [],//表格选中的数据
        active: 0,
        hydDialogVisible: false,
        tialogTitle: '创建计划',
        addVins: '',
        //搜索
        dataFm: {
          pop: false,
          status: 1,
          formData: {
            category: null,//车辆种类
            color: null,
            driveMode: null,//驱动方式
            origWarehouseId: null,//始发仓库
            pointLocation: null,//点位信息
            salesArea: null,//销售区域
            status: null,//窗口状态 1:待执行2:已执行3:已执行
            type: null,//窗口类型: 1:接收车辆 2:通知提车
            typeLevel: null,//车型级
            vehicleType: null,//车型
            vin: null,
            commandDate: []
          },
          arr1: [
            {
              label: '指令下达时间',
              type: 'time',
              value: 'commandDate'
            },
            {
              label: '颜色',
              type: 'select',
              value: 'color'
            },
            {
              label: '驱动方式',
              type: 'select',
              value: 'driveMode'
            },
            {
              label: '销售区域',
              type: 'select',
              value: 'salesArea'
            },
          ],
          arr2: [
            {
              label: '当前仓库',
              type: 'select',
              value: 'origWarehouseId'
            },
            {
              label: '车型级',
              type: 'select',
              value: 'typeLevel'
            },
            {
              label: '状态',
              type: 'select',
              value: 'status'
            },
            {
              label: '车辆种类',
              type: 'select',
              value: 'category'
            },
            {
              label: '车型',
              type: 'select',
              value: 'vehicleType'
            },
            {
              label: '点位信息',
              type: 'select',
              value: 'pointLocation'
            }
          ],
        },
        isSaveflag: true,
        tableData: {
          selectShow: true,
          tableHeight: 0,
          currentPage: 1,
          total: 0, //列表总数
          listData: [],
          tableHead: [
              {
                name: "VIN号",
                value: 'vin',
                width: '200'
              },
              {
                name: "车型",
                value: 'type',
              },
              {
                name: "车型级",
                value: 'typeLevel',
              },
              {
                name: "车辆种类",
                value: 'category',
              },
              {
                name: "颜色",
                value: 'color',
                width: '200'
              },
              {
                name: "销售区域",
                value: 'salesArea',
              },
              {
                name: "驱动方式",
                value: 'driveMode',
              },
              {
                name: "点位信息",
                value: 'pointLocation',
              },
              {
                name: "当前仓库",
                value: 'origWarehouseId',
              },
              {
                name: "指令下达时间",
                value: 'commandDate',
                width: '200'
              },
              {
                name: "状态",
                value: 'status',
              }
          ],
        }
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.currentPage = val;
        this.hydPlanList();
      },
      handleSelectionChange(val) {
        this.tableSelectId = val;
      },
      addSvoConBtn() {
        if(this.tableSelectId.length > 1) {
          this.feedMessage('warning','不能同时编辑多条');
          return false;
        }
        if(this.checkedChange(10)){
          this.addVins = this.tableSelectId.length == 1 ? this.tableSelectId[0].vin : null;
          this.hydDialogVisible = true;
        }
      },
      //表格选中数据
      checkedChange(num) {
        if(num != 10 && this.tableSelectId.length < 1) {
          this.feedMessage('warning','请选择数据！');
          return false;
        }
        let sstatusL = false;
        let ids = [];
        if(this.tableSelectId.length > 0) {
          this.tableSelectId.map((item, index) => {
            if(num == 3 && item.status != '已执行'){
              sstatusL = true;
              this.feedMessage('warning','不是已执行的状态不能接收车辆！');
              return false;
            }else if(num != 3 &&  item.status != '待执行'){//1:待执行2:已执行3:已执行
              sstatusL = true;
              this.feedMessage('warning','不是待执行的状态不能更新操作！');
              return false;
            }
            ids.push(item.ttWindowHydrogenvehicleidId);
          })
        }
        return sstatusL ? false : ids;
      },
      //接收车辆
      receiveCarBtn() {
        if(this.checkedChange('3')){
          confirmPop('确定接收车辆', () => {
            hydReceiveCarApi({ids: this.checkedChange('3')}).then(res => {
              this.hydPlanList();
              this.feedMessage('warning', res.repData)
            })
          })
        }
      },
      //创建保存
      svoVisibleConfirm(){
        if(!this.addVins || (this.addVins && !this.addVins.trim())){
          this.feedMessage('warning', '请输入vin码!');
          return false;
        }
        if(this.isSaveflag) {
          this.isSaveflag = false;
          setTimeout(() => {
            this.isSaveflag = true;
          },2000)

          var p = {
            id: this.checkedChange(10)[0],
            vin: getSplitString(this.addVins)
          }
          
          let api;
          p.id ? api = hydUpdateAllApi : api = hydCreateAllApi;
          api(p).then(res => {
            if(res.repData){
              this.hydPlanList();
              this.feedMessage('warning', res.repData);
              this.hydDialogVisible = false;
            }
          })
        }
      },
      //删除
      deltFactory() {
        if(this.checkedChange()){
          confirmPop('确认删除', () => {
            hydPhDeleteApi({ids: this.checkedChange()}).then(res => {
              this.hydPlanList()
              this.feedMessage('warning', res.repData);
            })
          })
        }
      },
      fromVal(num) {
        let self = this;
        let p = {
          pageNum: this.currentPage,
          pageSize: this.pageSizeNum,
          windowType: 1,
          category: self.dataFm.formData.category,
          color: self.dataFm.formData.color,
          driveMode: self.dataFm.formData.driveMode,
          status: self.dataFm.formData.status,
          carType: self.dataFm.formData.vehicleType,
          typeLevel: self.dataFm.formData.typeLevel,
          vin: self.dataFm.formData.vin ? getSplitString(self.dataFm.formData.vin) : null,
          origWarehouseId: self.dataFm.formData.origWarehouseId,
          pointLocation: self.dataFm.formData.pointLocation,
          salesArea: self.dataFm.formData.salesArea,
          startCommandDate: self.dataFm.formData.commandDate ? self.dataFm.formData.commandDate[0] : null,
          endCommandDate: self.dataFm.formData.commandDate ? self.dataFm.formData.commandDate[1] : null,
        }
        if(num == 2) {
          let arr = [];
          if(this.tableSelectId.length > 0){
            this.tableSelectId.forEach((item) => {
              arr.push(item.ttWindowHydrogenvehicleidId);
            })
          }
          p.id = arr.length > 0 ? arr : null;
        }
        return p;
      },
      //列表
      hydPlanList(){
        hydQPlanueryAllApi(this.fromVal(1)).then(res => {
          if(res.repData){
            this.tableData.listData    = res.repData.list;
            this.tableData.total       = res.repData.total;
          }
        })
      },
      exportBtn() {
        // if(this.tableData.listData.length < 1) {
        //   this.feedMessage('warning', '无数据，不能导出');
        //   return false;
        // }
        hydPlanExportApi(this.fromVal(2)).then(res => {
          if(res.repData){
            window.location.href = res.repData;
          }
        })
      },
      importExcal(res) {
        let p = {
          "filePath": res,
          type: 1,
        }
        hydPlanInportApi(p).then(res => {
          res.repData && this.feedMessage('warning',res.repData);
          this.hydPlanList();
        })
      }
    },
    created() {
      this.hydPlanList();
    }
  }
</script>

<style lang="less">
</style>
