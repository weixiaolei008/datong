<template>
  <el-container style="width: 100%;height: 100%;">
    <el-header style="height: auto; padding: 0;">
      <div is="FormSearch" :data="data" @search="search"></div>
      <!-- btn-group -->
      <div class="btn-group clearfix">
        <div @click="handleCreate" class="btn-add"><span class="img-add">执行计划</span></div>
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
    <!--创建计划-->
    <el-dialog  title="创建计划" :visible.sync="popCreateVisible" width="680px" center>
      <div class="clearfix">
        <div class="input-box">
          <label class="input-label">VIN码</label>
          <el-input
            style="width: 200px!important;"
            type="textarea"
            :rows="2"
            disabled
            v-model="popFormData.vins">
          </el-input>
        </div>
        <div class="input-box">
          <label class="input-label">当前仓库</label>
          <el-input v-model="popFormData.currentWarehouseId" clearable disabled></el-input>
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
  import {loadLackCarOutN, importCarOutStorage, exportLackCarOutN, creatLackCarOut} from "@/common/config/api/PlanManage"
  import {getSplitString, w200, w180}from "@/common/config/utils"
  import {loadRefresh} from '@/common/mixin/mixPart'
  import FormSearch from "../FormSearch"
  import Table from "@/components/Table"

  export default {
    name: "LackCarOutN",
    components: {
      FormSearch,
      Table,
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
        popCreateVisible: false,
        popFormData: {
          currentWarehouseId: '',
          ids: '',
          vins: '',
          transportWay: '',
        },
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
              name: "计划创建时间",

              width: w180,
              value: 'createDate',
            },
            {
              name: "状态",
              value: 'status',
            },
          ],
        },
        data: {
          pop: false,
          formData: {
            vin: '',
            createDate: '',
            color: '',
            typeLevel: '',
            currentWarehouseId: '',
            status: '',
            pointLocation: '',
            category: '',
            salesArea: '',
            driveMode: '',
            type: '',
          },
          arr1: [
            {
              label: '计划创建时间',
              type: 'time',
              value: 'createDate'
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
            // {
            //   label: '状态',
            //   type: 'select',
            //   value: 'status'
            // },
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
          ],
        },
      }
    },
    methods: {
      loadData() {
        let self = this;
        let p = {
          "vins": getSplitString(self.data.formData.vin),
          "startCreateDate": self.data.formData.createDate ? self.data.formData.createDate[0] : '',
          "endCreateDate": self.data.formData.createDate ? self.data.formData.createDate[1] : '',
          "color": self.data.formData.color,
          "typeLevel": self.data.formData.typeLevel,
          "currentWarehouseId":  self.data.formData.currentWarehouseId,
          "status": self.data.formData.status,
          "pointLocation": self.data.formData.pointLocation,
          "category": self.data.formData.category,
          "salesArea": self.data.formData.salesArea,
          "driveMode": self.data.formData.driveMode,
          "type": self.data.formData.type,
          "pageNum": self.tableData.currentPage,
          "pageSize": self.tableData.pageSize,
        }
        loadLackCarOutN(p).then(res => {
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
        let currentWarehouseId = this.selectRows[0].currentWarehouseId;
        let bool = this.selectRows.some((item) => {
          return item.currentWarehouseId !== currentWarehouseId
        })
        if(bool){
          this.msgInfo('请选择相同的当前仓库');
          return;
        }
        this.popFormData.currentWarehouseId = currentWarehouseId;
        let arr = [];
        let ids = [];
        this.selectRows.forEach((item) => {
          ids.push(item.ttOutboundId)
          arr.push(item.vin);
        })
        this.popFormData.ids = ids;
        this.popFormData.vins = arr.join(',');
        this.popFormData.transportWay = '';
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
          console.log(1);
          setTimeout(()=>{
            self.isSaveFlag = true;
          }, 1000)
          if(!self.popFormData.transportWay){
            self.msgInfo('请选择运输工具');
            return
          }
          let p = {
            "transportWay": self.popFormData.transportWay,
            "ids":self.popFormData.ids
          }
          creatLackCarOut(p).then(res => {
            res && res.success && self.msgInfo(res.repData);
            this.popCreateVisible = false;
            self.loadData();
          })
        }
      },
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
          }
        }else{
          p = {
            "vins": getSplitString(self.data.formData.vin),
            "startCreateDate ": self.data.formData.createDate ? self.data.formData.createDate[0] : '',
            "endCreateDate": self.data.formData.createDate ? self.data.formData.createDate[1] : '',
            "color": self.data.formData.color,
            "typeLevel": self.data.formData.typeLevel,
            "currentWarehouseId":  self.data.formData.currentWarehouseId,
            "status": self.data.formData.status,
            "pointLocation": self.data.formData.pointLocation,
            "category": self.data.formData.category,
            "salesArea": self.data.formData.salesArea,
            "driveMode": self.data.formData.driveMode,
            "type": self.data.formData.type,
          }
        }
        exportLackCarOutN(p).then(res => {
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
