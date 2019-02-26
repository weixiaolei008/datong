<!--业务详情-->
<template>
  <el-container style="width: 100%;height: 100%;" class="business-detail">
    <el-header style="height: auto; padding: 0;">
    </el-header>
    <el-main class="table" style='padding: 10px;'>
      <Table :data='tableData'
             @handleLook="handleLook"
             @selection-change="handleSelectionChange" @size-change="handleSizeChange"
             @current-change="handleCurrentChange">
        <template slot-scope="{scope}" slot="vin">
          <div @click.stop="inActiveDetail(scope.row)" style="cursor: pointer;color: #60A4FF;text-align: center">{{scope.row.vin}}</div>
        </template>
      </Table>
    </el-main>
  </el-container>
</template>

<script>
  import Table from "@/components/TableNoPage"
  import {loadBusinessCenterDetail} from "@/common/config/api/InfoBusiness"
  import {getSplitString,w200}from "@/common/config/utils"

  export default {
    name: "BusinessDetail",
    components: {
      Table
    },
    data() {
      return {
        tableHeight:'',
        tableData: {
          selectShow: false,
          tableHeight: 0,
          currentPage: 1,
          total: 0, //列表总数
          listData: [],
          tableHead: [
            {
              name: "VIN码",
              value: 'vin',
              show: 'template',
              width: w200
            },
            {
              name: "活动名称",
              value: 'activityName'
            },
            {
              name: "状态",
              value: 'activityStatus'
            }
          ],
          operations: [
            {
              label: '操作',
              width: '80',
              data: [
                {
                  icon: 'icon-eye',
                  Fun: 'handleLook',
                  id: '1',
                }
              ]
            }
          ],
        },
      }
    },
    methods: {
      handleSelectionChange(val) {
      },
      //分页
      handleSizeChange(val) {
      },
      handleCurrentChange(val) {
        this.tableData.currentPage = val;
        this.loadDataList();
      },
      handleLook(data){
        this.$router.push({
          path: '/BActivityDetail',
          query: {
            planId: data.row.planId, //任务id
            planType: data.row.planType, //任务类型
          }
        })
      },
      inActiveDetail(data){
        this.$router.push({
          path: '/BActivityDetail',
          query: {
            planId: data.planId, //任务id
            planType: data.planType, //任务类型
          }
        })
      },
    /*////////////////////////////////////////////////////////////////*/
      //列表接口
      loadDataList() {
        let self = this
        let p = {
          pageNum: self.tableData.currentPage,
          pageSize: 30,
          planId:self.$route.query.planId, //任务id
          planType:self.$route.query.planType ? self.$route.query.planType : 0, //任务类型
        }
        loadBusinessCenterDetail(p).then(res => {
          if(res&&res.repData){
            self.tableData.listData = res.repData;
          }
        })
      },
    },
    mounted(){
    },
    created() {
      this.loadDataList();
    }
  }
</script>

<style lang="less">
  .business-detail .el-table th>.cell{
    text-align: center;
  }
</style>


