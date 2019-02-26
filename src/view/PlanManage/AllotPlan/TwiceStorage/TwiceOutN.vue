<!--二次报交返修车辆出库计划  （未创建）-->
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
          <div class="search-box">
            <div class="search-reset" @click="reset"><span class="img-reset">清空</span></div>
            <div class="search-sub" @click="search"><span class="img-sub">搜索</span></div>
          </div>
        </div>
      </div>
      <!-- btn-group -->
      <div class="btn-group clearfix">
        <div class="btn-add" @click="handleCreate('currentWarehouseId','repairMethod')"><span class="img-add">执行计划</span></div>
        <div class="btn-del" @click="handleDel"><span class="img-del">删除</span></div>
        <UploadExcel @handle-success="importSuccess"></UploadExcel>
        <div class="btn-export" @click="handelExport"><span class="img-extend">导出</span></div>
      </div>
    </el-header>
    <el-main class="table" style='padding: 10px;'>
      <Table :data='tableData'
             @selection-change="handleSelectionChange"
             @current-change="handleCurrentChange">
      </Table>
    </el-main>
    <!--创建计划弹框-->
    <el-dialog title="创建计划" :visible.sync="popAddVisible" :close-on-click-modal="false" width="380px" align="center">
      <div class="clearfix">
        <div class="input-box">
          <label class="input-label">VIN码</label>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入VIN码"
            disabled
            v-model="createPlanData.vin">
          </el-input>
        </div>
        <div class="input-box">
          <label class="input-label">当前仓库</label>
          <el-input placeholder="请输入当前仓库" clearable v-model="createPlanData.currentWarehouseId" disabled></el-input>
        </div>
        <div class="input-box">
          <label class="input-label">运输工具</label>
          <el-select v-model="createPlanData.transportWay" placeholder="请选择运输工具">
            <el-option
              v-for="option in options.transport_way"
              :key="option.code"
              :label="option.name"
              :value="option.code">
            </el-option>
          </el-select>
        </div>
      </div>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button plain style="background: #fff;border-color: #67A0FF;color: #67A0FF" @click="cancleBack">返回</el-button>
        <el-button type="primary" @click="saveCreateData">保存</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
  import Table from "@/components/Table"
  import {loadTwiceInList,loadTwiceInCreate,loadTwiceInExportPre,loadTwiceInDeletet,loadTwiceInExportIn} from "@/common/config/api/PlanManage"
  import {loadDicValList} from "@/common/config/api/basic"
  import {getSplitString,exportFile,w200,w120}from "@/common/config/utils"
  import {loadRefresh, creatWarehouse, delPlan, repairAll} from '../PlanJs/mixIn'
  import UploadExcel from "@/components/UploadExcel"

  export default {
    name: "TwiceOutN",
    mixins: [loadRefresh, creatWarehouse, delPlan, repairAll],
    components: {
      Table,
      UploadExcel
    },
    data() {
      return {
        isSaveFlag: true,
        popAddVisible: false,
        pop: false, //弹框
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
              name: "库龄",
              value: 'warehouseAge'
            },
            {
              name: "状态",
              value: 'status'
            }
          ]
        },
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
        createPlanData: {
          vin: '', //vin
          currentWarehouseId: '', //当前仓库
          transportWay: '' //运输方式
        },
      }
    },
    methods: {
      cancleBack(){
        this.popAddVisible = false;
      },
      /*/////////////////////////////////////////////////////////////*/
      //导出接口
      handelExport(){
        let self = this;
        let p;
        if(self.selectRows.length){
          let arr = [];
          self.selectRows.forEach((item) => {
            arr.push(item.ttPlanTwiceId);
          })
          p = {
            "planTwiceId": arr,//勾选时导出的列表
            "type": 55
          }
        }else{
          p = {
            type: 55,
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
        loadTwiceInExportPre(p).then(res => {
          res && res.success && (window.location.href = res.repData)
        })
      },
      //列表接口
      loadDataList() {
        let self = this;
        let p = {
          pageNum: self.tableData.currentPage,
          pageSize: 30,
          type: 55,
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
      //导入接口
      importSuccess(res){
        let self = this;
        let p = {
          "filePath": res,
          "generateType": 1,
        }
        loadTwiceInExportIn(p).then(res => {
          res && res.success && self.msgInfo(res.repData);
          self.loadDataList();
        })
      },
      //创建计划保存接口
      saveCreateData() {
        let self = this;
        if(self.isSaveFlag){
          this.isSaveFlag = false;
          setTimeout(()=>{
            self.isSaveFlag = true;
          }, 1000)
          let arr = [];
          this.selectRows.forEach((item) => {
            arr.push(item.ttPlanTwiceId);
          })
          let p = {
            "type": 55,
            "planTwiceIds": arr,
            "transportWay" :self.createPlanData.transportWay
          }
          loadTwiceInCreate(p).then(res => {
            res && res.success && self.msgInfo(res.repData);
            self.popAddVisible = false;
            self.loadDataList();
          })
        }
      },
      //删除接口
      handleDelData(){
        let self = this;
        let p;
        let arr = [];
        if(self.selectRows){
          self.selectRows.forEach((item) => {
            arr.push(item.ttPlanTwiceId);
          })
          p = {
            "planTwiceIds": arr,//勾选时导出的列表
          }
        }
        loadTwiceInDeletet(p).then(res => {
          res && res.success && self.msgInfo(res.repData);
          this.loadDataList();
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


