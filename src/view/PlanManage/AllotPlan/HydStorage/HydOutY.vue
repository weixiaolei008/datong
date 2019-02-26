<!--系统窗口／氢能源窗口／氢能源计划(接收车辆)-->
<template>
  <el-container style="width: 100%;height: 100%;">
    <el-header style="height: auto; padding: 0;">
      <!-- search-group -->
      <div class="search-group clearfix">
        <div :class="pop?'search-up':'search-more'" @click="searchMore"></div>
          <el-collapse-transition>
            <div v-show="pop" class="search-pop clearfix">
              <div class="input-box">
                <label class="input-label">当前仓库</label>
                <el-select placeholder="请选择" v-model="hydFrom.origWarehouseId">
                  <el-option
                    v-for="item in options.warehouse_code"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select>
              </div>
              <div class="input-box">
                <label class="input-label">车型级</label>
                <el-select placeholder="请选择" v-model="hydFrom.typeLevel">
                  <el-option
                    v-for="item in options.vehicle_type_level"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select>
              </div>
              <div class="input-box">
                <label class="input-label">状态</label>
                <el-select   placeholder="请选择" v-model="hydFrom.status">
                  <el-option
                    v-for="item in options.plan_status"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select>
              </div>
             <div class="input-box">
                <label class="input-label">车辆种类</label>
                <el-select  placeholder="请选择" v-model="hydFrom.category">
                  <el-option
                    v-for="item in options.vehicle_category"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select>
              </div>
              <div class="input-box">
                <label class="input-label">车型</label>
                <el-select placeholder="请选择" v-model="hydFrom.vehicleType">
                  <el-option  v-for="item in options.vehicle_type"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select>
              </div>
              <div class="input-box">
                <label class="input-label">点位信息</label>
                <el-select  placeholder="请选择" v-model="hydFrom.pointLocation">
                  <el-option
                    v-for="item in options.point_location"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select>
              </div>
            </div>
          </el-collapse-transition>
          <div class="input-box">
            <label class="input-label">VIN码</label>
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入VIN码"
              v-model="hydFrom.vin">
            </el-input>
          </div>
          <div class="input-box">
            <label class="input-label">指令下达时间</label>
            <el-date-picker
              v-model="hydFrom.commandDate"
              type="datetimerange"
              value-format="yyyy-MM-dd HH-mm-ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <div class="input-box">
            <label class="input-label">颜色</label>
            <el-select placeholder="请选择" v-model="hydFrom.color" >
              <el-option
                v-for="item in options.color"
                :key="item.code"
                :label="item.name"
                :value="item.code">
                </el-option>
            </el-select>
          </div>
          <div class="input-box">
            <label class="input-label">驱动方式</label>
            <el-select placeholder="请选择" v-model="hydFrom.driveMode">
              <el-option
                v-for="item in options.drive_mode"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </div>
          <div class="input-box">
            <label class="input-label">销售区域</label>
            <el-select placeholder="请选择" v-model="hydFrom.salesArea" >
              <el-option v-for="item in options.sales_area"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </div>
          <div class="search-box">
            <div class="search-reset" @click="cleanFrom"><span class="img-reset">清空</span></div>
            <div class="search-sub" @click="searchFrom"><span class="img-sub">搜索</span></div>
          </div>
        </div>
      </div>
      <!-- btn-group -->
      <div class="btn-group clearfix">
        <div class="btn-export" @click="exportBtn"><span class="img-extend">导出</span></div>
      </div>
    </el-header>
    <el-main class="table" style='padding: 10px;'>
      <!-- {{options}} -->
       <Table :data='tableData'
        @selection-change="handleSelectionChange"
        @current-change="handleCurrentChange">
        <template slot-scope="{scope}" slot="code">
          <div>{{scope.row.code}}</div>
        </template>
      </Table>
    </el-main>
  </el-container>
</template>

