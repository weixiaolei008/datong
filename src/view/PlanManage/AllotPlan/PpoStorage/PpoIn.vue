<!--计划管理／库间调拨计划管理／SVO车辆计划／SVO车辆出库计划(未创建)-->
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
                <el-select placeholder="请选择" v-model="ppoFrom.origWarehouseId">
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
                <el-select placeholder="请选择" v-model="ppoFrom.typeLevel">
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
                <el-select   placeholder="请选择" v-model="ppoFrom.status">
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
                <el-select  placeholder="请选择" v-model="ppoFrom.category">
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
                <el-select placeholder="请选择" v-model="ppoFrom.vehicleType">
                  <el-option  v-for="item in options.vehicle_type"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select>
              </div>
              <div class="input-box">
                <label class="input-label">点位信息</label>
                <el-select  placeholder="请选择" v-model="ppoFrom.pointLocation">
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
              v-model="ppoFrom.vin">
            </el-input>
          </div>
          <div class="input-box">
            <label class="input-label">指令下达时间</label>
            <el-date-picker
              v-model="ppoFrom.commandDate"
              type="datetimerange"
              value-format="yyyy-MM-dd HH-mm-ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <div class="input-box">
            <label class="input-label">颜色</label>
            <el-select placeholder="请选择" v-model="ppoFrom.color" >
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
            <el-select placeholder="请选择" v-model="ppoFrom.driveMode">
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
            <el-select placeholder="请选择" v-model="ppoFrom.salesArea" >
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
  import {ppoQueryAllApi, ppoExportApi} from "@/common/config/api/PlanManage"

  export default {
    name: "PpoIn",
    components: { Table },
    watch: {
      options: {
        handler: function(val) {},
        deep: true
      }
    },
    computed:{
      options: {
        get(){
          return this.$store.state.codeOptions.options;
        },
        set(){}
      }
    },
    data() {
      return {
        pop: false,
        currentPage: 1,
        pageSizeNum: 30,
        tableSelectId: [],//表格选中的数据
        active: '',
        svoDialogVisible: false,
        isDisabled: true,
        addVins: '',
        origWarehouse: null,
        transportWayId: null,
        //搜索
        ppoFrom: {
          pageNum: 1,
          pageRows: 30,
          category: null,//车辆种类
          color: null,
          driveMode: null,//驱动方式
          origWarehouseId: null,//始发仓库
          pointLocation: null,//点位信息
          salesArea: null,//销售区域
          status: null,//窗口状态 1:待执行2:已执行3:已执行
          type: null,//窗口类型: 1:接收车辆 2:通知提车
          typeLevel: null,//车型级
          vehicleType: null,//车型
          vins: null,
          commandDate: []
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
              value: 'vehicleType',
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
              value: 'origWarehouse',
            },
            {
              name: "目标仓库",
              value: 'desWarehouse',
            },
            {
              name: "当前仓库",
              value: 'currentWarehouse',
            },
            {
              name: "当前库区",
              value: 'currentFunctionalZone',
            },
            {
              name: "当前库位",
              value: 'currentLocation',
            },
            {
              name: "指令下达时间",
              value: 'commandDate',
              width: w180,
              formatter:  function(row) {
                return row.commandDate ?  timestampToTime(row.commandDate) : null
              }
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
      //搜索查询
      searchFrom(formData) {
        this.svoLoadList();
      },
      //清空
      cleanFrom(formData) {
        this.ppoFrom = {};
        // this.svoLoadList();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.svoLoadList();
      },
      handleSelectionChange(val) {
        this.tableSelectId = val;
      },
      //表格选中数据
      checkedChange() {
        if(this.tableSelectId.length < 1) {
          this.feedMessage('error','请选择数据！');
          return false;
        }
        let sstatusL = false;
        let ids = [];
        if(this.tableSelectId.length > 0) {
          this.tableSelectId.map((item, index) => {
           if(item.status != '待执行'){//1:待执行2:已执行3:已执行
              sstatusL = true;
              this.feedMessage('error','不是待执行的状态不能更新操作！');
              return false;
            }
            ids.push(item.id);
          })
        }
        console.log(ids, 'ids---');
        return sstatusL ? false : ids;
      },
      fromVal(num) {
        var p = {
          pageNum: this.currentPage,
          pageRows: this.pageSizeNum,
          type: 4,
          category: this.ppoFrom.category,//车辆种类
          color: this.ppoFrom.color,
          driveMode: this.ppoFrom.driveMode,//驱动方式
          currentWarehouseId: this.ppoFrom.origWarehouseId,//始发仓库
          pointLocation: this.ppoFrom.pointLocation,//点位信息
          salesArea: this.ppoFrom.salesArea,//销售区域
          status: this.ppoFrom.status,//窗口状态 1:待执行2:已执行3:已执行
          typeLevel: this.ppoFrom.typeLevel,//车型级
          vehicleType: this.ppoFrom.vehicleType,//车型
          vins: this.ppoFrom.vin ? getSplitString(this.ppoFrom.vin) : null,
          beginTime: this.ppoFrom.commandDate ? this.ppoFrom.commandDate[0] : null,
          endTime: this.ppoFrom.commandDate ? this.ppoFrom.commandDate[1] : null,
        }
        if(num == 2) {
          let arr = [];
          if(this.tableSelectId.length > 0){
            this.tableSelectId.forEach((item) => {
              arr.push(item.id);
            })
          }
          p.ids = arr.length > 0 ? arr : null;
        }
        return p;
      },
      //列表
      svoLoadList(){
       ppoQueryAllApi(this.fromVal(1)).then(res => {
        if(res.repData) {
          this.tableData.listData    = res.repData.list;
          this.tableData.total       = res.repData.total;
        }
       })
      },
      exportBtn() {
        ppoExportApi(this.fromVal(2)).then(res => {
          if(res.repData){
            window.location.href = res.repData;
          }
        })
      }
    },
    created() {
      this.svoLoadList();
    }
  }
</script>
<style lang="less">
</style>
