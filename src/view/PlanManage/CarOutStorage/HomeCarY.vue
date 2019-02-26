<template>
  <el-container  style="width: 100%;height: 100%;">
    <el-header style="height: auto; padding: 0;">
      <div is="FormSearch" :data="data" @search="search"></div>
      <!-- btn-group -->
      <div class="btn-group clearfix">
        <div class="btn-del" @click="delSure"><span class="img-stop">终止</span></div>
        <div @click="handleExport" class="btn-export"><span class="img-extend">导出</span></div>
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
  import {loadHomeCar, exportHomeCar, delHomeCar} from "@/common/config/api/PlanManage"
  import {getSplitString, confirmPop, w200, w180}from "@/common/config/utils"
  import {loadRefresh} from './mixIn'
  import FormSearch from "../FormSearch"
  import Table from "@/components/Table"
  export default {
    name: "HomeCarY",
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
              name: "当前仓库",
              value: 'currentWarehouseName',
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
            currentWarehouseCode: '',
            type: '',
            typeLevel: '',
            category: '',
            color: '',
            salesArea: '',
            driveMode: '',
            pointLocation: '',
            transportWay: '',
            status: '',
            isBoole: '',
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
              value: 'currentWarehouseCode'
            },
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
              label: '运输工具',
              type: 'select',
              value: 'driveMode'
            },
            {
              label: '状态',
              type: 'select',
              value: 'status'
            },
            {
              label: '是否超期',
              type: 'select',
              value: 'isBoole'
            },
          ],
        },
      }
    },
    methods: {
      loadData() {
        let self = this;
        let p = {
          "planType": 25, // 区分接口
          "vin": getSplitString(self.data.formData.vin),
          "startCommandDate": self.data.formData.commandDate ? self.data.formData.commandDate[0] : '',
          "endCommandDate": self.data.formData.commandDate ? self.data.formData.commandDate[1] : '',
          "currentWarehouseCode":  self.data.formData.currentWarehouseCode,
          "carType": self.data.formData.type,
          "typeLevel": self.data.formData.typeLevel,
          "category": self.data.formData.category,
          "color": self.data.formData.color,
          "salesArea": self.data.formData.salesArea,
          "driveMode": self.data.formData.driveMode,
          "pointLocation": self.data.formData.pointLocation,
          "transportWay": self.data.formData.transportWay,
          "status": self.data.formData.status,
          "isOverdue": self.data.formData.isBoole,
          "pageNum": self.tableData.currentPage,
          "pageSize": self.tableData.pageSize,
        }
        loadHomeCar(p).then(res => {
          if(res && res.repData){
            self.tableData.listData = res.repData.list;
            self.tableData.total = res.repData.total;
          }
        })
      },
      delSure(){
        if(!this.selectRows.length) {
          this.msgInfo('至少勾选一条数据');
          return;
        }
        let bool = this.selectRows.some((item) => {
          return item.generateType === '自动'
        })
        if(bool){
          this.msgInfo('自动类型不可终止');
          return;
        }
        confirmPop('确认终止',this.handleDel)
      },
      handleDel(){
        let self = this;
        let arr = [];
        this.selectRows.forEach((item) => {
          arr.push(item.ttPlanTouringcarId);
        })
        let p = {
          "ids": arr
        }
        delHomeCar(p).then(res => {
          res && res.success && self.msgInfo(res.repData);
          this.loadData()
        })
      },
      handleExport(){
        let self = this;
        let p;
        if(this.selectRows.length){
          let arr = [];
          this.selectRows.forEach((item) => {
            arr.push(item.ttPlanTouringcarId);
          })
          p = {
            "id": arr,//勾选时导出的列表
            "planType": 25, // 区分接口
          }
        }else{
          p = {
            "planType": 25, // 区分接口
            "vin": getSplitString(self.data.formData.vin),
            "startCommandDate": self.data.formData.commandDate ? self.data.formData.commandDate[0] : '',
            "endCommandDate": self.data.formData.commandDate ? self.data.formData.commandDate[1] : '',
            "currentWarehouseCode":  self.data.formData.currentWarehouseCode,
            "carType": self.data.formData.type,
            "typeLevel": self.data.formData.typeLevel,
            "category": self.data.formData.category,
            "color": self.data.formData.color,
            "salesArea": self.data.formData.salesArea,
            "driveMode": self.data.formData.driveMode,
            "pointLocation": self.data.formData.pointLocation,
            "transportWay": self.data.formData.transportWay,
            "status": self.data.formData.status,
            "isOverdue": self.data.formData.isBoole,
          }
        }
        exportHomeCar(p).then(res => {
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
