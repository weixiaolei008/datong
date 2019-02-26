<!--系统窗口／PPO窗口／PPO历史查询-->
<template>
  <el-container style="width: 100%;height: 100%;">
    <el-header style="height: auto; padding: 0;">
      <!-- search-group -->
      <div is="fromSearch" :data="dataFm" @searchChange="ppoPlanList"></div>
      <!-- <div class="search-group clearfix">
        <div :class="pop?'search-up':'search-more'" @click="searchMore"></div>
          <el-collapse-transition>
            <div v-show="pop" class="search-pop clearfix">
              <div class="input-box">
                <label class="input-label">始发仓库</label>
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
            <div class="search-sub" @click="searchFrom"><span class="img-sub">搜索</span></div>
            <div class="search-reset" @click="cleanFrom"><span class="img-reset">清空</span></div>
          </div>
        </div>
      </div> -->
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
  import FromSearch from "../FromSearch"
  import { timestampToTime, getSplitString }from "@/common/config/utils"
  import {ppoHistoryListApi, ppoPlanExportHistoryApi} from "@/common/config/api/SysWindows"

  export default {
    name: "PpoHtry",
    components: { Table, FromSearch },
    // watch: {
    //   options: {
    //     handler: function(val) {},
    //     deep: true
    //   }
    // },
    // computed:{
    //   options: {
    //     get(){
    //       return this.$store.state.codeOptions.options;
    //     },
    //     set(){}
    //   }
    // },
    data() {
      return {
        pop: false,
        currentPage: 1,
        pageSizeNum: 30,
        tableSelectId: [],//表格选中的数据
        active: 0,
        //搜索
        // ppoFrom: {
        //   pageNum: 1,
        //   pageRows: 30,
        //   category: null,//车辆种类
        //   color: null,
        //   driveMode: null,//驱动方式
        //   origWarehouseId: null,//始发仓库
        //   pointLocation: null,//点位信息
        //   salesArea: null,//销售区域
        //   status: null,//窗口状态 1:待执行2:已执行3:已执行
        //   type: null,//窗口类型: 1:接收车辆 2:通知提车
        //   typeLevel: null,//车型级
        //   vehicleType: null,//车型
        //   vins: null,
        //   commandDate: []
        // },
        dataFm: {
          pop: false,
          formData: {
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
            vin: null,
            commandDate: []
          },
          arr1: [
            {
              label: '指令下达时间',
              type: 'time',
              value: 'commandDate'
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
              label: '始发仓库',
              type: 'select',
              value: 'origWarehouseId'
            },
            {
              label: '车型级',
              type: 'select',
              value: 'typeLevel'
            },
            {
              label: '车辆种类',
              type: 'select',
              value: 'category'
            },
            {
              label: '车型',
              type: 'select',
              value: 'vehicleType'
            },
            {
              label: '点位信息',
              type: 'select',
              value: 'pointLocation'
            }
          ],
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
                width: '200'
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
                width: '200'
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
                name: "送车指令下达时间",
                value: 'sendCommandDate ',
                width: '200',
                formatter:  function(row) {
                  return row.sendCommandDate  ? timestampToTime(row.sendCommandDate ) : null
                }
              },
              {
                name: "送车车辆接收交接时间",
                value: 'sendReceiveDate ',
                width: '200',
                formatter:  function(row) {
                  return row.sendReceiveDate  ? timestampToTime(row.sendReceiveDate ) : null
                }
              },
              {
                name: "还车指令下达时间",
                value: 'backCommandDate ',
                width: '200',
                formatter:  function(row) {
                  return row.backCommandDate  ? timestampToTime(row.backCommandDate ) : null
                }
              },
              {
                name: "还车车辆接收交接时间 ",
                value: 'backReceiveDate ',
                width: '200',
                formatter:  function(row) {
                  return row.backReceiveDate  ? timestampToTime(row.backReceiveDate ) : null
                }
              }
          ],
        }
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.currentPage = val;
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
        let idList = [];
        for(var row in this.tableSelectId) {
          idList.push(this.tableSelectId[row].ttWindowHydrogenvehicleidId + '')
        }
        var params = {
          ids: idList
        }
        return params;
      },
      fromVal(num) {
        let self = this;
        var p = {
          pageNum: this.currentPage,
          pageRows: this.pageSizeNum,
          type: 3,//窗口类型: 1:接收车辆 2:通知提车
          category: self.dataFm.formData.category,//车辆种类
          color: self.dataFm.formData.color,
          driveMode: self.dataFm.formData.driveMode,//驱动方式
          origWarehouseId: self.dataFm.formData.origWarehouseId,//始发仓库
          pointLocation: self.dataFm.formData.pointLocation,//点位信息
          salesArea: self.dataFm.formData.salesArea,//销售区域
          status: self.dataFm.formData.status,//窗口状态 1:待执行2:已执行3:已执行
          typeLevel: self.dataFm.formData.typeLevel,//车型级
          vehicleType: self.dataFm.formData.vehicleType,//车型
          vins: self.dataFm.formData.vin ? getSplitString(self.dataFm.formData.vin) : null,
          beginTime: self.dataFm.formData.commandDate ? self.dataFm.formData.commandDate[0] : null,
          endTime: self.dataFm.formData.commandDate ? self.dataFm.formData.commandDate[1] : null,
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
      ppoPlanList(){
       ppoHistoryListApi(this.fromVal(1)).then(res => {
        if(res.repData) {
          this.tableData.listData    = res.repData.list;
          this.tableData.total       = res.repData.total;
        }
       })
      },
      exportBtn() {
        ppoPlanExportHistoryApi(this.fromVal(2)).then(res => {
          if(res.repData){
            window.location.href = res.repData;
          }
        })
      }
    },
    created() {
      this.ppoPlanList();
    }
  }
</script>

<style lang="less">
</style>