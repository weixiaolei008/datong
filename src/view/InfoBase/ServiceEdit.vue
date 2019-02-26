<!--库位管理-->
<template>
  <el-container style="width: 100%;height: 100%;">
    <el-main class="table" style='padding: 10px;'>
      <!--服务商信息-->
      <div>
        <div class="title-group">
          <div class="icon-title img-title">服务商信息</div>
        </div>
        <div class="search-group clearfix" style="padding: 20px 10px 0 0">
          <div class="input-box">
            <label class="input-label"><span>*</span>服务商名称</label>
            <el-input placeholder="请输入服务商名称" clearable v-model="formData.serviceProviderName" :disabled="isDisabled" :maxlength="50"></el-input>
          </div>
          <div class="input-box">
            <label class="input-label">营业执照编号</label>
            <el-input placeholder="请输入营业执照编号" clearable v-model="formData.businessLicenseNo" :disabled="isDisabled"></el-input>
          </div>
          <div class="search-box" style="float: left">
            <el-upload
              :action="url"
              :data="headers"
              list-type="picture"
              :show-file-list="false"
              :on-success="handleSuccess"
              accept=".jpg,.png,.bmp,.jpeg"
              :before-upload="beforeAvatarUpload"
            >
              <div class="btn-receive" style="background: #fff;border-color: #00CC99;color: #00CC99;border: 1px solid #00CC99;margin-left: 98px">
                <span class="icon-upload" style="background-position:10px">上传附件</span>
              </div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png/bmp/jpeg文件</div>
            </el-upload>
            <span @click="look" style="margin-left:10px;cursor: pointer;display: inline-block;margin-top: 10px;color: rgb(0, 204, 153);font-size: 14px"> 查看</span>
          </div>
        </div>
        <div class="search-group clearfix" style="border-bottom: 2px solid #eee;padding: 0">
          <div class="input-box">
            <label class="input-label">省/直辖市</label>
            <el-select v-model="formData.province" placeholder="请选择省/直辖市" :disabled="isDisabled" @change="provinceChange">
              <el-option
                :disabled="isDisabled"
                v-for="item in options.regioProvinceList"
                :key="item.tsRegionId"
                :label="item.regionName"
                :value="item.tsRegionId">
              </el-option>
            </el-select>
          </div>
          <div class="input-box">
            <label class="input-label">市</label>
            <el-select v-model="formData.city" placeholder="请选择市" :disabled="isDisabled">
              <el-option
                v-for="item in options.regioCityList"
                :key="item.tsRegionId"
                :label="item.regionName"
                :value="item.tsRegionId">
              </el-option>
            </el-select>
          </div>
          <div class="input-box">
            <label class="input-label">地址</label>
            <el-input placeholder="请输入地址" clearable v-model="formData.address" :disabled="isDisabled"></el-input>
          </div>
          <div class="input-box">
            <label class="input-label">联系电话</label>
            <el-input placeholder="请输入联系电话" clearable v-model="formData.contactPhone" :disabled="isDisabled" :maxlength="20"></el-input>
          </div>
          <div class="input-box">
            <label class="input-label">邮编</label>
            <el-input placeholder="请输入邮编" clearable v-model="formData.postCode" :disabled="isDisabled"></el-input>
          </div>
          <div class="input-box">
            <label class="input-label">在册车辆数</label>
            <el-input placeholder="请输入在册车辆数" clearable v-model="formData.vehicleAmount" :disabled="isDisabled"></el-input>
          </div>
          <div class="input-box">
            <label class="input-label">联系人</label>
            <el-input placeholder="请输入联系人" clearable v-model="formData.contactName" :disabled="isDisabled"></el-input>
          </div>
          <div class="input-box">
            <label class="input-label">成立时间</label>
            <el-date-picker
              :disabled="isDisabled"
              v-model="formData.foundDate"
              :picker-options="pickerOptions"
              placeholder="选择日期时间"
              type="date">
            </el-date-picker>
          </div>
        </div>
      </div>
      <!--资质登记-->
      <div class="clearfix">
        <div class="title-group" style="padding: 20px 0">
          <div class="icon-title img-title">资质登记</div>
          <div class="search-box">
            <div @click="handleAdd1" class="btn-add" v-show="!isDisabled"><span class="img-add">新增</span></div>
          </div>
        </div>
        <!--资质登记表格-->
        <el-table
          ref="multipleTable"
          :data="carrierTableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            prop="type"
            :formatter="cFormatter"
            label="资质种类"
            align="center">
          </el-table-column>
          <el-table-column
            prop="registrationNo"
            label="注册登记号"
            align="center">
          </el-table-column>
          <el-table-column
            prop="address"
            width="150"
            align="center"
            label="操作"
            >
            <template slot-scope="scope">
              <i class="icon-edit" @click="handleEdit1(scope.$index,scope.row)" style="display: inline-block;width:20px;height:40px" v-if="!isDisabled"></i>
              <i class="icon-del" @click="handleDel1(scope.$index,scope.row)" style="display: inline-block;width:20px;height:40px" v-if="!isDisabled"></i>
              <span @click="handleUpload(scope.$index)" style="display: inline-block;width:20px;height:40px">
                <el-upload
                  style="width: 20px;height: 40px;"
                  :action="url"
                  :data="headers"
                  list-type="picture"
                  :show-file-list="false"
                  :on-success="handleSuccess2"
                  accept=".jpg,.png,.bmp,.jpeg"
                  :before-upload="beforeAvatarUpload"
                >
                <i class="icon-upload" style="display: inline-block;width:20px;height:40px" v-if="!isDisabled"></i>
              </el-upload>
              </span>
              <i class="icon-eye" @click="accessoryLook(scope.row)" style="display: inline-block;width:20px;height:40px"></i>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <div class="title-group" style="padding: 20px 0">
          <div class="icon-title img-title">运力信息</div>
          <div class="search-box" v-show="!isDisabled">
            <div @click="handleAdd2" class="btn-add"><span class="img-add">新增</span></div>
          </div>
        </div>
        <!--运力信息表格-->
        <el-table
          ref="multipleTable"
          :data="infoTableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            prop="vehicleName"
            label="车辆名称"
            align="center">
          </el-table-column>
          <el-table-column
            prop="vehicleType"
            label="车辆类型"
            align="center">
          </el-table-column>
          <el-table-column
            prop="loadWeight"
            label="载重重量"
            align="center">
          </el-table-column>
          <el-table-column
            prop="loadVolume"
            label="载重体积"
            align="center">
          </el-table-column>
          <el-table-column
            prop="vehicleAmount"
            label="数量"
            align="center">
          </el-table-column>
          <el-table-column
            prop="vehicleLength"
            label="车长"
            align="center">
          </el-table-column>
          <el-table-column
            prop="address"
            width="100"
            align="center"
            label="操作"
            v-if="!isDisabled">
            <template slot-scope="scope">
              <i class="icon-edit" @click="handleEdit2(scope.$index,scope.row)" style="display: inline-block;width:20px;height:40px"></i>
              <i class="icon-del" @click="handleDel2(scope.$index,scope.row)" style="display: inline-block;width:20px;height:40px"></i>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="text-align: center;padding: 50px 0">
        <el-button plain style="background: #fff;border-color: #67A0FF;color: #67A0FF" @click="backUp">返回</el-button>
        <el-button type="primary" @click="serviceEditSave" v-show="!isDisabled">保存</el-button>
      </div>
    </el-main>
    <!--新增1-->
    <el-dialog title="新增" :visible.sync="popAddVisible1" :close-on-click-modal="false" width="380px" align="center">
      <div class="clearfix">
        <div class="input-box">
          <label class="input-label"><span>*</span>资质种类</label>
          <el-select v-model="addData1.type" placeholder="请选择资质种类">
            <el-option
              v-for="item in options.aptitudeTypeList"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </div>
        <div class="input-box">
          <label class="input-label">注册登记号</label>
          <el-input placeholder="请输入注册登记号" clearable v-model="addData1.registrationNo" :maxlength="32"></el-input>
        </div>
      </div>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button plain style="background: #fff;border-color: #67A0FF;color: #67A0FF" @click="addCancle1">返回</el-button>
        <el-button  type="primary" @click="carriertSave">保存</el-button>
      </div>
    </el-dialog>
    <!--新增2-->
    <el-dialog title="新增" :visible.sync="popAddVisible2" :close-on-click-modal="false" width="680px" align="center">
      <div class="clearfix">
        <div class="input-box">
          <label class="input-label">车辆名称</label>
          <el-input placeholder="请输入车辆名称" clearable v-model="addData2.vehicleName" :maxlength="10"></el-input>
        </div>
        <div class="input-box">
          <label class="input-label"><span>*</span>车辆类型</label>
          <el-input placeholder="请输入车辆类型" clearable v-model="addData2.vehicleType" :maxlength="20"></el-input>
        </div>
        <div class="input-box">
          <label class="input-label">载重重量</label>
          <el-input placeholder="请输入载重重量" clearable v-model="addData2.loadWeight" :maxlength="10"></el-input>
        </div>
        <div class="input-box">
          <label class="input-label">载重体积</label>
          <el-input placeholder="请输入载重体积" clearable v-model="addData2.loadVolume" :maxlength="10"></el-input>
        </div>
        <div class="input-box">
          <label class="input-label">数量</label>
          <el-input placeholder="请输入数量" clearable v-model="addData2.vehicleAmount" :maxlength="10"></el-input>
        </div>
        <div class="input-box">
          <label class="input-label">车长</label>
          <el-input placeholder="请输入车长" clearable v-model="addData2.vehicleLength" :maxlength="6"></el-input>
        </div>
      </div>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button plain style="background: #fff;border-color: #67A0FF;color: #67A0FF" @click="addCancle2">返回</el-button>
        <el-button @click="tranSportSave" type="primary">保存</el-button>
      </div>
    </el-dialog>
    <!--上传附件-->
    <el-dialog title="附件详情" :visible.sync="dialogVisible" align="center">
      <div>
        <img  :src="formData.dialogImageUrl" alt="" style="width: 100%">
      </div>
    </el-dialog>
    <el-dialog title="附件详情" :visible.sync="dialogVisible1" align="center">
      <img  :src="dialogImageUrl1" alt="" style="width: 100%">
    </el-dialog>
  </el-container>
