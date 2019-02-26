<template>
  <el-container  style="width: 100%;height: 100%;">
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
              <label class="input-label">是否超期</label>
              <el-select v-model="formData.isOverdue" placeholder="请选择是否超期">
                <el-option
                  v-for="option in options.yes_or_no"
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
              value-format="yyyy-MM-dd HH-mm-ss"
              type="datetimerange"
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
        <!--<div @click="handleDel" class="btn-del"><span class="img-del">删除</span></div>-->
        <div @click="handelExport" class="btn-export"><span class="img-extend">导出</span></div>
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
  import {loadBatchList,loadBatchExport,loadBatchDelete} from "@/common/config/api/PlanManage"
  import {loadDicValList} from "@/common/config/api/basic"
  import {getSplitString,w200,wColor,w120}from "@/common/config/utils"
  import {loadRefresh, delPlan} from '../PlanJs/mixIn'

  export default {
    name: "BatchOutY",
    mixins: [loadRefresh, delPlan],
    components: {
      Table
    },
    data() {
      return {
        tabIndex: 0,
        selectRows:[],
        pop: false, //弹框
        tableData: {
          selectShow: true,
          tableHeight: 0,
          currentPage: 1,
          total: 0, //列表总数
          listData: [],
          tableHead: [
            {
              name: "返修内容",
              value: 'problem'
            },
            {
              name: "申请部门",
              value: 'applicationDivision'
            },
            {
              name: "VIN码",
              value: 'vin',
              width:w200
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
              name: "申请人",
              value: 'proposer'
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
              name: "是否超期",
              value: 'isOverdue'
            }
          ]
        },
        formData: {
          vin: '', //车辆VIN码
          category: '', //车辆种类
          typeLevel: '', //车型级
          typpe: '', //车型
          color: '', //颜色
          commandDate : '', //指令下达时间
          createType: '', //创建方式 0为自动，1为手动
          currentWarehouseId: '', //当前仓库
          driveMode: '', //驱动方式
          isOverdue: '', //是否超期
          pointLocation: '', //点位信息
          salesArea: '', //销售区域
          status: '', //计划状态 1:未执行2:执行中3:已执行4:终止5:暂停
        },
      }
    },
    methods: {
      /*////////////////////////////////////////////////////////////////*/
      //导出接口
      handelExport(val){
        let self = this;
        let p;
        if(self.selectRows.length){
          let arr = [];
          self.selectRows.forEach((item) => {
            arr.push(item.ttPlanPdiId);
          })
          p = {
            "ids": arr,//勾选时导出的列表
            "listType": 13,
          }
        }else{
          p = {
            listType: 13,
            vin: getSplitString(self.formData.vin), //VIN码
            category: self.formData.category, //车辆种类
            typeLevel: self.formData.typeLevel, //车型级
            type: self.formData.type, //车型
            color: self.formData.color, //颜色
            commondStartDate: self.formData.commandDate !== null ? self.formData.commandDate[0] : '', //指令下达开始时间
            commondEndDate: self.formData.commandDate !== null ? self.formData.commandDate[1] : '', //指令下达结束时间
            createType: self.formData.createType, //创建方式 0为自动，1为手动
            currentWarehouseId: self.formData.currentWarehouseId, //当前仓库
            driveMode: self.formData.driveMode, //驱动方式
            overdueDuration: self.formData.overdueDuration, //超期时长
            pointLocation: self.formData.pointLocation, //点位信息
            salesArea: self.formData.salesArea, //销售区域
            status: self.formData.status, //计划状态 1:未执行2:执行中3:已执行4:终止5:暂停
            isOverdue: self.formData.isOverdue //是否超期
          }
        }
        loadBatchExport(p).then(res => {
          res && res.success && (window.location.href = res.repData)
        })
      },
      //列表接口
      loadDataList() {
        let self = this;
        let p = {
          pageNum: self.tableData.currentPage,
          pageSize: 30,
          listType: 13,
          vin: getSplitString(self.formData.vin), //VIN码
          category: self.formData.category, //车辆种类
          typeLevel: self.formData.typeLevel, //车型级
          type: self.formData.type, //车型
          color: self.formData.color, //颜色
          commondStartDate: self.formData.commandDate !== null ? self.formData.commandDate[0] : '', //指令下达开始时间
          commondEndDate: self.formData.commandDate !== null ? self.formData.commandDate[1] : '', //指令下达结束时间
          createType: self.formData.createType, //创建方式 0为自动，1为手动
          currentWarehouseId: self.formData.currentWarehouseId, //当前仓库
          driveMode: self.formData.driveMode, //驱动方式
          overdueDuration: self.formData.overdueDuration, //超期时长
          pointLocation: self.formData.pointLocation, //点位信息
          salesArea: self.formData.salesArea, //销售区域
          status: self.formData.status, //计划状态 1:未执行2:执行中3:已执行4:终止5:暂停
          isOverdue: self.formData.isOverdue //是否超期
        }
        loadBatchList(p).then(res => {
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

<style scoped lang="less">

</style>
