<template>
  <el-container style="width: 100%;height: 100%;">
    <el-header style="height: auto; padding: 0;">
      <div is="FormSearch" :data="data" @search="search"></div>
      <!-- btn-group -->
      <div class="btn-group clearfix">
        <div @click="handleCreate" class="btn-add"><span class="img-add">执行计划</span></div>
        <div class="btn-del" @click="delSure"><span class="img-del">删除</span></div>
        <UploadExcel @handle-success="importSuccess"></UploadExcel>
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
    <el-dialog  title="创建计划" :visible.sync="popCreateVisible" width="680px" center>
      <div class="clearfix">
        <div class="input-box">
          <label class="input-label">VIN码</label>
          <el-input
            style="width: 200px!important;"
            type="textarea"
            :rows="2"
            disabled
            v-model="popFormData.vins">
          </el-input>
        </div>
        <div class="input-box">
          <label class="input-label">当前仓库</label>
          <el-input v-model="popFormData.currentWarehouseName" clearable disabled></el-input>
        </div>
        <div class="input-box">
          <label class="input-label">运输工具</label>
          <el-select v-model="popFormData.transportWay" placeholder="请选择">
            <el-option
              v-for="option in localOptions.transport_way"
              :key="option.code"
              :label="option.name"
              :value="option.code">
            </el-option>
          </el-select>
        </div>
        <div class="input-box">
          <label class="input-label">目的仓库</label>
          <el-select v-model="popFormData.goalWarehouseId" placeholder="请选择">
            <el-option
              v-for="option in localOptions.warehouse_code"
              :key="option.code"
              :label="option.name"
              :value="option.code">
            </el-option>
          </el-select>
        </div>
      </div>
      <div style="text-align: center;">
        <el-button class="" style="margin-right: 10px;" @click="cancleCreate" size="medium">返回</el-button>
        <el-button class="" style="" type="primary" @click="saveCreate" size="medium">保存</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
  import {loadVdcMoveListN, exportVdcMoveOutN, importVdscN, creatMovePlan, delMoveOut} from "@/common/config/api/PlanManage"
  import {getSplitString, confirmPop, w200}from "@/common/config/utils"
  import {loadRefresh, creatWarehouse, delPlan} from './mixIn'
  import UploadExcel from "@/components/UploadExcel"
  import FormSearch from "../../FormSearch"
  import Table from "@/components/Table"

  export default {
    name: "VdcMoveOutN",
    components: {
      FormSearch,
      Table,
      UploadExcel
    },
    mixins: [loadRefresh, creatWarehouse, delPlan],
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
          ],
        },
        popCreateVisible: false,
        popFormData: {
          currentWarehouseName: '',
          goalWarehouseId: '',
          vins: '',
          transportWay: '',
        }
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
      importSuccess(res){
        let self = this;
        let p = {
          "filePath": res,
          "type": 52
        }
        importVdscN(p).then(res => {
          res && res.success && self.msgInfo(res.repData.message);
          self.loadData();
        })
      },
      loadData() {
        let self = this;
        let p = {
          "style": 52,
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
        loadVdcMoveListN(p).then(res => {
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
          if(!self.popFormData.goalWarehouseId){
            self.msgInfo('请选择目的仓库');
            return
          }
          if(!self.popFormData.transportWay){
            self.msgInfo('请选择运输方式');
            return
          }
          let p = {
            "goalWarehouseId": self.popFormData.goalWarehouseId,
            "transportWay": self.popFormData.transportWay,
            "type": 52,
            "vins": getSplitString(self.popFormData.vins)
          }
          creatMovePlan(p).then(res => {
            res && res.success && self.msgInfo(res.repData.message);
            self.popCreateVisible = false;
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
            arr.push(item.ttPlanOutboundId);
          })
          p = {
            "ttPlanOutboundIds": arr,//勾选时导出的列表
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
        exportVdcMoveOutN(p).then(res => {
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
