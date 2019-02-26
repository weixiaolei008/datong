<!--PDI车辆返修出库计划 (未创建)-->
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
              <el-select v-model="formData.type" placeholder="请选择车型">
                <el-option
                  v-for="option in options.vehicle_type"
                  :key="option.code"
                  :label="option.name"
                  :value="option.code">
                </el-option>
              </el-select>
            </div>
            <div class="input-box">
              <label class="input-label">车辆级</label>
              <el-select v-model="formData.typeLevel" placeholder="请选择车辆级">
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
            <div class="input-box">
              <label class="input-label">当前仓库</label>
              <el-select v-model="formData.currentWarehouseId" placeholder="请选择当前仓库">
                <el-option
                  v-for="option in options.warehouse_code"
                  :key="option.code"
                  :label="option.name"
                  :value="option.code">
                </el-option>
              </el-select>
            </div>
            <div class="input-box">
              <label class="input-label">状态</label>
              <el-select v-model="formData.status" placeholder="请选择状态">
                <el-option
                  v-for="option in options.plan_status"
                  :key="option.code"
                  :label="option.name"
                  :value="option.code">
                </el-option>
              </el-select>
            </div>
            <div class="input-box">
              <label class="input-label">立即修/缓修</label>
              <el-select v-model="formData.repairMethod" placeholder="请选择立即修/缓修">
                <el-option
                  v-for="option in options.repair_method"
                  :key="option.code"
                  :label="option.name"
                  :value="option.code">
                </el-option>
              </el-select>
            </div>
            <div class="input-box">
              <label class="input-label">运输工具</label>
              <el-select v-model="formData.transportWay" placeholder="请选择运输工具">
                <el-option
                  v-for="option in options.transport_way"
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
            <label class="input-label">指令下达时间</label>
            <el-date-picker
              v-model="formData.commandDate"
              type="datetimerange"
              value-format="yyyy-MM-dd HH-mm-ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
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
             @selection-change="handleSelectionChange"
             @current-change="handleCurrentChange">
      </Table>
    </el-main>
  </el-container>
</template>

<script>
  import Table from "@/components/Table"
  import {loadPdiInList,loadPdiInExport} from "@/common/config/api/PlanManage"
  import {loadDicValList} from "@/common/config/api/basic"
  import {getSplitString,exportFile,w200,w120}from "@/common/config/utils"
  import {loadRefresh} from '../PlanJs/mixIn'

  export default {
    name: "PdiOutY",
    mixins: [loadRefresh],
    components: {
      Table
    },
    data() {
      return {
        pop: false, //弹框
        popAddVisible: false,
        selectRows: [],
        num: 10,
        tableData: {
          selectShow: true,
          tableHeight: 0,
          currentPage: 1,
          total: 0, //列表总数
          listData: [],
          tableHead: [
            {
              name: "问题描述",
              value: 'problem'
            },
            {
              name: "VIN码",
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
              name: "目标仓库",
              value: 'desWarehouseId',
              width: w120
            },
            {
              name: "当前仓库",
              value: 'currentWarehouseId',
              width: w120
            },
            {
              name: "当前库区",
              value: 'currentFunctionalZone',
              width: w120
            },
            {
              name: "当前库位",
              value: 'currentLocation',
              width: w120
            },
            {
              name: "问题提报人",
              value: 'issueReported',
              width: '100'
            },
            {
              name: "生成方式",
              value: 'createType'
            },
            {
              name: "指令下达时间",
              value: 'commandDate',
              width: '180'
            },
            {
              name: "状态",
              value: 'status'
            },
            {
              name: "立即修/缓修",
              value: 'repairMethod',
              width: '100'
            },
            {
              name: "运输工具",
              value: 'transportWay'
            },
            {
              name: "是否超期",
              value: 'isOverdue'
            }
          ]
        },
        //查询
        formData: {
          category: '', //车辆种类 ,
          color: '', //颜色 ,
          commandDate: '', //指令下达时间 ,
          currentWarehouseId: '', //当前仓库 ,
          driveMode: '', //驱动方式 ,
          isOverdue: '', //是否超期 ,
          issueReported: '', //问题提报人 ,
          pointLocation: '', //点位信息 ,
          problem: '', //问题描述 ,
          salesArea: '', //销售区域 ,
          status: '', //计划状态 1:未执行2:执行中3:已执行4:终止5:暂停 ,
          typeLevel: '', //车型级 ,
          type: '', //车型 ,
          vin: '', //车辆VIN
          transportWay: '', //运输方式 0001 板车 0002 拖车 0003 地跑 ,
        },
        //创建计划
        creatPlanData: {
          createPlanDate: '', //计划创建时间 ,
          vin: '', //VIN码 ,
        },
        options2: []
      }
    },
    methods: {
      /*///////////////////////////////////////////////////////////////////////////////////*/
      //导出接口
      handelExport(){
        let self = this;
        let p;
        if(self.selectRows.length){
          let arr = [];
          self.selectRows.forEach((item) => {
            arr.push(item.ttPlanPdiId);
          })
          p = {
            "ids": arr,//勾选时导出的列表
            "listType": 1
          }
        }else{
          p = {
            listType: 1,
            problem: self.formData.problem, //问题描述
            vin: getSplitString(self.formData.vin), //VIN码
            type: self.formData.type, //车型
            typeLevel: self.formData.typeLevel, //车型级
            category: self.formData.category, //车辆种类
            color: self.formData.color, //颜色
            salesArea: self.formData.salesArea, //销售区域
            driveMode: self.formData.driveMode, //驱动方式
            pointLocation: self.formData.pointLocation, //点位信息
            currentWarehouseId: self.formData.currentWarehouseId, //当前仓库
            issueReported: self.formData.issueReported, //问题提报人
            commondStartDate: self.formData.commandDate !== null ? self.formData.commandDate[0] : '', //问题提报开始时间
            commondEndDate: self.formData.commandDate !== null ? self.formData.commandDate[1] : '', //问题提报结束时间
            createType: self.formData.createType, //生成方式
            status: self.formData.status, //状态
            isOverdue: self.formData.isOverdue, //是否超期
            repairMethod: self.formData.repairMethod, //立即修
            transportWay: self.formData.transportWay, //运输工具
          }
        }
        loadPdiInExport(p).then(res => {
          res && res.success && (window.location.href = res.repData)
        })
      },
      //列表接口
      loadDataList() {
        let self = this;
        let p = {
          pageNum: self.tableData.currentPage,
          pageSize: 30,
          listType: 1,
          problem: self.formData.problem, //问题描述
          vin: getSplitString(self.formData.vin), //VIN码
          type: self.formData.type, //车型
          typeLevel: self.formData.typeLevel, //车型级
          category: self.formData.category, //车辆种类
          color: self.formData.color, //颜色
          salesArea: self.formData.salesArea, //销售区域
          driveMode: self.formData.driveMode, //驱动方式
          pointLocation: self.formData.pointLocation, //点位信息
          currentWarehouseId: self.formData.currentWarehouseId, //当前仓库
          issueReported: self.formData.issueReported, //问题提报人
          commondStartDate: self.formData.commandDate !== null ? self.formData.commandDate[0] : '', //问题提报开始时间
          commondEndDate: self.formData.commandDate !== null ? self.formData.commandDate[1] : '', //问题提报结束时间
          status: self.formData.status , //状态
          isOverdue: self.formData.isOverdue, //是否超期
          repairMethod: self.formData.repairMethod, //立即修
          transportWay: self.formData.transportWay, //运输工具
        }
        loadPdiInList(p).then(res => {
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
    }
  }
</script>

<style lang="less">

</style>

