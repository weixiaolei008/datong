<!--系统窗口／PDI车辆返修窗口／PDI车辆返修计划 (接收车辆)-->
<template>
  <el-container  style="width: 100%;height: 100%;">
    <el-header style="height: auto; padding: 0;">
      <!-- search-group -->
      <div is="fromSearch" :data="dataFm" @searchChange="loadList"></div>
      <!-- btn-group -->
      <div class="btn-group clearfix">
        <div class="btn-inform" @click="extractCarBtn"><span class="img-inform">通知提车</span></div>
        <div class="btn-export" @click="exportBtn"><span class="img-extend">导出</span></div>
      </div>
    </el-header>
    <!--table-->
    <el-main class="table" style="padding: 10px 10px 0 10px;">
      <Table :data='tableData'
             @selection-change="handleSelectionChange"
             @current-change="handleCurrentChange">
      </Table>
    </el-main>
  </el-container>
</template>

<script>
  import Table from "@/components/Table"
  import FromSearch from "../FromSearch"
  import { timestampToTime, getSplitString }from "@/common/config/utils"
  import {pdiPlanSelectApi, pdiPlanExpoetApi, pdiPlanExtractCarApi} from "@/common/config/api/SysWindows"

  export default {
    name: "PdiPlanWindowsN",
    components: { FromSearch, Table },
    data() {
      return {
        tabIndex: 0,
        pop: false, //弹框
        textarea:'',
        currentPage: 1,
        pageSizeNum: 30,
        tableSelectId: [],//表格选中的数据
        dataFm: {
          pop: false,
          status: 2,
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
        tableData: {
          selectShow: true,
          tableHeight: 0,
          currentPage: 1,
          total: 0, //列表总数
          listData: [],
          tableHead: [
            {
              name: "问题描述",
              value: 'problem',
              width: '200'
            },
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
              width: '140'
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
              name: '问题提报人',
              value: 'issueReported',
              width: '200'
            },
            {
              name: "指令下达时间",
              value: 'backCommandDate',
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
        this.loadList();
      },
      handleSelectionChange(val) {
        this.tableSelectId = val;
      },
      //表格选中数据
      checkedChange() {
        if(this.tableSelectId.length < 1) {
          this.feedMessage('warning','请选择数据！');
          return false;
        }
        if(this.tableSelectId.length < 1) {
          this.feedMessage('error','请选择数据！');
          return false;
        }
        let idList = [];
        for(var row in this.tableSelectId) {
          idList.push(this.tableSelectId[row].ttWindowPdiId + '')
        }
        var params = { ids: idList };
        return params;
      },
      //通知提车
      extractCarBtn(){
        if(this.checkedChange()){
          this.$confirm('请确定通知提车?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            pdiPlanExtractCarApi(this.checkedChange()).then(res => {
              if(res.repData){
                this.loadList();
                this.feedMessage('success', res.repData);
              }
            })
          })
        }
      },
      fromVal(num) {
        let self = this;
        var p = {
          pageNum: this.currentPage,
          pageSize: this.pageSizeNum,
          currentWarehouseId: null,//当前仓库ID
          ids: null,
          listType: 2,//列表类型 1 接收 2 送还 3 历史 ,
          driveMode: self.dataFm.formData.driveMode,//驱动方式
          category: self.dataFm.formData.category,//车辆种类
          color: self.dataFm.formData.color,
          origWarehouse: self.dataFm.formData.origWarehouseId,//始发仓库
          pointLocation: self.dataFm.formData.pointLocation,//点位信息 ,
          salesArea: self.dataFm.formData.salesArea, //销售区域
          status: self.dataFm.formData.status,//计划状态 1:未执行2:执行中3:已执行 ,
          type: self.dataFm.formData.vehicleType,//车型
          typeLevel: self.dataFm.formData.typeLevel,//车型级
          commondStartDate: self.dataFm.formData.commandDate ? self.dataFm.formData.commandDate[0] : null,//指令下达开始时间
          commondEndDate: self.dataFm.formData.commandDate ? self.dataFm.formData.commandDate[1] : null,//指令下达结束时间
          vin: self.dataFm.formData.vin ? getSplitString(self.dataFm.formData.vin) : null,
        }
        if(num == 2) {
          let arr = [];
          if(this.tableSelectId.length > 0){
            this.tableSelectId.forEach((item) => {
              arr.push(item.ttWindowPdiId);
            })
          }
          p.ids = arr.length > 0 ? arr : null;
        }
        return p;
      },
      //列表
      loadList(){
        pdiPlanSelectApi(this.fromVal(1)).then(res => {
          if(res.repData) {
            this.tableData.listData    = res.repData.list;
            this.tableData.total       = res.repData.total;
          }
        })
      },
      exportBtn() {
        pdiPlanExpoetApi(this.fromVal(2)).then(res => {
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

<style scoped lang="less">

</style>


