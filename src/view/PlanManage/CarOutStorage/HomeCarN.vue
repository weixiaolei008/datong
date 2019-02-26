<template>
  <el-container  style="width: 100%;height: 100%;">
    <el-header style="height: auto; padding: 0;">
      <div is="FormSearch" :data="data" @search="search"></div>
      <!-- btn-group -->
      <div class="btn-group clearfix">
        <div @click="handleCreate" class="btn-add"><span class="img-add">执行计划</span></div>
        <!--<UploadExcel @handle-success="importSuccess"></UploadExcel>-->
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
    <!--创建计划-->
    <el-dialog  title="创建计划" :visible.sync="popCreateVisible" width="680px" center>
      <div class="clearfix">
        <div class="input-box">
          <label class="input-label">VIN码</label>
          <el-input
            style="width: 200px;"
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
      </div>
      <div style="text-align: center;">
        <el-button class="" style="margin-right: 10px;" @click="cancleCreate" size="medium">返回</el-button>
        <el-button class="" style="" type="primary" @click="saveCreate" size="medium">保存</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
  import {loadHomeCar, exportHomeCar, importHomeCar, creatHomeCar, holdHomeCar} from "@/common/config/api/PlanManage"
  import {getSplitString, confirmPop, w200, w180}from "@/common/config/utils"
  import {loadRefresh} from './mixIn'
  import UploadExcel from "@/components/UploadExcel"
  import FormSearch from "../FormSearch"
  import Table from "@/components/Table"

  export default {
    name: "HomeCarN",
    components: {
      FormSearch,
      Table,
      UploadExcel
    },
    mixins: [loadRefresh],
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
        popCreateVisible: false,
        popFormData: {
          currentWarehouseName: '',
          ids: '',
          vins: '',
          transportWay: '',
        },
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
              name: "库龄",
              value: 'warehouseAge',
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
              name: "生成方式",
              value: 'generateType',
            },
            {
              name: "订单下达时间",
              width: w180,
              value: 'orderTime',
            },
            {
              name: "是否二次报交",
              width: '110',
              value: 'secondSubmission',
            },
            {
              name: "二次报交状态",
              width: '110',
              value: 'secondSubmissionStatus',
            },
          ],
        },
        data: {
          pop: false,
          formData: {
            vin: '',
            orderTime: '',
            currentWarehouseCode: '',
            type: '',
            typeLevel: '',
            category: '',
            color: '',
            salesArea: '',
            driveMode: '',
            pointLocation: '',
            isBoole: '',
            status: '',
          },
          arr1: [
            {
              label: '订单下达时间',
              type: 'time',
              value: 'orderTime'
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
              label: '是否二次报交',
              type: 'select',
              value: 'isBoole'
            },
            {
              label: '二次报交状态',
              type: 'select',
              value: 'status'
            },
          ],
        },
      }
    },
    methods: {
      handleHold(){
        let self = this;
        if(!this.selectRows.length) {
          this.msgInfo('至少勾选一条数据');
          return;
        }
        confirmPop('确认hold车',() => {
          let arr = [];
          self.selectRows.forEach((item) => {
            arr.push(item.ttPlanTouringcarId);
          })
          let p = {
            "ids": arr,
            "isHold": 1
          }
          holdHomeCar(p).then(res => {
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
            arr.push(item.ttPlanTouringcarId);
          })
          let p = {
            "ids": arr,
            "isHold": 0
          }
          holdHomeCar(p).then(res => {
            res && res.success && self.msgInfo(res.repData);
            self.loadData();
          })
        })
      },
      importSuccess(res){
        let self = this;
        let p = {
          "filePath": res,
          "type": 0
        }
        importHomeCar(p).then(res => {
          res && res.success && self.msgInfo(res.repData);
          self.loadData();
        })
      },
      loadData() {
        let self = this;
        let p = {
          "planType": 24, // 区分接口
          "vin": getSplitString(self.data.formData.vin),
          "startOrderTime": self.data.formData.orderTime ? self.data.formData.orderTime[0] : '',
          "endOrderTime": self.data.formData.orderTime ? self.data.formData.orderTime[1] : '',
          "currentWarehouseCode":  self.data.formData.currentWarehouseCode,
          "carType": self.data.formData.type,
          "typeLevel": self.data.formData.typeLevel,
          "category": self.data.formData.category,
          "color": self.data.formData.color,
          "salesArea": self.data.formData.salesArea,
          "driveMode": self.data.formData.driveMode,
          "pointLocation": self.data.formData.pointLocation,
          "secondSubmission": self.data.formData.isBoole,
          "secondSubmissionStatus": self.data.formData.status,
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
      //创建计划保存
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
        this.popFormData.currentWarehouseName = this.selectRows[0].currentWarehouseName;
        this.popFormData.transportWay = '';
        let arr = [];
        let ids = [];
        this.selectRows.forEach((item) => {
          ids.push(item.ttPlanTouringcarId)
          arr.push(item.vin);
        })
        this.popFormData.ids = ids;
        this.popFormData.vins = arr.join(',');
        this.popCreateVisible = true;
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
          if(!self.popFormData.transportWay){
            self.msgInfo('请选择运输工具');
            return
          }
          let p = {
            "ids": self.popFormData.ids,
            "transportWay": self.popFormData.transportWay,
          }
          creatHomeCar(p).then(res => {
            res && res.success && self.msgInfo(res.repData);
            this.popCreateVisible = false;
            self.loadData();
          })
        }
      },
      //导出
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
            "planType": 24, // 区分接口
          }
        }else{
          p = {
            "planType": 24, // 区分接口
            "vin": getSplitString(self.data.formData.vin),
            "startOrderTime": self.data.formData.orderTime ? self.data.formData.orderTime[0] : '',
            "endOrderTime": self.data.formData.orderTime ? self.data.formData.orderTime[1] : '',
            "currentWarehouseCode":  self.data.formData.currentWarehouseCode,
            "carType": self.data.formData.type,
            "typeLevel": self.data.formData.typeLevel,
            "category": self.data.formData.category,
            "color": self.data.formData.color,
            "salesArea": self.data.formData.salesArea,
            "driveMode": self.data.formData.driveMode,
            "pointLocation": self.data.formData.pointLocation,
            "secondSubmission": self.data.formData.isBoole,
            "secondSubmissionStatus": self.data.formData.status,
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
