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
  import {loadMoveList, exportVdcMoveOutY, creatMovePlan, delMovePlan} from "@/common/config/api/PlanManage"
  import {getSplitString, w200, w180}from "@/common/config/utils"
  import {loadRefresh} from './mixIn'
  import FormSearch from "../../FormSearch"
  import Table from "@/components/Table"

  export default {
    name: "VdcMoveOutY",
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
              name: "始发仓库",
              value: 'origWarehouseName',
            },
            {
              name: "目标仓库",
              value: 'goalWarehouseName',
            },
            {
              name: "当前仓库",
              value: 'currentWarehouseName',
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
              name: "运输工具",
              value: 'transportWayName',
            },
            {
              name: "生成方式",
              value: 'createTypeName',
            },
            {
              name: "状态",
              value: 'status',
            },
            {
              name: "指令下达时间",
              width: w180,
              value: 'commandDate',
            },
          ],
        },
        data: {
          pop: false,
          formData: {
            vin: '',
            createDate: '',
            currentWarehouseId: '',
            salesArea: '',
            category: '',
            driveMode: '',
            pointLocation: null,
            vehicleType: '',
            typeLevel: null,
            color: '',
            goalWarehouseId: '',
            transportWay: '',
            status: '',
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
              label: '状态',
              type: 'select',
              value: 'status'
            },
            {
              label: '目的仓库',
              type: 'select',
              value: 'goalWarehouseId'
            },
            {
              label: '运输工具',
              type: 'select',
              value: 'transportWay'
            },
          ],
        },
      }
    },
    methods: {
      loadData() {
        let self = this;
        let p = {
          "style": 17,
          "vins": getSplitString(self.data.formData.vin),
          "createBeginDate": self.data.formData.createDate ? self.data.formData.createDate[0] : '',
          "createEndDate":self.data.formData.createDate ? self.data.formData.createDate[1] : '',
          "currentWarehouseId": self.data.formData.currentWarehouseId,
          "salesArea": self.data.formData.salesArea,
          "category":self.data.formData.category,
          "driveMode": self.data.formData.driveMode,
          "pointLocation": self.data.formData.pointLocation,
          "vehicleType": self.data.formData.vehicleType,
          "typeLevel": self.data.formData.typeLevel,
          "color": self.data.formData.color,
          "goalWarehouseId": self.data.formData.goalWarehouseId,
          "transportWay": self.data.formData.transportWay,
          "status": self.data.formData.status,
          "pageNum": self.tableData.currentPage,
          "pageSize": self.tableData.pageSize,
        }
        loadMoveList(p).then(res => {
          if(res){
            self.tableData.listData = res.repData.list;
            self.tableData.total = res.repData.total;
          }
        })
      },
      handleExport(){
        let self = this;
        let p;
        if(this.selectRows.length > 0){
          let arr = [];
          this.selectRows.forEach((item) => {
            arr.push(item.ttPlanOutboundId);
          })
          p = {
            "ttPlanOutboundIds": arr,//勾选时导出的列表
          }
        }else{
          p = {
            "style": 17,
            "vins": getSplitString(self.data.formData.vin),
            "createBeginDate": self.data.formData.createDate ? self.data.formData.createDate[0] : '',
            "createEndDate":self.data.formData.createDate ? self.data.formData.createDate[1] : '',
            "currentWarehouseId": self.data.formData.currentWarehouseId,
            "salesArea": self.data.formData.salesArea,
            "category":self.data.formData.category,
            "driveMode": self.data.formData.driveMode,
            "pointLocation": self.data.formData.pointLocation,
            "vehicleType": self.data.formData.vehicleType,
            "typeLevel": self.data.formData.typeLevel,
            "color": self.data.formData.color,
            "goalWarehouseId": self.data.formData.goalWarehouseId,
            "transportWay": self.data.formData.transportWay,
            "status": self.data.formData.status,
          }
        }
        exportVdcMoveOutY(p).then(res => {
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
