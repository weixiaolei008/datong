<template>
  <el-container style="width: 100%;height: 100%;">
    <el-header style="height: auto; padding: 0;">
      <div is="FormSearch" :data="data" @search="search"></div>
      <!-- btn-group -->
      <div class="btn-group clearfix">
        <div class="btn-export" @click="handleExport"><span class="img-extend">导出</span></div>
      </div>
    </el-header>
    <!--table-->
    <el-main class="table" style="padding: 10px">
      <Table :data='tableData'
             @selection-change="handleSelectionChange"
             @current-change="handleCurrentChange">
      </Table>
    </el-main>
  </el-container>
</template>

<script>
  import {loadBatchRepair, exportBatchRepair} from "@/common/config/api/PlanManage"
  import {getSplitString, w200, w180}from "@/common/config/utils"
  import {loadRefresh} from './mixIn'
  import FormSearch from "../FormSearch"
  import Table from "@/components/Table"

  export default {
    name: "MoveBatchRepairY",
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
              name: "返修内容",
              value: 'problem',
            },
            {
              name: "申请部门",
              value: 'applicationDivision',
            },
            {
              name: "VIN号",
              width: w200,
              value: 'vin',
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
            },
            {
              name: "销售区域",
              value: 'salesAreaFormat',
            },
            {
              name: "驱动方式",
              value: 'driveModeFormat',
            },
            {
              name: "点位信息",
              value: 'pointLocationFormat',
            },
            {
              name: "当前仓库",
              value: 'currentWarehouseFormat',
            },
            {
              name: "当前库区",
              value: 'currentFunctionalZone',
            },
            {
              name: "当前库位",
              value: 'currentLocation',
            },
            {
              name: "申请人",
              value: 'proposer',
            },
            {
              name: "指令下达时间",
              width: w180,
              value: 'commandDate',
            },
            {
              name: "状态",
              value: 'statusFormat',
            },
            {
              name: "是否超期",
              value: 'isOverdueFormat',
            },
          ],
        },
        data: {
          pop: false,
          formData: {
            vin: '',
            commandDate: '',
            color: '',
            driveMode: '',
            salesArea: '',
            currentWarehouseId: '',
            vehicleType: '',
            typeLevel: null,
            category: '',
            pointLocation: null,
            status: '',
            isOverdue: null,
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
              value: 'currentWarehouseId'
            },
            {
              label: '车型',
              type: 'select',
              value: 'vehicleType'
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
              label: '点位信息',
              type: 'select',
              value: 'pointLocation'
            },
            {
              label: '状态',
              type: 'select',
              value: 'status'
            },
            {
              label: '是否超期',
              type: 'select',
              value: 'isOverdue'
            },
          ],
        }
      }
    },
    methods: {
      loadData() {
        let self = this;
        let p = {
          "listType": 16,
          "vin": getSplitString(self.data.formData.vin),
          "commondStartDate": self.data.formData.commandDate ? self.data.formData.commandDate[0] : '',
          "commondEndDate": self.data.formData.commandDate ? self.data.formData.commandDate[1] : '',
          "color": self.data.formData.color,
          "driveMode": self.data.formData.driveMode,
          "salesArea": self.data.formData.salesArea,
          "currentWarehouseId": self.data.formData.currentWarehouseId,
          "type": self.data.formData.vehicleType,
          "typeLevel": self.data.formData.typeLevel,
          "category": self.data.formData.category,
          "pointLocation":self.data.formData.pointLocation,
          "status": self.data.formData.status,
          "isOverdue":self.data.formData.isOverdue,
          "pageNum": self.tableData.currentPage,
          "pageSize": self.tableData.pageSize,
        }
        loadBatchRepair(p).then(res => {
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
            arr.push(item.ttPlanPdiId);
          })
          p = {
            "ids": arr,//勾选时导出的列表
          }
        }else{
          p = {
            "listType": 16,
            "vin": getSplitString(self.data.formData.vin),
            "commondStartDate": self.data.formData.commandDate ? self.data.formData.commandDate[0] : '',
            "commondEndDate": self.data.formData.commandDate ? self.data.formData.commandDate[1] : '',
            "color": self.data.formData.color,
            "driveMode": self.data.formData.driveMode,
            "salesArea": self.data.formData.salesArea,
            "currentWarehouseId": self.data.formData.currentWarehouseId,
            "type": self.data.formData.vehicleType,
            "typeLevel": self.data.formData.typeLevel,
            "category": self.data.formData.category,
            "pointLocation":self.data.formData.pointLocation,
            "status": self.data.formData.status,
            "isOverdue":self.data.formData.isOverdue,
          }
        }
        exportBatchRepair(p).then(res => {
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

