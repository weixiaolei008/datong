<!--系统窗口／氢能源窗口／氢能源计划(接收车辆)-->
<template>
  <el-container style="width: 100%;height: 100%;">
    <el-header style="height: auto; padding: 0;">
      <!-- search-group -->
      <div is="fromSearch" :data="dataFm" @searchChange="loadList"></div>
      <!-- btn-group -->
      <div class="btn-group clearfix">
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
  </el-container>
</template>

<script>
  import FromSearch from "../FromSearch"
  import Table from "@/components/Table"
  import { timestampToTime, getSplitString }from "@/common/config/utils"
  import {garaQuSelectHistoryApi, garaEdExportHistoryWindowApi} from "@/common/config/api/SysWindows"

  export default {
    name: "garageAudit",
    components: { FromSearch, Table },
    data() {
      return {
        pop: false,
        currentPage: 1,
        pageSizeNum: 30,
        tableSelectId: [],//表格选中的数据
        //搜索
        dataFm: {
          pop: false,
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
        tableData: {
          selectShow: true,
          tableHeight: 0,
          currentPage: 1,
          total: 0, //列表总数
          listData: [],
          tableHead: [
            {
              name: "库改内容",
              value: 'changeContent',
              width: '200'
            },
            {
              name: "申请部门",
              value: 'applyDept',
            },
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
              width: '140',
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
              width: '150'
            },
            {
              name: "当前仓库",
              value: 'currentWarehouseId',
            },
            {
              name: "申请人",
              value: 'applicant',
            },
            {
              name: "送车指令下达时间",
              value: 'sendCommandDate ',
              width: '200',
              formatter:  function(row) {
                return row.sendCommandDate  ? row.sendCommandDate : null
              }
            },
            {
              name: "送车车辆接收交接时间",
              value: 'sendReceiveDate ',
              width: '200',
              formatter:  function(row) {
                return row.sendReceiveDate  ? row.sendReceiveDate : null
              }
            },
            {
              name: "还车指令下达时间",
              value: 'backCommandDate ',
              width: '200',
              formatter:  function(row) {
                return row.backCommandDate  ? row.backCommandDate : null
              }
            },
            {
              name: "还车车辆接收交接时间 ",
              value: 'backReceiveDate ',
              width: '200',
              formatter:  function(row) {
                return row.backReceiveDate  ? row.backReceiveDate : null
              }
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
      //表格选中数据
      checkedChange() {
        if(this.tableSelectId.length < 1) {
          this.feedMessage('error','请选择数据！');
          return false;
        }
        let idList = [];
        for(var row in this.tableSelectId) {
          idList.push(this.tableSelectId[row].is + '')
        }
        var params = { ids: idList }
        return params;
      },
      fromVal(num) {
        let self = this;
        var p = {
          pageNum: this.currentPage,
          pageRows: this.pageSizeNum,
          category: self.dataFm.formData.category,//车辆种类
          color: self.dataFm.formData.color,
          driveMode: self.dataFm.formData.driveMode,//驱动方式
          currentWarehouseId: self.dataFm.formData.origWarehouseId,//始发仓库
          pointLocation: self.dataFm.formData.pointLocation,//点位信息
          salesArea: self.dataFm.formData.salesArea,//销售区域
          status: self.dataFm.formData.status,//窗口状态 1:待执行2:已执行3:已执行
          typeLevel: self.dataFm.formData.typeLevel,//车型级
          carType: self.dataFm.formData.vehicleType,//车型
          vin: self.dataFm.formData.vin ? getSplitString(self.dataFm.formData.vin) : null,
          startCommandDate: self.dataFm.formData.commandDate ? self.dataFm.formData.commandDate[0] : null,
          endCommandDate: self.dataFm.formData.commandDate ? self.dataFm.formData.commandDate[1] : null,
        }
        if(num == 2) {
          let arr = [];
          if(this.tableSelectId.length > 0){
            this.tableSelectId.forEach((item) => {
              arr.push(item.ttWindowRefitcarId);
            })
          }
          p.id = arr.length > 0 ? arr : null;
        }
        return p;
      },
      //列表
      loadList(){
        garaQuSelectHistoryApi(this.fromVal(1)).then(res => {
          this.tableData.listData    = res.repData.list;
          this.tableData.total       = res.repData.total;
        })
      },
      exportBtn() {
        garaEdExportHistoryWindowApi(this.fromVal(2)).then(res => {
          if(res.repData){
            window.location.href = res.repData;
          }
        })
      }
    },
    created() {
      this.loadList();
    }
  }
</script>

<style lang="less">

</style>


