<template>
  <el-container  style="width: 100%;height: 100%;">
    <el-header style="height: auto; padding: 0;">
      <div is="FormSearch" :data="data" @search="search"></div>
      <!-- btn-group -->
      <div class="btn-group clearfix">
        <div @click="handleCreate" class="btn-add"><span class="img-add">执行计划</span></div>
        <div class="btn-del" @click="delSure"><span class="img-del">删除</span></div>
        <UploadExcel @handle-success="importSuccess"></UploadExcel>
        <div @click="handleExport" class="btn-export"><span class="img-extend">导出</span></div>
        <div @click="handleHold" class="btn-del"><span class="img-hold">hold车</span></div>
        <div @click="handleHoldN" class="btn-import"><span class="img-hold-n">解hold</span></div>
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
  import {loadMoveList, exportVscMoveOutN, importVdscN, creatMovePlan, holdVscMoveOut, holdVscMoveOutN, delMoveOut} from "@/common/config/api/PlanManage"
  import {getSplitString, confirmPop, w200, w180}from "@/common/config/utils"
  import {loadRefresh, creatWarehouse} from '../../StorageWork/mixIn'
  import UploadExcel from "@/components/UploadExcel"
  import FormSearch from "../../FormSearch"
  import Table from "@/components/Table"

  export default {
    name: "VscMoveOutN",
    components: {
      FormSearch,
      Table,
      UploadExcel
    },
    mixins: [loadRefresh, creatWarehouse],
    computed:{
      localOptions: {
        get(){
          return this.$store.state.codeOptions.options;
        },
        set(){
        }
      }
    },
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
              name: "是否hold车",
              width: '110',
              value: 'isHold',
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
              value: 'currentFunctionalZone',
            },
            {
              name: "当前库位",
              value: 'currentLocation',
            },
            {
              name: "库龄",
              value: 'warehouseAge',
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
              name: "订单下达时间",
              width: w180,
              value: 'orderDate',
            },
            {
              name: "车队提车时间",
              width: w180,
              value: 'sentDate',
            },
            {
              name: "是否二次报交",
              width: '110',
              value: 'twiceSubmission',
            },
            {
              name: "二次报交状态",
              width: '110',
              value: 'twiceSubmissionStatus',
            },
          ],
        },
        data: {
          pop: false,
          formData: {
            vin: '',
            orderDate: '',
            sentDate: '',
            currentWarehouseId: '',
            driveMode: '',
            pointLocation: '',
            salesArea: '',
            typeLevel: '',
            category: '',
            transportWay: '',
            isBoole: '',
            status: '',
            vehicleType: '',
            color: '',
          },
          arr1: [
            {
              label: '订单下达时间',
              type: 'time',
              value: 'orderDate'
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
              label: '当前仓库',
              type: 'select',
              value: 'currentWarehouseId'
            },
            {
              label: '点位信息',
              type: 'select',
              value: 'pointLocation'
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
              label: '运输工具',
              type: 'select',
              value: 'transportWay'
            },
            {
              label: '是否二次报交',
              type: 'select',
              value: 'isBoole'
            },
            {
              label: '二次报交状态',
              type: 'select',
              value: 'status'
            },
            {
              label: '车型',
              type: 'select',
              value: 'vehicleType'
            },
          ],
        },
      }
    },
    methods: {
      delSure(){
        if(!this.selectRows.length) {
          this.msgInfo('至少勾选一条数据');
          return;
        }
        confirmPop('确认删除',this.handleDel)
      },
      handleDel(){
        let self = this;
        let arr = [];
        this.selectRows.forEach((item) => {
          arr.push(item.ttPlanOutboundId);
        })
        let p = {
          "listIds": arr
        }
        delMoveOut(p).then(res => {
          res && res.success && self.msgInfo(res.repData.message);
          self.loadData();
        })
      },
      handleHold(){
        let self = this;
        if(!this.selectRows.length) {
          this.msgInfo('至少勾选一条数据');
          return;
        }
        confirmPop('确认hold车',()=>{
          let arr = [];
          self.selectRows.forEach((item) => {
            arr.push(item.ttPlanOutboundId);
          })
          let p = {
            "ttPlanOutboundIds": arr,
          }
          holdVscMoveOut(p).then(res => {
            res && res.success && self.msgInfo(res.repData);
            self.loadData();
          })
        })
      },
      handleHoldN(){
        let self = this;
        if(!this.selectRows.length) {
          this.msgInfo('至少勾选一条数据');
          return;
        }
        confirmPop('确认解hold',() => {
          let arr = [];
          self.selectRows.forEach((item) => {
            arr.push(item.ttPlanOutboundId);
          })
          let p = {
            "ttPlanOutboundIds": arr,
          }
          holdVscMoveOutN(p).then(res => {
            res && res.success && self.msgInfo(res.repData);
            self.loadData();
          })
        })
      },
      importSuccess(res){
        let self = this;
        let p = {
          "filePath": res,
          "type": 46
        }
        importVdscN(p).then(res => {
          res && res.success && self.msgInfo(res.repData.message);
          self.loadData();
        })
      },
      loadData() {
        let self = this;
        let p = {
          "style": 46,
          "vins": getSplitString(self.data.formData.vin),
          "orderBeginDate": self.data.formData.orderDate ? self.data.formData.orderDate[0] : '',
          "orderEndDate": self.data.formData.orderDate ? self.data.formData.orderDate[1] : '',
          "sentBeginDate": self.data.formData.sentDate ? self.data.formData.sentDate[0] : '',
          "sentEndDate": self.data.formData.sentDate ? self.data.formData.sentDate[1] : '',
          "currentWarehouseId": self.data.formData.currentWarehouseId,
          "driveMode": self.data.formData.driveMode,
          "pointLocation":self.data.formData.pointLocation,
          "salesArea": self.data.formData.salesArea,
          "typeLevel": self.data.formData.typeLevel,
          "category": self.data.formData.category,
          "transportWay": self.data.formData.transportWay,
          "twiceSubmission": self.data.formData.isBoole,
          "twiceSubmissionStatus": self.data.formData.status,
          "vehicleType": self.data.formData.vehicleType,
          "color": self.data.formData.color,
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
      //创建计划保存
      saveCreate() {
        let self = this;
        if(self.isSaveFlag){
          this.isSaveFlag = false;
          setTimeout(()=>{
            self.isSaveFlag = true;
          }, 2000)
          let arr = [];
          this.selectRows.forEach((item) => {
            arr.push(item.vin);
          })
          let p = {
            "vins": arr,//勾选时导出的列表
            "type": 46,
          }
          creatMovePlan(p).then(res => {
            res && res.success && self.msgInfo(res.repData.message);
            self.loadData();
          })
        }
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
            "style": 46,
            "vins": getSplitString(self.data.formData.vin),
            "orderBeginDate": self.data.formData.orderDate ? self.data.formData.orderDate[0] : '',
            "orderEndDate": self.data.formData.orderDate ? self.data.formData.orderDate[1] : '',
            "sentBeginDate": self.data.formData.sentDate ? self.data.formData.sentDate[0] : '',
            "sentEndDate": self.data.formData.sentDate ? self.data.formData.sentDate[1] : '',
            "currentWarehouseId": self.data.formData.currentWarehouseId,
            "driveMode": self.data.formData.driveMode,
            "pointLocation":self.data.formData.pointLocation,
            "salesArea": self.data.formData.salesArea,
            "typeLevel": self.data.formData.typeLevel,
            "category": self.data.formData.category,
            "transportWay": self.data.formData.transportWay,
            "twiceSubmission": self.data.formData.isBoole,
            "twiceSubmissionStatus": self.data.formData.status,
            "vehicleType": self.data.formData.vehicleType,
            "color": self.data.formData.color,
          }
        }
        exportVscMoveOutN(p).then(res => {
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