<script>
  import Table from "@/components/Table"
  import { timestampToTime, getSplitString, w200, w180 , w150 }from "@/common/config/utils"
  import {hydQueryAllApi, hydExportApi} from "@/common/config/api/PlanManage"

  export default {
    name: "HydOytY",
    components: {
      Table
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
    data() {
      return {
        currentPage: 1,
        pageSizeNum: 30,
        tableSelectId: [],//表格选中的数据
        pop: false,
        hydFrom: {
          pageNum: 1,
          pageSize: 30,
          windowType: 0,
          carType: null,
          category: null,
          color: null,
          commandDate: null,
          driveMode: null,
          endCommandDate: null,
          origWarehouseId: null,
          pointLocation: null,
          salesArea: null,
          startCommandDate: null,
          status: null,
          typeLevel: null,
          vin: null
        },
        tableData: {
          selectShow: true,
          tableHeight: 0,
          currentPage: 1,
          total: 0, //列表总数
          listData: [],
          tableHead: [
            {
              name: "VIN号",
              value: 'vin',
              width: w200
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
              name: "始发仓库",
              value: 'origWarehouseId',
            },
            {
              name: "目标仓库",
              value: 'desWarehouseId',
            },
            {
              name: "当前仓库",
              value: 'currentWarehouseName',
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
              name: "指令下达时间",
              value: 'commandDate',
              width: w180
            },
            {
              name: "运输工具",
              value: 'transportWay',
            },
            {
              name: "状态",
              value: 'status',
            },
            {
              name: "是否超期",
              value: 'isOverdue',
            }
          ],
        }
      }
    },
    methods: {
      searchMore() {
        this.pop = !this.pop
      },
      //清除表单搜索值
      cleanFrom(){
        this.hydFrom = {};
        // this.hydLoadList();
      },
      //搜索查询
      searchFrom(formData) {
        this.hydLoadList();
      },
      //分页
      handleCurrentChange(val) {
        this.currentPage = val;
        this.hydLoadList();
      },
      //表格checked
      handleSelectionChange(val) {
        this.tableSelectId = val;
      },
      //表格选中数据-导出
      checkedChange() {
        if(this.tableSelectId.length < 1) {
          this.feedMessage('error','请选择数据！');
          return false;
        }
        let idList = [];
        for(var row in this.tableSelectId) {
          idList.push(this.tableSelectId[row].ttPlanHydrogenvehicleId + '')
        }
        var params = {
          ids: idList
        }
        return params;
      },
      fromVal(num) {
        var p = {
          pageNum: this.currentPage,
          pageSize: this.pageSizeNum,
          planType: 30,
          category: this.hydFrom.category,//车辆种类
          color: this.hydFrom.color,
          driveMode: this.hydFrom.driveMode,//驱动方式
          currentWarehouseId: this.hydFrom.origWarehouseId,//始发仓库
          pointLocation: this.hydFrom.pointLocation,//点位信息
          salesArea: this.hydFrom.salesArea,//销售区域
          status: this.hydFrom.status,//窗口状态 1:待执行2:已执行3:已执行
          typeLevel: this.hydFrom.typeLevel,//车型级
          carType: this.hydFrom.vehicleType,//车型
          vin: this.hydFrom.vin ? getSplitString(this.hydFrom.vin) : null,
          startCommandDate: this.hydFrom.commandDate ? this.hydFrom.commandDate[0] : null,
          endCommandDate: this.hydFrom.commandDate ? this.hydFrom.commandDate[1] : null,
        }
        if(num == 2) {
          let arr = [];
          if(this.tableSelectId.length > 0){
            this.tableSelectId.forEach((item) => {
              arr.push(item.ttPlanHydrogenvehicleId);
            })
          }
          p.id = arr.length > 0 ? arr : null;
        }
        return p;
      },
      //计划列表
      hydLoadList(){
        hydQueryAllApi(this.fromVal(1)).then(res => {
          if(res.repData) {
            this.tableData.listData    = res.repData.list;
            this.tableData.total       = res.repData.total;
          }
        })
      },
      exportBtn() {
        hydExportApi(this.fromVal(2)).then(res => {
          if(res.repData){
            window.location.href = res.repData;
          }
        })
      }
    },
    created() {
      this.hydLoadList();
    }
  }
</script>
<style lang="less">
</style>
