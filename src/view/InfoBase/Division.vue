<template>
  <el-container style="width: 100%;height: 100%;">
    <el-header style="height: auto; padding: 0;">
      <div class="search-group clearfix">
        <div class="clearfix">
          <div class="input-box" v-if="tsDivisionList">
            <label class="input-label">事业部名称</label>
            <el-select
              v-model="tsDivisionId"
              multiple
              collapse-tags
              placeholder="请选择">
              <el-option
                v-for="item in tsDivisionList"
                :key="item.tsDivisionId"
                :label="item.divisionName"
                :value="item.tsDivisionId">
              </el-option>
            </el-select>
          </div>
          <div class="search-box">
            <div class="search-reset" @click="divisionClean"><span class="img-reset">清空</span></div>
            <div class="search-sub" @click="divisionSearch"><span class="img-sub">搜索</span></div>
          </div>
        </div>
      </div>
    </el-header>

    <div class="btn-group clearfix">
      <div class="btn-add" @click="divisionAdd"><span class="img-add">新增</span></div>
      <div class="btn-del" @click="divisionDelete"><span class="img-del">删除</span></div>
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
      :title="divisionTitle"
      :visible.sync="divisionDialogVisible"
      :before-close="divisionVisibleCancel" width="800px">
      <div class="dialog-div-min clearfix">
        <div class="clearfix">
          <div class="input-box" >
            <label class="input-label"><span>*</span>事业部名称</label>
            <el-input :maxlength="20" v-model="divisionAddData.divisionName" :disabled="isDisable" clearable></el-input>
          </div>
          <div class="input-box">
            <label class="input-label">邮编</label>
            <el-input :maxlength="6" v-model="divisionAddData.postCode" :disabled="isDisable" clearable></el-input>
          </div>
          <div class="input-box">
            <label class="input-label">省 / 自治区</label>
            <el-select v-model="divisionAddData.province" placeholder="" :disabled="isDisable" @change="provinceChange">
              <el-option
                v-for="item in this.regioProvinceList"
                :key="item.tsRegionId"
                :label="item.regionName"
                :value="item.tsRegionId">
              </el-option>
            </el-select>
          </div>
          <div class="input-box">
            <label class="input-label">市</label>
            <el-select v-model="divisionAddData.city" placeholder="" :disabled="isDisable" @change="cityChange">
              <el-option
                v-for="item in this.regioCityList"
                :key="item.tsRegionId"
                :label="item.regionName"
                :value="item.tsRegionId">
              </el-option>
            </el-select>
          </div>
          <div class="input-box">
            <label class="input-label">联系人</label>
            <el-input :maxlength="5" v-model="divisionAddData.contactName" :disabled="isDisable" clearable></el-input>
          </div>
          <div class="input-box">
            <label class="input-label">联系电话</label>
            <el-input :maxlength="20" v-model="divisionAddData.contactPhone" :disabled="isDisable" clearable></el-input>
          </div>
          <div class="input-box" style="display: block; width: 90%;">
            <label class="input-label">地址</label>
            <el-input style="width: 560px;" :maxlength="20" v-model="divisionAddData.address" :disabled="isDisable" clearable></el-input>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="divisionVisibleCancel(divisionAddData, 'back')">返 回</el-button>
        <el-button type="primary" @click="divisionVisibleConfirm" :disabled="isSaveDisable">保存</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>
