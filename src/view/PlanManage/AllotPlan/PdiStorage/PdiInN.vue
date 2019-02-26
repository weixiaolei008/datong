<!--PDI车辆返修入库计划 (未创建)-->
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
            <label class="input-label">通知提车时间</label>
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
        <div @click="handleCreate('currentWarehouseId')" class="btn-add"><span class="img-add">执行计划</span></div>
        <!--<div class="btn-del" @click="handleDel"><span class="img-del">删除</span></div>-->
        <!--<UploadExcel @handle-success="importSuccess"></UploadExcel>-->
      </div>
    </el-header>
    <el-main class="table" style='padding: 10px;'>
      <Table :data='tableData'
             @handleLook="handleLook"
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
            disabled
            placeholder="请输入VIN码"
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
    <!--附件详情-->
    <el-dialog title="附件详情" :visible.sync="popAddVisible1" align="center">
      <img style="width:32%;margin-left: 0.5%" :width="imgWidth" :src="item" alt="" v-for="item in attachment">
    </el-dialog>
  </el-container>
</template>

<script>
  import Table from "@/components/Table"
  import {loadPdiInList,loadPdiInDelete,loadPdiInNCreatInWarehouseForIn,loadPdiInExportIn} from "@/common/config/api/PlanManage"
  import {loadDicValList} from "@/common/config/api/basic"
  import {getSplitString,w200,w120}from "@/common/config/utils"
  import {loadRefresh, creatWarehouse, delPlan} from '../PlanJs/mixIn'
  import UploadExcel from "@/components/UploadExcel"

  export default {
    name: "PdiInY",
    mixins: [loadRefresh, creatWarehouse, delPlan],
    components: {
      Table,
      UploadExcel
    },
    data() {
      return {
        isSaveFlag: true,
        pop: false, //弹框
        popAddVisible: false,
        popAddVisible1: false,
        attachment: [],
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
              name: "通知提车时间",
              value: 'commandDate',
              width: '180'
            }
          ],
          operations: [
            {
              label: '附件',
              width: '80',
              data: [
                {
                  icon: 'icon-eye',
                  Fun: 'handleLook',
                  id: '1',
                }

              ]
            }
          ],
        },
        //查询
        formData: {
          category: '', //车辆种类 ,
          color: '', //颜色 ,
          commandDate: '', //通知提车时间 ,
          currentWarehouseId: '', //当前仓库 ,
          driveMode: '', //驱动方式 ,
          isOverdue: '', //是否超期 ,
          pointLocation: '', //点位信息 ,
          salesArea: '', //销售区域 ,
          status: '', //计划状态 1:未执行2:执行中3:已执行4:终止5:暂停 ,
          typeLevel: '', //车型级 ,
          type: '', //车型 ,
          vin: '' //车辆VIN
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
      //查看附件
      handleLook(data) {
        this.attachment = data.row.attachment;
        if(!this.attachment){
          this.msgInfo('暂无附件');
          return
        }
        else{
          this.attachment = this.attachment.split('¥');
        }
        this.popAddVisible1 = true;
      },
      /*//////////////////////////////////////////////////////////////////*/
      //列表接口
      loadDataList() {
        let self = this;
        let p = {
          pageNum: self.tableData.currentPage,
          pageSize: 30,
          listType: 5, //列表类型 1 出库 2 入库 3 库内 4 出库预计划 5 入库预计划 6 库内预计划 ,
          vin: getSplitString(self.formData.vin), //VIN码
          type: self.formData.type, //车型
          typeLevel: self.formData.typeLevel, //车型级
          category: self.formData.category, //车辆种类
          color: self.formData.color, //颜色
          salesArea: self.formData.salesArea, //销售区域
          driveMode: self.formData.driveMode, //驱动方式
          pointLocation: self.formData.pointLocation, //点位信息
          currentWarehouseId: self.formData.currentWarehouseId, //当前仓库
          commondStartDate : self.formData.commandDate !== null ? self.formData.commandDate[0] : '', //通知提车开始时间
          commondEndDate: self.formData.commandDate !== null ? self.formData.commandDate[1] : '', //通知提车结束时间
          status: self.formData.status, //状态
          isOverdue: self.formData.isOverdue //是否超期
        }
        loadPdiInList(p).then(res => {
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
          "path": res,
          "type": 57, //计划类型 47 PDI返修库内预计划 56 pdi返修出库预计划 57 pdi返修入库预计划
        }
        loadPdiInExportIn(p).then(res => {
          res && res.success && self.msgInfo(res.repMsg);
          self.loadDataList();
        })
      },
      //删除接口
      handleDelData(){
        if(!this.selectRows.length) {
          this.msgInfo('至少勾选一条数据');
          return;
        }
        let self = this;
        let p;
        let arr = [];
        if(self.selectRows.length){
          self.selectRows.forEach((item) => {
            arr.push(item.ttPlanPdiId);
          })
          p = {
            "ids": arr,//勾选时导出的列表
          }
        }
        loadPdiInDelete(p).then(res => {
          res && res.success && self.msgInfo(res.repData);
          this.loadDataList();
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
            arr.push(item.ttPlanPdiId);
          })
          let p = {
            "listType": 5,
            "ids": arr,
            "transportWay" :self.createPlanData.transportWay
          }
          loadPdiInNCreatInWarehouseForIn(p).then(res => {
            res && res.success && self.msgInfo(res.repData);
            self.popAddVisible = false;
            self.loadDataList();
          })
        }
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
      },
      imgWidth: {
        get(){
          let len = this.attachment.length
          return 98.5/len + '%';
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



