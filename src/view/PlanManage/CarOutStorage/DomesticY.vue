<!--国内车已创建--- 确认---->
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
  import {loadDomesticY, exportDomesticY, delOutStorage} from "@/common/config/api/PlanManage"
  import {getSplitString, confirmPop, w200, w180}from "@/common/config/utils"
  import {loadRefresh} from './mixIn'
  import FormSearch from "../FormSearch"
  import Table from "@/components/Table"
  export default {
    name: "DomesticY",
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
            {
              name: "订单是否取消",
              width: '110',
              value: 'isCancel',
            },
          ],
        },
        data: {
          pop: false,
          formData: {
            vin: '',
            commandDate: '',
            sentDate: '',
            currentWarehouseId: '',//当前仓库
            status: '',
            isBoole: '',
            type: '',
            color: '',
            typeLevel: '',
            category: '',
            driveMode: '',
            pointLocation: '',
            transportWay: '',
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
              label: '状态',
              type: 'select',
              value: 'status'
            },
            {
              label: '是否超期',
              type: 'select',
              value: 'isBoole'
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
          ],
        },
        popCreateVisible: false
      }
    },
    methods: {
      loadData() {
        let self = this;
        let p = {
          "planType": 40, // 区分接口
          "vins": getSplitString(self.data.formData.vin),
          "startCommandDate": self.data.formData.commandDate ? self.data.formData.commandDate[0] : '',
          "endCommandDate": self.data.formData.commandDate ? self.data.formData.commandDate[1] : '',
          "startSentDate": self.data.formData.sentDate ? self.data.formData.sentDate[0] : '',
          "endSentDate": self.data.formData.sentDate ? self.data.formData.sentDate[1] : '',
          "currentWarehouseId":  self.data.formData.currentWarehouseId,
          "status":  self.data.formData.status,
          "isOverdue": self.data.formData.isBoole,
          "type": self.data.formData.type,
          "color": self.data.formData.color,
          "typeLevel": self.data.formData.typeLevel,
          "category": self.data.formData.category,
          "driveMode": self.data.formData.driveMode,
          "pointLocation": self.data.formData.pointLocation,
          "transportWay": self.data.formData.transportWay,
          "pageNum": self.tableData.currentPage,
          "pageSize": self.tableData.pageSize,
        }
        loadDomesticY(p).then(res => {
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
        confirmPop('确认终止',this.handleDel)
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
        delOutStorage(p).then(res => {
          res && res.success && self.msgInfo(res.repData);
          this.loadData()
        })
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
            "startCommandDate": self.data.formData.commandDate ? self.data.formData.commandDate[0] : '',
            "endCommandDate": self.data.formData.commandDate ? self.data.formData.commandDate[1] : '',
            "startSentDate": self.data.formData.sentDate ? self.data.formData.sentDate[0] : '',
            "endSentDate": self.data.formData.sentDate ? self.data.formData.sentDate[1] : '',
            "currentWarehouseId":  self.data.formData.currentWarehouseId,
            "status":  self.data.formData.status,
            "isOverdue": self.data.formData.isBoole,
            "type": self.data.formData.type,
            "color": self.data.formData.color,
            "typeLevel": self.data.formData.typeLevel,
            "category": self.data.formData.category,
            "driveMode": self.data.formData.driveMode,
            "pointLocation": self.data.formData.pointLocation,
            "transportWay": self.data.formData.transportWay,
          }
        }
        exportDomesticY(p).then(res => {
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
