<template>
  <el-container style="width: 100%;height: 100%;">
    <el-header style="height: auto; padding: 0;">
      <div is="FormSearch" :data="data" @search="search"></div>
      <!-- btn-group -->
      <div class="btn-group clearfix">
        <div class="btn-add" @click="handleCreate('currentWarehouseId')"><span class="img-add">执行计划</span></div>
        <!--<div class="btn-del" @click="delSure"><span class="img-del">删除</span></div>-->
        <div class="btn-export" @click="handleExport"><span class="img-extend">导出</span></div>
        <div class="btn-repair-first" @click="sureRepairFirst()"><span class="img-repair-first">立即修</span></div>
        <div class="btn-repair-second" @click="sureRepairSecond()"><span class="img-repair-second">缓修</span></div>
        <div class="btn-repair-out" @click="sureRepairOut()"><span class="img-repair-out">出库返修</span></div>
      </div>
    </el-header>
    <!--table-->
    <el-main class="table" style="padding: 10px ;">
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
  import {loadSshopCune, exportSshopCuneN, creatSshopCune,delSshopCune, repairSshopCune, repairSshopCuneF,repairSshopCuneS} from "@/common/config/api/PlanManage"
  import {getSplitString, formatTime, confirmPop, w200, w180}from "@/common/config/utils"
  import {loadRefresh, creatRepair, delPlan, repairAll} from './mixIn'
  import FormSearch from "../FormSearch"
  import Table from "@/components/Table"

  export default {
    name: "SshopCuneN",
    mixins: [loadRefresh, creatRepair, delPlan, repairAll],
    components: {
      FormSearch,
      Table,
    },
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
              name: "问题描述",
              value: 'issueDescribe',
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
              value: 'currentWarehouseId',
            },
            {
              name: "立即修/缓修",
              width: '110',
              value: 'repairMethod',
            },
            {
              name: "问题提报人",
              width: '110',
              value: 'issueReported',
            },
            {
              name: "问题提报时间",
              width: w180,
              value: 'issueReportDate',
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
            issueReportDate: '',
            color: '',
            driveMode: '',
            salesArea: '',
            currentWarehouseId: '',
            vehicleType: '',
            typeLevel: null,
            category: '',
            pointLocation: null,
            repairMethod: ''
          },
          arr1: [
            {
              label: '问题提报时间',
              type: 'time',
              value: 'issueReportDate'
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
              label: '立即修/缓修',
              type: 'select',
              value: 'repairMethod'
            },
          ],
        }
      }
    },
    methods: {
      handleLook(data){
        this.dialogImageUrl = data.row.accessory;
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
          "type": 54,
          "vin": getSplitString(self.data.formData.vin),
          "startIssueReportDate": self.data.formData.issueReportDate ? self.data.formData.issueReportDate[0] : '',
          "endIssueReportDate": self.data.formData.issueReportDate ? self.data.formData.issueReportDate[1] : '',
          "color": self.data.formData.color,
          "driveMode": self.data.formData.driveMode,
          "salesArea": self.data.formData.salesArea,
          "currentWarehouseId": self.data.formData.currentWarehouseId,
          "vehicleType": self.data.formData.vehicleType,
          "typeLevel": self.data.formData.typeLevel,
          "category": self.data.formData.category,
          "pointLocation":self.data.formData.pointLocation,
          "repairMethod":self.data.formData.repairMethod,
          "pageNum": self.tableData.currentPage,
          "pageSize": self.tableData.pageSize,
        }
        loadSshopCune(p).then(res => {
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
            arr.push(item.ttPlanFoursId);
          })
          let p = {
            "planFoursIds": arr,
          }
          creatSshopCune(p).then(res => {
            res && res.success && self.msgInfo(res.repData);
            self.loadData();
          })
        }
      },
      handleDel(){
        let self = this;
        let arr = [];
        this.selectRows.forEach((item) => {
          arr.push(item.ttPlanFoursId);
        })
        let p = {
          "planFoursIds": arr,
        }
        delSshopCune(p).then(res => {
          res && res.success && self.msgInfo(res.repData);
          self.loadData();
        })
      },
      handleRepairFirst(){
        let self = this;
        let arr = [];
        this.selectRows.forEach((item) => {
          arr.push(item.ttPlanFoursId);
        })
        let p = {
          "planFoursIds": arr,
        }
        repairSshopCuneF(p).then(res => {
          res && res.success && this.msgInfo(res.repData);
          self.loadData()
        })
      },
      handleRepairSecond(){
        let self = this;
        let arr = [];
        this.selectRows.forEach((item) => {
          arr.push(item.ttPlanFoursId);
        })
        let p = {
          "planFoursIds": arr,
        }
        repairSshopCuneS(p).then(res => {
          res && res.success && self.msgInfo(res.repData);
          self.loadData()
        })
      },
      handleRepairOut(){
        let self = this;
        let arr = [];
        this.selectRows.forEach((item) => {
          arr.push(item.ttPlanFoursId);
        })
        let p = {
          "planFoursIds": arr,
        }
        repairSshopCune(p).then(res => {
          res && res.success && self.msgInfo(res.repData);
          self.loadData()
        })
      },
      handleExport(){
        let self = this;
        let p;
        if(this.selectRows.length){
          let arr = [];
          this.selectRows.forEach((item) => {
            arr.push(item.ttPlanFoursId);
          })
          p = {
            "planFoursId": arr,//勾选时导出的列表
          }
        }else{
          p = {
            "type": 54,
            "vin": getSplitString(self.data.formData.vin),
            "startIssueReportDate": self.data.formData.issueReportDate ? self.data.formData.issueReportDate[0] : '',
            "endIssueReportDate": self.data.formData.issueReportDate ? self.data.formData.issueReportDate[1] : '',
            "color": self.data.formData.color,
            "driveMode": self.data.formData.driveMode,
            "salesArea": self.data.formData.salesArea,
            "currentWarehouseId": self.data.formData.currentWarehouseId,
            "vehicleType": self.data.formData.vehicleType,
            "typeLevel": self.data.formData.typeLevel,
            "category": self.data.formData.category,
            "pointLocation":self.data.formData.pointLocation,
            "repairMethod":self.data.formData.repairMethod,
          }
        }
        exportSshopCuneN(p).then(res => {
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
