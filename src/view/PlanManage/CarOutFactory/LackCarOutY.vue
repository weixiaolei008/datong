<template>
  <el-container style="width: 100%;height: 100%;">
    <el-header style="height: auto; padding: 0;">
      <div is="FormSearch" :data="data" @search="search"></div>
      <!-- btn-group -->
      <div class="btn-group clearfix">
        <div @click="handleExport" class="btn-export"><span class="img-extend">导出</span></div>
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
  import {loadLackCarOut, exportLackCarOut} from "@/common/config/api/PlanManage"
  import {getSplitString, w200, w180}from "@/common/config/utils"
  import {loadRefresh} from '@/common/mixin/mixPart'
  import FormSearch from "../FormSearch"
  import Table from "@/components/Table"

  export default {
    name: "LackCarOutY",
    components: {
      FormSearch,
      Table,
    },
    mixins: [loadRefresh],
    data() {
      return {
        selectRows: [],
        tableData: {
          selectShow: true,
          tableHeight: 0,
          currentPage: 1,
          pageSize: 30,
          width: '120px',
          total: 0, //列表总数
          listData: [],
          tableHead: [
            {
              name: "VIN号",
              width: w200,
              value: 'vin',
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
              name: "始发仓库",
              value: 'origWarehouseId',
            },
            {
              name: "目标仓库",
              value: 'goalWarehouse',
            },
            {
              name: "当前仓库",
              value: 'currentWarehouseId',
            },
            {
              name: "当前库区",
              value: 'currentFunctionalZoneId',
            },
            {
              name: "当前库位",
              value: 'currentLocationId',
            },
            // {
            //   name: "申请人",
            //   value: 'createBy',
            // },
            {
              name: "运输工具",
              value: 'transportWay',
            },
            {
              name: "指令下达时间",
              width: w180,
              value: 'commandDate',
            },
            {
              name: "状态",
              value: 'status',
            },
            {
              name: "是否超期",
              value: 'isOverdue',
            },
          ],
        },
        data: {
          pop: false,
          formData: {
            vin: '',
            commandDate: '',
            color: '',
            typeLevel: '',
            currentWarehouseId: '',
            status: '',
            pointLocation: '',
            category: '',
            salesArea: '',
            driveMode: '',
            type: '',
            transportWay: '',
            isOverdue: '',
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
              label: '车型级',
              type: 'select',
              value: 'typeLevel'
            },
            {
              label: '当前仓库',
              type: 'select',
              value: 'currentWarehouseId'
            },
            {
              label: '状态',
              type: 'select',
              value: 'status'
            },
            {
              label: '点位信息',
              type: 'select',
              value: 'pointLocation'
            },
            {
              label: '车辆种类',
              type: 'select',
              value: 'category'
            },
            {
              label: '车型',
              type: 'select',
              value: 'type'
            },
            {
              label: '运输工具',
              type: 'select',
              value: 'transportWay'
            },
            {
              label: '是否超期',
              type: 'select',
              value: 'isOverdue'
            },
          ],
        },
      }
    },
    methods: {
      loadData() {
        let self = this;
        let p = {
          "vins": getSplitString(self.data.formData.vin),
          "startCommandDate": self.data.formData.commandDate ? self.data.formData.commandDate[0] : '',
          "endCommandDate": self.data.formData.commandDate ? self.data.formData.commandDate[1] : '',
          "color": self.data.formData.color,
          "typeLevel": self.data.formData.typeLevel,
          "currentWarehouseId":  self.data.formData.currentWarehouseId,
          "status": self.data.formData.status,
          "pointLocation": self.data.formData.pointLocation,
          "category": self.data.formData.category,
          "salesArea": self.data.formData.salesArea,
          "driveMode": self.data.formData.driveMode,
          "type": self.data.formData.type,
          "transportWay": self.data.formData.transportWay,
          "isOverdue": self.data.formData.isOverdue,
          "pageNum": self.tableData.currentPage,
          "pageSize": self.tableData.pageSize,
        }
        loadLackCarOut(p).then(res => {
          if(res && res.repData){
            self.tableData.listData = res.repData.list;
            self.tableData.total = res.repData.total;
          }
        })
      },
      handleExport(){
        let self = this;
        let p;
        if(this.selectRows.length){
          let arr = [];
          this.selectRows.forEach((item) => {
            arr.push(item.ttOutboundId);
          })
          p = {
            "ttOutboundIds": arr,//勾选时导出的列表
          }
        }else{
          p = {
            "vins": getSplitString(self.data.formData.vin),
            "startCommandDate": self.data.formData.commandDate ? self.data.formData.commandDate[0] : '',
            "endCommandDate": self.data.formData.commandDate ? self.data.formData.commandDate[1] : '',
            "color": self.data.formData.color,
            "typeLevel": self.data.formData.typeLevel,
            "currentWarehouseId":  self.data.formData.currentWarehouseId,
            "status": self.data.formData.status,
            "pointLocation": self.data.formData.pointLocation,
            "category": self.data.formData.category,
            "salesArea": self.data.formData.salesArea,
            "driveMode": self.data.formData.driveMode,
            "type": self.data.formData.type,
            "transportWay": self.data.formData.transportWay,
            "isOverdue": self.data.formData.isOverdue,
          }
        }
        exportLackCarOut(p).then(res => {
          res && res.success && (window.location.href = res.repData)
        })
      },
    },
    mounted() {
    },
    created() {
    }
  }
</script>

<style scoped lang="less">

</style>
