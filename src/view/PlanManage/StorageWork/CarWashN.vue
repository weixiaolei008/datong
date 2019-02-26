<template>
  <el-container style="width: 100%;height: 100%;">
    <el-header style="height: auto; padding: 0;">
      <div is="FormSearch" :data="data" @search="search"></div>
      <!-- btn-group -->
      <div class="btn-group clearfix">
        <div class="btn-add" @click="handleCreate"><span class="img-add">执行计划</span></div>
        <div class="btn-del" @click="delSure"><span class="img-del">删除</span></div>
        <UploadExcel @handle-success="importSuccess"></UploadExcel>
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
  import {loadCarWashN, exportCarWashN, importHuN, creatCarWash, delCarWash} from "@/common/config/api/PlanManage"
  import {getSplitString, w200, w150, w120}from "@/common/config/utils"
  import {loadRefresh, creatWarehouse, delPlan} from './mixIn'
  import UploadExcel from "@/components/UploadExcel"
  import FormSearch from "../FormSearch"
  import Table from "@/components/Table"

  export default {
    name: "CarWashN",
    components: {
      FormSearch,
      Table,
      UploadExcel
    },
    mixins: [loadRefresh, creatWarehouse, delPlan],
    data() {
      return {
        isSaveFlag: true,
        selectRows: [],
        tableData: {
          selectShow: true,
          tableHeight: 0,
          currentPage: 1,
          pageSize: 30,
          width: '120px',
          total: 0,
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
              name: "库龄(天)",
              value: 'warehouseAge',
            },
          ],
        },
        data: {
          pop: false,
          formData: {
            vin: '',
            color: '',
            driveMode: '',
            salesArea: '',
            currentWarehouseId: '',
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
      importSuccess(res){
        let self = this;
        let p = {
          "filePath": res,
          "type": 59
        }
        importHuN(p).then(res => {
          res && res.success && self.msgInfo(res.repData);
          self.loadData();
        })
      },
      loadData() {
        let self = this;
        let p = {
          "vins": getSplitString(self.data.formData.vin),
          "color": self.data.formData.color,
          "driveMode": self.data.formData.driveMode,
          "salesArea": self.data.formData.salesArea,
          "currentWarehouseId": self.data.formData.currentWarehouseId,
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
        loadCarWashN(p).then(res => {
          if(res && res.repData){
            self.tableData.listData = res.repData.list;
            self.tableData.total = res.repData.total;
          }
        })
      },
      //创建计划保存
      saveCreate() {
        let self = this;
        if(self.isSaveFlag){
          this.isSaveFlag = false;
          setTimeout(()=>{
            self.isSaveFlag = true;
          }, 1000)
          let arr = [];
          this.selectRows.forEach((item) => {
            arr.push(item.vin);
          })
          let p = {
            "type": 59,
            "vins": arr
          }
          //公用
          creatCarWash(p).then(res => {
            res && res.success && self.msgInfo(res.repData.message);
            self.loadData();
          })
        }
      },
      handleDel(){
        let self = this;
        let arr = [];
        this.selectRows.forEach((item) => {
          arr.push(item.ttPlanRepertoryId);
        })
        let p = {
          "listIds": arr
        }
        //公用
        delCarWash(p).then(res => {
          res && res.success && self.msgInfo(res.repData.message);
          self.loadData();
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
            "color": self.data.formData.color,
            "driveMode": self.data.formData.driveMode,
            "salesArea": self.data.formData.salesArea,
            "currentWarehouseId": self.data.formData.currentWarehouseId,
            "vehicleType": self.data.formData.vehicleType,
            "typeLevel": self.data.formData.typeLevel,
            "category": self.data.formData.category,
            "pointLocation":self.data.formData.pointLocation,
            "orderSource": self.data.formData.orderSource,
            "currentLocationId": self.data.formData.currentLocationId,
            "currentFunctionalZoneId":self.data.formData.currentFunctionalZoneId,
          }
        }
        exportCarWashN(p).then(res => {
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
