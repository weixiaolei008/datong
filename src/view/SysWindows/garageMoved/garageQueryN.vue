<!--系统窗口／氢能源窗口／氢能源计划(接收车辆)-->
<template>
  <el-container style="width: 100%;height: 100%;">
    <el-header style="height: auto; padding: 0;">
      <!-- search-group -->
      <div is="fromSearch" :data="dataFm" @searchChange="gaeLoadList"></div>
      <!-- btn-group -->
      <div class="btn-group clearfix">
        <div class="btn-add" @click="addSvoConBtn"><span class="img-add">创建计划</span></div>
        <div class="btn-receive" @click="receiveCarBtn"><span class="img-receive">接收车辆</span></div>
        <div class="btn-del" @click="deltFactory"><span class="img-del">删除</span></div>
        <UploadExcel @handle-success="importExcal"></UploadExcel>
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
    <!--创建弹框-->
    <el-dialog
      :title="ageTitle"
      :visible.sync="gaeDialogVisible"
      width="600px">
      <div class="search-group clearfix" id="dialog-div">
        <div class="input-box">
          <label class="input-label"><span>*</span>申请部门</label>
          <el-input placeholder="申请部门" :maxlength="10" v-model="editDialogFrom.applyDept"></el-input>
        </div>
        <div class="input-box">
          <label class="input-label"><span>*</span>申请人</label>
          <el-input placeholder="申请人" :maxlength="5" v-model="editDialogFrom.applicant"></el-input>
        </div>
        <div class="input-box">
          <label class="input-label"><span>*</span>联系方式</label>
          <el-input placeholder="联系方式" :maxlength="20" v-model="editDialogFrom.contactWay"></el-input>
        </div>
        <div class="input-box">
          <label class="input-label"><span>*</span>库改内容</label>
          <el-input type="textarea" :rows="2" placeholder="请输入库改内容" :maxlength="50" v-model="editDialogFrom.changeContent" > </el-input>
        </div>
        <div class="input-box">
          <label class="input-label"><span>*</span>VIN码</label>
          <el-input type="textarea" :rows="2" placeholder="请输入VIN码" v-model="editDialogFrom.vin" > </el-input>
        </div>
        <div class="input-box">
          <!-- <span>上传附件</span> -->
          <label class="input-label" style="margin-top: 65px;">上传附件</label>
          <div class='clearfix' style="margin-left: 115px; position: relative; ">
            <div style="float: left; width: 40%;">
              <UploadImg @handle-success="importSuccess" style="position: relative;z-index: 999;" ></UploadImg>
            </div>
            <img lt="" :src="imageUrl" style="width: 50%; display: inline-block; margin-left: 30px;" />
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="svoVisibleConfirm">保存</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
  import Table from "@/components/Table"
  import FromSearch from "../FromSearch"
  import UploadImg from "@/components/UploadImg"
  import UploadExcel from "@/components/UploadExcel"
  import { getSplitString, timestampToTime, confirmPop }from "@/common/config/utils"
  import {garaQuSelectApi,garaQuUpdateApi, garaQuInsertApi, garaQuReceiveCartApi, garaQuDeleteApi, garaQuExportWindowApi, garaQuImportWindowApi, uploadImg} from "@/common/config/api/SysWindows"
  export default {
    name: "garageQueryN",
    components: { Table, FromSearch, UploadExcel, UploadImg},
    data() {
      return {
        pop: false,
        currentPage: 1,
        pageSizeNum: 30,
        tableSelectId: [],//表格选中的数据
        active: '',
        ageTitle: '',
        gaeDialogVisible: false,
        addVins: '',
        fileList: [],
        imageUrl: null,
        imgShow: true,
        //搜索
        dataFm: {
          pop: false,
          status: 1,
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
            commandDate: [],
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
              label: '当前仓库',
              type: 'select',
              value: 'origWarehouseId'
            },
            {
              label: '车型级',
              type: 'select',
              value: 'typeLevel'
            },
            {
              label: '状态',
              type: 'select',
              value: 'status'
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
        //创建/修改
        editDialogFrom: {
          applyDept: null,//申请部门 ,
          applicant: null,//申请人
          contactWay: null, //联系方式 ,
          changeContent: null,//库改内容
          vin: null,
          imgVal: null
        },
        isSaveflag: true,
        tableData: {
          selectShow: true,
          tableHeight: 0,
          currentPage: 1,
          total: 0, //列表总数
          listData: [],
          tableHead: [
            {
              name: "库改内容",
              value: 'changeContent',
              width: '200'
            },
            {
              name: "申请部门",
              value: 'applyDept',
            },
            {
              name: "VIN号",
              value: 'vin',
              width: '200'
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
              width: '140',
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
              width: '150'
            },
            {
              name: "当前仓库",
              value: 'currentWarehouseId',
            },
            {
              name: "申请人",
              value: 'applicant',
            },
            {
              name: "指令下达时间",
              value: 'commandDate',
              width: '200',
              formatter:  function(row) {
                return row.commandDate ? timestampToTime(row.commandDate) : null;
              }
            },
            {
              name: "状态",
              value: 'status',
            }
          ],
        }
      }
    },
    methods: {
      deleteImg() {
        this.imageUrl = '';
      },
      importSuccess(url) {
        this.imageUrl = url;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.gaeLoadList();
      },
      handleSelectionChange(val) {
        this.tableSelectId = val;
      },
      //创建/编辑——保存
      svoVisibleConfirm(){
        if((this.editDialogFrom.applyDept && !this.editDialogFrom.applyDept.trim()) || (this.editDialogFrom.applicant && !this.editDialogFrom.applicant.trim()) || (this.editDialogFrom.contactWay && !this.editDialogFrom.contactWay.trim()) || (this.editDialogFrom.changeContent && !this.editDialogFrom.changeContent.trim()) || (this.editDialogFrom.vin && !this.editDialogFrom.vin.trim())) {
          this.feedMessage('warning', '请填写完整信息！');
          return false;
        }
        if(this.isSaveflag) {
          this.isSaveflag = false;
          setTimeout(() => {
            this.isSaveflag = true;
          },2000)
          let idd = this.checkedChange(10);
          let p = {
            applyDept: this.editDialogFrom.applyDept,//申请部门 ,
            applicant: this.editDialogFrom.applicant,//申请人
            contactWay: this.editDialogFrom.contactWay, //联系方式 ,
            changeContent: this.editDialogFrom.changeContent,//库改内容
            vin: this.editDialogFrom.vin.split(','),
            windowType: 1,
            id: idd ? idd[0]: null,
            enclosure: this.imageUrl
          }
          let api;
          idd.length > 0 ? api = garaQuUpdateApi : api = garaQuInsertApi;
          api(p).then(res => {
            this.feedMessage('warning', res.repData);
            this.gaeLoadList();
            this.gaeDialogVisible = false;
          })
        }
      },
       //创建or编辑
      addSvoConBtn() {
        if(this.tableSelectId.length > 1) {
          this.feedMessage('warning','不能同时编辑多条');
          return false;
        }
        if(this.checkedChange(10)){
          if(this.tableSelectId.length == 1){
            this.editDialogFrom = {
              applyDept: this.tableSelectId[0].applyDept,//申请部门 ,
              applicant: this.tableSelectId[0].applicant,//申请人
              contactWay: this.tableSelectId[0].contactWay, //联系方式 ,
              changeContent: this.tableSelectId[0].changeContent,//库改内容
              vin: this.tableSelectId[0].vin
            }
            this.imageUrl = this.tableSelectId[0].enclosure;
          }else{
            this.editDialogFrom = {
              applyDept: null,//申请部门 ,
              applicant: null,//申请人
              contactWay: null, //联系方式 ,
              changeContent: null,//库改内容
              vin: null,
            }
            this.imageUrl = '';
          }
          this.gaeDialogVisible = true;
        }
      },
      //表格选中数据
      checkedChange(num) {
        if(num != 10 && this.tableSelectId.length < 1) {
          this.feedMessage('warning','请选择数据！');
          return false;
        }
        let sstatusL = false;
        let ids = [];
        if(this.tableSelectId.length > 0) {
          this.tableSelectId.map((item, index) => {
            if(num == 3 && item.status != '已执行'){
              sstatusL = true;
              this.feedMessage('warning','不是已执行的状态不能更新操作！');
              return false;
            }else if(num != 3 &&  item.status != '待执行'){//1:待执行2:已执行3:已执行
              sstatusL = true;
              this.feedMessage('warning','不是待执行的状态不能更新操作！');
              return false;
            }
            ids.push(item.ttWindowRefitcarId);
          })
        }
        console.log(ids, 'ids---');
        return sstatusL ? false : ids;
      },
      //接收车辆
      receiveCarBtn() {
        if(this.checkedChange('3')){
          confirmPop('确定接收车辆', () => {
            garaQuReceiveCartApi({ids: this.checkedChange('3')}).then(res => {
              this.gaeLoadList();
              this.feedMessage('warning', res.repData)
            })
          })
        }
      },
      //删除
      deltFactory() {
        if(this.checkedChange()){
          confirmPop('确认删除', () => {
            garaQuDeleteApi({ids: this.checkedChange()}).then(res => {
              this.feedMessage('warning',res.repData);
              this.gaeLoadList()
            })
          })
        }
      },
      fromVal(num) {
        let self = this;
        var p = {
          pageNum: this.currentPage,
          pageRows: this.pageSizeNum,
          windowType: 1,
          category: self.dataFm.formData.category,//车辆种类
          color: self.dataFm.formData.color,
          driveMode: self.dataFm.formData.driveMode,//驱动方式
          currentWarehouseId: self.dataFm.formData.origWarehouseId,//始发仓库
          pointLocation: self.dataFm.formData.pointLocation,//点位信息
          salesArea: self.dataFm.formData.salesArea,//销售区域
          status: self.dataFm.formData.status,//窗口状态 1:待执行2:已执行3:已执行
          typeLevel: self.dataFm.formData.typeLevel,//车型级
          carType: self.dataFm.formData.vehicleType,//车型
          vin: self.dataFm.formData.vin ? getSplitString(self.dataFm.formData.vin) : null,
          startCommandDate: self.dataFm.formData.commandDate ? self.dataFm.formData.commandDate[0] : null,
          endCommandDate: self.dataFm.formData.commandDate ? self.dataFm.formData.commandDate[1] : null,
        }
        if(num == 2) {
          let arr = [];
          if(this.tableSelectId.length > 0){
            this.tableSelectId.forEach((item) => {
              arr.push(item.ttWindowRefitcarId);
            })
          }
          p.id = arr.length > 0 ? arr : null;
        }
        return p;
      },
      //列表
      gaeLoadList(){
       garaQuSelectApi(this.fromVal(1)).then(res => {
        if(res.repData) {
          this.tableData.listData    = res.repData.list;
          this.tableData.total       = res.repData.total;
        }
       })
      },
      exportBtn() {
        garaQuExportWindowApi(this.fromVal(2)).then(res => {
          if(res.repData){
            window.location.href = res.repData;
          }
        })
      },
      importExcal(res) {
        let p = {
          "filePath": res,
          type: 1,
        }
        garaQuImportWindowApi(p).then(res => {
          res.repData && this.feedMessage('warning',res.repData);
          this.gaeLoadList();
        })
      }
    },
    created() {
      this.gaeLoadList();
    }
  }
</script>

<style lang="less">
  #dialog-div {
    padding: 0 20px;
    .input-box {
      label {
        width: 100px;
        text-align: left;
      }
      width: 100%;
      input, textarea {
        width: 400px;
      }
    }
  }
</style>