<template>
  <el-container style="width: 100%;height: 100%;">
    <el-header style="height: auto; padding: 0;">
      <div is="FormSearch" :data="data" @search="search">
        <div class="input-box">
          <label class="input-label">计划号</label>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入计划号"
            v-model="data.formData.planNumber">
          </el-input>
        </div>
        <div class="input-box">
          <label class="input-label">订单号</label>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入订单号"
            v-model="data.formData.orderCode">
          </el-input>
        </div>
      </div>
      <!-- btn-group -->
      <div class="btn-group clearfix">
        <UploadExcel @handle-success="importSuccess"></UploadExcel>
        <div class="btn-export" @click="handleExport"><span class="img-extend">导出</span></div>
        <div class="btn-del" @click="handleDel"><span class="img-del">删除</span></div>
      </div>
    </el-header>
    <!--table-->
    <el-main class="table" style="padding: 10px ;">
      <Table :data='tableData'
             @selection-change="handleSelectionChange"
             @current-change="handleCurrentChange">
        <template slot-scope="{scope}" slot="print">
          <div v-if="scope.row.status == 2"  @click="printOrder(scope.row)" style="cursor: pointer">
            <img style="margin-left:6px;" src="../../../src/common/image/operate/icon_print.png" alt="">
          </div>
        </template>
      </Table>
    </el-main>
    <iframe v-if="url" src="../../../static/print.html" style="width: 0; height: 0" frameborder="0"></iframe>
  </el-container>
</template>

<script>
  import {loadPrintList, updatePrintList, delPrintList, importPrintList, exportPrintList} from "@/common/config/api/PlanManage"
  import {getSplitString, w200, w120, w150, getNowFormatDate}from "@/common/config/utils"
  import {loadRefresh, delPlan} from './StorageWork/mixIn'
  import UploadExcel from "@/components/UploadExcel"
  import FormSearch from "./FormSearch"
  import Table from "@/components/Table"
  import {confirmPop}from "@/common/config/utils"
  import {sSet} from '@/common/config/utils';
    export default {
      name: "PrintList",
      components: {
        FormSearch,
        Table,
        UploadExcel
      },
      mixins: [loadRefresh, delPlan],
      data() {
        return {
          url: false,
          localOption: [],
          popCreateVisible: false,
          selectRows: [],
          tableData: {
            selectShow: true,
            tableHeight: 0,
            currentPage: 1,
            pageSize: 30,
            total: 0,
            width: 130,
            listData: [],
            tableHead: [
              {
                name: "VIN号",
                width: w200,
                value: 'vin',
              },
              {
                name: "计划号",
                width: w200,
                value: 'planNumber',
              },
              {
                name: "收车单位编码",
                width: 180,
                value: 'destinationityCode',
              },
              {
                name: "收车单位",
                width: w200,
                value: 'destinationityName',
              },
              {
                name: "收货地址",
                width: w200,
                value: 'destinationityAddress',
              },
              {
                name: "车型",
                value: 'vhModelColor',
              },
              {
                name: "订单号",
                width: w200,
                value: 'orderCode',
              },
              {
                name: "承运商",
                value: 'carrier',
              },
              {
                name: "合格证状态",
                value: 'plantName',
              },
              {
                name: "节点分段信息",
                width: w200,
                value: 'segmentRoute',
              },
              {
                name: "计划状态",
                value: 'statusName',
              },
              {
                name: "数据来源",
                value: 'dataSourcesName',
              },
              {
                name: "制单日期",
                width: 180,
                value: 'printTime',
              },
              {
                name: "操作",
                width: 60,
                show: 'template',
                value: 'print',
              },
            ],
          },
          data: {
            pop: false,
            formData: {
              vin: '',
              planNumber: '',
              handover_list: '',
              orderCode: '',
              destinationityName: '',
              destinationityAddress: '',
              dataSources: '',
              printTime: '',
            },
            arr1: [
              {
                label: '制单时间',
                type: 'time',
                value: 'printTime'
              },
              {
                label: '计划状态',
                type: 'select',
                value: 'handover_list'
              },
            ],
            arr2: [
              {
                label: '收车单位',
                type: 'input',
                value: 'destinationityName'
              },
              {
                label: '收货地址',
                type: 'input',
                value: 'destinationityAddress'
              },
              {
                label: '数据来源',
                type: 'select',
                value: 'dataSources'
              },
            ],
          }
        }
      },
      methods: {
        printOrder(row){
          let self = this;
          if(self.url){
            return
          }
          let time = getNowFormatDate();
          self.url = true;
          updatePrintList({ids: [row.tiHandoverListId]}).then(res => {
            setTimeout(function () {
              self.url = false;
            }, 3000)
          })
          row.printTime = time;
          sSet('_order', row);
          // this.$router.push({path: '/Print'});
        },
        importSuccess(res){
          let self = this;
          let p = {
            "filePath": res,
            "type": 0
          }
          importPrintList(p).then(res => {
            res && res.success && self.msgInfo(res.repData);
            self.loadData();
          })
        },
        loadData() {
          let self = this;
          let p = {
            "vin": getSplitString(self.data.formData.vin),
            "planNumber": getSplitString(self.data.formData.planNumber),
            "status": self.data.formData.handover_list,
            "orderCode": getSplitString(self.data.formData.orderCode),
            "destinationityName": self.data.formData.destinationityName,
            "destinationityAddress": self.data.formData.destinationityAddress,
            "dataSources": self.data.formData.dataSources,
            "startPrintTime": !self.data.formData.printTime ? '' : self.data.formData.printTime[0],
            "endPrintTime": !self.data.formData.printTime ? '' : self.data.formData.printTime[1],
            "pageNum": self.tableData.currentPage,
            "pageSize": self.tableData.pageSize,
          }
          loadPrintList(p).then(res => {
            if(res && res.repData){
              self.tableData.listData = res.repData.list;
              self.tableData.total = res.repData.total;
            }
          })
        },
        handleDel() {
          if(!this.selectRows.length) {
            this.msgInfo('至少勾选一条数据');
            return;
          }
          let repairBool = this.selectRows.some((item) => {
            return Boolean(!item.dataSources)
          })
          if(repairBool){
            this.msgInfo('系统生成的不可删除');
            return;
          }
          confirmPop('请确认删除',this.sureDel)
        },
        sureDel(){
          console.log(1);
          let self = this;
          let arr = [];
          this.selectRows.forEach(item => {
            arr.push(item.tiHandoverListId)
          })
          delPrintList({ids: arr}).then(res => {
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
              arr.push(item.tiHandoverListId);
            })
            p = {
              "id": arr,//勾选时导出的列表
            }
          }else{
            p = {
              "vin": getSplitString(self.data.formData.vin),
              "planNumber": getSplitString(self.data.formData.planNumber),
              "status": self.data.formData.handover_list,
              "orderCode": getSplitString(self.data.formData.orderCode),
              "destinationityName": self.data.formData.destinationityName,
              "destinationityAddress": self.data.formData.destinationityAddress,
              "dataSources": self.data.formData.dataSources,
              "startPrintTime": !self.data.formData.printTime ? '' : self.data.formData.printTime[0],
              "endPrintTime": !self.data.formData.printTime ? '' : self.data.formData.printTime[1],
            }
          }
          exportPrintList(p).then(res => {
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

<style lang="less" >
</style>
