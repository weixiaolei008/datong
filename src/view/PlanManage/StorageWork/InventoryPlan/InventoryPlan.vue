<template>
  <el-container style="width: 100%;height: 100%;">
    <el-header style="height: auto; padding: 0;">
      <div is="FormSearch" :data="data" @search="search"></div>
      <!-- btn-group -->
      <div class="btn-group clearfix">
        <div class="btn-add"><span class="img-add" @click="newPlan">创建盘点计划</span></div>
        <div class="btn-del"><span class="img-del">删除</span></div>
        <div class="btn-export"><span class="img-extend">导出</span></div>
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
  import FormSearch from "./FormSearch"
  import Table from "@/components/Table"

  export default {
    name: "InventoryPlan",
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
          operations: [
            {
              label: '列表值',
              width: '100',
              data: [
                {
                  icon: 'icon-eye',
                  Fun: 'handleLook',
                  id: '1',
                }
              ]
            },
            {
              label: '操作',
              width: '100',
              data: [
                {
                  icon: 'icon-edit',
                  Fun: 'handleEdit',
                  id: '1',
                }
              ]
            }
          ],
          tableHead: [
            {
              name: "字典名称",
              value: 'code',
              show: 'template',
              // width: 1200,
            },
            {
              name: "描述",
              value: 'dicDescribe'
            },
            {
              name: "长度",
              value: 'dicLength'
            }
          ], //表头
        },
        data: {
          pop: false,
          formData: {
            vin: '',
            timeValue: [],
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
              label: '盘点类型',
              value: 'aim'
            },
            {
              label: '盘点仓库',
              value: 'status'
            },
          ],
          arr2: [
            {
              label: '盘点编号',
              value: 'carType'
            },
            {
              label: '库存量',
              type: 'input',
              value: 'color'
            },
            {
              label: '百分比',
              value: 'carTypeGrade'
            },
            {
              label: '状态',
              value: 'carKind'
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
        }
      }
    },
    methods: {
      search(data){
        // console.log(data);
      },
      handleSelectionChange(val) {
        console.log(val);
      },
      handleCurrentChange(val) {
        console.log(val);
      },
      newPlan(){
        this.$router.push({path: '/NewInventoryPlan'});
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