<script>
  import deepClone from 'deep-clone';
  import Table from "@/components/Table";
  import { loadProCityList } from "@/common/config/api/basic";
  import { confirmPop, w150, w200 }from "@/common/config/utils"
  import { divisionAll, divisionDeleteApi, divisionInsertApi, divisiongetById, divisionUpdate } from '@/common/config/api/InfoBase';
  export default {
    name: "division",
    components: { Table },
    data() {
      return {
        pop: false,
        currentPage: 1, //分页——当前页
        pageSizeNum: 30,
        textLength: 20, //input的长度限制
        regioProvinceList: [], //省List列表
        regioCityList: [], //市List列表
        tsDivisionList: [], //事业部List
        //form搜索
        tsDivisionId: null, //搜索事业部ID
        //form新增或编辑
        divisionDialogVisible: false,
        divisionTitle: '', //弹框标题
        isDisable: false, //是否禁用所有fronm
        isSaveDisable: false, //保存是否禁用
        //接口请求字段
        divisionAddData: {
          divisionName: '', //事业部名称 ,
          address: '', //地址
          postCode: '', //邮编 ,
          contactName: '', //联系人
          contactPhone: '',//联系电话
          province: '',
          city: '',
        },
        //表格
        selectCheckedId: [],//表格选中的值,
        tableData: {
          selectShow: true,
          currentPage: 1,
          tableHeight: 0,
          total: 0,
          clientHeight: 0,
          listData: [],
          tableHead: [
            {
              name: "事业部名称",
              value: 'divisionName',
              width: '200',
            },
            {
              name: "省 / 自治区",
              value: 'provinceName',
              width: '200',
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
              name: "联系人",
              value: 'contactName',
            },
            {
              name: "联系电话",
              value: 'contactPhone',
              width: w150
            },
            {
              name: "邮编",
              value: 'postCode',
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
          ],
        }
      }
    },
    watch: {
      divisionAddData: {
        handler: function() {
          this.isSaveDisable = false;
        },
        deep: true
      }
    },
    methods: {
      feedMessage(type, msg) {
        return this.$message({
          showClose: true,
          type: type,
          message: msg
        })
      },
      //分页
      handleSizeChange(val) {},
      // 分页
      handleCurrentChange(val) {
        this.currentPage = val;
        this.divisionTableList();
      },
      //搜索查询
      divisionSearch() {
        this.divisionTableList();
      },
      //清除搜索表单值
      divisionClean(formData) {
        this.tsDivisionId = [];
        // this.divisionTableList();
      },
       //表格checked
      handleSelectionChange(val) {
        this.selectCheckedId = val;
      },
      // 事业部添加弹框
      divisionAdd() {
        this.divisionDialogVisible = true;
        this.divisionTitle = '新增';
        this.divisionAddData = {
          city: null,
          cityName: null,
        },
        this.isDisable = false;
        this.isSaveDisable = false;
      },
      //新增保存或编辑
      divisionVisibleConfirm() {
        if(!this.divisionAddData.divisionName || (this.divisionAddData.divisionName && this.divisionAddData.divisionName.trim().length < 1)) {
          this.feedMessage('warning', '请完善必填信息！');
          return false;
        }
        // if(this.divisionAddData.contactPhone){
        //   let phTrim = this.divisionAddData.contactPhone.replace(/(^\s*)|(\s*$)/g, "");
        //   // let reg = /^[a-zA-Z\u4e00-\u9fa5]+$/g;
        //   // let reg = /^[0-9][\(\)\-]*$/;
        //   let reg = /^[0-9-()（）]{7,20}$/g;
        //   if(phTrim && !reg.test(phTrim)) {
        //     this.feedMessage('warning', '请输入正确的电话号码！');
        //     return false;
        //   }
        // }
        var params                 = this.divisionAddData;
        this.regioCityList.find((item) => { //获取市名
          if(params.city && params.city == item.tsRegionId) {
            params.cityName = item.regionName;
          }
        })
        if(!params.city) {
          params.cityName = "";
        }
        this.regioProvinceList.find((item) => { //根据id遍历获取省名
          if(params.province && params.province == item.tsRegionId) {
            params.provinceName = item.regionName;
          }
        })
        this.isSaveDisable = true;
        let reNum = 0;
        if(reNum == 1) {
          return false;
        }
        // 有tsDivisionId是编辑， 没有是新增
        var statusApi;
        params.tsDivisionId ? statusApi = divisionUpdate : statusApi = divisionInsertApi;
        statusApi(params).then(res => {
          reNum = reNum + 1;
          if(res.repData) {
            this.feedMessage('success', res.repMsg);
            this.divisionDialogVisible = false;
            this.divisionTableList();
            this.disSelectList();
          }
        })
      },
      // 表格操作（事件）
      tableClickChange(itemData) {
        if(itemData.label == '编辑') {
          this.provinceAndCityList();
          this.divisionTitle = '编辑';

          this.isDisable = false;
          this.isSaveDisable = false;
        }
        if(itemData.label == '查看'){
          this.divisionTitle = '查看';
          this.isDisable = true;
          this.isSaveDisable = true;
        }
        var params = {
          tsDivisionId: itemData.row.tsDivisionId
        };
        divisiongetById(params).then(res => {
          if(res.repData){
            this.divisionDialogVisible = true;
            this.divisionAddData = res.repData;
            if(!res.repData.city) {
              this.divisionAddData.cityName = "";
            }
            if(res.repData.province && res.repData.provinceName){ //如果有省市id获取城市List
              this.loadCityList(res.repData.province);
            }
          }
        })
      },
      // 事业部删除
      divisionDelete() {
        if(this.selectCheckedId.length < 1) {
          this.feedMessage('warning', '请选择要删除的数据！');
          return false;
        }
        confirmPop('确认删除',this.handleDelData)
      },
      handleDelData(){
        var idList = [];
        for(var row in this.selectCheckedId) {
          idList.push(this.selectCheckedId[row].tsDivisionId + '')
        }
        var params = {
          pageNum: this.currentPage,
          pageSize: this.pageSizeNum,
          tsDivisionIds: idList
        }
        divisionDeleteApi(params).then(res => {
          this.feedMessage('success',res.repMsg);
          this.divisionTableList();
          this.disSelectList();
        })
      },
      //新增/编辑(关闭或返回)
      divisionVisibleCancel() {
        this.divisionTableList();
        this.divisionDialogVisible = false;
      },
      //事业部列表接口
      divisionTableList() {
        var params = {
          tsDivisionIds: this.tsDivisionId.length > 0 ? this.tsDivisionId : null,
          pageNum: this.currentPage,
          pageSize: this.pageSizeNum
        }
        divisionAll(params).then(res => {
          if(res.repData){
            this.tableData.listData    = res.repData.list;
            this.tableData.total = res.repData.total;
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
      },
      //市selectChange
      cityChange(cityId) {
      },
      //请求市的List
      loadCityList(parentId) {
        loadProCityList('c', {id: parentId}).then(res => {
          if(res.success) {
            this.regioCityList = res.repData;
          }
        })
      },
      //省change时获取城市
      provinceChange(proId) {
        this.divisionAddData.city = '';
        if(proId) {
          this.loadCityList(proId);
        }
      },
      //获取省
      provinceAndCityList() {
        loadProCityList('p', {}).then(res => {
          if(res.success) {
            this.regioProvinceList = res.repData;
          }
        })
      }
    },
    mounted() {
      this.divisionTableList();
      this.provinceAndCityList();
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
    .input-box {
      width: 300px;
      padding: 0 20px;
    }
  }
</style>
