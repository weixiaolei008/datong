<template>
  <div style="width: 100%;height: 100%">
    <el-container style="width: 100%;height: 100%;">
      <el-header style="height: auto; padding: 0;">
        <!-- search-group -->
        <div class="search-group clearfix">
          <div class="clearfix">
            <!-- input 输入框 -->
            <div class="input-box">
              <label class="input-label">工厂</label>
              <el-select v-model="formData.tsFactoryId" @change="changeFactory" placeholder="请选择">
                <el-option
                  v-for="item in factorylist"
                  :key="item.tsFactoryId"
                  :label="item.factoryName"
                  :value="item.tsFactoryId">
                </el-option>
              </el-select>
            </div>
            <div class="input-box">
              <label class="input-label">仓库</label>
              <el-select v-model="formData.tsWareHouseId" placeholder="请选择">
                <el-option
                  v-for="item in wareHouselist"
                  :key="item.tsWareHouseId"
                  :label="item.wareHouseName"
                  :value="item.tsWareHouseId">
                </el-option>
              </el-select>
            </div>
            <div class="search-box">
              <div class="search-sub"  @click="search"><span class="img-sub">搜索</span></div>
            </div>
          </div>
        </div>
        <div class="btn-group clearfix">
          <div class="btn-add" @click="handleAdd"><span class="img-add">新增</span></div>
        </div>
      </el-header>
      <!--table-->
      <el-main style="padding: 10px;" class="table">
        <Table :data='tableData'
               @handleDel="handleDel"
               @handleEdit="handleEdit"
               @current-change="handleCurrentChange"
          >
        </Table>
      </el-main>
    </el-container>
    <!--编辑弹框-->
    <el-dialog  title="新增/编辑" :visible.sync="popEditVisible" width="860px" center>
      <div class="clearfix">
        <div class="input-box" style="margin-left: 20px;">
          <label class="input-label">仓库</label>
          <el-select v-model="editFormData.tsWareHouseId" disabled placeholder="请选择">
            <el-option
              v-for="item in wareHouselist"
              :key="item.tsWareHouseId"
              :label="item.wareHouseName"
              :value="item.tsWareHouseId">
            </el-option>
          </el-select>
        </div>
        <div class="input-box">
          <label class="input-label">排序</label>
          <el-input v-model="editFormData.ruleOrder" placeholder="" clearable></el-input>
        </div>
        <div class="input-box" style="margin-left: 20px;">
          <label class="input-label">车辆属性</label>
          <el-select v-model="editFormData.vehicleAttribute" @change="changeVehicle" placeholder="请选择">
            <el-option
              v-for="item in popOptions.vehicleAttributeList"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </div>
        <div class="input-box">
          <label class="input-label">值</label>
          <el-select v-model="editFormData.values" v-show="isMultiple" multiple collapse-tags placeholder="请选择">
            <el-option
              v-for="item in valueList"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
          <el-select v-model="editFormData.value" v-show="!isMultiple" placeholder="请选择">
            <el-option
              v-for="item in valueList"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="clearfix">
        <el-transfer
          style="float: left;margin-left: 30px;"
          filterable
          @change="changeList"
          target-order="push"
          v-model="functionAreaSelect"
          :titles="['未选功能区', '已选功能区']"
          :data="functionAreaList">
        </el-transfer>
        <div class="function-area-list">
          <div class="function-area-name" style="margin-bottom: 5px;">
            <span style="width: 110px;">功能区</span>
            <span v-if="" @click="" class="icon">行排序</span>
            <span class="icon">列排序</span>
          </div>
          <div v-for="(item,index) in descList" :key="index" class="function-area-name clearfix">
            <span style="width: 110px;">{{item.functionAreaName}}</span>
            <span v-if="item.isFunctionArea == 1"
                  @click="item.rowOrder = item.rowOrder === 'ASC' ? 'DESC' : 'ASC'" class="icon"
                  :class="{asc: item.rowOrder === 'ASC', desc :item.rowOrder === 'DESC'}"></span>
            <span v-if="item.isFunctionArea == 1"
                  @click="item.colOrder = item.colOrder === 'ASC' ? 'DESC' : 'ASC'" class="icon"
                  :class="{asc: item.colOrder === 'ASC', desc :item.colOrder === 'DESC'}"></span>
          </div>
        </div>
      </div>
      <div style="text-align: center;margin-top: 20px;">
        <el-button class="" style="margin-right: 10px;" @click="cancleEdit" size="medium">返回</el-button>
        <el-button class="" style="margin-right: 15px;" type="primary" @click="saveEdit" size="medium">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Table from "@/components/TableNoTip"
  import {factoryQuerryAllApi, wareHouse} from "@/common/config/api/InfoBase"
  import {loadLocationRecommend, initLocationRecommend, editLocationRecommend,
    addLocationRecommend, updateLocationRecommend, delLocationRecommend} from "@/common/config/api/SysManage"
  import {confirmPop}from "@/common/config/utils"
  export default {
    name: "LocationRecommend",
    components: {
      Table,
    },
    data() {
      return {
        isMultiple: false,
        currentRow: null,
        functionAreaList: [], // 功能区init
        factorylist: [], // 工厂下拉
        wareHouselist: [], // 仓库下拉
        popOptions: {
          vehicleAttributeList: []
        }, // init对象
        valueList: [], //值下拉
        popEditVisible: false, //编辑弹框
        functionAreaSelect: [], // 选中功能区
        tsRecommendRuleId: '',
        descList: [],
        formData: {
          tsFactoryId: "",
          tsWareHouseId: "",
        },
        editFormData: {
          tsWareHouseId: '',
          ruleOrder: '',
          vehicleAttribute: '',
          value: '',
          values: [],
        },
        tableData: {
          selectShow: false,
          tableHeight: 0,
          total: 0,
          listData: [],
          currentPage: 1,
          pageSize: 30,
          operations: [
            {
              label: '操作',
              width: '120',
              data: [
                {
                  icon: 'icon-del',
                  Fun: 'handleDel',
                  id: '1',
                },
                {
                  icon: 'icon-edit',
                  Fun: 'handleEdit',
                  id: '2',
                }
              ]
            }
          ],
          tableHead: [
            {
              name: "排序",
              width: 80,
              value: 'ruleOrder',
            },
            {
              name: "车辆属性",
              width: 200,
              value: 'vehicleAttribute',
            },
            {
              name: "值",
              width: 120,
              value: 'value'
            },
            {
              name: "仓库",
              width: 100,
              value: 'wareHouseName'
            },
            {
              name: "功能区",
              value: 'recommendRuleFunctionAreaDtoList'
            },
          ],
        },
      }
    },
    methods: {
      loadData() {
        let self = this;
        let p = {
          "pageNum": self.tableData.currentPage,
          "pageSize": self.tableData.pageSize,
          "tsWareHouseId": self.formData.tsWareHouseId,
        }
        loadLocationRecommend(p).then(res => {
          self.tableData.total = res.repData.total;
          let arr = [];
          res.repData.list.forEach((item) => {
            let str = [];
            item.recommendRuleFunctionAreaDtoList.forEach((i) => {
              str.push(i.functionAreaName)
            })
            str = str.join('; ')
            arr.push(Object.assign({},item,{recommendRuleFunctionAreaDtoList: str}))
          })
          self.tableData.listData = arr;
        })
      },
      handleCurrentChange(val) {
        this.tableData.currentPage = val;
        this.loadData();
      },
      search() {
        this.loadData();
      },
      changeVehicle(){
        this.editFormData.values = [];
        this.editFormData.value = '';
        if(this.editFormData.vehicleAttribute == 'SALES_AREA'){
          this.valueList = this.popOptions['salesAreaList']
          this.isMultiple = false;
          return
        }
        if(this.editFormData.vehicleAttribute == 'VEHICLE_CATEGORY'){
          this.valueList = this.popOptions['vehicleCategoryList']
          this.isMultiple = false;
          return
        }
        if(this.editFormData.vehicleAttribute == 'VEHICLE_MODEL_LEVEL'){
          this.isMultiple = true;
          this.valueList = this.popOptions['vehicleModelLevelList']
        }
      },
// ---------------------- pop---------------
      changeList(val,old){
        let self = this;
        let len = val.length;
        if(old !== 'right' && old !== 'left'){
          for(let i = 0; i < len; i++){
            self.popOptions.functionAreaList.forEach((item) => {
              if(item.tsWareHouseFunctionAreaId == old[i].tsWareHouseFunctionAreaId && item.isFunctionArea == 1){
                self.descList.push(Object.assign({}, item, {rowOrder: old[i].rowOrder,colOrder: old[i].colOrder,functionAreaOrder: i+1}))
              }else if(item.tsWareHouseFunctionAreaId == old[i].tsWareHouseFunctionAreaId && item.isFunctionArea == 0){
                self.descList.push(Object.assign({}, item, {rowOrder: null,colOrder:null,functionAreaOrder: i+1}))
              }
            })
          }
        }else if(old === 'right'){
          for(let i = 0; i < len; i++){
            self.popOptions.functionAreaList.forEach((item) => {
              let bool = this.descList.some(j => {
                return j.tsWareHouseFunctionAreaId == item.tsWareHouseFunctionAreaId;
              })
              if(bool){
                return
              }
              if(item.tsWareHouseFunctionAreaId == val[i] &&item.isFunctionArea == 1){
                self.descList.push(Object.assign({}, item, {rowOrder: 'ASC',colOrder:'ASC',functionAreaOrder: i+1}))
              }else if(item.tsWareHouseFunctionAreaId == val[i] &&item.isFunctionArea == 0){
                self.descList.push(Object.assign({}, item, {rowOrder: null,colOrder:null,functionAreaOrder: i+1}))
              }
            })
          }
        }else if(old === 'left'){
          self.descList = self.descList.filter(item => {
            console.log(val);
            let bool =  val.some(j => {
              return j == item.tsWareHouseFunctionAreaId;
            })
            console.log(bool);
            return bool
          })
        }
      },
      handleAdd(){
        let self = this;
        self.functionAreaSelect = [];
        self.functionAreaList = [];
        self.descList = [];
        self.editFormData.ruleOrder = ''
        self.editFormData.vehicleAttribute = '';
        this.editFormData.values = [];
        self.editFormData.value = '';
        this.editFormData.tsWareHouseId = this.formData.tsWareHouseId;
        initLocationRecommend({tsWareHouseId: self.formData.tsWareHouseId}).then(res => {
          self.popOptions = res.repData;
          res.repData.functionAreaList.forEach((item) => {
            self.functionAreaList.push({
              label: item.functionAreaName,
              key: item.tsWareHouseFunctionAreaId
            });
          });
        })
        this.popEditVisible = true;
      },
      handleDel(data){
        this.currentRow = data.row;
        confirmPop('确认删除',this.sureDel)
      },
      sureDel(){
        let self = this;
        let p = {
          "tsRecommendRuleIds": [this.currentRow.tsRecommendRuleId]
        };
        delLocationRecommend(p).then(res => {
          res && res.success && self.msgInfo(res.repMsg);
          self.loadData()
        })
      },
      handleEdit(data) {
        let self = this;
        self.functionAreaSelect = [];
        self.functionAreaList = [];
        self.descList = [];
        self.editFormData.ruleOrder = ''
        self.editFormData.vehicleAttribute = '';
        self.editFormData.value = '';
        this.editFormData.tsWareHouseId = this.formData.tsWareHouseId;
        initLocationRecommend({tsWareHouseId: self.formData.tsWareHouseId}).then(res => {
          self.popOptions = res.repData;
          res.repData.functionAreaList.forEach((item) => {
            self.functionAreaList.push({
              label: item.functionAreaName,
              key: Number(item.tsWareHouseFunctionAreaId)
            });
          });
          editLocationRecommend({"tsRecommendRuleId": data.row.tsRecommendRuleId}).then(res => {
            res.repData.recommendRuleFunctionAreaDtoList.forEach((item) => {
              self.functionAreaSelect.push(item.tsWareHouseFunctionAreaId)
            })
            self.changeList(self.functionAreaSelect,res.repData.recommendRuleFunctionAreaDtoList)
            self.editFormData.ruleOrder = res.repData.ruleOrder;
            self.editFormData.vehicleAttribute = res.repData.vehicleAttribute;
            self.changeVehicle();
            if(self.editFormData.vehicleAttribute === 'VEHICLE_MODEL_LEVEL'){
              self.isMultiple = true;
              self.editFormData.values = res.repData.value.split(',');
            }else{
              self.editFormData.value = res.repData.value;
            }
          })
        })
        this.editFormData.tsWareHouseId = this.formData.tsWareHouseId;
        this.tsRecommendRuleId = data.row.tsRecommendRuleId;
        this.popEditVisible = true;
      },
      cancleEdit() {
        this.popEditVisible = false;
      },
      saveEdit() {
        let self = this;
        if(!self.descList.length){
          self.msgInfo('请选择功能区');
          return
        }
        if(!self.editFormData.ruleOrder){
          self.msgInfo('请输入排序');
          return
        }
        if(self.tsRecommendRuleId){
          let p = {
            "recommendRuleFunctionAreaDtoList": self.descList,
            "ruleOrder": self.editFormData.ruleOrder,
            "tsRecommendRuleId": self.tsRecommendRuleId,
            "value": self.isMultiple ? self.editFormData.values.join(',') : self.editFormData.value,
            "vehicleAttribute": self.editFormData.vehicleAttribute
          }
          updateLocationRecommend(p).then(res => {
            self.msgInfo(res.repMsg);
            self.tsRecommendRuleId = '';
            self.popEditVisible = false;
            self.loadData();
          })
        }else{
          let p = {
            "tsWareHouseId": this.formData.tsWareHouseId,
            "recommendRuleFunctionAreaDtoList": self.descList,
            "ruleOrder": self.editFormData.ruleOrder,
            "value": self.isMultiple ? self.editFormData.values.join(',') : self.editFormData.value,
            "vehicleAttribute": self.editFormData.vehicleAttribute
          }
          addLocationRecommend(p).then(res => {
            self.msgInfo(res.repMsg)
            self.popEditVisible = false;
            self.loadData();
          })
        }
      },
      changeFactory(){
        let self = this;
        wareHouse({tsFactoryId: this.formData.tsFactoryId}).then(res => {
          self.wareHouselist = res.repData;
          self.formData.tsWareHouseId = res.repData[0].tsWareHouseId;
          this.loadData()
        })
      }
    },
    created() {
      let self = this;
      factoryQuerryAllApi({pageNum: 1, pageSize: 9999}).then(res => {
        self.factorylist = res.repData.list;
        self.formData.tsFactoryId = res.repData.list[0].tsFactoryId;
        wareHouse({tsFactoryId: this.formData.tsFactoryId}).then(res => {
          self.wareHouselist = res.repData;
          self.formData.tsWareHouseId = res.repData[0].tsWareHouseId;
          this.loadData()
        })
      })
    },
    beforeDestroy(){
    }
  }
</script>

<style lang="less" >

  .function-area-list{
    float: left;
    margin-left: 20px;
    height: 280px;
    padding: 10px;
    overflow: auto;
    border: 1px solid #ccc;
    border-radius: 3px;
    .function-area-name{
      line-height: 30px;
      height: 30px;
      span{
        display: inline-block;
        text-align: center;
        float: left;
        width: 80px;
      }
      .icon{
        width: 50px;
        height: 30px;
      }
      .asc{
        background: url("../../common/image/operate/icon_up.png") no-repeat center;
      }
      .desc{
        background: url("../../common/image/operate/icon_down.png") no-repeat center;
      }
    }
  }
</style>
