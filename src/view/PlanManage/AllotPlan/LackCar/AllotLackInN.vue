<template>
  <el-container  style="width: 100%;height: 100%;">
    <el-header style="height: auto; padding: 0;">
      <div is="FormSearch" :data="data" @search="search"></div>
      <!-- btn-group -->
      <div class="btn-group clearfix">
        <div @click="handleCreate" class="btn-add"><span class="img-add">创建计划</span></div>
        <div @click="handleExport" class="btn-export"><span class="img-extend">导出</span></div>
      </div>
    </el-header>
    <!--table-->
    <el-main class="table" style="padding: 10px">
      <Table :data='tableData'
             @selection-change="handleSelectionChange"
             @current-change="handleCurrentChange">
        <template slot-scope="{scope}" slot="attachment">
          <a href="scope.row.attachment">URL</a>
        </template>
      </Table>
    </el-main>
  </el-container>
</template>

<script>
  import getSplitString from "@/common/config/utils"
  import FormSearch from "../../FormSearch"
  import Table from "@/components/Table"

  export default {
    name: "AllotLackInN",
    components: {
      FormSearch,
      Table,
    },
    data() {
      return {
        tableData: {
          selectShow: false,
          tableHeight: 0,
          currentPage: 1,
          total: 0, //列表总数
          listData: [],
          tableHead: [
            {
              name: "补件内容",
              value: 'supplyContent',
            },
            {
              name: "申请部门",
              value: 'applyDepartment',
            },
            {
              name: "VIN号",
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
              name: "申请人",
              value: 'applicante',
            },
            {
              name: "申请时间",
              value: 'applyDate',
            },
            {
              name: "预计补件开始时间",
              value: 'supplyStartDate',
            },
            {
              name: "预计补件结束时间",
              value: 'supplyEndDate',
            },
            {
              show: 'template',
              name: "查看附件",
              value: 'attachment',
            },
          ],
        },
        data: {
          pop: false,
          formData: {
            vins: '',
            vehicleType: '',
            isOverdue: '',
            typeLevel: '',
            color: '',
            pointLocation: '',
            status: '',
            category: '',
            currentWarehouseId: '',
            salesArea: '',
            driveMode: '',
            applyDate: '',
            supplyStartDate: '',
            supplyEndDate: '',
          },
          arr1: [
            {
              label: '预计补件开始',
              type: 'time',
              value: 'supplyStartDate'
            },
            {
              label: '预计补件结束',
              type: 'time',
              value: 'supplyEndDate'
            },
          ],
          arr2: [
            {
              label: '申请时间',
              type: 'time',
              value: 'applyDate'
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
              label: '颜色',
              type: 'select',
              value: 'color'
            },
            {
              label: '销售区域',
              type: 'select',
              value: 'salesArea'
            },
            {
              label: '驱动方式',
              type: 'select',
              value: 'driveMode'
            },
            {
              label: '点位信息',
              type: 'select',
              value: 'pointLocation'
            },
            {
              label: '当前仓库',
              type: 'select',
              value: 'currentWarehouseId'
            },
          ],
          options: {
            aim: [],
            status: [],
            isDelay: [],
            carType: [],
            color: [],
            carTypeGrade: [],
            carKind: [],
            saleArea: [],
            driveType: [],
            pointInfo: [],
          }
        },
        popFormData: {
          area: '',
          vin: ''
        },
        popCreateVisible: false
      }
    },
    methods: {
      search(data){
        console.log(data);
      },
      handleCreate(){
        this.popCreateVisible = true;
      },
      cancleCreate() {
        this.popCreateVisible = false;
      },
      saveCreate() {
        this.popCreateVisible = false;
      },
      handleExport(){

      },
//-------------------------table-------------------
      handleSelectionChange(val) {
        console.log(val);
      },
      handleCurrentChange(val) {
        console.log(val);
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
