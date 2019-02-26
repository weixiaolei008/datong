<!--批量车辆返修计划（接收车辆）-->
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
                  v-for="option in options.window_status"
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
              v-model="formData.sendCommandDate"
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
        <div @click="createPlant" class="btn-add"><span class="img-add">创建计划</span></div>
        <div @click="handleConfirmCar" class="btn-receive"><span class="img-receive">接收车辆</span></div>
        <div @click="handleDel" class="btn-del"><span class="img-del">删除</span></div>
        <UploadExcel @handle-success="importSuccess"></UploadExcel>
        <div @click="handleExport" class="btn-export"><span class="img-extend">导出</span></div>
      </div>
    </el-header>
    <!--table-->
    <el-main class="table" style="padding: 10px 10px 0 10px;">
      <Table :data='tableData'
             @selection-change="handleSelectionChange"
             @current-change="handleCurrentChange">
      </Table>
    </el-main>
    <!--创建计划弹框-->
    <el-dialog title="创建计划信息" :visible.sync="popAddVisible" :close-on-click-modal="false" width="680px" align="center">
      <div class="clearfix">
        <div class="input-box">
          <label class="input-label">申请部门</label>
          <el-input placeholder="请输入申请部门" clearable v-model="createPlanData.applicationDivision"></el-input>
        </div>
        <div class="input-box">
          <label class="input-label">申请人</label>
          <el-input placeholder="请输入申请人" clearable v-model="createPlanData.proposer"></el-input>
        </div>
        <div class="input-box">
          <label class="input-label">联系方式</label>
          <el-input placeholder="请输入联系方式" clearable v-model="createPlanData.contactWay" :maxlength="11"></el-input>
        </div>
        <div class="input-box">
          <label class="input-label"><span>*</span>返修地点</label>
          <el-select v-model="createPlanData.repairSiteCode" placeholder="请选择返修地点">
            <el-option
              v-for="option in options.repair_site"
              :key="option.code"
              :label="option.name"
              :value="option.code">
            </el-option>
          </el-select>
        </div>
        <div class="input-box">
          <label class="input-label">返修内容</label>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入返修内容"
            v-model="createPlanData.problem">
          </el-input>
        </div>
        <div class="input-box">
          <label class="input-label"><span>*</span>VIN码</label>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入VIN码"
            v-model="createPlanData.vin">
          </el-input>
        </div>
        <div class="search-box" style="float: left">
          <!--<div class="btn-receive" style="margin-left: 50px;background: #fff;border-color: #00CC99;color: #00CC99;border: 1px solid #00CC99">-->
          <ImgUpload @handle-success="ImgUpload"></ImgUpload>
          <!--</div>-->
        </div>
      </div>
      <div slot="footer" class="dialog-footer" style="margin-top: -20px" align="center">
        <el-button plain style="background: #fff;border-color: #67A0FF;color: #67A0FF" @click="cancleBack">返回</el-button>
        <el-button type="primary" @click="saveCreateData">保存</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
  import Table from "@/components/Table"
  import {loadBatchPlanList,loadBatchAdd,loadBatchPlanExportWindow,loadBatchPlanReceiveCar,loadBatchDelete,loadBatchPlanExportInWindow} from "@/common/config/api/SysWindows"
  import {loadDicValList} from "@/common/config/api/basic"
  import {getSplitString,confirmPop,exportFile,w200,w120}from "@/common/config/utils"
  import UploadExcel from "@/components/UploadExcel"
  import ImgUpload from "@/components/ImgUpload"

  export default {
    name: "BatchPlanR",
    components: {
      Table,
      UploadExcel,
      ImgUpload
    },
    data() {
      return {
        isSaveFlag: true,
        tabIndex: 0,
        // isEdit: false, //是否编辑
        pop: false, //弹框
        popAddVisible: false,
        selectRows: [],
        receiveCarVisible: false, //接收车辆
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
              name: "申请人",
              value: 'proposer'
            },
            {
              name: "指令下达时间",
              value: 'sendCommandDate',
              width: '180'
            },
            {
              name: "状态",
              value: 'status'
            }
          ]
        },
        formData: {
          vin: '', // vin码
          type: '', //车型
          typeLevel: '', //车型级
          category: '', //车辆种类
          color: '', //颜色
          sendCommandDate: '', //指令下达时间 yyyy-mm-dd hh-mm-ss
          currentWarehouseId: '', //当前仓库
          driveMode: '', //驱动方式
          pointLocation: '', //点位信息
          salesArea: '', //销售区域
          status: '', //计划状态 1:未执行2:执行中3:已执行
        },
        createPlanData: {
          vin: '',
          proposer: '', // 申请人
          applicationDivision: '', // 申请部门
          problem: '', //返修内容
          contactWay: '', //联系方式
          repairSiteCode: '', //返修地点
          attachment: '', //附件
        },
      }
    },
    methods: {
      //上传附件img
      ImgUpload(res){
        this.createPlanData.attachment = res;
        this.$message({
          type: 'success',
          message: '上传成功!'
        });
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
      //删除
      handleDel(){
        if(this.selectRows.length == 0){
          this.msgError('请至少勾选一条数据');
          return;
        }
        confirmPop('确认删除',this.handleDelData)
      },
      //创建计划
      createPlant(){
        if(this.selectRows.length > 1){
          this.msgInfo('不能同时编辑多条');
          return
        }
        if(this.selectRows.length == 1){
          //判断选中状态是否符合条件
          if(this.selectRows[0].status !== '待执行'){
            this.msgInfo('状态为待执行才能进行操作');
            return
          }

          this.createPlanData = Object.assign({},this.selectRows[0])
          console.log(this.createPlanData);
        }else{
          this.resetForm(this.createPlanData)
        }
        this.popAddVisible = true;
      },
      cancleBack(){
        this.popAddVisible = false;
      },
//-------------------------table-------------------
      handleSelectionChange(val) {
        this.selectRows = val;
      },
      handleCurrentChange(val) {
        this.tableData.currentPage = val;
        this.loadDataList();
      },
      //确认收车
      handleConfirmCar(){
        let self = this;
        if(!this.selectRows.length) {
          this.msgInfo('至少勾选一条数据');
          return;
        }
        //判断选中状态是否符合条件
        let statusBool = this.selectRows.some((item) => {
          return item.status !== '已执行';
        })
        if(statusBool){
          this.msgInfo('状态为已执行才能确认收车');
          return
        }
        confirmPop('请确认收车',this.handleConfirmCarData)
      },
      /*//////////////////////////////////////////////////////////////////*/
      //导出接口
      handleExport(val){
        let self = this;
        let p;
        if(self.selectRows.length){
          let arr = [];
          self.selectRows.forEach((item) => {
            arr.push(item.ttWindowPdiId);
          })
          p = {
            "ids": arr,//勾选时导出的列表
            "listType": 1
          }
        }else{
          p = {
            listType:1, //列表类型 1 接收 2 送还 3 历史
            vin: getSplitString(self.formData.vin), //VIN码
            typeLevel: self.formData.typeLevel, // 车型级
            type: self.formData.type, //车型
            category: self.formData.category, //车辆种类
            color: self.formData.color, //颜色
            driveMode: self.formData.driveMode, //驱动方式
            commondStartDate: self.formData.sendCommandDate !== null ? self.formData.sendCommandDate[0] : '', //指令下达开始时间
            commondEndDate: self.formData.sendCommandDate !== null ? self.formData.sendCommandDate[1] : '', //指令下达开始时间
            isOverdue: self.formData.isOverdue, //是否逾期 0:正常,:逾期
            currentWarehouseId: self.formData.currentWarehouseId, //当前仓库ID
            salesArea: self.formData.salesArea, //销售区域
            status: self.formData.status //窗口状态 1:待执行2:已执行3:已结束
          }
        }
        loadBatchPlanExportWindow(p).then(res => {
          res && res.success && (window.location.href = res.repData)
        })
      },
      //导入接口
      importSuccess(res){
        let self = this;
        let p = {
          "filePath": res,
          "type": 1, //窗口类型: 1:接收车辆 2:通知提车
        }
        loadBatchPlanExportInWindow(p).then(res => {
          res && res.success && self.msgInfo(res.repData);
          this.loadDataList();
        })
      },
      //列表接口
      loadDataList() {
        let self = this;
        let p = {
          pageNum: self.tableData.currentPage,
          pageSize: 30,
          listType:1, //列表类型 1 接收 2 送还 3 历史 ,
          vin: getSplitString(self.formData.vin), //VIN码
          typeLevel: self.formData.typeLevel, // 车型级
          type: self.formData.type, //车型
          category: self.formData.category, //车辆种类
          color: self.formData.color, //颜色
          driveMode: self.formData.driveMode, //驱动方式
          commondStartDate: self.formData.sendCommandDate !== null ? self.formData.sendCommandDate[0] : '', //指令下达开始时间
          commondEndDate: self.formData.sendCommandDate !== null ? self.formData.sendCommandDate[1] : '', //指令下达开始时间
          isOverdue: self.formData.isOverdue, //是否逾期 0:正常,:逾期
          currentWarehouseId: self.formData.currentWarehouseId, //当前仓库ID
          pointLocation: self.formData.pointLocation, //点位信息
          salesArea: self.formData.salesArea, //销售区域
          status: self.formData.status //窗口状态 1:待执行2:已执行3:已结束
        }
        loadBatchPlanList(p).then(res => {
          if(res&&res.repData){
            self.tableData.listData = res.repData.list;
            self.tableData.total = res.repData.total;

          }
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
          if(!self.createPlanData.repairSiteCode){
            self.msgInfo('请输入返修地点')
            return
          }
          if(self.createPlanData.contactWay){
            let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
            let phTrim = self.createPlanData.contactWay.replace(/(^\s*)|(\s*$)/g, "");
            if(phTrim && !reg.test(phTrim)) {
              self.msgInfo('请输入正确的联系电话');
              return;
            }
          }
          if(!self.createPlanData.vin){
            self.msgInfo('请输入VIN码')
            return
          }
          if(!self.createPlanData.attachment){
            self.msgInfo('请上传附件')
            return
          }
          let p;
          let arr = [];
          this.selectRows.forEach((item) => {
            arr.push(item.ttWindowPdiId);
          })
          p = {
            type: self.createPlanData.repairSiteCode,
            ids: arr,
            proposer :self.createPlanData.proposer, // 申请人
            applicationDivision: self.createPlanData.applicationDivision, // 申请部门
            problem :self.createPlanData.problem, // 返修内容
            contactWay: self.createPlanData.contactWay, // 联系方式
            repairSite :self.createPlanData.repairSiteCode, // 返修地点
            vin: getSplitString(self.createPlanData.vin), //VIN码
            attachment: self.createPlanData.attachment, //附件
          }
          loadBatchAdd(p).then(res => {
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
            arr.push(item.ttWindowPdiId);
          })
          p = {
            "ids": arr,//勾选时导出的列表
          }
        }
        loadBatchDelete(p).then(res => {
          res && res.success && self.msgInfo(res.repData);
          this.loadDataList();
        })
      },
      //确认收车接口
      handleConfirmCarData(){
        let self = this;
        let arr = [];
        self.selectRows.forEach((item) =>{
          arr.push(item.ttWindowPdiId)
        })
        let p = {
          "ids": arr
        }
        loadBatchPlanReceiveCar(p).then(res =>{
          res && res.success && self.msgInfo(res.repData);
          self.loadDataList();
        })
      }
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


