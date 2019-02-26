<!--库位管理-->
<template>
  <el-container style="width: 100%;height: 100%;">
    <el-header style="height: auto; padding: 0;">
      <!-- search-group -->
      <div class="search-group clearfix">
        <!--搜索-->
        <div class="clearfix">
          <!-- 多选下拉框 -->
          <div class="input-box">
            <label class="input-label">仓库名称</label>
            <el-select
              @change="tsWareHouseFunctionAreaData"
              v-model="formData.tsWareHouseIds"
              multiple
              collapse-tags
              placeholder="请选择仓库名称">
              <el-option
                v-for="item in option.tsWareHouseIdList"
                :key="item.tsWareHouseId"
                :label="item.wareHouseName"
                :value="item.tsWareHouseId">
              </el-option>
            </el-select>
          </div>
          <div class="input-box">
            <label class="input-label">功能区</label>
            <el-select
              multiple
              collapse-tags
              v-model="formData.tsWareHouseFunctionAreaIds"
              placeholder="请选择功能区">
              <el-option
                v-for="item in option.tsWareHouseFunctionAreaIdList"
                :key="item.tsWareHouseFunctionAreaId"
                :label="item.functionAreaName"
                :value="item.tsWareHouseFunctionAreaId">
              </el-option>
            </el-select>
          </div>
          <div class="input-box">
            <label class="input-label">库位号</label>
            <el-input placeholder="请输入库位号" clearable v-model="formData.storageLocationNo"></el-input>
          </div>
          <div class="search-box">
            <div class="search-reset" @click="resets"><span class="img-reset">清空</span></div>
            <div class="search-sub" @click="search"><span class="img-sub">搜索</span></div>
          </div>
        </div>
      </div>
      <!-- btn-group -->
      <div class="btn-group clearfix">
        <div class="btn-add" @click="newAddLocation"><span class="img-add">新增</span></div>
        <div class="btn-del" @click="handleDel"><span class="img-del">删除</span></div>
        <!--<div class="btn-import" @click="handleImport"><span class="img-import">导入</span></div>-->
        <UploadExcel @handle-success="importSuccess"></UploadExcel>
      </div>
    </el-header>
    <el-main class="table" style='padding: 10px;'>
      <Table :data='tableData'
             @handleEdit="handleEdit"
             @handleLook="handleLook"
             @selection-change="handleSelectionChange" @size-change="handleSizeChange"
             @current-change="handleCurrentChange">
      </Table>
    </el-main>
    <!--新增弹框 编辑 -->
    <el-dialog title="库位信息" :visible.sync="popAddVisible" width="680px" :close-on-click-modal="false" align="center">
      <div class="clearfix">
        <div class="input-box">
          <label class="input-label"><span>*</span>所属事业部</label>
          <el-select v-model="addData.tsDivisionId" placeholder="请选择所属事业部" @change="divisionChange">
            <el-option
              v-for="item in option.divisionList"
              :key="item.tsDivisionId"
              :label="item.divisionName"
              :value="item.tsDivisionId">
            </el-option>
          </el-select>
        </div>
        <div class="input-box">
          <label class="input-label"><span>*</span>所属公司：</label>
          <el-select v-model="addData.tsCompanyId" placeholder="请选择所属公司" @change="companyChange">
            <el-option
              v-for="item in option.companyList"
              :key="item.tsCompanyId"
              :label="item.companyName"
              :value="item.tsCompanyId">
            </el-option>
          </el-select>
        </div>
        <div class="input-box">
          <label class="input-label"><span>*</span>所属工厂</label>
          <el-select v-model="addData.tsFactoryId" placeholder="请选择所属工厂" @change="factoryChange">
            <el-option
              v-for="item in option.factoryList"
              :key="item.tsFactoryId"
              :label="item.factoryName"
              :value="item.tsFactoryId">
            </el-option>
          </el-select>
        </div>
        <!-- 单选下拉框 -->
        <div class="input-box">
          <label class="input-label"><span>*</span>所属仓库</label>
          <el-select v-model="addData.tsWareHouseId" placeholder="请选择所属仓库" @change="wareHouseChange">
            <el-option
              v-for="item in option.warehouseList"
              :key="item.tsWareHouseId"
              :label="item.wareHouseName"
              :value="item.tsWareHouseId"
              :disabled="forbid">
            </el-option>
          </el-select>
        </div>
        <div class="input-box">
          <label class="input-label"><span>*</span>功能区名称</label>
          <el-select v-model="addData.tsWareHouseFunctionAreaId" placeholder="请选择功能区名称">
            <el-option
              v-for="item in option.wareHouseFunctionAreaList"
              :key="item.tsWareHouseFunctionAreaId"
              :label="item.functionAreaName"
              :value="item.tsWareHouseFunctionAreaId">
            </el-option>
          </el-select>
        </div>
        <div class="input-box">
          <label class="input-label">可接收车型</label>
          <el-select
            v-model="addData.receivableVehicleType"
            multiple
            collapse-tags
            placeholder="请选择可接收车型">
            <el-option
              v-for="item in option.receivableVehicleTypeList"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </div>
        <div class="input-box add-input">
          <label class="input-label"><span>*</span>库位号</label>
          <el-input placeholder=""  v-model="addData.rowNo" style="width: 82px" ></el-input>
          <span style="float: left;line-height: 40px;font-size: 20px;color: #aaa;margin: 0 5px">-</span>
          <el-input placeholder=""  v-model="addData.colNo" style="width: 41px"></el-input>
          <span style="float: left;line-height: 40px;font-size: 20px;color: #aaa;margin: 0 5px">-</span>
          <el-input placeholder=""  v-model="addData.tierNo" style="width: 41px"></el-input>
        </div>
        <div class="input-box">
          <label class="input-label">库位行号</label>
          <el-input placeholder="请输入库位行号" clearable v-model="addData.rowNo" disabled></el-input>
        </div>
        <div class="input-box">
          <label class="input-label">库位列号</label>
          <el-input placeholder="请输入库位列号" clearable v-model="addData.colNo" disabled></el-input>
        </div>
        <div class="input-box">
          <label class="input-label">库位层号</label>
          <el-input placeholder="请输入库位层号" clearable v-model="addData.tierNo" disabled></el-input>
        </div>
        <div class="input-box">
          <label class="input-label">仓库面积</label>
          <el-input placeholder="请输入仓库面积" clearable v-model="addData.area"></el-input>
        </div>
        <div class="input-box">
          <label class="input-label">库位状态</label>
          <el-select v-model="addData.status" placeholder="请选择库位状态">
            <el-option
              v-for="item in option.storageLocationList"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </div>
        <div class="input-box" style="width: 300px;line-height: 40px">
          <el-checkbox v-model="addData.isMixable" style="margin-left: 30px">是否混放</el-checkbox>
          <el-checkbox v-model="addData.isDisabled">是否禁用</el-checkbox>
        </div>
        <div class="input-box">
          <label class="input-label">库位长度</label>
          <el-input placeholder="请输入库位长度" clearable v-model="addData.length"></el-input>
        </div>
        <div class="input-box">
          <label class="input-label">库位高度</label>
          <el-input placeholder="请输入库位高度" clearable v-model="addData.height"></el-input>
        </div>
        <div class="input-box">
          <label class="input-label">库位宽度</label>
          <el-input placeholder="请输入库位宽度" clearable v-model="addData.width"></el-input>
        </div>
        <div class="input-box">
          <label class="input-label">销售区域</label>
          <el-select v-model="addData.salesArea" placeholder="请选择销售区域">
            <el-option
              v-for="item in options.sales_area"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </div>
        <div class="input-box">
          <label class="input-label">运输车型</label>
          <el-select v-model="addData.transportType" placeholder="请选择运输车型">
            <el-option
              v-for="item in option.transportTypeList"
              :key="item.value"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </div>
      </div>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button plain style="background: #fff;border-color: #67A0FF;color: #67A0FF" @click="cancleBack">返回</el-button>
        <el-button type="primary" @click="serviceAddSaveData">保存</el-button>
      </div>
    </el-dialog>
    <!--查看详情-->
    <el-dialog title="库位信息" :visible.sync="popDetailVisible" width="680px" :close-on-click-modal="false" align="center">
      <div class="clearfix">
        <div class="input-box">
          <label class="input-label"><span>*</span>所属事业部</label>
          <el-input placeholder="" clearable v-model="lookData.divisionName" disabled></el-input>
        </div>
        <div class="input-box">
          <label class="input-label"><span>*</span>所属公司：</label>
          <el-input placeholder="" clearable v-model="lookData.companyName" disabled></el-input>
        </div>
        <div class="input-box">
          <label class="input-label"><span>*</span>所属工厂</label>
          <el-input placeholder="" clearable v-model="lookData.factoryName" disabled></el-input>
        </div>
        <div class="input-box">
          <label class="input-label"><span>*</span>所属仓库</label>
          <el-input placeholder="" clearable v-model="lookData.wareHouseName" disabled></el-input>
        </div>
        <div class="input-box">
          <label class="input-label"><span>*</span>功能区名称</label>
          <el-input placeholder="" clearable v-model="lookData.functionAreaName" disabled></el-input>
        </div>
        <div class="input-box">
          <label class="input-label">可接收车型</label>
          <el-input placeholder="" clearable v-model="lookData.receivableVehicleType" disabled></el-input>
        </div>
        <div class="input-box add-input">
          <label class="input-label"><span>*</span>库位号</label>
          <el-input placeholder=""  v-model="lookData.rowNo" style="width: 82px" disabled></el-input>
          <span style="float: left;line-height: 40px;font-size: 20px;color: #aaa;margin: 0 5px">-</span>
          <el-input placeholder=""  v-model="lookData.colNo" style="width: 41px" disabled></el-input>
          <span style="float: left;line-height: 40px;font-size: 20px;color: #aaa;margin: 0 5px">-</span>
          <el-input placeholder=""  v-model="lookData.tierNo" style="width: 41px" disabled></el-input>
        </div>
        <div class="input-box">
          <label class="input-label">库位行号</label>
          <el-input placeholder="请输入库位行号" clearable v-model="lookData.rowNo" disabled></el-input>
        </div>
        <div class="input-box">
          <label class="input-label">库位列号</label>
          <el-input placeholder="" clearable v-model="lookData.colNo" disabled></el-input>
        </div>
        <div class="input-box">
          <label class="input-label">库位层号</label>
          <el-input placeholder="" clearable v-model="lookData.tierNo" disabled></el-input>
        </div>
        <div class="input-box">
          <label class="input-label">仓库面积</label>
          <el-input placeholder="" clearable v-model="lookData.area" disabled></el-input>
        </div>
        <div class="input-box">
          <label class="input-label">库位状态</label>
          <el-input placeholder="" clearable v-model="lookData.statusName" disabled></el-input>
        </div>
        <div class="input-box" style="width: 300px;line-height: 40px">
          <el-checkbox v-model="lookData.isMixable" style="margin-left: 30px" disabled>是否混放</el-checkbox>
          <el-checkbox v-model="lookData.isDisabled" disabled>是否禁用</el-checkbox>
        </div>
        <div class="input-box">
          <label class="input-label">库位长度</label>
          <el-input placeholder="" clearable v-model="lookData.length" disabled></el-input>
        </div>
        <div class="input-box">
          <label class="input-label">库位高度</label>
          <el-input placeholder="" clearable v-model="lookData.height" disabled></el-input>
        </div>
        <div class="input-box">
          <label class="input-label">库位宽度</label>
          <el-input placeholder="" clearable v-model="lookData.width" disabled></el-input>
        </div>
        <div class="input-box">
          <label class="input-label">销售区域</label>
          <el-input placeholder="" clearable v-model="lookData.salesAreaName" disabled></el-input>
        </div>
        <div class="input-box">
          <label class="input-label">运输车型</label>
          <el-input placeholder="" clearable v-model="lookData.transportTypeName" disabled></el-input>
        </div>
      </div>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button plain style="background: #fff;border-color: #67A0FF;color: #67A0FF" @click="cancleBack">返回</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
  import Table from "@/components/Table"
  import {loadDicValList} from "@/common/config/api/basic"
  import {loadLocationList,loadLocationAdd,loadLocationInit,loadLocationDel,loadLocationEdit,loadLocationDetail,divisionAll,companyLoadData,getCompanyByDivisionIdApi,factory,wareHouse,wareHouseAreaListByTsWareHouse,wareHouseQuerryAllApi,loadLocationImport} from "@/common/config/api/InfoBase"
  import {getSplitString,confirmPop,exportFile,w150,w120}from "@/common/config/utils"
  import UploadExcel from "@/components/UploadExcel"

  export default {
    name: "Location",
    components: {
      Table,
      UploadExcel
    },
    data() {
      return {
        total: 0,
        pop: false,
        popAddVisible: false,
        forbid: false,
        isEdit: false,
        popDetailVisible: false,
        selectRows: [], //选中数据
        tableData: {
          selectShow: true,
          tableHeight: 0,
          currentPage: 1,
          total: 0, //列表总数
          listData: [],
          tableHead: [
            {
              name: "仓库名称",
              value: 'wareHouseName'
            },
            {
              name: "功能区",
              value: 'functionAreaName',
              width: w120,
            },
            {
              name: "库位号",
              value: 'storageLocationNo',
              width: w150
            },
            {
              name: "库位状态",
              value: 'statusName',
              width: '120'
            },
            {
              name: "库位面积",
              value: 'area'
            },
            {
              name: "所属事业部",
              value: 'divisionName',
              width: '180'
            },
            {
              name: "所属公司",
              value: 'companyName',
              width: '180'
            },
            {
              name: "所属工厂",
              value: 'factoryName',
              width: '180'
            }
          ],
          operations: [
            {
              label: '操作',
              width: '120',
              data: [
                {
                  icon: 'icon-edit',
                  Fun: 'handleEdit',
                  id: '1',
                },{
                  icon: 'icon-eye',
                  Fun: 'handleLook',
                  id: '2',
                }

              ]
            }
          ],
        },
        option: {
          divisionList: [], //所属事业部
          companyList: [], //所属公司
          factoryList: [], //所属工厂
          warehouseList: [], //所属仓库
          wareHouseFunctionAreaList: [], //所属功能区
          receivableVehicleTypeList: [], //可接收车型
          salesAreaList: [], //销售区域
          storageLocationList: [], //库位状态
          tsWareHouseIdList: [], //仓库
          tsWareHouseFunctionAreaIdList: [], //功能区
          transportTypeList: [], //运输车型
        },
        //查询参数
        formData: {
          storageLocationNo: '', //库位号
          tsWareHouseIds: [], //仓库ID
          tsWareHouseFunctionAreaIds: [] //功能区ID
        },
        //新增 、 编辑 弹框
        addData: {
          area: '', //库位面积 ,
          colNo: '', //库位列号 ,
          createBy: '', // 创建人 ,
          height: '', // 库位高度 ,
          isDisabled: '', //是否禁用 ,
          isMixable: '', //是否混放 ,
          length: '', //库位长度 ,
          receivableVehicleType: [], //可接收车型 ,
          rowNo: '', //库位行号 ,
          salesArea: '', //销售区域 ,
          status: '', //库位状态 ,
          statusName: '',//库位状态
          storageLocationNo: '', //库位号 ,
          tierNo: '', //库位层号 ,
          transportType: '', //运输类型 ,
          tsDivisionId: '', //事业部ID ,
          divisionName: '',//事业部
          tsCompanyId: '', //公司ID ,
          companyName: '', //公司
          tsFactoryId: '', //工厂ID ,
          factoryName: '', //工厂
          tsWareHouseFunctionAreaId: '', //功能区ID ,
          wareHouseName: '', //功能区
          tsWareHouseId: '', //仓库ID ,
          functionAreaName: '',
          tsStorageLocationId: '', //库位ID
          width: '' //库位宽度
        },
        lookData: {
          area: '', //库位面积 ,
          colNo: '', //库位列号 ,
          createBy: '', // 创建人 ,
          height: '', // 库位高度 ,
          isDisabled: '', //是否禁用 ,
          isMixable: '', //是否混放 ,
          length: '', //库位长度 ,
          receivableVehicleType: [], //可接收车型 ,
          rowNo: '', //库位行号 ,
          salesAreaName: '', //销售区域 ,
          status: '', //库位状态 ,
          statusName: '',//库位状态
          storageLocationNo: '', //库位号 ,
          tierNo: '', //库位层号 ,
          transportTypeName: '', //运输类型 ,
          tsDivisionId: '', //事业部ID ,
          divisionName: '',//事业部
          tsCompanyId: '', //公司ID ,
          companyName: '', //公司
          tsFactoryId: '', //工厂ID ,
          factoryName: '', //工厂
          tsWareHouseFunctionAreaId: '', //功能区ID ,
          wareHouseName: '', //功能区
          tsWareHouseId: '', //仓库ID ,
          functionAreaName: '',
          tsStorageLocationId: '', //库位ID
          width: '' //库位宽度
        },

      }
    },
    methods: {
      handleSelectionChange(val) {
        this.selectRows = val;
      },
      //分页
      handleSizeChange(val) {
      },
      handleCurrentChange(val) {
        this.tableData.currentPage = val;
        this.loadDataList();
      },
      //搜索
      search(){
        this.tableData.currentPage = 1;
        this.loadDataList();
      },
      //清空数据
      resets(){
        this.formData.storageLocationNo = ''; //库位号
        this.formData.tsWareHouseIds = [];
        this.formData.tsWareHouseFunctionAreaIds = [];
      },
      searchMore() {
        this.pop = !this.pop
      },
      // //创建弹框
      newAddLocation(){
        this.popAddVisible = true;
        this.isEdit = false;
        let arr = Object.keys(this.addData); //清空
        for(let k of arr){
          this.addData[k] = '';
        }
        this.addData.receivableVehicleType = []
        this.locationInitData();
      },
      //删除
      handleDel(){
        if(this.selectRows.length == 0){
          this.msgInfo('至少勾选一条数据');
          return;
        }
        confirmPop('确认删除',this.handleDelData)
      },
      //编辑弹框
      handleEdit(data){
        let self = this;
        self.locationInitData();
        self.popAddVisible = true;
        self.isEdit = true;
         let p = {
          storageLocationNo: data.row.storageLocationNo, //库位号 ,
          tsStorageLocationId:  data.row.tsStorageLocationId, //库位ID
          tsWareHouseId:  data.row.tsWareHouseId //仓库ID
        }
        loadLocationDetail(p).then(res => {
          let result = res.repData
          self.addData.tsDivisionId = String(result.tsDivisionId); //所属事业部
          self.addData.tsCompanyId = String(result.tsCompanyId); //所属公司
          self.addData.tsFactoryId = String(result.tsFactoryId); //所属工厂
          self.addData.tsWareHouseId = String(result.tsWareHouseId); //仓库ID
          self.addData.tsStorageLocationId = result.tsStorageLocationId; //库位ID
          self.addData.tsWareHouseFunctionAreaId = String(result.tsWareHouseFunctionAreaId); //功能区
          self.addData.rowNo = result.rowNo; //库位行号
          self.addData.tierNo = result.tierNo; //库位层号
          self.addData.colNo = result.colNo; //库位列号
          self.addData.receivableVehicleType =result.receivableVehicleType ? getSplitString(result.receivableVehicleType) : []; //可接收车型
          self.addData.area = result.area; //库位面积
          self.addData.height = result.height; //库位高度
          self.addData.width = result.width; //库位宽度
          self.addData.length = result.length; //库位长度
          self.addData.isDisabled = result.isDisabled == 1 ? true : false; //是否禁用
          self.addData.isMixable = result.isMixable == 1 ? true : false; //是否混放
          self.addData.status = result.status? String(result.status) : ""; //库位状态
          self.addData.salesArea = String(result.salesArea); //销售区域
          self.addData.transportType = String(result.transportType); //运输类型
        })
          getCompanyByDivisionIdApi({tsDivisionId: data.row.tsDivisionId}).then(res => {
           self.option.companyList = res.repData
        })
        factory({tsCompanyId: data.row.tsCompanyId}).then(res => {
          self.option.factoryList = res.repData
        })
        wareHouse({tsFactoryId: data.row.tsFactoryId}).then(res => {
          self.option.warehouseList = res.repData
        })
        wareHouseAreaListByTsWareHouse({tsWareHouseId: data.row.tsWareHouseId}).then(res => {
          self.option.wareHouseFunctionAreaList = res.repData
        })
      },
      //保存
      serviceAddSaveData(){
        if(this.isEdit){
          this.handleEditData();
        }else{
          this.addSaveData();
        }
      },
      cancleBack(){
        this.popAddVisible = false;
        this.popDetailVisible = false;
      },

      //////////////////////////////////////////////////////////////////////////////////
      //所属事业部改变选择
      divisionChange(val) {
        this.addData.tsCompanyId = '';
        this.addData.tsFactoryId = '';
        this.addData.tsWareHouseId = '';
        this.addData.tsWareHouseFunctionAreaId = '';
        this.option.companyList = [];
        this.option.factoryList = [];
        this.option.warehouseList = [];
        this.option.wareHouseFunctionAreaList = [];
        getCompanyByDivisionIdApi({tsDivisionId: val}).then(res => {
          this.option.companyList = res.repData
        })
      },
      //所属公司改变选择
      companyChange(val) {
        this.addData.tsFactoryId = '';
        this.addData.tsWareHouseId = '';
        this.addData.tsWareHouseFunctionAreaId = '';
        this.option.factoryList = [];
        this.option.warehouseList = [];
        this.option.wareHouseFunctionAreaList = [];
        factory({tsCompanyId: val}).then(res => {
          this.option.factoryList = res.repData
        })
      },
      //所属工厂改变选择
      factoryChange(val) {
        this.addData.tsWareHouseId = '';
        this.addData.tsWareHouseFunctionAreaId = '';
        this.option.warehouseList = [];
        this.option.wareHouseFunctionAreaList = [];
        wareHouse({tsFactoryId: val}).then(res => {
          this.option.warehouseList = res.repData
        })
      },
      //所属仓库改变选择
      wareHouseChange(val) {
        this.addData.tsWareHouseFunctionAreaId = '';
        this.option.wareHouseFunctionAreaList = [];
        wareHouseAreaListByTsWareHouse({tsWareHouseId: val}).then(res => {
          this.option.wareHouseFunctionAreaList = res.repData
        })
      },

      /*///////////////////////////////////////////////////////////////////////////////////////////////*/
      //列表接口
      loadDataList() {
        let self = this;
        let p = {
          pageNum: self.tableData.currentPage,
          pageSize: 30,
          storageLocationNo: self.formData.storageLocationNo, //库位号
          tsWareHouseFunctionAreaIds: self.formData.tsWareHouseFunctionAreaIds, //功能区ID
          tsWareHouseIds: self.formData.tsWareHouseIds //仓库ID
        }
        loadLocationList(p).then(res => {
          if(res.repData){
            self.tableData.listData = res.repData.list;
            self.tableData.total = res.repData.total;
          }
        })
      },
      //初始化接口
      locationInitData(){
        let self = this;
        let p = {}
        loadLocationInit(p).then(res => {
          self.option.receivableVehicleTypeList = res.repData.receivableVehicleTypeList; //可接收车型
          self.option.storageLocationList = res.repData.storageLocationList; //库位状态
          self.option.transportTypeList = res.repData.transportTypeList; //运输类型
        })
      },
      //新增库位接口
      addSaveData(){
        let self = this;
        if(!self.addData.tsDivisionId){
          self.msgInfo('请输入所属事业部')
          return
        }
        if(!self.addData.tsCompanyId){
          self.msgInfo('请输入所属公司')
          return
        }
        if(!self.addData.tsFactoryId){
          self.msgInfo('请输入所属工厂')
          return
        }
        if(!self.addData.tsWareHouseId){
          self.msgInfo('请输入所属仓库')
          return
        }
        if(!self.addData.tsWareHouseFunctionAreaId){
          self.msgInfo('请输入功能区名称')
          return
        }
        if(!self.addData.rowNo || !self.addData.colNo || !self.addData.tierNo ){
          self.msgInfo('请输入库位号')
          return
        }
        let reg3 = /^[0-9A-Z]+$/;
        if(self.addData.rowNo && !reg3.test(self.addData.rowNo)) {
          self.msgInfo('库位行号只能包含大写字母、数字');
          return;
        }
        let reg4 = /^(0|[1-9][0-9]*)$/;
        if(self.addData.colNo && !reg4.test(self.addData.colNo)) {
          self.msgInfo('库位列号必须是大于等于0的整数');
          return;
        }
        let reg = /^\+?[1-9][0-9]*$/;
        if(self.addData.tierNo && !reg.test(self.addData.tierNo)) {
          self.msgInfo('库位层号必须是正整数');
          return;
        }
        let reg2 = /^([1-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])$/;
        if(self.addData.area && !reg2.test(self.addData.area)) {
          self.msgInfo('仓库面积必须是大于0的数');
          return;
        }
        if(self.addData.height && !reg2.test(self.addData.height)) {
          self.msgInfo('库位高度必须是大于0的数');
          return;
        }
        if(self.addData.length && !reg2.test(self.addData.length)) {
          self.msgInfo('库位长度必须是大于0的数');
          return;
        }
        if(self.addData.width && !reg2.test(self.addData.width)) {
          self.msgInfo('库位宽度必须是大于0的数');
          return;
        }
        let p = {
          area: self.addData.area, //库位面积 ,
          colNo: self.addData.colNo, //库位列号 ,
          createBy: self.addData.createBy, // 创建人 ,
          height: self.addData.height, // 库位高度 ,
          isDisabled: self.addData.isDisabled == true ? 1 : 0, //是否禁用 ,
          isMixable: self.addData.isMixable == true ? 1 : 0, //是否混放 ,
          length: self.addData.length, //库位长度 ,
          receivableVehicleType: self.addData.receivableVehicleType.join(','), //可接收车型 ,
          rowNo: self.addData.rowNo, //库位行号 ,
          salesArea: self.addData.salesArea, //销售区域 ,
          status: self.addData.status, //库位状态 ,
          storageLocationNo: self.addData.rowNo +'-'+self.addData.colNo +'-'+ self.addData.tierNo, //库位号 ,
          tierNo: self.addData.tierNo, //库位层号 ,
          transportType: self.addData.transportType, //运输类型 ,
          tsDivisionId: self.addData.tsDivisionId, //事业部ID ,
          tsCompanyId: self.addData.tsCompanyId, //公司ID ,
          tsFactoryId: self.addData.tsFactoryId, //工厂ID ,
          tsWareHouseId: self.addData.tsWareHouseId, //仓库ID ,
          tsStorageLocationId: self.addData.tsStorageLocationId, //库位ID ,
          tsWareHouseFunctionAreaId: self.addData.tsWareHouseFunctionAreaId, //功能区ID ,
          updateBy: self.addData.updateBy, //更新人 ,
          width: self.addData.width //库位宽度
        }
        loadLocationAdd(p).then(res => {
          res && res.success && self.msgInfo(res.repMsg);
          self.popAddVisible = false;
          self.loadDataList();
        })
      },
      //查看详情接口
      handleLook(data){
        let self = this;
        let p = {
          storageLocationNo: data.row.storageLocationNo, //库位号 ,
          tsStorageLocationId:  data.row.tsStorageLocationId, //库位ID
          tsWareHouseId:  data.row.tsWareHouseId //仓库ID
        }
        loadLocationDetail(p).then(res => {
          self.lookData = res.repData;
          self.lookData.isDisabled = data.row.isDisabled == 1 ? true : false; //是否禁用
          self.lookData.isMixable = data.row.isMixable == 1 ? true : false; //是否混放
          self.popDetailVisible = true;
        })
      },
      //删除接口
      handleDelData(){
        let self = this;
        let p;
        let arr = [];
        if(self.selectRows){
          self.selectRows.forEach((item) => {
            arr.push(item.tsStorageLocationId);
          })
          p = {
            "tsStorageLocationIds": arr,//勾选时导出的列表
          }
        }
        loadLocationDel(p).then(res => {
          res && res.success && self.msgInfo(res.repMsg);
          this.loadDataList();
        })
      },
      //导入接口
      importSuccess(res){
        let self = this;
        let p = {
          "filePath": res
        }
        loadLocationImport(p).then(res => {
          res && res.success && self.msgInfo(res.repMsg);
          self.loadDataList();
        })
      },
      //编辑接口
      handleEditData(){
        let self = this;
        if(!self.addData.tsDivisionId){
          self.msgInfo('请输入所属事业部')
          return
        }
        if(!self.addData.tsCompanyId){
          self.msgInfo('请输入所属公司')
          return
        }
        if(!self.addData.tsFactoryId){
          self.msgInfo('请输入所属工厂')
          return
        }
        if(!self.addData.tsWareHouseId){
          self.msgInfo('请输入所属仓库')
          return
        }
        if(!self.addData.tsWareHouseFunctionAreaId){
          self.msgInfo('请输入功能区名称')
          return
        }
        if(!self.addData.rowNo || !self.addData.colNo || !self.addData.tierNo ){
          self.msgInfo('请输入库位号')
          return
        }
        let reg3 = /^[0-9A-Z]+$/;
        if(self.addData.rowNo && !reg3.test(self.addData.rowNo)) {
          self.msgInfo('库位行号只能包含大写字母、数字');
          return;
        }
        let reg4 = /^(0|[1-9][0-9]*)$/;
        if(self.addData.colNo && !reg4.test(self.addData.colNo)) {
          self.msgInfo('库位列号必须是大于等于0的整数');
          return;
        }
        let reg = /^\+?[1-9][0-9]*$/;
        if(self.addData.tierNo && !reg.test(self.addData.tierNo)) {
          self.msgInfo('库位层号必须是正整数');
          return;
        }
        let reg2 = /^([1-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])$/;
        if(self.addData.area && !reg2.test(self.addData.area)) {
          self.msgInfo('仓库面积必须是大于0的数');
          return;
        }
        if(self.addData.height && !reg2.test(self.addData.height)) {
          self.msgInfo('库位高度必须是大于0的数');
          return;
        }
        if(self.addData.length && !reg2.test(self.addData.length)) {
          self.msgInfo('库位长度必须是大于0的数');
          return;
        }
        if(self.addData.width && !reg2.test(self.addData.width)) {
          self.msgInfo('库位宽度必须是大于0的数');
          return;
        }
        let p = {
          area: self.addData.area, //库位面积 ,
          colNo: self.addData.colNo, //库位列号 ,
          height: self.addData.height, // 库位高度 ,
          isDisabled: self.addData.isDisabled ==true ? 1 : 0, //是否禁用 ,
          isMixable: self.addData.isMixable ==true ? 1 : 0, //是否混放 ,
          length: self.addData.length, //库位长度 ,
          receivableVehicleType: self.addData.receivableVehicleType.join(','), //可接收车型 ,
          rowNo: self.addData.rowNo, //库位行号 ,
          salesArea: self.addData.salesArea, //销售区域 ,
          status: self.addData.status, //库位状态 ,
          storageLocationNo: self.addData.rowNo +'-'+self.addData.colNo +'-'+ self.addData.tierNo, //库位号 ,
          tierNo: self.addData.tierNo, //库位层号 ,
          transportType: self.addData.transportType, //运输类型 ,
          tsCompanyId: self.addData.tsCompanyId, //公司ID ,
          tsDivisionId: self.addData.tsDivisionId, //事业部ID ,
          tsFactoryId: self.addData.tsFactoryId, //工厂ID ,
          tsWareHouseId: self.addData.tsWareHouseId, //仓库ID ,
          tsWareHouseFunctionAreaId: self.addData.tsWareHouseFunctionAreaId, //功能区ID ,
          tsStorageLocationId: self.addData.tsStorageLocationId, //库位ID
          updateBy: self.addData.updateBy, //更新人 ,
          width: self.addData.width //库位宽度
        }
        loadLocationEdit(p).then(res => {
          self.popAddVisible = false;
          res && res.success && self.msgInfo(res.repMsg);
          self.loadDataList();
        })
      },
      /*////////////////////////////////////*/
      //事业部下拉接口
      businessData(){
        divisionAll({}).then(res => {
          this.option.divisionList = res.repData.list
        })
      },
      //仓库名称下拉
      wareHouseData() {
        let p = {
          pageNum: 1,
          pageSize: 999,
        }
        wareHouseQuerryAllApi(p).then(res =>{
          this.option.tsWareHouseIdList = res.repData.list
        })
      },
      //功能区名称下拉
      tsWareHouseFunctionAreaData(val) {
        this.formData.tsWareHouseFunctionAreaIds = [];
        this.option.tsWareHouseFunctionAreaIdList = [];
        if(val.length === 1){
          wareHouseAreaListByTsWareHouse({tsWareHouseId: val[0]}).then(res =>{
            this.option.tsWareHouseFunctionAreaIdList = res.repData
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
      }
    },
    created() {
      this.loadDataList();
      this.businessData();
      this.wareHouseData();
    }
  }
</script>

<style lang="less">
  .add-input .el-input__inner{
    padding-right: 5px;
  }
</style>
