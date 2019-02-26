<!--车辆维保计划-->
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
    <el-main class="table" style="padding: 10px ;">
      <Table :data='tableData'
             @selection-change="handleSelectionChange"
             @current-change="handleCurrentChange">
      </Table>
    </el-main>
  </el-container>
</template>

<script>
  import {loadCarMaintenanceY, exportCarMaintenanceY, creatCarWash, delCarWash} from "@/common/config/api/PlanManage"
  import {getSplitString, w200, w180, w150, w120}from "@/common/config/utils"
  import {loadRefresh} from './mixIn'
  import FormSearch from "../FormSearch"
  import Table from "@/components/Table"

  export default {
    name: "CarMaintenanceY",
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
          total: 90, //列表总数
          listData: [],
          tableHead: [
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
              value: 'currentWarehouseName',
            },
            {
              name: "当前库区",
              width: w120,
              value: 'currentFunctionalZoneName',
            },
            {
              name: "当前库位",
              width: w150,
              value: 'currentLocationId',
            },
            {
              name: "指令来源",
              value: 'orderSource',
            },
            {
              name: "指令下达时间",
              width: w180,
              value: 'commandDate',
            },
            {
              name: "状态",
              value: 'statusName',
            },
            {
              name: "是否超期",
              value: 'isOverdueName',
            },
          ],
        },
        data: {
          pop: false,
          formData: {
            vin: '',
            createDate: '',
            color: '',
            driveMode: '',
            salesArea: '',
            currentWarehouseId: '',
            status: null,
            isOverdue: null,
            vehicleType: '',
            typeLevel: null,
            category: '',
            pointLocation: null,
            orderSource: '',
            currentLocationId: '',
            currentFunctionalZoneId: '',
          },
          arr1: [
            {
              label: '指令下达时间',
              type: 'time',
              value: 'createDate'
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
              label: '状态',
              type: 'select',
              value: 'status'
            },
            {
              label: '是否超期',
              type: 'select',
              value: 'isOverdue'
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
              label: '指令来源',
              type: 'select',
              value: 'orderSource'
            },
            {
              label: '当前库位',
              type: 'input',
              value: 'currentLocationId'
            },
            {
              label: '当前库区',
              type: 'select',
              value: 'currentFunctionalZoneId'
            },
          ],
        }
      }
    },
    methods: {
      loadData() {
        let self = this;
        let p = {
          "vins": getSplitString(self.data.formData.vin),
          "createBeginDate": self.data.formData.createDate ? self.data.formData.createDate[0] : '',
          "createEndDate": self.data.formData.createDate ? self.data.formData.createDate[1] : '',
          "color": self.data.formData.color,
          "driveMode": self.data.formData.driveMode,
          "salesArea": self.data.formData.salesArea,
          "currentWarehouseId": self.data.formData.currentWarehouseId,
          "status": self.data.formData.status,
          "isOverdue": self.data.formData.isOverdue,
          "vehicleType": self.data.formData.vehicleType,
          "typeLevel": self.data.formData.typeLevel,
          "category": self.data.formData.category,
          "pointLocation":self.data.formData.pointLocation,
          "orderSource": self.data.formData.orderSource,
          "currentLocationId": self.data.formData.currentLocationId,
          "currentFunctionalZoneId":self.data.formData.currentFunctionalZoneId,
          "pageNum": self.tableData.currentPage,
          "pageSize": self.tableData.pageSize,
        }
        loadCarMaintenanceY(p).then(res => {
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
            arr.push(item.ttPlanRepertoryId);
          })
          p = {
            "ttPlanRepertoryIds": arr,//勾选时导出的列表
          }
        }else{
          p = {
            "vins": getSplitString(self.data.formData.vin),
            "createBeginDate": self.data.formData.createDate ? self.data.formData.createDate[0] : '',
            "createEndDate": self.data.formData.createDate ? self.data.formData.createDate[1] : '',
            "color": self.data.formData.color,
            "driveMode": self.data.formData.driveMode,
            "salesArea": self.data.formData.salesArea,
            "currentWarehouseId": self.data.formData.currentWarehouseId,
            "status": self.data.formData.status,
            "isOverdue": self.data.formData.isOverdue,
            "vehicleType": self.data.formData.vehicleType,
            "typeLevel": self.data.formData.typeLevel,
            "category": self.data.formData.category,
            "pointLocation":self.data.formData.pointLocation,
            "orderSource": self.data.formData.orderSource,
            "currentLocationId": self.data.formData.currentLocationId,
            "currentFunctionalZoneId":self.data.formData.currentFunctionalZoneId,
          }
        }
        exportCarMaintenanceY(p).then(res => {
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
