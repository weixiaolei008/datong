<template>
  <el-container  style="width: 100%;height: 100%;">
    <el-header style="height: auto; padding: 0;">
      <!-- btn-group -->
      <div class="btn-group clearfix" style="margin-top: 20px;">
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
  import Table from "@/components/Table"

  export default {
    name: "InventoryPlanOrderY",
    components: {
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
              width: '80',
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
              width: '80',
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
              name: "VIN号",
              value: 'name',
              show: 'template',
              width: 80,
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
              name: "库龄",
              value: 'address',
            },
            {
              name: "当前仓库",
              value: 'address',
            },
            {
              name: "运输工具",
              value: 'address',
            },
            {
              name: "生成方式",
              value: 'address',
            },
            {
              name: "订单下达时间",
              value: 'address',
            },
            {
              name: "车队提车时间",
              value: 'address',
            },
            {
              name: "二次报交",
              value: 'address',
            },
            {
              name: "二次报交状态",
              value: 'address',
            },
          ],
        },
      }
    },
    methods: {
      search(data){
        console.log(data);
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
