<!--4S店返修车辆历史查询-->
<template>
  <el-container style="width: 100%;height: 100%;">
    <el-header style="height: auto; padding: 0;">
      <!-- search-group -->
      <div class="search-group clearfix">
        <!--搜索弹框-->
        <div :class="pop?'search-up':'search-more'" @click="searchMore"></div>
        <el-collapse-transition>
          <div v-show="pop" class="search-pop clearfix">
            <div class="input-box">
              <label class="input-label">车型</label>
              <el-select v-model="formData.vehicleType" placeholder="请选择车型">
                <el-option
                  v-for="option in options.vehicle_type"
                  :key="option.code"
                  :label="option.name"
                  :value="option.code">
                </el-option>
              </el-select>
            </div>
            <div class="input-box">
              <label class="input-label">车型级</label>
              <el-select v-model="formData.typeLevel" placeholder="请选择车型级">
                <el-option
                  v-for="option in options.vehicle_type_level"
                  :key="option.code"
                  :label="option.name"
                  :value="option.code">
                </el-option>
              </el-select>
            </div>
            <div class="input-box">
              <label class="input-label">车辆种类</label>
              <el-select v-model="formData.category" placeholder="请选择车辆种类">
                <el-option
                  v-for="option in options.vehicle_category"
                  :key="option.code"
                  :label="option.name"
                  :value="option.code">
                </el-option>
              </el-select>
            </div>
            <div class="input-box">
              <label class="input-label">点位信息</label>
              <el-select v-model="formData.pointLocation" placeholder="请选择点位信息">
                <el-option
                  v-for="option in options.point_location"
                  :key="option.code"
                  :label="option.name"
                  :value="option.code">
                </el-option>
              </el-select>
            </div>
          </div>
        </el-collapse-transition>
        <!--搜索-->
        <div class="clearfix">
          <div class="input-box">
            <label class="input-label">VIN码</label>
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入VIN码"
              v-model="formData.vin">
            </el-input>
          </div>
          <div class="input-box">
            <label class="input-label">颜色</label>
            <el-select v-model="formData.color" placeholder="请选择颜色">
              <el-option
                v-for="option in options.color"
                :key="option.code"
                :label="option.name"
                :value="option.code">
              </el-option>
            </el-select>
          </div>
          <div class="input-box">
            <label class="input-label">驱动方式</label>
            <el-select v-model="formData.driveMode" placeholder="请选择驱动方式">
              <el-option
                v-for="option in options.drive_mode"
                :key="option.code"
                :label="option.name"
                :value="option.code">
              </el-option>
            </el-select>
          </div>
          <div class="input-box">
            <label class="input-label">销售区域</label>
            <el-select v-model="formData.salesArea" placeholder="请选择销售区域">
              <el-option
                v-for="option in options.sales_area"
                :key="option.code"
                :label="option.name"
                :value="option.code">
              </el-option>
            </el-select>
          </div>
          <div class="input-box">
            <label class="input-label">始发仓库</label>
            <el-select v-model="formData.origWarehouseId" placeholder="请选择始发仓库">
              <el-option
                v-for="option in options.warehouse_code"
                :key="option.code"
                :label="option.name"
                :value="option.code">
              </el-option>
            </el-select>
          </div>
          <div class="search-box">
            <div class="search-reset" @click="reset"><span class="img-reset">清空</span></div>
            <div class="search-sub" @click="search"><span class="img-sub">搜索</span></div>
          </div>
        </div>
      </div>
      <!-- btn-group -->
      <div class="btn-group clearfix">
        <div class="btn-export" @click="handleExport"><span class="img-extend">导出</span></div>
      </div>
    </el-header>
    <el-main class="table" style='padding: 10px;'>
      <Table :data='tableData'
             @selection-change="handleSelectionChange" @size-change="handleSizeChange"
             @current-change="handleCurrentChange">
      </Table>
    </el-main>
  </el-container>
</template>

