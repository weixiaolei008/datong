<template>
  <el-container style="width: 100%;height: 100%;">
    <el-header style="height: auto; padding: 0;">
      <div class="search-group clearfix">
        <div class="clearfix">
          <div class="input-box">
            <label class="input-label">事业部名称</label>
            <el-select
              v-model="searchFrom.tsDivisionIds"
              multiple
              collapse-tags
              placeholder="请选择" @change="disvonChangeSearch">
              <el-option
                v-for="item in searchFromList.tsDivisionList"
                :key="item.tsDivisionId"
                :label="item.divisionName"
                :value="item.tsDivisionId" >
              </el-option>
            </el-select>
          </div>
          <div class="input-box">
            <label class="input-label">公司名称</label>
            <el-select
              v-model="searchFrom.tsCompanyIds"
              multiple
              collapse-tags
              placeholder="请选择" @change="companyChange">
              <el-option
                v-for="item in searchFromList.tsCompanyList"
                :key="item.tsCompanyId"
                :label="item.companyName"
                :value="item.tsCompanyId">
              </el-option>
            </el-select>
          </div>
          <div class="input-box" >
            <label class="input-label">工厂名称</label>
            <el-select
              v-model="searchFrom.tsFactoryIds"
              multiple
              collapse-tags
              placeholder="请选择">
              <el-option
                v-for="item in searchFromList.tsFactoryList"
                :key="item.tsFactoryId"
                :label="item.factoryName"
                :value="item.tsFactoryId">
              </el-option>
            </el-select>
          </div>
          <div class="search-box">
            <div class="search-reset" @click="factoryClean"><span class="img-reset">清空</span></div>
            <div class="search-sub" @click="factorySearch"><span class="img-sub">搜索</span></div>
          </div>
        </div>
      </div>
    </el-header>

    <div class="btn-group clearfix">
      <div class="btn-add" @click="addFactory"><span class="img-add">新增</span></div>
      <div class="btn-del" @click="deltFactory"><span class="img-del">删除</span></div>
    </div>

    <el-main class="table" style='padding: 10px;'>
       <Table :data='tableData'
        @handleSubmit="tableClickChange"
        @selection-change="handleSelectionChange"
        @current-change="handleCurrentChange">
        <template slot-scope="{scope}" slot="code">
          <div>{{scope.row.code}}</div>
        </template>
      </Table>
    </el-main>

    <el-dialog
      :title="fatcoryDialogTitle"
      :visible.sync="factoryDialogVisible"
      :before-close="factoryVisibleCancel" width="800px">
      <div class="search-group dialog-div-min clearfix">
        <div class="clearfix">
          <div class="input-box">
            <label class="input-label"><span>*</span>所属事业部</label>
            <el-select placeholder="请选择" v-model="factoryFormEdit.tsDivisionId" @change="disvonChangeEdit" :disabled="isDisable" >
              <el-option
                v-for="item in searchFromList.tsDivisionList"
                :key="item.tsDivisionId"
                :label="item.divisionName"
                :value="item.tsDivisionId">
              </el-option>
            </el-select>
          </div>
          <div class="input-box">
            <label class="input-label"><span>*</span>所属公司</label>
            <el-select placeholder="请选择" v-model="factoryFormEdit.tsCompanyId" :disabled="isDisable" >
              <el-option
                v-for="item in searchFromList.tsCompanyList"
                :key="item.tsCompanyId"
                :label="item.companyName"
                :value="item.tsCompanyId">
              </el-option>
            </el-select>
          </div>
          <div class="input-box">
            <label class="input-label"><span>*</span>工厂名称</label>
            <el-input placeholder="工厂名称" :maxlength="twentyLen" v-model="factoryFormEdit.factoryName" :disabled="isDisable" clearable ></el-input>
          </div>
          <div class="input-box">
            <label class="input-label">国家</label>
            <el-input placeholder="国家" :maxlength="fiveLen" v-model="factoryFormEdit.country" :disabled="isDisable" clearable ></el-input>
          </div>
          <div class="input-box">
            <label class="input-label">省 / 自治区</label>
            <el-select placeholder="请选择" v-model="factoryFormEdit.province"  :disabled="isDisable" @change="provinceChange">
              <el-option
                v-for="item in regioProvinceList"
                :key="item.tsRegionId"
                :label="item.regionName"
                :value="item.tsRegionId">
              </el-option>
            </el-select>
          </div>
          <div class="input-box">
            <label class="input-label">市</label>
            <el-select placeholder="请选择" v-model="factoryFormEdit.city" :disabled="isDisable" @change="cityChange">
              <el-option
                v-for="item in regioCityList"
                :key="item.tsRegionId"
                :label="item.regionName"
                :value="item.tsRegionId">
              </el-option>
            </el-select>
          </div>
          <div class="input-box">
            <label class="input-label">邮编</label>
            <el-input placeholder="邮编" :maxlength="sixLen" v-model="factoryFormEdit.postCode" :disabled="isDisable" clearable></el-input>
          </div>
          <div class="input-box">
            <label class="input-label">联系人</label>
            <el-input placeholder="联系人" :maxlength="fiveLen" v-model="factoryFormEdit.contactName" :disabled="isDisable" clearable></el-input>
          </div>
          <div class="input-box">
            <label class="input-label">联系电话</label>
            <el-input placeholder="联系电话" :maxlength="20" v-model="factoryFormEdit.contactPhone" :disabled="isDisable" clearable></el-input>
          </div>
          <div class="input-box">
            <label class="input-label">成立时间</label>
            <el-date-picker
              v-model="factoryFormEdit.foundDate"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期" :disabled="isDisable">
            </el-date-picker>
          </div>
          <div class="input-box" style="display: block; width: 100%;">
            <label class="input-label">地址</label>
            <el-input placeholder="地址" style="width: 555px;" :maxlength="twentyLen" v-model="factoryFormEdit.address" :disabled="isDisable" clearable></el-input>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="factoryVisibleCancel(factoryFormEdit)">返回</el-button>
        <el-button type="primary" @click="factoryVisibleConfirm" :disabled="saveDisable">保存</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
  import deepClone from 'deep-clone';
  import Table from "@/components/Table";
  import { timestampToTime, getNowFormatDate, confirmPop, w150, w180, w200} from "@/common/config/utils";
  import { loadProCityList } from "@/common/config/api/basic";
  import {
    factoryQuerryAllApi,
    factoryInsertApi,
    factoryUpdateApi,
    factoryDeleteApi,
    factoryGetByIdApi,
    getFactoryByCompanyIdApi,
    getCompanyByDivisionIdApi,
    divisionAll
  } from '@/common/config/api/InfoBase';

  export default {
    name: "factory",
    components: { Table },
    data() {
      return {
        twentyLen: 20,
        fiveLen: 5,
        sixLen: 6,
        currentPage: 1,
        pageSizeNum: 30,
        saveDisable: false,
         //搜索
        searchFrom: {
          tsDivisionIds: [], //搜索-事业部
          tsCompanyIds: [], //搜索-公司
          tsFactoryIds: [], //搜索-工厂
        },
        searchFromList: {
          tsDivisionList: [], //搜索同-事业部下拉
          tsCompanyList: [], //搜索-公司下拉
          tsFactoryList: [], //搜索-工厂下拉
        },
        factoryDialogVisible: false, //是否显示编辑弹框
        fatcoryDialogTitle: '',
        //新增、编辑
        isDisable: true,
        regioProvinceList: [],
        regioCityList: [],
        factoryFormEdit: {
          city:  null,
          cityName: null,
          province:  null,
          provinceName: null,
          tsDivisionId: null, //事业部ID
          tsFactoryId: null, //工厂ID
          companyName: '', //所属公司 ,
          country: null, //国家
          foundDate: null, //成立时间
          factoryName: '',//工厂名称
          address: null, //地址 ,
          postCode: null, //邮编 ,
          contactName: null, //联系人 ,
          contactPhone: null, //联系电话 ,
          createBy: null,
          tsCompanyId: null, //公司ID
        },
        tableData: {
          selectShow: true,
          tableHeight: 0,
          currentPage: 1,
          total: 0,
          listData: [],
          tableHead: [
            {
              name: "工厂名称",
              value: 'factoryName',
              width: w200
            },
            {
              name: "地址",
              value: 'address',
              width: w200
            },
            {
              name: "省 / 自治区",
              value: 'provinceName',
              width: w180
            },
            {
              name: "市",
              value: 'cityName',
            },
            {
              name: "联系人",
              value: 'contactName',

            },
            {
              name: "联系电话",
              value: 'contactPhone',
              width: w180
            },
            {
              name: "邮编",
              value: 'postCode',
            },
            {
              name: "成立时间",
              value: 'foundDate',
              width: w180,
              formatter:  function(row) {
                return timestampToTime(row.foundDate)
              }
            },
            {
              name: "事业部名称",
              value: 'divisionName',
              width: w200
            },
            {
              name: "公司名称",
              value: 'companyName',
              width: w200
            },
            {
              name: "国家",
              value: 'country',
            }
          ],
          operations: [
            {
              label: '操作',
              width: '100',
              data: [
                {
                  label: '编辑',
                  Fun: 'handleSubmit',
                  type:'editor',
                  size: 'mini',
                  id: '1',
                  classname: 'show',
                  icon: 'icon-edit'
                }
              ]
            }
          ]
        },
        getByIdRowData: {},
        tableActiveStatus: '',
        tableSelectId: [],
        cloneByRow: {}
      }
    },
    methods: {
      //表格row——checked
      handleSelectionChange(val) {
        this.tableSelectId = val;
      },
      //新增
      addFactory() {
        this.fatcoryDialogTitle = '新增';
        this.isDisable = false;
        this.saveDisable = false;
        this.provinceAndCityList();
        this.factoryFormEdit = {
          tsDivisionId: null,
          tsCompanyId: null,
          province: null,
          city: null,
          cityName: null
        }
        if(!this.factoryFormEdit.province) {
          this.regioCityList = [];
        }
        console.log(this.provinceAndCityList(), '0--------', this.regioCityList)
        this.factoryDialogVisible = true;
      },
      handleDelData() {
        var idList = [];
        for(var row in this.tableSelectId) {
          idList.push(this.tableSelectId[row].tsFactoryId + '')
        }
        factoryDeleteApi({tsFactoryIds: idList}).then(res => {
          this.factoryTableList();
          this.feedMessage('success',res.repMsg);
        })
      },
      //删除
      deltFactory() {
        if(this.tableSelectId.length < 1) {
          this.feedMessage('warning','请选择删除的数据！');
          return false;
        }else{
          confirmPop('确认删除',this.handleDelData)
        }
      },
      //返回
      factoryVisibleCancel(done) {
        this.factoryDialogVisible = false;
      },
      //新增保存/编辑
      factoryVisibleConfirm() {
        let factoryVal = this.factoryFormEdit.factoryName;
        if(!this.factoryFormEdit.tsCompanyId || !this.factoryFormEdit.tsDivisionId || !this.factoryFormEdit.factoryName || (this.factoryFormEdit.factoryName && this.factoryFormEdit.factoryName.trim().length < 1)) {
          this.feedMessage('warning','请填写必填的数据！');
          return false;
        }
        // if(this.factoryFormEdit.contactPhone){
        //   let reg = /^[0-9-()（）]{7,20}$/g;
        //   let phTrim = this.factoryFormEdit.contactPhone.replace(/(^\s*)|(\s*$)/g, "");
        //   if(phTrim && phTrim.length > 13 || phTrim && !reg.test(phTrim)) {
        //     this.feedMessage('warning', '请输入正确的电话号码！');
        //     return false;
        //   }
        // }
        // var p = this.factoryFormEdit;
        let p = {
          city:  this.factoryFormEdit.city,
          province:  this.factoryFormEdit.province,
          tsDivisionId: this.factoryFormEdit.tsDivisionId, //事业部ID
          tsCompanyId: this.factoryFormEdit.tsCompanyId, //公司ID
          companyName: this.factoryFormEdit.companyName, //所属公司 ,
          country: this.factoryFormEdit.country, //国家
          foundDate: this.factoryFormEdit.foundDate ? this.factoryFormEdit.foundDate.split(" ")[0] : null, //成立时间
          factoryName: this.factoryFormEdit.factoryName,//工厂名称
          address: this.factoryFormEdit.address, //地址 ,
          postCode: this.factoryFormEdit.postCode, //邮编 ,
          contactName: this.factoryFormEdit.contactName, //联系人 ,
          contactPhone: this.factoryFormEdit.contactPhone ,//联系电话 ,
          tsFactoryId: this.tableActiveStatus == '编辑' ? this.cloneByRow.tsFactoryId: null //工厂ID
        }
        this.saveDisable = true;
        this.regioCityList.find((item) => { //获取市名
          if(p.city && p.city == item.tsRegionId) {
            p.cityName = item.regionName;
          }
        })
        if(!p.city) {
          p.cityName = "";
        }
        this.regioProvinceList.find((item) => { //根据id遍获取省名
          if(p.province == item.tsRegionId) {
            p.provinceName = item.regionName;
          }
        })
        let reNum = 0;
        if(reNum == 1) {
          return false;
        }
         // 判断是编辑还是新增
        var statusApi;
        this.tableActiveStatus == '编辑' ? statusApi = factoryUpdateApi : statusApi = factoryInsertApi;
        statusApi(p).then(res => {
          if(res.repMsg) {
            this.feedMessage('success', res.repMsg);
            this.factoryDialogVisible = false;
            this.factoryTableList();
          }
        })
      },
      //分页
      handleCurrentChange(val) {
        this.currentPage = val;
        this.factoryTableList();
      },
      // 表格操作（编辑or查看）
      tableClickChange(itemData) {
        console.log(this.searchFromList, 'shuzizidian1', itemData)
        this.factoryDialogVisible = true;
        this.tableActiveStatus = itemData.label;
        if(itemData.row.tsDivisionId) {
          this.disvonChangeSearch(itemData.row.tsDivisionId.split(' '));
        }
        if(itemData.label == '编辑') {
          this.fatcoryDialogTitle = '编辑';
          this.isDisable = false;
          this.saveDisable = false;
        }else{
          this.fatcoryDialogTitle = '查看';
          this.isDisable = true;
          this.saveDisable = true;
        }
        this.provinceAndCityList();
        var p = {
          tsFactoryId: itemData.row.tsFactoryId
        }
        factoryGetByIdApi(p).then(res => {
          if(res.success) {
            if(res.repData.province) {
              this.loadCityList(res.repData.province);
            }
            this.cloneByRow = deepClone(res.repData);
            this.factoryFormEdit = res.repData;
            if(!res.repData.city) {
              this.factoryFormEdit.cityName = "";
            }
            this.factoryFormEdit.foundDate = timestampToTime(res.repData.foundDate);
          }
        })
      },
      searchMore() {
        this.pop = !this.pop
      },
      //搜索
      factorySearch() {
       this.factoryTableList();
      },
      //清除表单搜索值
      factoryClean(){
        this.searchFrom.tsCompanyIds = [];
        this.searchFrom.tsDivisionIds = [];
        this.searchFrom.tsFactoryIds = [];
        this.searchFromList.tsCompanyList = [];
        this.searchFromList.tsFactoryList = [];
        // this.factoryTableList();
      },
       //工厂load列表
      factoryTableList(activeSn, data) {
        var p = {
          pageNum: this.currentPage,
          pageSize: this.pageSizeNum,
          tsCompanyIds: this.searchFrom.tsCompanyIds.length > 0 ? this.searchFrom.tsCompanyIds : null,
          tsDivisionIds: this.searchFrom.tsDivisionIds.length > 0 ? this.searchFrom.tsDivisionIds : null,
          tsFactoryIds: this.searchFrom.tsFactoryIds.length > 0 ? this.searchFrom.tsFactoryIds : null,
        }
        factoryQuerryAllApi(p).then(res => {
          if(res.repData){
            this.tableData.total = res.repData.total;
            this.tableData.listData    = res.repData.list;
          }
        })
      },
      //事业部List
      disSelectList() {
        divisionAll({}).then(res => {
          if(res.repData) {
            this.searchFromList.tsDivisionList = res.repData.list;
          }
        })
      },
      //搜索 (事业部selectChange——数字字典公司List)
      disvonChangeSearch(disvId) {
        if(disvId.length > 1 || disvId.length < 1) {
          this.searchFromList.tsCompanyList = [];
          this.searchFromList.tsFactoryList = [];
          this.searchFrom.tsCompanyIds = [];
          this.searchFrom.tsFactoryIds = [];
          return false;
        }
        console.log(disvId, '--', disvId[0])
        getCompanyByDivisionIdApi({tsDivisionId: disvId[0]}).then(res => { 
          if(res.repData) {
            this.searchFromList.tsCompanyList = res.repData;
          }
        })
      },
      //编辑（事业部selectChange——数字字典公司List）
      disvonChangeEdit(disvId) {
        this.searchFromList.tsCompanyList = [];
        this.searchFromList.tsFactoryList = [];
        this.factoryFormEdit.tsCompanyId = null;
        this.factoryFormEdit.tsFactoryIds = null;
        getCompanyByDivisionIdApi({tsDivisionId: disvId}).then(res => {
          if(res.repData) {
            this.searchFromList.tsCompanyList = res.repData;
          }
        })
      },
      //公司selectChange——数字字典工厂List
      companyChange(comId) {
        if(comId.length > 1 || comId.length < 1) {
          this.searchFromList.tsFactoryList = [];
          this.searchFromList.tsFactoryList = [];
          this.searchFrom.tsFactoryIds = [];
          return false;
        }
        getFactoryByCompanyIdApi({tsCompanyId: comId[0]}).then(res => {
          if(res.repData) {
            this.searchFromList.tsFactoryList = res.repData;
          }
        })
      },
      //-------------------------------------------------------------------弹框操作
      // 数字字典
      //获取省
      provinceAndCityList() {
        loadProCityList('p', {}).then(res => {
          if(res.repData) {
            this.regioProvinceList = res.repData;
          }
        })
      },
      //省change时获取城市
      provinceChange(proId) {
        this.factoryFormEdit.city = '';
        if(proId) { //有省id才请求城市
          this.loadCityList(proId);
        }
      },
      cityChange(id) {
        // return this.factoryFormEdit.city = id;
      },
      //请求市的List
      loadCityList(parentId) {
        loadProCityList('c', {id: parentId}).then(res => {
          if(res.repData) {
            this.regioCityList = res.repData;
          }
        })
      }
    },
    mounted() {
    },
    created() {
      this.factoryTableList();
      this.disSelectList();
    }
  }
</script>
<style scoped lang="less">
  .el-dialog__body {
    padding: 30px 20px 0 !important;
  }
  // 弹框
  .dialog-div-min {
    padding: 0 20px !important;
    .input-box {
      width: 300px;
      padding: 0 20px;
    }
  }
</style>
