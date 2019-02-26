<!--PDI车辆返修入库计划-->
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
              placeholder="请输入内容"
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
  import {loadTwiceInList,loadTwiceInExport} from "@/common/config/api/PlanManage"
  import {loadDicValList} from "@/common/config/api/basic"
  import {getSplitString,exportFile,w200,w120}from "@/common/config/utils"
  import {loadRefresh} from '../PlanJs/mixIn'

  export default {
    name: "TwiceInTo",
    mixins: [loadRefresh],
    components: {
      Table
    },
    data() {
      return {
        pop: false, //弹框
        selectRows: [],
        tableData: {
          selectShow: true,
          tableHeight: 0,
          currentPage: 1,
          total: 0, //列表总数
          listData: [],
          tableHead: [
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
              value: 'origWarehouseId',
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
              value: 'currentFunctionalZoneId',
              width: w120
            },
            {
              name: "当前库位",
              value: 'currentLocationId',
              width: w120
            },
            {
              name: "生成方式",
              value: 'generateType'
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
        num: 10,
        //查询
        formData: {
          vin: '', //车辆VIN码
          vehicleType: '', //车型
          typeLevel: '', // 车型级
          category: '', //车辆种类
          color: '', //颜色
          driveMode: '', //驱动方式
          salesArea: '', //销售区域
          pointLocation: '', //点位信息
          currentWarehouseId: '', //当前仓库
          commandDate: '', //指令下达时间
          isOverdue: '', //是否逾期 0:正常,1:逾期
          status: '', //状态 1:待执行2:已执行3:已结束4:终止5:暂停
        },
      }
    },
    methods: {
      /*//////////////////////////////////////////////*/
      //导出接口
      handelExport(){
        let self = this;
        let p;
        if(self.selectRows.length){
          let arr = [];
          self.selectRows.forEach((item) => {
            arr.push(item.ttWindowTwiceId);
          })
          p = {
            "planTwiceId": arr,//勾选时导出的列表
            "type": 35
          }
        }else{
          p = {
            type: 35,
            vin: getSplitString(self.formData.vin), //VIN码
            vehicleType: self.formData.vehicleType, //车型
            typeLevel: self.formData.typeLevel, // 车型级
            category: self.formData.category, //车辆种类
            color: self.formData.color, //颜色
            driveMode: self.formData.driveMode, //驱动方式
            salesArea: self.formData.salesArea, //销售区域
            pointLocation: self.formData.pointLocation, //点位信息
            currentWarehouseId: self.formData.currentWarehouseId, //当前仓库
            startCommandDate: self.formData.commandDate !== null ? self.formData.commandDate[0] : '', //指令下达开始时间
            endCommandDate: self.formData.commandDate !== null ? self.formData.commandDate[1] : '', //指令下达结束时间
            isOverdue: self.formData.isOverdue, //是否逾期 0:正常,1:逾期
            status: self.formData.status //状态 1:待执行2:已执行3:已结束4:终止5:暂停
          }
        }
        loadTwiceInExport(p).then(res => {
          res && res.success && (window.location.href = res.repData)
        })
      },
      //列表接口
      loadDataList() {
        let self = this;
        let p = {
          pageNum: self.tableData.currentPage,
          pageSize: 30,
          type: 35,
          vin: getSplitString(self.formData.vin), //VIN码
          vehicleType: self.formData.vehicleType, //车型
          typeLevel: self.formData.typeLevel, // 车型级
          category: self.formData.category, //车辆种类
          color: self.formData.color, //颜色
          driveMode: self.formData.driveMode, //驱动方式
          salesArea: self.formData.salesArea, //销售区域
          pointLocation: self.formData.pointLocation, //点位信息
          currentWarehouseId: self.formData.currentWarehouseId, //当前仓库
          startCommandDate: self.formData.commandDate !== null ? self.formData.commandDate[0] : '', //指令下达开始时间
          endCommandDate: self.formData.commandDate !== null ? self.formData.commandDate[1] : '', //指令下达结束时间
          isOverdue: self.formData.isOverdue, //是否逾期 0:正常,1:逾期
          status: self.formData.status //状态 1:待执行2:已执行3:已结束4:终止5:暂停
        }
        loadTwiceInList(p).then(res => {
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

