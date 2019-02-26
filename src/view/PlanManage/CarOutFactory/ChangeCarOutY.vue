<template>
  <el-container style="width: 100%;height: 100%;">
    <el-header style="height: auto; padding: 0;">
      <div is="FormSearch" :data="data" @search="search"></div>
      <!-- btn-group -->
      <div class="btn-group clearfix">
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
  </el-container>
</template>

<script>
  import {loadChangeCarOut, exportChangeCarOut, creatChangeCarOut} from "@/common/config/api/PlanManage"
  import {getSplitString, w200, w180, w150}from "@/common/config/utils"
  import {loadRefresh} from '@/common/mixin/mixPart'
  import FormSearch from "../FormSearch"
  import Table from "@/components/Table"

  export default {
    name: "ChangeCarOutY",
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
          total: 0, //列表总数
          listData: [],
          tableHead: [
            {
              name: "库改内容",
              value: 'changeContent',
            },
            {
              name: "申请部门",
              value: 'applyDept',
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
              name: "当前仓库",
              value: 'currentWarehouseName',
            },
            {
              name: "运输工具",
              value: 'transportWay',
            },
            {
              name: "申请人",
              value: 'applicant',
            },
            {
              name: "联系方式",
              width: w150,
              value: 'contactWay',
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
            color: '',
            typeLevel: '',
            currentWarehouseId: '',
            status: '',
            pointLocation: '',
            category: '',
            salesArea: '',
            driveMode: '',
            type: '',
            isOverdue: '',
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
            {
              label: '销售区域',
              type: 'select',
              value: 'salesArea'
            },
          ],
          arr2: [
            {
              label: '车型级',
              type: 'select',
              value: 'typeLevel'
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
              label: '点位信息',
              type: 'select',
              value: 'pointLocation'
            },
            {
              label: '车辆种类',
              type: 'select',
              value: 'category'
            },
            {
              label: '车型',
              type: 'select',
              value: 'type'
            },
            {
              label: '是否超期',
              type: 'select',
              value: 'isOverdue'
            },
            {
              label: '运输工具',
              type: 'select',
              value: 'transportWay'
            },
          ],
        }
      }
    },
    methods: {
      loadData() {
        let self = this;
        let p = {
          "planType": 29, // 区分接口
          "vin": getSplitString(self.data.formData.vin),
          "startCommandDate": self.data.formData.commandDate ? self.data.formData.commandDate[0] : '',
          "endCommandDate": self.data.formData.commandDate ? self.data.formData.commandDate[1] : '',
          "color": self.data.formData.color,
          "typeLevel": self.data.formData.typeLevel,
          "currentWarehouseId":  self.data.formData.currentWarehouseId,
          "status": self.data.formData.status,
          "pointLocation": self.data.formData.pointLocation,
          "category": self.data.formData.category,
          "salesArea": self.data.formData.salesArea,
          "driveMode": self.data.formData.driveMode,
          "carType": self.data.formData.type,
          "isOverdue": self.data.formData.isOverdue,
          "transportWay": self.data.formData.transportWay,
          "pageNum": self.tableData.currentPage,
          "pageSize": self.tableData.pageSize,
        }
        loadChangeCarOut(p).then(res => {
          if(res && res.repData){
            self.tableData.listData = res.repData.list;
            self.tableData.total = res.repData.total;
          }
        })
      },
      handleExport(){
        let self = this;
        let p;
        if(this.selectRows.length){
          let arr = [];
          this.selectRows.forEach((item) => {
            arr.push(item.ttPlanRefitcarId);
          })
          p = {
            "id": arr,//勾选时导出的列表
            "planType": 29, // 区分接口
          }
        }else{
          p = {
            "planType": 29, // 区分接口
            "vin": getSplitString(self.data.formData.vin),
            "startCommandDate": self.data.formData.commandDate !== null ? self.data.formData.commandDate[0] : '',
            "endCommandDate": self.data.formData.commandDate !== null ? self.data.formData.commandDate[1] : '',
            "color": self.data.formData.color,
            "typeLevel": self.data.formData.typeLevel,
            "currentWarehouseId":  self.data.formData.currentWarehouseId,
            "status": self.data.formData.status,
            "pointLocation": self.data.formData.pointLocation,
            "category": self.data.formData.category,
            "salesArea": self.data.formData.salesArea,
            "driveMode": self.data.formData.driveMode,
            "carType": self.data.formData.type,
            "isOverdue": self.data.formData.isOverdue,
            "transportWay": self.data.formData.transportWay,
          }
        }
        exportChangeCarOut(p).then(res => {
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