<script>
  import Table from "@/components/Table"
  import {loadSshopPlanList,loadSshopPlanQueryHistoryExport} from "@/common/config/api/SysWindows"
  import {loadDicValList} from "@/common/config/api/basic"
  import {getSplitString,w200,w120}from "@/common/config/utils"

  export default {
    name: "SshopQuery",
    components: {
      Table
    },
    data() {
      return {
        pop: false, //弹框
        num: 10,
        selectRows: [],
        tableData: {
          selectShow: true,
          tableHeight: 0,
          currentPage: 1,
          total: 0, //列表总数
          listData: [],
          tableHead: [
            {
              name: "问题描述",
              value: 'issueDescribe'
            },
            {
              name: "VIN号",
              value: 'vin',
              width: w200
            },
            {
              name: "车型",
              value: 'vehicleType'
            },
            {
              name: "车型级",
              value: 'typeLevel'
            },
            {
              name: "车辆种类",
              value: 'category'
            },
            {
              name: "颜色",
              value: 'color'
            },
            {
              name: "销售区域",
              value: 'salesArea'
            },
            {
              name: "驱动方式",
              value: 'driveMode'
            },
            {
              name: "点位信息",
              value: 'pointLocation'
            },
            {
              name: "始发仓库",
              value: 'origWarehouseId',
              width: w120
            },
            {
              name: "送车指令下达时间",
              value: 'sendCommandDate',
              width: '180'
            },
            {
              name: "送车车辆接收时间",
              value: 'sendReceiveDate',
              width: '180'
            },
            {
              name: "还车指令下达时间",
              value: 'repayCommandDate',
              width: '180'
            },
            {
              name: "还车车辆接收时间",
              value: 'repayReceiveDate',
              width: '180'
            }
          ]
        },
       formData: {
         vin: '', //车辆VIN码
         vehicleType: '', //车型
         typeLevel: '', //车型级
         category: '', //车辆种类
         color: '', //颜色
         driveMode: '', //驱动方式
         isOverdue: '', //是否逾期 0:正常,:逾期
         origWarehouseId: '', //始发仓库
         pointLocation: '', //点位信息
         salesArea: '', //销售区域
         commandDate: '', //指令下达时间
       },
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.selectRows = val;
      },
      //分页
      handleSizeChange(val) {
        console.log(val);
      },
      handleCurrentChange(val) {
        this.tableData.currentPage = val;
        this.loadDataList();
      },
      //搜索
      search(){
        this.tableData.currentPage = 1;
        this.loadDataList();
      },
      //清空数据
      reset(){
        this.resetForm(this.formData);
      },
      searchMore() {
        this.pop = !this.pop
      },
      /*/////////////////////////////////////////////////////////////////////////////////*/
      //导出接口
      handleExport(){
        let self = this;
        let p;
        if(self.selectRows.length){
          let arr = [];
          self.selectRows.forEach((item) => {
            arr.push(item.ttWindowFoursId);
          })
          p = {
            "windowFoursId": arr,//勾选时导出的列表
            "type": 3
          }
        }else{
          p = {
            type: 3,
            vin: getSplitString(self.formData.vin), //VIN码
            typeLevel: self.formData.typeLevel, // 车型级
            vehicleType: self.formData.vehicleType, //车型
            category: self.formData.category, //车辆种类
            color: self.formData.color, //颜色
            driveMode: self.formData.driveMode, //驱动方式
            isOverdue: self.formData.isOverdue, //是否逾期 0:正常,:逾期
            origWarehouseId: self.formData.origWarehouseId, //始发仓库ID
            pointLocation: self.formData.pointLocation, //点位信息
            salesArea: self.formData.salesArea, //销售区域
          }
        }
        loadSshopPlanQueryHistoryExport(p).then(res => {
          res && res.success && (window.location.href = res.repData)
        })
      },
      //列表接口
      loadDataList() {
        let self = this;
        let p = {
          pageNum: self.tableData.currentPage,
          pageSize: 30,
          type: 3,
          vin: getSplitString(self.formData.vin), //VIN码
          typeLevel: self.formData.typeLevel, // 车型级
          vehicleType: self.formData.vehicleType, //车型
          category: self.formData.category, //车辆种类
          color: self.formData.color, //颜色
          driveMode: self.formData.driveMode, //驱动方式
          isOverdue: self.formData.isOverdue, //是否逾期 0:正常,:逾期
          origWarehouseId: self.formData.origWarehouseId, //始发仓库ID
          pointLocation: self.formData.pointLocation, //点位信息
          salesArea: self.formData.salesArea, //销售区域
        }
        loadSshopPlanList(p).then(res => {
          if(res&&res.repData){
            self.tableData.listData = res.repData.list;
            self.tableData.total = res.repData.total;
          }
        })
      },
    },
    watch: {
      options: {
        handler: function(val) {
        },
        deep: true
      }
    },
    computed:{
      options: {
        get(){
          return this.$store.state.codeOptions.options;
        },
        set(){
        }
      }
    },
    created() {
      this.loadDataList();
    }
  }
</script>

<style lang="less">

</style>

