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
      </Table>
    </el-main>
  </el-container>
</template>

<script>
  import FormSearch from "../../FormSearch"
  import Table from "@/components/Table"

  export default {
    name: "AllotLackOutN",
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
              value: 'name',
            },
            {
              name: "申请部门",
              value: 'name',
            },
            {
              name: "VIN号",
              value: 'name',
            },
            {
              name: "车型",
              value: 'address',
            },
            {
              name: "车型级",
              value: 'address',
            },
            {
              name: "车辆种类",
              value: 'address',
            },
            {
              name: "颜色",
              value: 'address',
            },
            {
              name: "销售区域",
              value: 'address',
            },
            {
              name: "驱动方式",
              value: 'address',
            },
            {
              name: "点位信息",
              value: 'address',
            },
            {
              name: "当前仓库",
              value: 'address',
            },
            {
              name: "申请人",
              value: 'address',
            },
            {
              name: "申请时间",
              value: 'address',
            },
            {
              name: "预计补件开始时间",
              value: 'address',
            },
            {
              name: "预计补件结束时间",
              value: 'address',
            },
            {
              name: "查看附件",
              value: 'URL',
            },
          ],
        },
        data: {
          pop: false,
          formData: {
            vin: '',
            timeValue: '',
            aim: '',
            status: '',
            isDelay: '',
            carType: '',
            color: '',
            carTypeGrade: '',
            carKind: '',
            saleArea: '',
            driveType: '',
            pointInfo: '',
          },
          arr1: [
            {
              label: '预计补件开始',
              type: 'time',
              value: 'isDelay'
            },
            {
              label: '预计补件结束',
              type: 'time',
              value: 'aim'
            },
          ],
          arr2: [
            {
              label: '申请时间',
              type: 'time',
              value: 'isDelay'
            },
            {
              label: '补件内容',
              type: 'select',
              value: 'isDelay'
            },
            {
              label: '申请部门',
              type: 'select',
              value: 'isDelay'
            },
            {
              label: '车型',
              type: 'select',
              value: 'isDelay'
            },
            {
              label: '车型级',
              type: 'select',
              value: 'carType'
            },
            {
              label: '车辆种类',
              type: 'select',
              value: 'carKind'
            },
            {
              label: '颜色',
              type: 'select',
              value: 'color'
            },
            {
              label: '销售区域',
              type: 'select',
              value: 'saleArea'
            },
            {
              label: '驱动方式',
              type: 'select',
              value: 'driveType'
            },
            {
              label: '点位信息',
              type: 'select',
              value: 'pointInfo'
            },
            {
              label: '当前仓库',
              type: 'select',
              value: 'pointInfo'
            },
            {
              label: '申请人',
              type: 'select',
              value: 'pointInfo'
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
