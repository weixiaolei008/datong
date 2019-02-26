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
  import {loadChangeCarOut, exportChangeCarOut, creatChangeCarOut} from "@/common/config/api/PlanManage"
  import {getSplitString, w200, w180, w150}from "@/common/config/utils"
  import {loadRefresh} from '@/common/mixin/mixPart'
  import FormSearch from "../FormSearch"
  import Table from "@/components/Table"

  export default {
    name: "ChangeCarOutN",
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
        popCreateVisible: false,
        selectRows: [],
        popFormData: {
          currentWarehouseId: '',
          ids: '',
          vins: '',
          transportWay: '',
        },
        tableData: {
          selectShow: true,
          tableHeight: 0,
          currentPage: 1,
          pageSize: 30,
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
              name: "计划创建时间",
              width: w180,
              value: 'createTime',
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
              name: "状态",
              value: 'status',
            },
          ],
        },
        data: {
          pop: false,
          formData: {
            vin: '',
            createTime: '',
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
              value: 'createTime'
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
          ],
        }
      }
    },
    methods: {
      loadData() {
        let self = this;
        let p = {
          "planType": 51, // 区分接口
          "vin": getSplitString(self.data.formData.vin),
          "startCreateTime": self.data.formData.createTime ? self.data.formData.createTime[0] : '',
          "endCreateTime": self.data.formData.createTime ? self.data.formData.createTime[1] : '',
          "color": self.data.formData.color,
          "typeLevel": self.data.formData.typeLevel,
          "currentWarehouseId":  self.data.formData.currentWarehouseId,
          "status": self.data.formData.status,
          "pointLocation": self.data.formData.pointLocation,
          "category": self.data.formData.category,
          "salesArea": self.data.formData.salesArea,
          "driveMode": self.data.formData.driveMode,
          "carType": self.data.formData.type,
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
        this.popFormData.currentWarehouseId = this.selectRows[0].currentWarehouseName;
        let arr = [];
        let ids = [];
        this.selectRows.forEach((item) => {
          ids.push(item.ttPlanRefitcarId)
          arr.push(item.vin);
        })
        this.popFormData.ids = ids;
        this.popFormData.vins = arr.join(',');
        this.popCreateVisible = true;
      },
      cancleCreate() {
        this.popCreateVisible = false;
      },
      //创建计划保存
      saveCreate() {
        let self = this;
        if(!self.popFormData.transportWay){
          self.msgInfo('请选择运输工具');
          return
        }
        let p = {
          "transportWay": self.popFormData.transportWay,
          "ids":self.popFormData.ids
        }
        creatChangeCarOut(p).then(res => {
          res && res.success && self.msgInfo(res.repData);
          this.popCreateVisible = false;
          self.loadData();
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
            "planType": 51, // 区分接口
          }
        }else{
          p = {
            "planType": 51, // 区分接口
            "vin": getSplitString(self.data.formData.vin),
            "startCreateTime": self.data.formData.createTime ? self.data.formData.createTime[0] : '',
            "endCreateTime": self.data.formData.createTime ? self.data.formData.createTime[1] : '',
            "color": self.data.formData.color,
            "typeLevel": self.data.formData.typeLevel,
            "currentWarehouseId":  self.data.formData.currentWarehouseId,
            "status": self.data.formData.status,
            "pointLocation": self.data.formData.pointLocation,
            "category": self.data.formData.category,
            "salesArea": self.data.formData.salesArea,
            "driveMode": self.data.formData.driveMode,
            "carType": self.data.formData.type,
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
