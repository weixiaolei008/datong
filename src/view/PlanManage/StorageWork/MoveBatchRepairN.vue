<template>
  <el-container style="width: 100%;height: 100%;">
    <el-header style="height: auto; padding: 0;">
      <div is="FormSearch" :data="data" @search="search"></div>
      <!-- btn-group -->
      <div class="btn-group clearfix">
        <div class="btn-add" @click="handleCreate()"><span class="img-add">执行计划</span></div>
        <div class="btn-export" @click="handleExport"><span class="img-extend">导出</span></div>
      </div>
    </el-header>
    <!--table-->
    <el-main class="table" style="padding: 10px">
      <Table :data='tableData'
             @selection-change="handleSelectionChange"
             @handleLook="handleLook"
             @current-change="handleCurrentChange">
      </Table>
    </el-main>
    <el-dialog title="附件详情" :visible.sync="dialogVisible" align="center">
      <img style="margin-left: 0.5%;" :width="imgWidth" :src="item" alt="" v-for="item in dialogImageUrl">
    </el-dialog>
  </el-container>
</template>

<script>
  import {loadBatchRepair, exportBatchRepair, creatMoveBatchRepair} from "@/common/config/api/PlanManage"
  import {getSplitString, w200, w180}from "@/common/config/utils"
  import {loadRefresh, creatWarehouse} from './mixIn'
  import FormSearch from "../FormSearch"
  import Table from "@/components/Table"

  export default {
    name: "MoveBatchRepairN",
    components: {
      FormSearch,
      Table,
    },
    mixins: [loadRefresh, creatWarehouse],
    computed:{
      imgWidth: {
        get(){
          let len = this.dialogImageUrl.length
          return 98.5/len + '%';
        },
        set(){
        }
      }
    },
    data() {
      return {
        isSaveFlag: true,
        dialogVisible: false,
        dialogImageUrl: '',
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
              name: "申请人",
              value: 'proposer',
            },
            {
              name: "申请时间",
              width: w180,
              value: 'applicationDate',
            },
            {
              name: "预计返修开始时间",
              width: w180,
              value: 'predictRepairStartDate',
            },
            {
              name: "预计返修结束时间",
              width: w180,
              value: 'predictRepairEndDate',
            },
          ],
          operations: [
            {
              label: '附件',
              width: '70',
              data: [
                {
                  icon: 'icon-eye',
                  Fun: 'handleLook',
                  id: '1',
                }
              ]
            },
          ],
        },
        data: {
          pop: false,
          formData: {
            vin: '',
            applicationDate: '',
            predictRepairStartDate: '',
            predictRepairEndDate: '',
            color: '',
            driveMode: '',
            salesArea: '',
            currentWarehouseId: '',
            vehicleType: '',
            typeLevel: null,
            category: '',
            pointLocation: null,
          },
          arr1: [
            {
              label: '申请时间',
              type: 'time',
              value: 'applicationDate'
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
              label: '预计返修开始',
              type: 'time',
              value: 'predictRepairStartDate'
            },
            {
              label: '预计返修结束',
              type: 'time',
              value: 'predictRepairEndDate'
            },
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
          ],
        }
      }
    },
    methods: {
      handleLook(data){
        this.dialogImageUrl = data.row.attachment;
        if(!this.dialogImageUrl){
          this.msgInfo('暂无附件');
          return
        }
        else{
          this.dialogImageUrl = this.dialogImageUrl.split('¥')
        }
        this.dialogVisible = true;
      },
      loadData() {
        let self = this;
        let p = {
          "listType": 65,
          "vin": getSplitString(self.data.formData.vin),
          "commondStartDate": self.data.formData.applicationDate ? self.data.formData.applicationDate[0] : '',
          "commondEndDate": self.data.formData.applicationDate ? self.data.formData.applicationDate[1] : '',
          "predictRepairStartStDate": self.data.formData.predictRepairStartDate ? self.data.formData.predictRepairStartDate[0] : '',
          "predictRepairStartEdDate": self.data.formData.predictRepairStartDate ? self.data.formData.predictRepairStartDate[1] : '',
          "predictRepairEndStDate": self.data.formData.predictRepairEndDate ? self.data.formData.predictRepairEndDate[0] : '',
          "predictRepairEndEdDate": self.data.formData.predictRepairEndDate ? self.data.formData.predictRepairEndDate[1] : '',
          "color": self.data.formData.color,
          "driveMode": self.data.formData.driveMode,
          "salesArea": self.data.formData.salesArea,
          "currentWarehouseId": self.data.formData.currentWarehouseId,
          "type": self.data.formData.vehicleType,
          "typeLevel": self.data.formData.typeLevel,
          "category": self.data.formData.category,
          "pointLocation":self.data.formData.pointLocation,
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
      saveCreate() {
        let self = this;
        if(self.isSaveFlag){
          this.isSaveFlag = false;
          setTimeout(()=>{
            self.isSaveFlag = true;
          }, 1000)
          let arr = [];
          this.selectRows.forEach((item) => {
            arr.push(item.ttPlanPdiId);
          })
          let p = {
            "ids": arr,//勾选时导出的列表
          }
          creatMoveBatchRepair(p).then(res => {
            res && res.success && self.msgInfo(res.repData);
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
            arr.push(item.ttPlanPdiId);
          })
          p = {
            "ids": arr,//勾选时导出的列表
          }
        }else{
          p = {
            "listType": 65,
            "vin": getSplitString(self.data.formData.vin),
            "commondStartDate": self.data.formData.applicationDate ? self.data.formData.applicationDate[0] : '',
            "commondEndDate": self.data.formData.applicationDate ? self.data.formData.applicationDate[1] : '',
            "predictRepairStartStDate": self.data.formData.predictRepairStartDate ? self.data.formData.predictRepairStartDate[0] : '',
            "predictRepairStartEdDate": self.data.formData.predictRepairStartDate ? self.data.formData.predictRepairStartDate[1] : '',
            "predictRepairEndStDate": self.data.formData.predictRepairEndDate ? self.data.formData.predictRepairEndDate[0] : '',
            "predictRepairEndEdDate": self.data.formData.predictRepairEndDate ? self.data.formData.predictRepairEndDate[1] : '',
            "color": self.data.formData.color,
            "driveMode": self.data.formData.driveMode,
            "salesArea": self.data.formData.salesArea,
            "currentWarehouseId": self.data.formData.currentWarehouseId,
            "type": self.data.formData.vehicleType,
            "typeLevel": self.data.formData.typeLevel,
            "category": self.data.formData.category,
            "pointLocation":self.data.formData.pointLocation,
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

