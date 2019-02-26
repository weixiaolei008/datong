<!--质损车辆返修历史查询-->
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
        <div class="btn-export" @click="handelExport"><span class="img-extend">导出</span></div>
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
  import {loadLossPlanList,loadLossPlanExportWindow} from "@/common/config/api/SysWindows"
  import {loadDicValList} from "@/common/config/api/basic"
  import {getSplitString,exportFile,w200,w120}from "@/common/config/utils"

  export default {
    name: "LossQuery",
    components: {
      Table
    },
    data() {
      return {
        tableHeight:'',
        selectRows: [],
        pop: false, //弹框
        tableData: {
          selectShow: true,
          tableHeight: 0,
          currentPage: 1,
          total: 0, //列表总数
          listData: [],
          tableHead: [
            {
              name: "问题描述",
              value: 'description'
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
              value: 'origWarehouse',
              width: w120
            },
            {
              name: "送车指令下达时间",
              value: 'sendCommandDate',
              width: '180'
            },
            {
              name: "送车车辆接收交接时间",
              value: 'sendReceiveDate',
              width: '180'
            },
            {
              name: "还车指令下达时间",
              value: 'backCommandDate',
              width: '180'
            },
            {
              name: "还车车辆接收交接时间",
              value: 'backReceiveDate',
              width: '180'
            }
          ]
        },
        formData: {
          vin: '', //vin码
          typeLevel: '', //车型级
          vehicleType: '', //车型
          category: '', //车辆种类
          color: '', //颜色
          commandDate: '', //指令下达时间
          driveMode: '', //驱动方式
          origWarehouseId: '', //始发仓库
          pointLocation: '', //点位信息
          salesArea: '', //销售区域 ,
          status: '' //计划状态 1:未执行2:执行中3:已执行 ,
        },
        num: 10,
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.selectRows = val
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
      /*/////////////////////////////////////////////////////////////////////////*/
      //导出接口
      handelExport(){
        let self = this;
        let p;
        if(self.selectRows.length){
          let arr = [];
          self.selectRows.forEach((item) => {
            arr.push(item.ttWindowMassLossId);
          })
          p = {
            "ids": arr,//勾选时导出的列表
            "listType": 3
          }
        }else{
          p = {
            listType: 3, //列表类型 1 接收 2 送还 3 历史 ,
            vin: getSplitString(self.formData.vin), //VIN码
            vehicleType: self.formData.vehicleType, //车型
            typeLevel: self.formData.typeLevel, //车型级
            category: self.formData.category, //车辆种类
            color: self.formData.color, //颜色
            salesArea: self.formData.salesArea, //销售区域
            driveMode: self.formData.driveMode, //驱动方式
            pointLocation: self.formData.pointLocation, //点位信息
            origWarehouseId: self.formData.origWarehouseId, //当前仓库
            startCommandDate: self.formData.commandDate !== null ? self.formData.commandDate[0] : '', //指令下达开始时间
            endCommandDate: self.formData.commandDate !== null ? self.formData.commandDate[1] : '', //指令下达结束时间
            status: self.formData.status, //状态
            isOverdue: self.formData.isOverdue //是否超期
          }
        }
        loadLossPlanExportWindow(p).then(res => {
          res && res.success && (window.location.href = res.repData)
        })
      },
      //列表接口
      loadDataList() {
        let self = this;
        let p = {
          pageNum: self.tableData.currentPage,
          pageSize: 30,
          listType: 3, //列表类型 1 接收 2 送还 3 历史 ,
          vin: getSplitString(self.formData.vin), //VIN码
          vehicleType: self.formData.vehicleType, //车型
          typeLevel: self.formData.typeLevel, //车型级
          category: self.formData.category, //车辆种类
          color: self.formData.color, //颜色
          salesArea: self.formData.salesArea, //销售区域
          driveMode: self.formData.driveMode, //驱动方式
          pointLocation: self.formData.pointLocation, //点位信息
          origWarehouseId: self.formData.origWarehouseId, //当前仓库
          commondStartDate: self.formData.commandDate !== null ? self.formData.commandDate[0] : '', //指令下达开始时间
          commondEndDate: self.formData.commandDate !== null ? self.formData.commandDate[1] : '', //指令下达结束时间
          status: self.formData.status, //状态
          isOverdue: self.formData.isOverdue //是否超期
        }
        loadLossPlanList(p).then(res => {
          if(res&&res.repData){
            self.tableData.listData = res.repData.list;
            self.tableData.total = res.repData.total;
          }
        })
      },
    },
    watch: {
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

