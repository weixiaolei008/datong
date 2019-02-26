<template>
  <el-container style="width: 100%;height: 100%;">
    <el-header style="height: auto; padding: 0;">
      <div is="FormSearch" :data="data" @search="search"></div>
      <!-- btn-group -->
      <div class="btn-group clearfix">
        <div @click="handleCreate" class="btn-add"><span class="img-add">执行计划</span></div>
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
  import {loadVdcMoveInN, exportVdcMoveInN, creatVdcMoveInN} from "@/common/config/api/PlanManage"
  import {getSplitString, w200}from "@/common/config/utils"
  import FormSearch from "../../FormSearch"
  import {loadRefresh, creatWarehouse} from '../../StorageWork/mixIn'
  import Table from "@/components/Table"

  export default {
    name: "VdcMoveInN",
    components: {
      FormSearch,
      Table,
    },
    mixins: [loadRefresh, creatWarehouse],
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
              name: "库龄(天)",
              value: 'warehouseAge',
            },
            {
              name: "始发仓库",
              value: 'currentWarehouseName',
            },
            {
              name: "目的仓库",
              value: 'goalWarehouseName',
            },
          ],
        },
        data: {
          pop: false,
          formData: {
            vin: '',
            currentWarehouseId: '',
            salesArea: '',
            category: '',
            driveMode: '',
            pointLocation: null,
            vehicleType: '',
            typeLevel: null,
            color: '',
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
              label: '始发仓库',
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
          ],
        },
      }
    },
    methods: {
      loadData() {
        let self = this;
        let p = {
          "vins": getSplitString(self.data.formData.vin),
          "currentWarehouseId": self.data.formData.currentWarehouseId,
          "salesArea": self.data.formData.salesArea,
          "category":self.data.formData.category,
          "driveMode": self.data.formData.driveMode,
          "pointLocation": self.data.formData.pointLocation,
          "vehicleType": self.data.formData.vehicleType,
          "typeLevel": self.data.formData.typeLevel,
          "color": self.data.formData.color,
          "pageNum": self.tableData.currentPage,
          "pageSize": self.tableData.pageSize,
        }
        loadVdcMoveInN(p).then(res => {
          if(res){
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
            "vins": arr,//勾选时导出的列表
          }
          creatVdcMoveInN(p).then(res => {
            res && res.success && self.msgInfo(res.repData.message);
            self.loadData();
          })
        }
      },
      handleExport(){
        let self = this;
        let p;
        if(this.selectRows.length > 0){
          let arr = [];
          this.selectRows.forEach((item) => {
            arr.push(item.ttPlanInboundIds);
          })
          p = {
            "ttPlanInboundIds": arr,//勾选时导出的列表
          }
        }else{
          p = {
            "vins": getSplitString(self.data.formData.vin),
            "currentWarehouseId": self.data.formData.currentWarehouseId,
            "salesArea": self.data.formData.salesArea,
            "category":self.data.formData.category,
            "driveMode": self.data.formData.driveMode,
            "pointLocation": self.data.formData.pointLocation,
            "vehicleType": self.data.formData.vehicleType,
            "typeLevel": self.data.formData.typeLevel,
            "color": self.data.formData.color,
          }
        }
        exportVdcMoveInN(p).then(res => {
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