</template>

<script>
  import Table from "@/components/Table"
  import {formReset,confirmPop,sGet,exportUrl}from "@/common/config/utils"
  import {loadSeviceEditInit,loadSeviceAptitudeLisList,loadSeviceTransportCapacityList,loadSeviceInit,loadSeviceEdit} from "@/common/config/api/InfoBase"
  import { loadProCityList } from "@/common/config/api/basic"
  import {MessageBox} from 'element-ui';

  export default {
    name: "ServiceEdit",
    components: {
      Table
    },
    data() {
      return {
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        dialogImageUrl1: '',
        dialogVisible: false,
        dialogVisible1:false,
        url: '',
        headers:{
          token: ''
        },
        delArr1: [],
        delArr2: [],
        formDataChange: false,
        addData1Change: false,
        addData2Change: false,
        popAddVisible1: false,
        popAddVisible2: false,
        isAdd1: false, //区分资质新增 编辑
        isAdd2: false, //区分运力新增 编辑
        index1: null,
        index2: null,
        flag1: true,
        flag2: true,
        flag3: true,
        selectRows: [], //选中数据
        isDisabled: false,
        carrierTableData: [], //资质表格
        infoTableData: [], //运力信息表格
        //新增
        addData1: {
          type: '', //资质种类
          registrationNo : '', //注册登记号
          attachmentUrl: '' //附件地址
        },
        addData2: {
          loadVolume: '', //载重体积 ,
          loadWeight: '', //载重重量 ,
          tsServiceProviderId: '', //服务商ID ,
          tsTransportCapacityId: '',// 运力信息ID ,
          vehicleAmount: null, //车辆数量 ,
          vehicleLength: '', //车长 ,
          vehicleName: '', //车辆名称 ,
          vehicleType: '' //车辆类型
        },
        formData:{
          tsServiceProviderId: '',
          serviceProviderName: '', //服务商名称
          address: '', //地址 ,
          businessLicenseNo: '', //营业执照号 ,
          city: null, //市 ,
          cityName: '', //市名称 ,
          contactName: '', //联系人 ,
          contactPhone: '', // 联系电话 ,
          foundDate: '', //成立时间 ,
          postCode: '', //邮编 ,
          province: null, //省 ,
          provinceName: '', //省名称 ,
          vehicleAmount: null, //车辆数
          attachmentUrl: '', //附件url
          dialogImageUrl: '', //附件url
        },
        options: {
          aptitudeTypeList: [], //资质种类
          regioProvinceList: [], //省
          regioCityList: [] // 市
        },
      }
    },
    watch: {
      formData: {
        handler: function() {
          this.formDataChange = true;
        },
        deep: true
      },
      carrierTableData: {
        handler: function() {
          this.addData1Change = true;
        },
        deep: true
      },
      infoTableData: {
        handler: function() {
          this.addData2Change = true;
        },
        deep: true
      },
      flag1(){
        if(this.flag1 && this.flag2 && this.flag3){
          this.$router.push("/Service");
        }
      },
      flag2(){
        if(this.flag1 && this.flag2 && this.flag3){
          this.$router.push("/Service");
        }
      },
      flag3(){
        if(this.flag1 && this.flag2 && this.flag3){
          this.$router.push("/Service");
        }
      }
    },
    methods: {
      handleUpload(index){
        this.index1 = index;
      },
      handleSuccess(res,file){
        if(res.repCode != '0000'){
          this.msgInfo(res.repMsg);
        }
        else{
          this.formData.dialogImageUrl = res.repData.foreignUrl;
          this.$message({
            type: 'success',
            message: '上传成功!'
          });
        }
      },
      handleSuccess2(res){
        if(res.repCode != '0000'){
          this.msgInfo(res.repMsg);
        }
        else{
          this.dialogImageUrl1 = res.repData.foreignUrl;
          if(this.carrierTableData[this.index1].flag == 3){
            this.carrierTableData.splice(this.index1,1,Object.assign({}, this.carrierTableData[this.index1],{flag: 3,attachmentUrl: res.repData.foreignUrl}));
          }else{
            this.carrierTableData.splice(this.index1,1,Object.assign({}, this.carrierTableData[this.index1],{attachmentUrl: res.repData.foreignUrl}));
          }
          this.$message({
            type: 'success',
            message: '上传成功!'
          });
        }
      },
      //职业营照附件查看
      look() {
        this.dialogVisible = true;
      },
      handleSelectionChange(val) {
        this.selectRows = val;
      },
      //资质登记------------
      addCancle1(){
        this.popAddVisible1 = false;
      },
      //资质登记附件查看
      accessoryLook(row){
        this.dialogImageUrl1 = row.attachmentUrl;
        this.dialogVisible1 = true;
      },
      //新增弹框
      handleAdd1(row){
        this.isAdd1 = false;
        this.popAddVisible1 = true;
        let arr = Object.keys(this.addData1);
        for(let k of arr){
          this.addData1[k] = '';
        }
      },
      //编辑弹框
      handleEdit1(index,row){
        this.isAdd1 = true;
        this.index1 = index;
        this.popAddVisible1 = true;
        this.addData1 = Object.assign({}, row);
      },
      // 资质登记保存
      carriertSave(){
        let self = this;
        if(!self.addData1.type){
          self.msgInfo('请输入资质种类')
          return
        }
        if(self.isAdd1){
          console.log(self.addData1.flag);
          if(self.addData1.flag==0||self.addData1.flag==1){
            self.carrierTableData.splice(self.index1,1,Object.assign(self.addData1,{flag: 1}))
          }else if(self.addData1.flag==3){
            self.carrierTableData.splice(self.index1, 1, Object.assign(self.addData1,{flag: 3}))
          }
        }else{
          self.carrierTableData.push(Object.assign({},self.addData1,{flag: 3,tsServiceProviderId: self.formData.tsServiceProviderId}));
        }
        self.popAddVisible1 = false;
      },
      //资质登记删除
      handleDel1(index, row){
        let self = this;
        MessageBox.confirm('请确认删除', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString:true,
          center: true,
          showClose: true
        }).then(() => {
          self.handleDelData1(index, row);
        })
      },
      handleDelData1(index, row){
        row.flag = 2;
        this.delArr1.push(row)
        this.carrierTableData.splice(index,1);
      },
      //运力信息-----------
      addCancle2(){
        this.popAddVisible2 = false;
      },
      //新增弹框2
      handleAdd2(row){
        this.isAdd2 = false;
        this.popAddVisible2 = true;
        let arr = Object.keys(this.addData2);
        for(let k of arr){
          this.addData2[k] = '';
        }
      },
      //编辑弹框2
      handleEdit2(index,row){
        this.isAdd2 = true;
        this.index2 = index;
        this.popAddVisible2 = true;
        this.addData2 = Object.assign({}, row);
      },
      //运力信息保存
      tranSportSave(){
        let self = this;
        if(!self.addData2.vehicleType){
          self.msgInfo('请输入车辆类型')
          return
        }
        if(self.isAdd2){
          if(self.addData2.flag==0||self.addData2.flag==1){
            self.infoTableData.splice(self.index2,1,Object.assign(self.addData2,{flag: 1}))
          }else if(self.addData2.flag==3){
            self.infoTableData.splice(self.index2, 1, Object.assign(self.addData2,{flag: 3}))
          }
        }else{
          self.infoTableData.push(Object.assign({},self.addData2,{flag: 3,tsServiceProviderId: self.formData.tsServiceProviderId}));
        }
        self.popAddVisible2 = false;
      },
      //运力信息删除
      handleDel2(index, row){
        let self = this;
        MessageBox.confirm('请确认删除', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString:true,
          center: true,
          showClose: true
        }).then(() => {
          self.handleDelData2(index, row);
        })
      },
      handleDelData2(index, row){
        row.flag = 2;
        this.delArr2.push(row)
        this.infoTableData.splice(index,1);
      },
      /////////////////////////////
      //新增保存
      serviceEditSave(){
        let self = this;
        if(this.formDataChange){
          this.loadSeviceEditData();
        }
        if(this.addData1Change){
          this.loadAptitudeDataList();
        }
        if(this.addData2Change){
          this.loadTransportDataList();
        }
      },
      //返回
      backUp(){
        window.history.back();
      },
      //格式化时间戳
      timestampToTime(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
        return Y+M+D
      },
      // 资质种类编辑转换
      cFormatter(row, column){
        var val = row[column.property];
        let name;
        this.options.aptitudeTypeList.forEach((item) =>{
          if(item.code==val){
            name= item.name;
          }
        })
        return name
      },
      //图片检验
      beforeAvatarUpload(file) {
        var testmsg=/^image\/(jpg|png|bmp|jpeg)$/.test(file.type)
        console.log(testmsg);
        if (!testmsg) {
          this.msgInfo('上传图片格式只支持jpg/png/bmp/jpeg文件!');
          return false
        }else{
          return file
        }
      },
      /*////////////////////////////////////////////////////////////*/
      //服务商信息初始化接口
      loadSeviceInitData(){
        let self = this;
        let p = {
          tsServiceProviderId:self.$route.query.tsServiceProviderId
        }
        loadSeviceInit(p).then(res => {
          self.options.aptitudeTypeList = res.repData.aptitudeTypeList; //资质类型
        })
      },
      //服务商信息初始化接口
      loadEditInitData(){
        let self = this;
        let p = {
          tsServiceProviderId:self.$route.query.tsServiceProviderId
        }
        loadSeviceEditInit(p).then(res => {
          self.formData.tsServiceProviderId = res.repData.tsServiceProviderId; //服务商id
          self.formData.serviceProviderName = res.repData.serviceProviderName; //服务商名称
          self.formData.dialogImageUrl = res.repData.attachmentUrl; //附url
          self.dialogImageUrl1 = res.repData.aptitudeDtoList.attachmentUrl; //资质附件url
          self.formData.businessLicenseNo = res.repData.businessLicenseNo; //营业执照号
          self.formData.city = res.repData.city; //市 ,
          self.formData.province = res.repData.province; //省 ,
          self.formData.address = res.repData.address; //地址 ,
          self.formData.contactName = res.repData.contactName; //联系人 ,
          self.formData.contactPhone = res.repData.contactPhone; // 联系电话 ,
          self.formData.foundDate = res.repData.foundDate; //成立时间 ,
          self.formData.postCode = res.repData.postCode; //邮编 ,
          self.formData.vehicleAmount = res.repData.vehicleAmount; //车辆数
          self.formData.cityName = res.repData.cityName; //市名称 ,
          self.formData.provinceName = res.repData.provinceName; //省名称 ,
          self.carrierTableData = res.repData.aptitudeDtoList; //资质列表
          self.infoTableData = res.repData.transportCapacityDtoList; //运力信息列表
          res.repData.province && this.loadCityList(res.repData.province);//初始市
          setTimeout(function () {
            self.formDataChange = false;
            self.addData1Change = false;
            self.addData2Change = false;
          },500)
        })
      },
      //服务商信息编辑接口
      loadSeviceEditData(){
        let self = this;
        self.flag1 = false;
        if(!self.formData.serviceProviderName){
          self.msgInfo('请输入服务商名称')
          return
        }
        if(self.formData.contactPhone){
          let reg = /^[0-9-()（）]{7,20}$/g;
          let phTrim = self.formData.contactPhone.replace(/(^\s*)|(\s*$)/g, "");
          if(phTrim && phTrim.length > 20 || phTrim && !reg.test(phTrim)) {
            self.msgInfo('请输入正确的联系电话');
            return;
          }
        }
        if(self.formData.businessLicenseNo && self.formData.businessLicenseNo.length > 20) {
          self.msgInfo('营业执照号限制在20个字符以内');
          return;
        }
        if(self.formData.address && self.formData.address.length > 100) {
          self.msgInfo('地址限制在100个字符以内');
          return;
        }
        if(self.formData.postCode && self.formData.postCode.length > 6) {
          self.msgInfo('邮编长度限制在6个字符以内');
          return;
        }
        if(self.formData.vehicleAmount && self.formData.vehicleAmount.length > 6) {
          self.msgInfo('在册车辆数限制在6个字符以内');
          return;
        }
        let reg = /^\+?[1-9][0-9]*$/;
        if(self.formData.vehicleAmount && !reg.test(self.formData.vehicleAmount)) {
          self.msgInfo('在册车辆数必须是正整数');
          return;
        }
        if(self.formData.contactName && self.formData.contactName.length > 11) {
          self.msgInfo('联系人限制在11个字符以内');
          return;
        }
        let p = {
          tsServiceProviderId:self.formData.tsServiceProviderId, //服务商id
          serviceProviderName: self.formData.serviceProviderName, //服务商名称
          attachmentUrl: self.formData.dialogImageUrl, //附件url
          businessLicenseNo: self.formData.businessLicenseNo, //营业执照号
          city: self.formData.city, //市 ,
          province: self.formData.province, //省 ,
          address: self.formData.address, //地址 ,
          contactName: self.formData.contactName, //联系人 ,
          contactPhone: self.formData.contactPhone.trim(), // 联系电话 ,
          foundDate: self.formData.foundDate ? self.timestampToTime(self.formData.foundDate): '', //成立时间 ,
          postCode: self.formData.postCode, //邮编 ,
          vehicleAmount: !self.formData.vehicleAmount ? 0: self.formData.vehicleAmount, //车辆数
          cityName: self.formData.cityName, //市名称 ,
          provinceName: self.formData.provinceName, //省名称 ,
        }
        this.options.regioCityList.find((item) => { //获取市名
          if(p.city == item.tsRegionId) {
            p.cityName = item.regionName;
          }
        })
        this.options.regioProvinceList.find((item) => { //根据id遍获取省名
          if(p.province == item.tsRegionId) {
            p.provinceName = item.regionName;
          }
        })
        loadSeviceEdit(p).then(res => {
          self.flag1 = true;
          res && res.success && self.msgInfo(res.repMsg);
        })
      },
      //资质列表接口
      loadAptitudeDataList() {
        let self = this;
        self.flag2 = false;
        let p = {
          updateAptitudeRequestList:self.carrierTableData.concat(self.delArr1)
        }
        loadSeviceAptitudeLisList(p).then(res => {
          self.flag2 = true;
          res && res.success && self.msgInfo(res.repMsg);
        })
      },
      //运力信息列表接口
      loadTransportDataList() {
        let self = this;
        self.flag3 = false;
        let p = {
          updateTransportCapacityRequestList:self.infoTableData.concat(self.delArr2)
        }
        loadSeviceTransportCapacityList(p).then(res => {
          self.flag3 = true;
          res && res.success && self.msgInfo(res.repMsg);
        })
      },
      /*/////////////////////////////////////////////////////////////*/
      // 数字字典
      //获取省
      provinceAndCityList() {
        loadProCityList('p', {}).then(res => {
          if(res.repData) {
            this.options.regioProvinceList = res.repData;
          }
        })
      },
      //省change时获取城市
      provinceChange(proId) {
        this.formData.city = '';
        if(proId) { //有省id才请求城市
          this.loadCityList(proId);
        }
      },
      //请求市的List
      loadCityList(parentId) {
        loadProCityList('c', {id: parentId}).then(res => {
          if(res.repData) {
            this.options.regioCityList = res.repData;
          }
        })
      },
    },
    mounted(){
    },
    created() {
      let user = sGet('_WHUser');
      this.headers.token = user.token;
      this.url = exportUrl + 'fileUpload/uploadImg'
      this.provinceAndCityList();
      this.loadSeviceInitData();
      // //新增 编辑区分
      if(this.$route.query.tsServiceProviderId){
        this.loadEditInitData();
      }
      if(this.$route.query.isDisabled){
        this.isDisabled = true;
      }
    }
  }
</script>

<style lang="less">

</style>
