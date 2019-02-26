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
    <!--国内车创建计划-->
    <el-dialog  title="创建计划" :visible.sync="popCreateVisible" width="380px" center>
      <div class="clearfix">
        <div class="input-box">
          <label class="input-label">计划时间</label>
          <el-date-picker
            v-model="popFormData.planDate"
            disabled
            value-format="yyyy-MM-dd HH-mm-ss"
            placeholder="选择日期时间"
            type="datetime">
          </el-date-picker>
        </div>
        <div class="input-box">
          <label class="input-label">VIN码</label>
          <el-input
            style="width: 200px!important;"
            type="textarea"
            :rows="2"
            disabled
            placeholder=""
            v-model="popFormData.vins">
          </el-input>
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
  import {loadCarOutStorageN, importCarOutStorage, exportDomesticN, creatDomesticPlan, holdOutStorage, holdOutStorageN,delCarOutStorage} from "@/common/config/api/PlanManage"
  import {getSplitString, confirmPop, formatTime, w200, w180}from "@/common/config/utils"
  import {loadRefresh} from './mixIn'
  import UploadExcel from "@/components/UploadExcel"
  import FormSearch from "../FormSearch"
  import Table from "@/components/Table"

  export default {
    name: "DomesticN",
    components: {
      FormSearch,
      Table,
      UploadExcel
    },
    mixins: [loadRefresh],
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
              name: "驱动方式",
              value: 'driveMode',
            },
            {
              name: "点位信息",
              value: 'pointLocation',
            },
            {
              name: "库龄",
              value: 'warehouseTime',
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
              name: "运输工具",
              value: 'transportWay',
            },
            {
              name: "生成方式",
              value: 'createType',
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
              value: 'isTwice',
            },
            {
              name: "二次报交状态",
              width: '110',
              value: 'status',
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
            type: '',
            typeLevel: '',
            category: '',
            color: '',
            driveMode: '',
            pointLocation: '',
            transportWay: '',
            isBoole: '',//是否二次报交用是否
            status: '',
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
          ],
        },
        popFormData: {
          planDate: '',
          vins: ''
        },
        popCreateVisible: false
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
          arr.push(item.ttOutboundId);
        })
        let p = {
          "listIds": arr
        }
        delCarOutStorage(p).then(res => {
          res && res.success && self.msgInfo(res.repData);
          self.loadData();
        })
      },
      handleHold(){
        let self = this;
        if(!this.selectRows.length) {
          this.msgInfo('至少勾选一条数据');
          return;
        }
        confirmPop('确认hold车',() => {
          let arr = [];
          this.selectRows.forEach((item) => {
            arr.push(item.ttOutboundId);
          })
          let p = {
            "ids": arr,
            "isHold": 1
          }
          holdOutStorage(p).then(res => {
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
          this.selectRows.forEach((item) => {
            arr.push(item.ttOutboundId);
          })
          let p = {
            "ids": arr,
            "isHold": 1
          }
          holdOutStorageN(p).then(res => {
            res && res.success && self.msgInfo(res.repData);
            self.loadData();
          })
        })
      },
      importSuccess(res){
        let self = this;
        let p = {
          "filePath": res,
          "type": 40
        }
        importCarOutStorage(p).then(res => {
          res && res.success && self.msgInfo(res.repData);
          self.loadData();
        })
      },
      loadData() {
        let self = this;
        let p = {
          "planType": 40, // 区分接口
          "vins": getSplitString(self.data.formData.vin),
          "startOrderDate": self.data.formData.orderDate ? self.data.formData.orderDate[0] : '',
          "endOrderDate": self.data.formData.orderDate ? self.data.formData.orderDate[1] : '',
          "startSentDate": self.data.formData.sentDate ? self.data.formData.sentDate[0] : '',
          "endSentDate":  self.data.formData.sentDate ? self.data.formData.sentDate[1] : '',
          "currentWarehouseId":  self.data.formData.currentWarehouseId,
          "type": self.data.formData.type,
          "typeLevel": self.data.formData.typeLevel,
          "category": self.data.formData.category,
          "color": self.data.formData.color,
          "driveMode": self.data.formData.driveMode,
          "pointLocation": self.data.formData.pointLocation,
          "transportWay": self.data.formData.transportWay,
          "createType": self.data.formData.createType,
          "isTwice": self.data.formData.isBoole,
          "twiceStatus": self.data.formData.status,
          "pageNum": self.tableData.currentPage,
          "pageSize": self.tableData.pageSize,
        }
        loadCarOutStorageN(p).then(res => {
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
        //当前仓库是否一致
        let currentWarehouseId = this.selectRows[0]['currentWarehouseId'];
        let bool = this.selectRows.some((item) => {
          return currentWarehouseId !== item['currentWarehouseId'];
        })
        if(bool){
          this.msgInfo('请选择相同的当前仓库');
          return;
        }
        let arr = [];
        this.selectRows.forEach((item) => {
          arr.push(item.vin);
        })
        this.popFormData.vins = arr.join(',');
        let time = new Date();
        this.popFormData.planDate = formatTime(time)
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
          let ids = [];
          this.selectRows.forEach((item) => {
            ids.push(item.ttOutboundId)
          })
          let p = {
            "orderDate": self.popFormData.planDate,
            "ids": ids
          }
          creatDomesticPlan(p).then(res => {
            res && res.success && self.msgInfo(res.repData);
            this.popCreateVisible = false;
            this.loadData();
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
            arr.push(item.ttOutboundId);
          })
          p = {
            "ttOutboundIds": arr,//勾选时导出的列表
            "planType": 40, // 区分接口
          }
        }else{
          p = {
            "planType": 40, // 区分接口
            "vins": getSplitString(self.data.formData.vin),
            "startOrderDate": self.data.formData.orderDate ? self.data.formData.orderDate[0] : '',
            "endOrderDate": self.data.formData.orderDate ? self.data.formData.orderDate[1] : '',
            "startSentDate": self.data.formData.sentDate ? self.data.formData.sentDate[0] : '',
            "endSentDate":  self.data.formData.sentDate ? self.data.formData.sentDate[1] : '',
            "currentWarehouseId":  self.data.formData.currentWarehouseId,
            "type": self.data.formData.type,
            "typeLevel": self.data.formData.typeLevel,
            "category": self.data.formData.category,
            "color": self.data.formData.color,
            "driveMode": self.data.formData.driveMode,
            "pointLocation": self.data.formData.pointLocation,
            "transportWay": self.data.formData.transportWay,
            "createType": self.data.formData.createType,
            "isTwice": self.data.formData.isBoole,
            "twiceStatus": self.data.formData.status,
          }
        }
        exportDomesticN(p).then(res => {
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
