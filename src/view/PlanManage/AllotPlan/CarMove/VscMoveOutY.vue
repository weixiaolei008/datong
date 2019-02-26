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
  import {loadMoveList, exportVscMoveOutY, delMovePlan} from "@/common/config/api/PlanManage"
  import {getSplitString, confirmPop, w200, w180}from "@/common/config/utils"
  import {loadRefresh} from '../../StorageWork/mixIn'
  import FormSearch from "../../FormSearch"
  import Table from "@/components/Table"

  export default {
    name: "VscMoveOutY",
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
            },{
              name: "生成方式",
              value: 'createTypeName',
            },
            {
              name: "指令下达时间",
              width: w180,
              value: 'commandDate',
            },
            {
              name: "车队提车时间",
              width: w180,
              value: 'sentDate',
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
            createDate: '',
            sentDate: '',
            isBoole: null,
            vehicleType: '',
            currentWarehouseId: '',
            status: null,
            category: '',
            salesArea: '',
            driveMode: '',
            color: '',
            typeLevel: '',
            transportWay: '',
            pointLocation: null,
            goalWarehouseId: '',
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
              label: '车队提车时间',
              type: 'time',
              value: 'sentDate'
            },
            {
              label: '是否超期',
              type: 'select',
              value: 'isBoole'
            },
            {
              label: '车型',
              type: 'select',
              value: 'vehicleType'
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
              label: '车辆种类',
              type: 'select',
              value: 'category'
            },
            {
              label: '车型级',
              type: 'select',
              value: 'typeLevel'
            },
            {
              label: '运输工具',
              type: 'select',
              value: 'transportWay'
            },
            {
              label: '点位信息',
              type: 'select',
              value: 'pointLocation'
            },
            {
              label: '目的仓库',
              type: 'select',
              value: 'goalWarehouseId'
            },
          ],
        },
      }
    },
    methods: {
      loadData() {
        let self = this;
        let p = {
          "style": 38,
          "vins": getSplitString(self.data.formData.vin),
          "createBeginDate": self.data.formData.createDate ? self.data.formData.createDate[0] : '',
          "createEndDate": self.data.formData.createDate ? self.data.formData.createDate[1] : '',
          "sentBeginDate": self.data.formData.sentDate ? self.data.formData.sentDate[0] : '',
          "sentEndDate": self.data.formData.sentDate ? self.data.formData.sentDate[1] : '',
          "isOverdue": self.data.formData.isBoole,
          "vehicleType": self.data.formData.vehicleType,
          "currentWarehouseId":self.data.formData.currentWarehouseId,
          "status": self.data.formData.status,
          "category": self.data.formData.category,
          "salesArea": self.data.formData.salesArea,
          "driveMode": self.data.formData.driveMode,
          "color": self.data.formData.color,
          "typeLevel": self.data.formData.typeLevel,
          "transportWay": self.data.formData.transportWay,
          "pointLocation": self.data.formData.pointLocation,
          "goalWarehouseId": self.data.formData.goalWarehouseId,
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
      delSure(){
        if(!this.selectRows.length) {
          this.msgInfo('至少勾选一条数据');
          return;
        }
        confirmPop('确认终止',this.handleDel)
      },
      handleDel(){
        if(!this.selectRows.length) {
          this.msgInfo('至少勾选一条数据');
          return;
        }
        let self = this;
        let arr = [];
        this.selectRows.forEach((item) => {
          arr.push(item.ttPlanOutboundId);
        })
        let p = {
          "listIds": arr
        }
        delMovePlan(p).then(res => {
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
            arr.push(item.ttPlanOutboundId);
          })
          p = {
            "ttPlanOutboundIds": arr,//勾选时导出的列表
          }
        }else{
          p = {
            "style": 38,
            "vins": getSplitString(self.data.formData.vin),
            "createBeginDate": self.data.formData.createDate ? self.data.formData.createDate[0] : '',
            "createEndDate": self.data.formData.createDate ? self.data.formData.createDate[1] : '',
            "sentBeginDate": self.data.formData.sentDate ? self.data.formData.sentDate[0] : '',
            "sentEndDate": self.data.formData.sentDate ? self.data.formData.sentDate[1] : '',
            "isOverdue": self.data.formData.isBoole,
            "vehicleType": self.data.formData.vehicleType,
            "currentWarehouseId":self.data.formData.currentWarehouseId,
            "status": self.data.formData.status,
            "category": self.data.formData.category,
            "salesArea": self.data.formData.salesArea,
            "driveMode": self.data.formData.driveMode,
            "color": self.data.formData.color,
            "typeLevel": self.data.formData.typeLevel,
            "transportWay": self.data.formData.transportWay,
            "pointLocation": self.data.formData.pointLocation,
            "goalWarehouseId": self.data.formData.goalWarehouseId,
          }
        }
        exportVscMoveOutY(p).then(res => {
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
