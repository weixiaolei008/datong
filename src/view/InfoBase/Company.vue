<template>
  <el-container style="width: 100%;height: 100%;">
    <el-header style="height: auto; padding: 0;">
      <div class="search-group clearfix">
        <div class="clearfix">
          <div class="input-box">
            <label class="input-label">事业部名称</label>
            <el-select
                v-model="tsDivisionIds"
                multiple
                collapse-tags
                placeholder="请选择" @change="disvonChange">
                <el-option
                v-for="item in tsDivisionList"
                :key="item.tsDivisionId"
                :label="item.divisionName"
                :value="item.tsDivisionId" >
              </el-option>
            </el-select>
          </div>
          <div class="input-box">
            <label class="input-label">公司名称</label>
            <el-select
              v-model="tsCompanyIds"
              multiple
              collapse-tags
              placeholder="请选择">
              <el-option
                v-for="item in tsCompanyList"
                :key="item.tsCompanyId"
                :label="item.companyName"
                :value="item.tsCompanyId">
              </el-option>
            </el-select>
          </div>
          <div class="search-box">
            <div class="search-reset" @click="comppanyClean"><span class="img-reset">清空</span></div>
            <div class="search-sub" @click="comppanySearch"><span class="img-sub">搜索</span></div>
          </div>
        </div>
      </div>
    </el-header>

    <div class="btn-group clearfix">
      <div class="btn-add" @click="addcomppany"><span class="img-add">新增</span></div>
      <div class="btn-del" @click="commpanyDelete"><span class="img-del">删除</span></div>
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
      :title="companyTitle"
      :visible.sync="comppanyDialogVisible"
      width="800px"
      :before-close="comppanyVisibleCancel">
      <div class="search-group clearfix dialog-div">
        <div class="clearfix">
          <div class="input-box" style="display: block;">
            <label class="input-label"><span>*</span>事业部</label>
            <el-select
              v-model="companyFormDataEdit.tsDivisionId"
              placeholder="请选择" :disabled="isDisable">
              <el-option
                v-for="item in tsDivisionList"
                :key="item.tsDivisionId"
                :label="item.divisionName"
                :value="item.tsDivisionId">
              </el-option>
            </el-select>
          </div>
          <div class="input-box">
            <label class="input-label"><span>*</span>公司名称</label>
            <el-input placeholder="公司名称" :maxlength="twentyLen" v-model="companyFormDataEdit.companyName" :disabled="isDisable" clearable></el-input>
          </div>
          <div class="input-box">
            <label class="input-label">省 / 自治区</label>
            <el-select placeholder="请选择" v-model="companyFormDataEdit.province"  :disabled="isDisable" @change="provinceChange">
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
            <el-select placeholder="请选择" v-model="companyFormDataEdit.city"  :disabled="isDisable" @change="cityChange">
              <el-option
                v-for="item in regioCityList"
                :key="item.tsRegionId"
                :label="item.regionName"
                :value="item.tsRegionId">
              </el-option>
            </el-select>
          </div>
          <div class="input-box">
            <label class="input-label">地址</label>
            <el-input placeholder="地址" :maxlength="twentyLen" v-model="companyFormDataEdit.address" :disabled="isDisable" clearable></el-input>
          </div>
          <div class="input-box">
            <label class="input-label">邮编</label>
            <el-input placeholder="邮编" :maxlength="sixLen" v-model="companyFormDataEdit.postCode" :disabled="isDisable" clearable></el-input>
          </div>
          <div class="input-box">
            <label class="input-label">国家</label>
            <el-input placeholder="国家" :maxlength="fiveLen" v-model="companyFormDataEdit.country" :disabled="isDisable" clearable></el-input>
          </div>
          <div class="input-box">
            <label class="input-label">联系人</label>
            <el-input placeholder="联系人" :maxlength="fiveLen" v-model="companyFormDataEdit.contactName" :disabled="isDisable" clearable></el-input>
          </div>
          <div class="input-box">
            <label class="input-label">联系电话</label>
            <el-input placeholder="联系电话"  :maxlength="20" v-model="companyFormDataEdit.contactPhone" :disabled="isDisable" clearable></el-input>
          </div>
          <div class="input-box">
            <label class="input-label">成立时间</label>
            <el-date-picker
              v-model="companyFormDataEdit.foundDate"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期" :disabled="isDisable">
            </el-date-picker>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="comppanyVisibleCancel()">返 回</el-button>
        <el-button type="primary" @click="comppanyVisibleConfirm"  :disabled="saveDisable" >保存</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
  import deepClone from 'deep-clone';
  import Table from "@/components/Table";
  import { timestampToTime, confirmPop, w200, w180 } from "@/common/config/utils";
  import { loadProCityList } from "@/common/config/api/basic"
  import { companyQuerryAllApi, companyInsertApi, companyDeleteApi, companyUpdateApi, getCompanyByDivisionIdApi, companyGetByIdApi, divisionAll } from '@/common/config/api/InfoBase';

  export default {
    name: "company",
    components: { Table },
    data() {
      return {
        twentyLen: 20,
        fiveLen: 5,
        sixLen: 6,
        currentPage: 1,
        pageSizeNum: 30,
        isDisable: false,
        saveDisable: false, //查看时保存按钮不能点击
        companyTitle: '',
        comppanyDialogVisible: false,
        tsCompanyList: [], //公司下拉
        regioProvinceList: [], //省下拉
        regioCityList: [], //市下拉
        //搜索form
        tsDivisionIds : [],//公司ID
        tsCompanyIds: [],//公司ID
        //添加form
        tsDivisionIdEditor: [], //事业部
        tsDivisionList: [],
        tsDivisionIdAdd: [],//公司ID
        tsCompanyIdAdd: [],//公司ID
        provinceEdit: [],
        cityEdit: [],
        companyFormDataEdit: {
          address: '', //地址 ,
          companyName: '', //公司名称 ,
          tsCompanyId:'',  //公司ID
          contactName: '', //联系人 ,
          contactPhone: '', //联系电话 ,
          country: '', //国家 ,
          divisionName: '', //公司名称 ,
          foundDate: '', //成立时间 ,
          postCode: '', //邮编 ,
          province: null,
          provinceName: null,
          city: null,
          cityName: null,
          createDate: null, //成立时间
          tsDivisionId: null, //事业部ID
        },
        tableData: {
          selectShow: true,
          currentPage: 1,
          tableHeight: 0,
          total: 0,
          clientHeight: 0,
          listData: [],
          tableHead: [
            {
              name: "公司名称",
              value: 'companyName',
              width: w200
            },
            {
              name: "省/自治区",
              value: 'provinceName',
              width: w180,
            },
            {
              name: "市",
              value: 'cityName',
            },
            {
              name: "地址",
              value: 'address',
              width: w200
            },
            {
              name: "邮编",
              value: 'postCode',
            },
            {
              name: "联系人",
              value: 'contactName',
            },
            {
              name: "联系电话",
              value: 'contactPhone',
              width: w180,
            },
            {
              name: "成立时间",
              value: 'foundDate',
              width: w200,
              formatter:  function(row) {
                return row.foundDate ? timestampToTime(row.foundDate) : null
              }
            },
            {
              name: "事业部名称",
              value: 'divisionName',
              width: '200',
            },
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
        tableSelectId: [], //表格选中的值
      }
    },
     methods: {
      //分页
      handleSizeChange(val) {},
      //分页btn
      handleCurrentChange(val) {
        this.currentPage = val;
        this.companyTableList();
      },
      //搜索查询
      comppanySearch() {
        this.companyTableList();
      },
      //清空
      comppanyClean() {
        this.tsDivisionIds = [];
        this.tsCompanyList = [];
        this.tsCompanyIds = [];
        // this.companyTableList();
      },
      //表格checked数据
      handleSelectionChange(val) {
        this.tableSelectId = val;
      },
      // 新增按钮
      addcomppany() {
        this.comppanyDialogVisible = true;
        this.isDisable             = false;
        this.saveDisable           = false;
        this.companyTitle          = '新增';
        this.companyFormDataEdit = {
          city: null,
          cityName: null,
        }
      },
      //返回/关闭
      comppanyVisibleCancel(done) {
        this.companyTableList();
        this.comppanyDialogVisible = false;
      },
      //新增或编辑保存
      comppanyVisibleConfirm() {
        if(!this.tsDivisionIdEditor || !this.companyFormDataEdit.companyName || (this.companyFormDataEdit.companyName && this.companyFormDataEdit.companyName.trim().length < 1)) {
          this.feedMessage('warning', '请填写必填信息！');
          return false;
        }
        // if(this.companyFormDataEdit.contactPhone){
        //   // let reg = /^[0-9]*$/;
        //   let reg = /^[0-9-()（）]{7,20}$/g;
        //   let phTrim = this.companyFormDataEdit.contactPhone.replace(/(^\s*)|(\s*$)/g, "");
        //   if(phTrim && phTrim.length > 13 || phTrim && !reg.test(phTrim)) {
        //     this.feedMessage('warning', '请输入正确的电话号码！');
        //     return false;
        //   }
        // }
        this.saveDisable = true;
        var p = this.companyFormDataEdit;
        this.regioCityList.find((item) => { //获取市名
          if(p.city && p.city == item.tsRegionId) {
            p.cityName = item.regionName;
          }
        })
        if(!p.city) {
          p.cityName = "";
        }
        this.regioProvinceList.find((item) => { //根据id遍历获取省名
          if(p.province && p.province == item.tsRegionId) {
            p.provinceName = item.regionName;
          }
        })
        if(p.foundDate) {
          p.foundDate = p.foundDate.split(" ")[0]
        }
        let reNum = 0;
        if(reNum == 1) {
          return false;
        }
        // 判断是编辑还是新增
        var statusApi;
        this.companyTitle == '编辑' ? statusApi = companyUpdateApi : statusApi = companyInsertApi;
        statusApi(p).then(res => {
          reNum = reNum + 1;
          this.feedMessage('success', res.repMsg);
          this.comppanyDialogVisible = false;
          this.companyTableList();
        })
      },
      //表格选中数据
      checkedChange() {
        if(this.tableSelectId.length < 1) {
          this.feedMessage('warning','请选择数据！');
          return false;
        }
        let idList = [];
        for(var row in this.tableSelectId) {
          idList.push(this.tableSelectId[row].tsCompanyId + '')
        }
        let params = {
          tsCompanyIds: idList
        }
        return params;
      },
      handleDelData() {
        companyDeleteApi(this.checkedChange()).then(res => {
          this.companyTableList();
          this.feedMessage('success',res.repMsg);
        })
      },
      //删除
      commpanyDelete() {
        if(this.checkedChange()) {
         confirmPop('确认删除',this.handleDelData)
        }
      },
      // 表格操作（事件）
      tableClickChange(itemData) {
        this.comppanyDialogVisible = true;
        if(itemData.label == '编辑') {
          this.companyTitle = '编辑';
          this.isDisable = false;
          this.saveDisable = false;
        }else{
          this.companyTitle = '查看';
          this.isDisable = true;
          this.saveDisable = true;
        }
        var params = {
          tsCompanyId: itemData.row.tsCompanyId
        };
        companyGetByIdApi(params).then(res => {
          if(res.success) {
            if(res.repData.province) {
              this.loadCityList(res.repData.province);
            }
            this.companyFormDataEdit = res.repData;
            if(!res.repData.city) {
              this.companyFormDataEdit.cityName = "";
            }
            if(res.repData.foundDate) {
              this.companyFormDataEdit.foundDate = timestampToTime(res.repData.foundDate);
            }
          }
        })
      },
      //事业部selectChange——数字字典公司List
      disvonChange(ids) {
        if(ids.length < 1 || ids.length > 1) {
          this.tsCompanyList = [];
          this.tsCompanyIds = [];
          return false;
        }
        getCompanyByDivisionIdApi({tsDivisionId: ids[0]}).then(res => {
          if(res.repData) {
            this.tsCompanyList = res.repData;
          }
        })
      },
       //公司列表接口
      companyTableList() {
        var params = {
          pageNum: this.currentPage,
          pageSize: this.pageSizeNum,
          tsDivisionIds: this.tsDivisionIds.length > 0 ? this.tsDivisionIds : null,
          tsCompanyIds: this.tsCompanyIds.length > 0 ? this.tsCompanyIds : null
        };
        companyQuerryAllApi(params).then(res => {
          if(res.repData){
            this.tableData.listData    = res.repData.list;
            this.tableData.total       = res.repData.total;
          }
        })
      },
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
        this.companyFormDataEdit.city = '';
        if(proId) { //有省id才请求城市
          this.loadCityList(proId);
        }
      },
      cityChange(id) {

      },
      //请求市的List
      loadCityList(parentId) {
        loadProCityList('c', {id: parentId}).then(res => {
          if(res.repData) {
            this.regioCityList = res.repData;
          }
        })
      },
      //事业部List
      disSelectList() {
        divisionAll({}).then(res => {
          if(res.repData) {
            this.tsDivisionList = res.repData.list;
          }
        })
      }
    },
    mounted() {
      this.companyTableList();
      this.provinceAndCityList();
      this.disSelectList();
    }
  }
</script>
<style scoped lang="less">
</style>
