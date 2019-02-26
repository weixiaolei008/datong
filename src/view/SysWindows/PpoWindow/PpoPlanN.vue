<!--系统窗口／氢能源窗口／氢能源计划(接收车辆)-->
<template>
  <el-container style="width: 100%;height: 100%;">
    <el-header style="height: auto; padding: 0;">
      <!-- search-group -->
      <div is="fromSearch" :data="dataFm" @searchChange="ppoPlanList"></div>
      <!-- btn-group -->
      <div class="btn-group clearfix">
        <div class="btn-add" @click="addSvoConBtn"><span class="img-add">创建计划</span></div>
        <div class="btn-receive" @click="receiveCarBtn"><span class="img-receive">接收车辆</span></div>
        <div class="btn-del" @click="deltFactory"><span class="img-del">删除</span></div>
        <UploadExcel @handle-success="importSuccess"></UploadExcel>
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
      title="创建计划"
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
  import { loadDicValList } from "@/common/config/api/basic"
  import { getSplitString, timestampToTime, confirmPop }from "@/common/config/utils"
  import { ppoPlanListApi, ppoPlanCreateApi, ppoPlanDeleteApi, ppoPlanExportApi, ppoPlanReceivecarApi, ppoPlanImportApi } from "@/common/config/api/SysWindows"

  export default {
    name: "PpoPlanN",
    components: { FromSearch, Table, UploadExcel},
    data() {
      return {
        pop: false,
        currentPage: 1,
        pageSizeNum: 30,
        tableSelectId: [],//表格选中的数据
        hydDialogVisible: false,
        addVins: '',
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
              value: 'vehicleType',
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
              value: 'origWarehouse',
            },
            {
              name: "指令下达时间",
              value: 'sendCommandDate',
              width: '200',
              formatter:  function(row) {
                return row.sendCommandDate ? timestampToTime(row.sendCommandDate) : null;
              }
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
      },
      handleSelectionChange(val) {
        this.tableSelectId = val;
      },
      addSvoConBtn() {
        if(this.tableSelectId.length > 1){
          this.feedMessage('warning', '不能同时编辑多条！');
          return false;
        }
        if(this.checkedChange(10)){
          this.addVins = this.tableSelectId[0] ? this.tableSelectId[0].vin : null;
          this.hydDialogVisible = true;
        }
      },
      //创建/编辑——保存
      svoVisibleConfirm(){
        if(!this.addVins || (this.addVins && !this.addVins.trim())){
          this.feedMessage('warning', '请输入VIN码');
          return false;
        }
        if(this.isSaveflag) {
          this.isSaveflag = false;
          setTimeout(() => {
            this.isSaveflag = true;
          },2000)
          let p = {
            type: 1,
            id: this.tableSelectId[0] ? this.tableSelectId[0].id : null,
            vins: this.addVins.split(',')
          }
          ppoPlanCreateApi(p).then(res => {
            if(res.repCode == '0000') {
              this.feedMessage('warning', res.repData);
              this.ppoPlanList();
              this.hydDialogVisible = false;
            }else{
              this.feedMessage('warning', res.repData);
            }
          })
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
            if(num == 3 && item.statusCode != '3'){
              sstatusL = true;
              this.feedMessage('warning','不是已执行的状态不能更新操作！');
              return false;
            }else if(num != 3 &&  item.statusCode != '1'){//1:待执行2:已执行3:已执行
              sstatusL = true;
              this.feedMessage('warning','不是待执行的状态不能更新操作！');
              return false;
            }
            ids.push(item.id);
          })
        }
        return sstatusL ? false : ids;
      },
      receiveCarBtn() {
        if(this.checkedChange('3')){
          confirmPop('确定接收车辆', () => {
            ppoPlanReceivecarApi({ids: this.checkedChange('3')}).then(res => {
              this.ppoPlanList();
              this.feedMessage('warning', res.repData)
            })
          })
        }
      },
      //删除
      deltFactory() {
        if(this.checkedChange()){
          confirmPop('确认删除', () => {
            ppoPlanDeleteApi({ids: this.checkedChange()}).then(res => {
              this.ppoPlanList()
              this.feedMessage('warning', res.repData);
            })
          })
        }
      },
      fromVal(num) {
        let self = this;
        var p = {
          pageNum: this.currentPage,
          pageRows: this.pageSizeNum,
          type: 1,
          category: self.dataFm.formData.category,//车辆种类
          color: self.dataFm.formData.color,
          driveMode: self.dataFm.formData.driveMode,//驱动方式
          origWarehouseId: self.dataFm.formData.origWarehouseId,//始发仓库
          pointLocation: self.dataFm.formData.pointLocation,//点位信息
          salesArea: self.dataFm.formData.salesArea,//销售区域
          status: self.dataFm.formData.status,//窗口状态 1:待执行2:已执行3:已执行
          typeLevel: self.dataFm.formData.typeLevel,//车型级
          vehicleType: self.dataFm.formData.vehicleType,//车型
          vins: self.dataFm.formData.vin ? getSplitString(self.dataFm.formData.vin) : null,
          beginTime: self.dataFm.formData.commandDate ? self.dataFm.formData.commandDate[0] : null,
          endTime: self.dataFm.formData.commandDate ? self.dataFm.formData.commandDate[1] : null,
        }
        if(num == 2) {
          let arr = [];
          if(this.tableSelectId.length > 0){
            this.tableSelectId.forEach((item) => {
              arr.push(item.id);
            })
          }
          p.ids = arr.length > 0 ? arr : null;
        }
        return p;
      },
      //列表
      ppoPlanList(){
        ppoPlanListApi(this.fromVal(1)).then(res => {
          if(res.repData) {
            this.tableData.listData    = res.repData.list;
            this.tableData.total       = res.repData.total;
          }
        })
      },
      importSuccess(res){
        let p = {
          "filePath": res,
          "type": 1
        }
        ppoPlanImportApi(p).then(res => {
          res.repData && this.feedMessage('warning',res.repData);
          this.ppoPlanList();
        })
      },
      exportBtn() {
        ppoPlanExportApi(this.fromVal(2)).then(res => {
          if(res.repData){
            window.location.href = res.repData;
          }
        })
      }
    },
    created() {
      this.ppoPlanList();
    }
  }
</script>
<style lang="less">
</style>