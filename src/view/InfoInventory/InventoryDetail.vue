<template>
  <div style="width: 100%;height: 100%">
    <el-container style="width: 100%;height: 100%;">
      <el-header style="height: auto; padding: 0;">
        <!-- search-group -->
        <div class="search-group clearfix">
          <div :class="pop?'search-up':'search-more'" @click="searchMore"></div>
          <el-collapse-transition>
            <div v-show="pop" class="search-pop clearfix" style="width: 100%;">
              <!-- input 输入框 -->
              <div class="input-box">
                <label class="input-label">车型级</label>
                <el-select v-model="formData.typeLevel" placeholder="请选择车型级">
                  <el-option
                    v-for="option in localOptions.vehicle_type_level" :key="option.code" :label="option.name" :value="option.code">
                  </el-option>
                </el-select>
              </div>
              <div class="input-box">
                <label class="input-label">销售区域</label>
                <el-select v-model="formData.salesArea" placeholder="请选择销售区域">
                  <el-option v-for="item in localOptions.sales_area" :key="item.code" :label="item.name" :value="item.code">
                  </el-option>
                </el-select>
              </div>
              <div class="input-box">
                <label class="input-label">驱动方式</label>
                <el-select v-model="formData.driveMode" placeholder="请选择驱动方式">
                  <el-option v-for="item in localOptions.drive_mode" :key="item.code" :label="item.name" :value="item.code">
                  </el-option>
                </el-select>
              </div>
              <!-- input 输入框 -->
              <div class="input-box">
                <label class="input-label">点位信息</label>
                <el-select v-model="formData.pointLocation" placeholder="请选择点位信息">
                  <el-option
                    v-for="option in localOptions.point_location" :key="option.code" :label="option.name" :value="option.code">
                  </el-option>
                </el-select>
              </div>
              <div class="input-box">
                <label class="input-label">车辆种类</label>
                <el-select v-model="formData.category" placeholder="请选择车辆种类">
                  <el-option
                    v-for="option in localOptions.vehicle_category" :key="option.code" :label="option.name" :value="option.code">
                  </el-option>
                </el-select>
              </div>
              <div class="input-box">
                <label class="input-label">车型</label>
                <el-select v-model="formData.type" placeholder="请选择车型">
                  <el-option
                    v-for="option in localOptions.vehicle_type" :key="option.code" :label="option.name" :value="option.code">
                  </el-option>
                </el-select>
              </div>
            </div>
          </el-collapse-transition>
          <div class="search-group clearfix">
            <div class="clearfix">
              <div class="input-box">
                <label class="input-label">VIN码</label>
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="formData.vinList">
                </el-input>
              </div>
              <!-- input 输入框 -->
              <div class="input-box">
                <label class="input-label">按颜色</label>
                <el-select v-model="formData.color" filterable placeholder="请选择颜色">
                  <el-option
                    v-for="option in localOptions.color" :key="option.code" :label="option.name" :value="option.code">
                  </el-option>
                </el-select>
              </div>
              <!-- input 输入框 -->
              <div class="input-box" v-if="!this.$route.query.code">
                <label class="input-label">当前仓库</label>
                <el-select v-model="formData.warehouseType" filterable placeholder="请选择当前仓库">
                  <el-option
                    v-for="option in localOptions.stock_type" :key="option.code" :label="option.name" :value="option.code">
                  </el-option>
                </el-select>
              </div>

              <!-- input 输入框 -->
              <div class="input-box">
                <label class="input-label">功能区</label>
                <el-select v-model="formData.functionalZone" filterable placeholder="请选择功能区">
                  <el-option
                    v-for="option in localOptions.functional_zone" :key="option.code" :label="option.name" :value="option.code">
                  </el-option>
                </el-select>
              </div>
              <div class="input-box">
                <label class="input-label">下线时间</label>
                <el-date-picker
                  v-model="formData.birthTime"
                  value-format="yyyy-MM-dd HH-mm-ss"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </div>
              <div class="input-box">
                <label class="input-label">入库时间</label>
                <el-date-picker
                  v-model="formData.timeValue"
                  value-format="yyyy-MM-dd HH-mm-ss"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </div>
              <div class="search-box">
                <div class="search-sub"  @click="search"><span class="img-sub">搜索</span></div>
                <div class="search-reset" @click="reset"><span class="img-reset">清空</span></div>
              </div>
            </div>
          </div>
          <div class="btn-group clearfix">
            <div @click="handleExport" class="btn-export"><span class="img-extend">导出</span></div>
            <div @click="handleVdcMove"
                 v-if="this.$route.query.code == 100 || this.$route.query.code == 101 || this.$route.query.code == 102"
                 class="btn-vdc-move"><span class="img-vdc">VDC调拨移库</span></div>
          </div>
        </div>
      </el-header>
      <!--table-->
      <el-main style="padding: 10px;" class="table">
        <Table :data='tableData'
               @handleEdit="handleEdit"
               @selection-change="handleSelectionChange"
               @current-change="handleCurrentChange">
        </Table>
      </el-main>
    </el-container>
    <!--编辑弹框-->
    <el-dialog  title="编辑旧vin" :visible.sync="popEditVisible" width="460px" center>
      <div class="clearfix">
        <!-- input 输入框 -->
        <div class="input-box" style="margin-top: 20px;">
          <label class="input-label">VIN</label>
          <el-input v-model="vin" placeholder="" disabled clearable></el-input>
        </div>
        <div class="input-box" style="margin-bottom: 20px;">
          <label class="input-label">旧VIN</label>
          <el-input v-model="oldVin" placeholder="" clearable></el-input>
        </div>
        <div class="input-box" style="margin-bottom: 20px;line-height: 40px;">
          <label class="input-label"><span>*</span>车辆类型</label>
          <el-radio-group v-model="check1">
            <el-radio :label="2">缺件车</el-radio>
            <el-radio :label="3">库改车</el-radio>
            <el-radio :label="1">正常车</el-radio>
          </el-radio-group>
        </div>
        <div class="input-box" style="margin-bottom: 20px;line-height: 40px;">
          <label class="input-label">返回类型</label>
          <el-checkbox v-model="check2">领用退回</el-checkbox>
          <el-checkbox v-model="check3">销售退回</el-checkbox>
        </div>
        <div style="float:left;text-align: center;width: 100%;">
          <el-button class="" style="margin-right: 10px;" @click="cancleEdit" size="medium">返回</el-button>
          <el-button class="" style="margin-right: 15px;" type="primary" @click="saveEdit" size="medium">保存</el-button>
        </div>
      </div>
    </el-dialog>
    <!--VDC调拨移库弹框-->
    <el-dialog  title="VDC调拨移库" :visible.sync="popVdcMove" width="460px" center>
      <div class="clearfix">
        <div class="input-box">
          <label class="input-label">VIN码</label>
          <el-input
            type="textarea"
            :rows="2"
            disabled
            placeholder="请输入内容"
            v-model="popVdcData.vins">
          </el-input>
        </div>
        <div class="input-box" style="margin-bottom: 20px;">
          <label class="input-label">当前仓库</label>
          <el-input v-model="popVdcData.house" disabled clearable></el-input>
        </div>
        <div style="float:left;text-align: center;width: 100%;">
          <el-button class="" style="margin-right: 10px;" @click="cancleVdc" size="medium">返回</el-button>
          <el-button class="" style="margin-right: 15px;" type="primary" @click="saveVdc" size="medium">保存</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getSplitString, w200, w180}from "@/common/config/utils"
  import Table from "@/components/Table"
  import {loadInventoryDetail, exportInventoryDetail, updateVin, vdcMove} from "@/common/config/api/InfoInventory"

  export default {
    name: "InventoryDetail",
    components: {
      Table,
    },
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
        pop: false,
        selectRows: [],
        check1: 0,
        check2: false,
        check3: false,
        searchVin: false,
        popEditVisible: false, //编辑弹框
        popVdcMove: false,//移库弹框
        vin: '',
        oldVin: '',
        popVdcData: {
          vins: '',
          house: '',
        },
        formData: {
          warehouseType: '',
          type: '',
          category: '',
          driveMode: '',
          typeLevel: '',
          salesArea: '',
          vinList: "",
          pointLocation: "",
          color: "",
          functionalZone: "",
          birthTime: '',
          timeValue: ''
        },
        tableData: {
          selectShow: true,
          tableHeight: 0,
          currentPage: 1,
          pageSize: 30,
          width: 130,
          total: 0, //列表总数
          listData: [],
          tableHead: [
            {
              name: "VIN号",
              width: w200,
              value: 'vin',
            },
            {
              name: "旧VIN号",
              width: w200,
              value: 'oldVin'
            },
            {
              name: "车型",
              value: 'type'
            },
            {
              name: "车型级",
              value: 'typeLevel'
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
              name: "车辆种类",
              value: 'category'
            },
            {
              name: "点位信息",
              value: 'pointLocation'
            },
            {
              name: "当前仓库",
              value: 'warehouse'
            },
            {
              name: "功能区",
              value: 'currentFunctionalZone'
            },
            {
              name: "库位号",
              value: 'currentLocationId'
            },
            {
              name: "车辆类型",
              value: 'additionalVehicleTypeName'
            },
            {
              name: "返回类型",
              width: 170,
              value: 'returnTypeName'
            },
            {
              name: "车辆下线时间",
              width: w180,
              value: 'birthDate'
            },
            {
              name: "车辆入库时间",
              width: w180,
              value: 'inboundDate'
            },
            {
              name: "销售退回入库时间",
              width: w180,
              value: 'saleReturnDate'
            },
          ],
          operations: [
            {
              label: '操作',
              width: '70',
              data: [
                {
                  icon: 'icon-edit',
                  Fun: 'handleEdit',
                  id: '1',
                }
              ]
            }
          ],
        },
      }
    },
    methods: {
      searchMore() {
        this.pop = !this.pop
      },
      search(){
        this.tableData.currentPage = 1;
        this.loadData();
      },
      handleSelectionChange(selection) {
        this.selectRows = selection;
      },
      handleCurrentChange(val) {
        this.tableData.currentPage = val;
        this.loadData();
      },
      handleVdcMove(){
        let arr = [];
        if(this.selectRows.length < 1){
          this.msgInfo('请至少勾选一条数据')
          return
        }
        this.selectRows.forEach((item) => {
          arr.push(item.vin)
        })
        this.popVdcData.vins = arr.join(',');
        this.popVdcData.house = this.selectRows[0].warehouse;
        this.popVdcMove = true;
      },
      handleEdit(data) {
        this.popEditVisible = true;
        this.vin = data.row.vin;
        this.oldVin = data.row.oldVin;
        this.check1 = +data.row.additionalVehicleTypeCode;
        this.check2 = +data.row.isDrawReturn ? true : false;
        this.check3 = +data.row.isSaleReturn ? true : false;
        // this.editFormData = Object.assign({}, data.row);
      },
      cancleEdit() {
        this.popEditVisible = false;
      },
      cancleVdc() {
        this.popVdcMove = false;
      },
      saveVdc() {
        let self = this;
        let p = {
          vins: getSplitString(self.popVdcData.vins)
        }
        vdcMove(p).then(res => {
          self.msgInfo(res.repData)
          self.popVdcMove = false;
          self.loadData();
        })
      },
      saveEdit() {
        let self = this;
        if(self.oldVin && self.oldVin.length != 17){
          self.msgInfo('请输入17位VIN')
          return;
        }
        if(!self.check1){
          self.msgInfo('请选择车辆类型')
          return;
        }
        let p = {
          "oldVin": self.oldVin,
          "vin": self.vin,
          "isDrawReturn": self.check2 ? 1 : 0,
          "isSaleReturn": self.check3 ? 1 : 0,
          "vehicleType": self.check1,
        }
        updateVin(p).then(res => {
          self.popEditVisible = false;
          self.msgInfo(res.repData)
          self.loadData();
        })
      },
      loadData() {
        let self = this;
        let p;
        if(self.searchVin){
          self.searchVin = false;
          p ={
            "vinList": [this.$route.query.vin],
            "type": self.formData.type,
            "category": self.formData.category,
            "driveMode": self.formData.driveMode,
            "typeLevel": self.formData.typeLevel,
            "salesArea": self.formData.salesArea,
            "color": self.formData.color,
            "functionalZone": self.formData.functionalZone,
            "pointLocation": self.formData.pointLocation,
            "inboundTimeFrom": self.formData.timeValue ? self.formData.timeValue[0] : '',
            "inboundTimeTo": self.formData.timeValue ? self.formData.timeValue[1] : '',
            "birthTimeFrom": self.formData.birthTime ? self.formData.birthTime[0] : '',
            "birthTimeTo": self.formData.birthTime ? self.formData.birthTime[1] : '',
            "warehouseType": self.$route.query.code || self.formData.warehouseType,
            "pageNum": self.tableData.currentPage,
            "pageSize": self.tableData.pageSize,
          }
        } else{
          p = {
            "vinList": getSplitString(self.formData.vinList),
            "type": self.formData.type,
            "category": self.formData.category,
            "driveMode": self.formData.driveMode,
            "typeLevel": self.formData.typeLevel,
            "salesArea": self.formData.salesArea,
            "color": self.formData.color,
            "functionalZone": self.formData.functionalZone,
            "pointLocation": self.formData.pointLocation,
            "inboundTimeFrom": self.formData.timeValue ? self.formData.timeValue[0] : '',
            "inboundTimeTo": self.formData.timeValue ? self.formData.timeValue[1] : '',
            "birthTimeFrom": self.formData.birthTime ? self.formData.birthTime[0] : '',
            "birthTimeTo": self.formData.birthTime ? self.formData.birthTime[1] : '',
            "warehouseType": self.$route.query.code || self.formData.warehouseType,
            "pageNum": self.tableData.currentPage,
            "pageSize": self.tableData.pageSize,
          }
        }
        loadInventoryDetail(p).then(res => {
          self.tableData.listData = res.repData.list;
          self.tableData.total = res.repData.total;
        })
      },
      reset(){
        this.resetForm(this.formData);
      },
// --------------table-------------------
      handleExport(){
        let self = this;
        let p;
        if(this.selectRows.length){
          let arr = [];
          this.selectRows.forEach((item) => {
            arr.push(item.id);
          })
          p = {
            "ids": arr,
          }
        }else{
          p = {
            "vinList": getSplitString(self.formData.vinList),
            "type": self.formData.type,
            "category": self.formData.category,
            "driveMode": self.formData.driveMode,
            "typeLevel": self.formData.typeLevel,
            "salesArea": self.formData.salesArea,
            "color": self.formData.color,
            "functionalZone": self.formData.functionalZone,
            "pointLocation": self.formData.pointLocation,
            "inboundTimeFrom": self.formData.timeValue ? self.formData.timeValue[0] : '',
            "inboundTimeTo": self.formData.timeValue ? self.formData.timeValue[1] : '',
            "birthTimeFrom": self.formData.birthTime ? self.formData.birthTime[0] : '',
            "birthTimeTo": self.formData.birthTime ? self.formData.birthTime[1] : '',
            "warehouseType": self.$route.query.code || self.formData.warehouseType,
          }
        }
        exportInventoryDetail(p).then(res => {
          res && res.success && (window.location.href = res.repData)
        })
      },
    },
    created() {
      if(this.$route.query.vin){
        this.searchVin = true;
        this.loadData()
      }
      else {
        this.loadData()
      }
    },
    beforeDestroy(){
    }
  }
</script>

<style lang="less">
</style>
