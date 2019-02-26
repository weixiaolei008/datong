<template>
  <el-container style="width: 100%;height: 100%;">
    <el-header style="height: auto; padding: 0;">
      <div is="FormSearch" :data="data" @search="search"></div>
      <!-- btn-group -->
      <div class="btn-group clearfix">
        <UploadExcel @handle-success="importSuccess"></UploadExcel>
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
  import {loadCarInStorage, exportCarInStorage, importSaleCar} from "@/common/config/api/PlanManage"
  import {getSplitString, w200, w180}from "@/common/config/utils"
  import {loadRefresh} from '@/common/mixin/mixPart'
  import UploadExcel from "@/components/UploadExcel"
  import FormSearch from "../FormSearch"
  import Table from "@/components/Table"

  export default {
    name: "SaleCar",
    components: {
      FormSearch,
      Table,
      UploadExcel
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
            {
              name: "可入库时间",
              width: w180,
              value: 'ableInboundDate',
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
            type: '',
            typeLevel: '',
            category: '',
            color: '',
            salesArea: '',
            driveMode: '',
            pointLocation: '',
            goalWarehouse: '',
            ableInboundDate: '',
            status: '',
            isOverdue: '',
          },
          arr1: [
            {
              label: '可入库时间',
              type: 'time',
              value: 'ableInboundDate'
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
              label: '车型',
              type: 'select',
              value: 'type'
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
              label: '目标仓库',
              type: 'select',
              value: 'goalWarehouse'
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
      importSuccess(res){
        let self = this;
        let p = {
          "filePath": res,
          "type": 61
        }
        importSaleCar(p).then(res => {
          res && res.success && self.msgInfo(res.repData);
          self.loadData();
        })
      },
      loadData() {
        let self = this;
        let p = {
          "planType": 61, // 区分接口
          "vins": getSplitString(self.data.formData.vin),
          "startInboundDate": self.data.formData.ableInboundDate ? self.data.formData.ableInboundDate[0] : '',
          "endInboundDate": self.data.formData.ableInboundDate ? self.data.formData.ableInboundDate[1] : '',
          "category": self.data.formData.category,
          "color": self.data.formData.color,
          "driveMode": self.data.formData.driveMode,
          "goalWarehouse": self.data.formData.goalWarehouse,
          "isOverdue": self.data.formData.isOverdue,
          "pointLocation": self.data.formData.pointLocation,
          "salesArea": self.data.formData.salesArea,
          "status": self.data.formData.status,
          "type": self.data.formData.type,
          "typeLevel":self.data.formData.typeLevel,
          "pageNum": self.tableData.currentPage,
          "pageSize": self.tableData.pageSize,
        }
        loadCarInStorage(p).then(res => {
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
            arr.push(item.ttInboundId);
          })
          p = {
            "ttInboundIds": arr,//勾选时导出的列表
            "planType": 61, // 区分接口
          }
        }else{
          p = {
            "planType": 61, // 区分接口
            "vins": getSplitString(self.data.formData.vin),
            "startInboundDate": self.data.formData.ableInboundDate ? self.data.formData.ableInboundDate[0] : '',
            "endInboundDate": self.data.formData.ableInboundDate ? self.data.formData.ableInboundDate[1] : '',
            "category": self.data.formData.category,
            "color": self.data.formData.color,
            "driveMode": self.data.formData.driveMode,
            "goalWarehouse": self.data.formData.goalWarehouse,
            "isOverdue": self.data.formData.isOverdue,
            "pointLocation": self.data.formData.pointLocation,
            "salesArea": self.data.formData.salesArea,
            "status": self.data.formData.status,
            "type": self.data.formData.type,
            "typeLevel":self.data.formData.typeLevel,
          }
        }
        exportCarInStorage(p).then(res => {
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
