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
    <!--创建计划-->
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
          <label class="input-label">当前库位</label>
          <el-input v-model="popFormData.currentLocationId" clearable disabled></el-input>
        </div>
        <div class="input-box">
          <label class="input-label">目标功能区</label>
          <el-select v-model="popFormData.currentFunctionalZoneId" placeholder="请选择">
            <el-option
              v-for="option in localOption"
              :key="option.functionAreaCode"
              :label="option.functionAreaName"
              :value="option.functionAreaCode">
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
  import {loadCarMoveN, exportCarMoveN, importHuN, creatCarMove, loadfunArea, delCarMoveN} from "@/common/config/api/PlanManage"
  import {getSplitString, w200, w120, w150}from "@/common/config/utils"
  import {loadRefresh, delPlan, creatWarehouse} from './mixIn'
  import UploadExcel from "@/components/UploadExcel"
  import FormSearch from "../FormSearch"
  import Table from "@/components/Table"

  export default {
    name: "CarMoveN",
    components: {
      FormSearch,
      Table,
      UploadExcel
    },
    mixins: [loadRefresh, delPlan, creatWarehouse],
    data() {
      return {
        isSaveFlag: true,
        localOption: [],
        popCreateVisible: false,
        popFormData: {
          currentLocationId: '',
          vins: '',
          currentFunctionalZoneId: '',
        },
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
          "type": 60
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
        loadCarMoveN(p).then(res => {
          if(res && res.repData){
            self.tableData.listData = res.repData.list;
            self.tableData.total = res.repData.total;
          }
        })
      },
      handleCreate(){
        if(!this.selectRows.length) {
          this.msgInfo('至少勾选一条数据');
          return;
        }
        let currentWarehouseId = this.selectRows[0].currentWarehouseId;
        let bool = this.selectRows.some((item) => {
          return item.currentWarehouseId !== currentWarehouseId
        })
        if(bool){
          this.msgInfo('请选择相同的当前仓库');
          return;
        }
        this.popFormData.currentLocationId = this.selectRows[0].currentLocationId;//当前库位带到弹框
        let arr = [];
        this.selectRows.forEach((item) => {
          arr.push(item.vin);
        })
        this.popFormData.vins = arr.join(',');
        this.popCreateVisible = true;
        let self = this;
        loadfunArea({"wareHouseCode": this.selectRows[0].currentWarehouseId}).then(res => {
          self.localOption = res.repData;
        })
      },
      cancleCreate() {
        this.popCreateVisible = false;
      },
      //创建计划保存
      saveCreate() {
        let self = this;
        if(self.isSaveFlag){
          this.isSaveFlag = false;
          setTimeout(()=>{
            self.isSaveFlag = true;
          }, 1000)
          if(!self.popFormData.currentFunctionalZoneId){
            self.msgInfo('请选择目标功能区');
            return
          }
          let p = {
            "goalRegion": self.popFormData.currentFunctionalZoneId,
            "vins":getSplitString(self.popFormData.vins)
          }
          creatCarMove(p).then(res => {
            res && res.success && self.msgInfo(res.repData.message);
            this.popCreateVisible = false;
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
        delCarMoveN(p).then(res => {
          res && res.success && self.msgInfo(res.repData);
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
        exportCarMoveN(p).then(res => {
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
