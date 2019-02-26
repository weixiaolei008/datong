<template>
  <el-container style="width: 100%;height: 100%;">
    <el-header style="height: auto; padding: 0;">
      <div class="search-group clearfix">
        <div :class="pop?'search-up':'search-more'" @click="searchMore"></div>
        <el-collapse-transition>
          <div v-show="pop" class="search-pop clearfix">
            <div class="input-sm-box">
              <label class="input-label">最大库位数</label>
              <el-input placeholder="最大库位数" v-model="warehouseFormData.vehicleStorageMaxNumMin" clearable></el-input>
              <label style="width: 30px" class="input-label">至</label>
              <el-input placeholder="最大库位数" v-model="warehouseFormData.vehicleStorageMaxNumMax" clearable></el-input>
            </div>
            <div class="input-sm-box">
              <label class="input-label">标准库位数</label>
              <el-input placeholder="标准库位数" v-model="warehouseFormData.vehicleStorageNumMin" clearable></el-input>
              <label style="width: 30px" class="input-label">至</label>
              <el-input placeholder="标准库位数" v-model="warehouseFormData.vehicleStorageNumMax" clearable></el-input>
            </div>
            <div class="input-sm-box">
              <label class="input-label">仓库面积</label>
              <el-input placeholder="仓库面积" v-model="warehouseFormData.warehouseAreaMin" clearable></el-input>
              <label style="width: 30px" class="input-label">至</label>
              <el-input placeholder="仓库面积" v-model="warehouseFormData.warehouseAreaMax" clearable></el-input>
            </div>
            <div class="input-box">
              <label class="input-label">地址</label>
              <el-input placeholder="地址" v-model="warehouseFormData.address" clearable></el-input>
            </div>
          </div>
        </el-collapse-transition>
        <div class="clearfix">
          <div class="input-box">
            <label class="input-label">仓库名称</label>
            <el-select
              v-model="warehouseFormData.wareHouseName"
              multiple
              collapse-tags
              placeholder="请选择" @change="wareHouseChange">
              <el-option
                v-for="item in warehouseList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="input-box">
            <label class="input-label">仓库类型</label>
            <el-select
              v-model="warehouseFormData.wareHouseTypeList"
              multiple
              collapse-tags
              placeholder="请选择" @change="wareHouseTypeChange">
              <el-option
                v-for="item in options.warehouse_type"
                :key="item.tsDataDicId"
                :label="item.name"
                :value="item.tsDataDicId">
              </el-option>
            </el-select>
          </div>
          <div class="input-box">
            <label class="input-label">仓储类型</label>
            <el-select
              v-model="warehouseFormData.storageTypeList"
              multiple
              collapse-tags
              placeholder="请选择" @change="storageTypeChange">
              <el-option
                v-for="item in options.storage_type"
                :key="item.tsDataDicId"
                :label="item.name"
                :value="item.tsDataDicId">
              </el-option>
            </el-select>
          </div>
          <div class="input-box">
            <label class="input-label">准储车型</label>
            <el-select
              v-model="warehouseFormData.vehicleStorageType"
              multiple
              collapse-tags
              placeholder="请选择" @change="vehicleStorageTypeChange">
              <el-option
                v-for="item in options.accurate_reservoir_models"
                :key="item.tsDataDicId"
                :label="item.name"
                :value="item.tsDataDicId">
              </el-option>
            </el-select>
          </div>
          <div class="input-box">
            <label class="input-label">场地类型</label>
            <el-select
              v-model="warehouseFormData.fieldTypeList"
              multiple
              collapse-tags
              placeholder="请选择" @change="fieldTypeChange">
              <el-option
                v-for="item in options.site_type"
                :key="item.tsDataDicId"
                :label="item.name"
                :value="item.tsDataDicId">
              </el-option>
            </el-select>
          </div>
          <div class="search-box">
            <div class="search-reset" @click="warehouseClean"><span class="img-reset">清空</span></div>
            <div class="search-sub" @click="warehouseSearch"><span class="img-sub">搜索</span></div>
          </div>
        </div>
      </div>
    </el-header>

    <div class="btn-group clearfix">
      <div class="btn-add" @click="addRouterPage"><span class="img-add">新增</span></div>
      <div class="btn-del" @click="warehouseDelete"><span class="img-del">删除</span></div>
    </div>
    <el-main class="table" style='padding: 10px;'>
      <Table :data='tableData'
        @handleEdit="handleEdit"
        @handleLook="handleLook"
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
  import deepClone from 'deep-clone'
  import Table from "@/components/Table"
  import { confirmPop, w200 }from "@/common/config/utils"
  import { loadDicValList } from "@/common/config/api/basic"
  import {
    wareHouseQuerryAllApi,
    wareHouseGetByIdApi,
    wareHouseInitApi,
    getwareHouseByDivisionIdApi,
    wareHouseInsertApi,
    wareHouseDeleteApi,
    wareHouseUpdateApi,
    wareHouseDoorApi,
    wareHouseAreaApi,
    wareHouseNameAllApi
  } from '@/common/config/api/InfoBase';

  export default {
    name: "Warehouse",
    components: { Table },
    watch: {
      options: {
        handler: function(val) {
        },
        deep: true
      }
    },
    computed:{
      options: {
        get(){
          return this.$store.state.codeOptions.options;
        }
      }
    },
    data() {
      return {
        currentPage: 1,
        pageSizeNum: 30,
        pop: false,
        flag: 0,// 根据仓库名称查询传1，根据仓库类型查询传2，根据仓储类型查询传3，根据准储车型查询传4，根据场地类型查询传5，其他传0 ,
        componyDialogVisible: false,
        divisionTableData: [],
        warehouseList: [],
        cloneFormData: {},
        tableData: {
          selectShow: true,
          currentPage: 1,
          tableHeight: 0,
          total: 0,
          clientHeight: 0,
          listData: [],
          tableHead: [
            {
              name: "仓库名称",
              value: 'wareHouseName',
              width: w200
            },
            {
              name: "市",
              value: 'cityName',
            },
            {
              name: "仓库类型",
              value: 'wareHouseType',
            },
            {
              name: "仓储类型",
              value: 'storageType',
            },
            {
              name: "仓库面积",
              value: 'wareHouseArea',
            },
            {
              name: "准储车型",
              value: 'vehicleStorageType',
            },
            {
              name: "场地类型",
              value: 'fieldType',
            },
            {
              name: "标准库位数",
              value: 'vehicleStorageNum',
              width: '100'
            },
            {
              name: "最大库位数",
              value: 'vehicleStorageMaxNum',
              width: '100'
            },
            {
              name: "大门数",
              value: 'doorNum',
            },
            {
              name: "工厂名称",
              value: 'factoryName',
              width: w200,
            },
            {
              name: "公司名称",
              value: 'companyName',
              width: w200
            },
            {
              name: "事业部名称",
              value: 'divisionName',
              width: w200
            },
            {
              name: "地址",
              value: 'address',
              width: w200
            }
          ],
          operations: [
            {
              label: '操作',
              width: '100',
              data: [
                {
                  label: '编辑',
                  Fun: 'handleEdit',
                  type:'editor',
                  size: 'mini',
                  id: '1',
                  classname: 'show',
                  icon: 'icon-edit'
                }
              ]
            }
          ],
        },
        warehouseFormData: {
          tsWareHouseIdList: null, //仓库ID
          fieldTypeList: [], //场地类型
          storageTypeList: [], //仓储类型
          wareHouseTypeList: [], //仓库类型
          vehicleStorageType: [], //准储车型
          wareHouseName: [],//仓库名称
          address: null, //地址
          vehicleStorageMaxNumMax: null, //最大库位数
          vehicleStorageMaxNumMin: null,
          vehicleStorageNumMax: null, //标准库位数
          vehicleStorageNumMin: null,
          warehouseAreaMax: null,//仓库面积
          warehouseAreaMin: null
        },
        selectCheckedId: [], //表格选中的值
        tableActiveStatus: '', //表格操作（事件）的属性
         // 数字字典
        allSelectDataObj: {
          siteTypeList: [], //场地类型
          warehouseTypeList: [], //仓库类型
          storageTypeList: [], //仓储类型
          accurateReservoirModelsList: [], //准储车型
          transportationModeT: [], //运输准出入车型:transportation_mode2
          rfidList: [], //RFID编号
        }
      }
    },
    methods: {
      //分页
      handleSizeChange(val) {},
      searchMore() {
        this.pop = !this.pop;
        if(this.warehouseFormData.wareHouseName.length > 0 || this.warehouseFormData.wareHouseTypeList.length > 0 || this.warehouseFormData.storageTypeList.length > 0 || this.warehouseFormData.vehicleStorageType.length > 0 || this.warehouseFormData.fieldTypeList.length > 0){
          this.pop = false;
        }
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.warehouseTableList();
      },
      //搜索查询
      warehouseSearch(fromData){
        this.warehouseTableList();
      },
      //清除表单搜索值
      warehouseClean(fromData){
        this.warehouseFormData = {
          fieldTypeList: [], //场地类型
          storageTypeList: [], //仓储类型
          tsWareHouseIdList: null, //仓库ID
          wareHouseTypeList: [], //仓库类型
          vehicleStorageType: [], //准储车型
          wareHouseName: [],//仓库名称
          address: null, //地址
          vehicleStorageMaxNumMax: null, //最大库位数
          vehicleStorageMaxNumMin: null,
          vehicleStorageNumMax: null, //标准库位数
          vehicleStorageNumMin: null,
          warehouseAreaMax: null,//仓库面积
          warehouseAreaMin: null
        };
        // this.warehouseTableList();
      },
      handleSelectionChange(val) {
        this.selectCheckedId = val;
      },
      //新增
      addRouterPage() {
        this.$router.push({
          path: "/WarehouseAdd",
        });
      },
      handleEdit(itemData){
        this.$router.push({
          path: "/WarehouseEdit",
          query: {
            id: itemData.row.tsWareHouseId
          }
        });
      },
       //查看
      handleLook(itemData) {
         this.$router.push({
          path: "/WarehouseCheck",
          query: {
            id: itemData.row.tsWareHouseId
          }
        });
      },
      handleDelData() {
        var idList = [];
        for(var row in this.selectCheckedId) {
          idList.push(this.selectCheckedId[row].tsWareHouseId + '')
        }
        wareHouseDeleteApi({tsWareHouseIds: idList}).then(res => {
          if(res.success) {
            this.warehouseTableList();
            this.feedMessage('success',res.repMsg);
          }
        })
      },
      warehouseDelete() {
        if(this.selectCheckedId.length < 1) {
          this.feedMessage('warning', '请选择要删除的数据！');
          return false;
        }
        confirmPop('确认删除',this.handleDelData)
      },
      warehouseSelectList() {
        wareHouseNameAllApi({}).then( res => {
          if(res.repData){
            this.warehouseList = res.repData;
          }
        })
      },
        //仓库列表接口
      warehouseTableList() {
        // var p = this.warehouseFormData;
        // 根据仓库名称查询传1，根据仓库类型查询传2，根据仓储类型查询传3，根据准储车型查询传4，根据场地类型查询传5，其他传0 ,
        if(this.warehouseFormData.wareHouseName.length > 0){
          this.flag = 1;
        }else if(this.warehouseFormData.wareHouseTypeList.length > 0){
          this.flag = 2;
        }else if(this.warehouseFormData.storageTypeList.length > 0){
          this.flag = 3;
        }else if(this.warehouseFormData.vehicleStorageType.length > 0){
          this.flag = 4;
        }else if(this.warehouseFormData.fieldTypeList.length > 0){
          this.flag = 5;
        }else{
          this.flag = 0;
        }
        var p = {
          pageNum: this.currentPage,
          pageSize: this.pageSizeNum,
          flag: this.flag,
          address: this.warehouseFormData.address,

          tsWareHouseIdList: this.warehouseFormData.wareHouseName.length > 0 ? this.warehouseFormData.wareHouseName : null,//仓库ID
          fieldTypeList: this.warehouseFormData.fieldTypeList.length > 0 ? this.warehouseFormData.fieldTypeList : null,//场地类型
          storageTypeList: this.warehouseFormData.storageTypeList.length > 0 ? this.warehouseFormData.storageTypeList : null ,//仓储类型
          wareHouseTypeList: this.warehouseFormData.wareHouseTypeList.length > 0 ? this.warehouseFormData.wareHouseTypeList : null,
          vehicleStorageTypeList: this.warehouseFormData.vehicleStorageType.length > 0 ? this.warehouseFormData.vehicleStorageType : null,

          vehicleStorageMaxNumMax: this.warehouseFormData.vehicleStorageMaxNumMax,
          vehicleStorageMaxNumMin: this.warehouseFormData.vehicleStorageMaxNumMin,
          vehicleStorageNumMax: this.warehouseFormData.vehicleStorageNumMax,
          vehicleStorageNumMin: this.warehouseFormData.vehicleStorageNumMin,
          warehouseAreaMax: this.warehouseFormData.warehouseAreaMax,
          warehouseAreaMin: this.warehouseFormData.warehouseAreaMin,
        }
        if(p.vehicleStorageMaxNumMax > 99999 || p.vehicleStorageMaxNumMin > 99999 || p.vehicleStorageMaxNumMin > 99999 || p.vehicleStorageNumMax > 99999 || p.warehouseAreaMax > 99999 || p.tsWareHouseIdList > 99999) {
            return this.feedMessage('error', '标准库位数、最大库位数、仓库面积不能大于99999！')
          }
        if(p.vehicleStorageMaxNumMax || p.vehicleStorageMaxNumMin || p.vehicleStorageNumMax || p.vehicleStorageNumMin || p.warehouseAreaMax || p.warehouseAreaMin) {
          let reg = /^\+?[1-9][0-9]*$/;
          if(p.vehicleStorageMaxNumMax && !reg.test(p.vehicleStorageMaxNumMax) || p.vehicleStorageMaxNumMin && !reg.test(p.vehicleStorageMaxNumMin) ) {
            this.feedMessage('error', '最大库位数必须是正整数');
            return false;
          }
          if(p.vehicleStorageNumMax && !reg.test(p.vehicleStorageNumMax) || p.vehicleStorageNumMin && !reg.test(p.vehicleStorageNumMin) ) {
            this.feedMessage('error', '标准库位数必须是正整数');
            return false;
          }
          let regT = /^\d+(\.\d{1,2})?$/;
          if(p.warehouseAreaMax && !regT.test(p.warehouseAreaMax) || p.warehouseAreaMin && !regT.test(p.warehouseAreaMin)){
            this.feedMessage('error', '仓库面积必须是正整数或两位小数');
            return false;
          }
          if(p.vehicleStorageMaxNumMax < p.vehicleStorageMaxNumMin) {
            this.feedMessage('error', '请输入有效的最大库位数区间！');
            return false;
          }
          if(p.vehicleStorageNumMax < p.vehicleStorageNumMin) {
            this.feedMessage('error', '请输入有效的标准库位数区间！');
            return false;
          }
           if(p.warehouseAreaMax < p.warehouseAreaMin) {
            this.feedMessage('error', '请输入有效的仓库面积区间！');
            return false;
          }
        }
        wareHouseQuerryAllApi(p).then( res => {
          if(res.success){
            this.tableData.listData    = res.repData.list;
            this.tableData.total       = res.repData.total;
          }
        })
      },
      clearValue() {
        this.warehouseFormData.address = null;
        this.warehouseFormData.vehicleStorageMaxNumMax = null;
        this.warehouseFormData.vehicleStorageMaxNumMin = null;
        this.warehouseFormData.vehicleStorageNumMax = null;
        this.warehouseFormData.vehicleStorageNumMin = null;
        this.warehouseFormData.warehouseAreaMax = null;
        this.warehouseFormData.warehouseAreaMin = null;
      },
      //-------------------------------------------------------------------筛选条件
      wareHouseChange(val){
        this.warehouseFormData.wareHouseTypeList = [];
        this.warehouseFormData.storageTypeList = [];
        this.warehouseFormData.vehicleStorageType = [];
        this.warehouseFormData.fieldTypeList = [];
        this.clearValue();
      },
      wareHouseTypeChange(){
        this.warehouseFormData.wareHouseName = [];
        this.warehouseFormData.storageTypeList = [];
        this.warehouseFormData.vehicleStorageType = [];
        this.warehouseFormData.fieldTypeList = [];
        this.clearValue();
      },
      storageTypeChange(val){
        this.warehouseFormData.wareHouseName = [];
        this.warehouseFormData.wareHouseTypeList = [];
        this.warehouseFormData.vehicleStorageType = [];
        this.warehouseFormData.fieldTypeList = [];
        this.clearValue();
      },
      vehicleStorageTypeChange(){
        this.warehouseFormData.wareHouseName = [];
        this.warehouseFormData.wareHouseTypeList = [];
        this.warehouseFormData.storageTypeList = [];
        this.warehouseFormData.fieldTypeList = [];
        this.clearValue();
      },
      fieldTypeChange(){
         this.warehouseFormData.wareHouseName = [];
        this.warehouseFormData.wareHouseTypeList = [];
        this.warehouseFormData.storageTypeList = [];
        this.warehouseFormData.vehicleStorageType = [];
        this.clearValue();
      },
       //下拉数据字典
      allSelectListData() {
        //场地类型:site_type
        loadDicValList({
          "code": "site_type"
        }).then(res => {
          if (res.success) {
            this.allSelectDataObj.siteTypeList = res.repData;
          }
        })
        //仓库类型:warehouse_type
        loadDicValList({
          "code": "warehouse_type"
        }).then(res => {
          if (res.success) {
            this.allSelectDataObj.warehouseTypeList = res.repData;
          }
        })
        //仓储类型:storage_type
        loadDicValList({
          "code": "storage_type"
        }).then(res => {
          if (res.success) {
            this.allSelectDataObj.storageTypeList = res.repData;
          }
        })
        //准储车型:accurate_reservoir_models
        loadDicValList({
          "code": "accurate_reservoir_models"
        }).then(res => {
          if (res.success) {
            this.allSelectDataObj.accurateReservoirModelsList = res.repData;
          }
        })
        ///运输准出入车型:transportation_mode2
        loadDicValList({
          "code": "transportation_mode2"
        }).then(res => {
          if (res.success) {
            this.allSelectDataObj.transportationModeT = res.repData;
          }
        })
        // console.log('下拉数据字典-----', this.allSelectDataObj)
      }
    },
    mounted() {
      this.warehouseTableList();
      this.allSelectListData(); //数字字典
    },
    created() {
      this.warehouseSelectList();
    }
  }
</script>

<style scoped lang="less">
</style>
