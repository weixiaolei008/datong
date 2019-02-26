<template>
  <div style="height: 100%; overflow:auto;">
    <el-main class="table" style='padding: 10px;' v-if="funTableData">
      <div class="table-them">
        <div class="title-group" style="border-bottom: 1px solid #c1c1c1; padding: 10px 0;">
          <div class="icon-title img-title">仓库信息</div>
        </div>
        <div class="search-group clearfix">
          <div class="clearfix">
            <div class="input-box">
              <label class="input-label require-value"><span>*</span>仓库名称</label>
              <el-input placeholder="请输入仓库名称" :maxlength="20" v-model="addWareFromData.wareHouseName" clearable></el-input>
            </div>
            <div class="input-box">
              <label class="input-label"><span>*</span>所属事业部</label>
              <el-select
                v-model="addWareFromData.tsDivisionId"
                placeholder="请选择" @change="disvonChangeSearch" >
                <el-option
                  v-for="item in fromListData.tsDivisionList"
                  :key="item.tsDivisionId"
                  :label="item.divisionName"
                  :value="item.tsDivisionId" >
                </el-option>
              </el-select>
            </div>
            <div class="input-box">
              <label class="input-label"><span>*</span>所属公司</label>
              <el-select
                v-model="addWareFromData.tsCompanyId"
                placeholder="请选择" @change="companyChange">
                <el-option
                  v-for="item in fromListData.tsCompanyList"
                  :key="item.tsCompanyId"
                  :label="item.companyName"
                  :value="item.tsCompanyId">
                </el-option>
              </el-select>
            </div>
            <div class="input-box">
              <label class="input-label"><span>*</span>所属工厂</label>
              <el-select
                v-model="addWareFromData.tsFactoryId"
                placeholder="请选择">
                <el-option
                  v-for="item in fromListData.tsFactoryList"
                  :key="item.tsFactoryId"
                  :label="item.factoryName"
                  :value="item.tsFactoryId">
                </el-option>
              </el-select>
            </div>
            <div class="input-box">
              <label class="input-label">省 / 自治区</label>
              <el-select placeholder="请选择" v-model="addWareFromData.province" @change="provinceChange">
                <el-option
                  v-for="item in fromListData.regioProvinceList"
                  :key="item.tsRegionId"
                  :label="item.regionName"
                  :value="item.tsRegionId">
                </el-option>
              </el-select>
            </div>
            <div class="input-box">
              <label class="input-label">市</label>
              <el-select placeholder="请选择" v-model="addWareFromData.city" @change="cityChange">
                <el-option
                  v-for="item in fromListData.regioCityList"
                  :key="item.tsRegionId"
                  :label="item.regionName"
                  :value="item.tsRegionId">
                </el-option>
              </el-select>
            </div>
            <div class="input-box">
              <label class="input-label">地址</label>
              <el-input placeholder="地址" style="width: 515px;" :maxlength="20" v-model="addWareFromData.address" clearable></el-input>
            </div>
            <div class="input-box">
              <label class="input-label">联系人</label>
              <el-input placeholder="联系人" :maxlength="5" v-model="addWareFromData.contactName" clearable></el-input>
            </div>
            <div class="input-box">
              <label class="input-label">联系电话</label>
              <el-input placeholder="联系电话" :maxlength="20" v-model="addWareFromData.contactPhone" clearable></el-input>
            </div>
            <div class="input-box" v-if="allSelectDataObj.warehouseTypeList">
              <label class="input-label">仓库类型</label>
              <el-select
                v-model="addWareFromData.wareHouseType"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in allSelectDataObj.warehouseTypeList"
                  :key="item.tsDataDicId"
                  :label="item.name"
                  :value="item.tsDataDicId">
                </el-option>
              </el-select>
            </div>
            <div class="input-box" v-if="allSelectDataObj.storageTypeList">
              <label class="input-label">仓储类型</label>
              <el-select
                v-model="addWareFromData.storageType"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in allSelectDataObj.storageTypeList"
                  :key="item.tsDataDicId"
                  :label="item.name"
                  :value="item.tsDataDicId">
                </el-option>
              </el-select>
            </div>
            <div class="input-box" v-if="allSelectDataObj.accurateReservoirModelsList">
              <label class="input-label">准储车型</label>
              <el-select
                v-model="addWareFromData.vehicleStorageType"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in allSelectDataObj.accurateReservoirModelsList"
                  :key="item.tsDataDicId"
                  :label="item.name"
                  :value="item.tsDataDicId">
                </el-option>
              </el-select>
            </div>
            <div class="input-box" v-if="allSelectDataObj.siteTypeList">
              <label class="input-label">场地类型</label>
              <el-select
                v-model="addWareFromData.fieldType"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in allSelectDataObj.siteTypeList"
                  :key="item.tsDataDicId"
                  :label="item.name"
                  :value="item.tsDataDicId">
                </el-option>
              </el-select>
            </div>
            <div class="input-box">
              <label class="input-label">标准库位数</label>
              <el-input placeholder="标准库位数" v-model.number="addWareFromData.vehicleStorageNum" clearable></el-input>
            </div>
            <div class="input-box">
              <label class="input-label">仓库面积</label>
              <el-input placeholder="仓库面积" v-model="addWareFromData.wareHouseArea" clearable></el-input>
            </div>
            <div class="input-box">
              <label class="input-label">最大库位数</label>
              <el-input placeholder="最大库位数" v-model="addWareFromData.vehicleStorageMaxNum" clearable></el-input>
            </div>
          </div>
        </div>
      <!--   <div class="clearfix">
          <div class="input-box" style="display: block; width: 100%; padding-left: 10px;">
            <label class="input-label">地址</label>
            <el-input placeholder="地址" style="width: 600px;" :maxlength="20" v-model="addWareFromData.address" clearable></el-input>
          </div>
        </div> -->
      </div>

      <div class="table-them">
        <div class="title-group" style="margin-bottom: 10px;">
          <div class="icon-title img-title" style="display: inline-block;">仓库大门信息</div>
          <div class="btn-group clearfix">
            <div class="btn-add" @click="editDoorBtn"><span class="img-add">新增</span></div>
          </div>
        </div>
        <el-table
          ref="multipleTable"
          :data="doorTableData"
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            prop="doorName"
            label="大门名称"
            align="center">
          </el-table-column>
          <el-table-column
            prop="doorWidth"
            label="宽度"
            align="center">
          </el-table-column>
          <el-table-column
            prop="RFIDListName"
            label="RFID编号"
            align="center">
          </el-table-column>
          <el-table-column
            label="道阐"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.roadGate ? scope.row.roadGate == '1' ? '是' : '否' : ''}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="VehicleModelName"
            label="运输准出/入车型"
            align="center">
          </el-table-column>
          <el-table-column
            width="160"
            align="center"
            label="操作">
            <template slot-scope="scope">
              <i class="icon-edit table-icon" @click="editorDoor(scope.$index, scope.row, doorTableData)"></i>
              <i class="icon-del table-icon" @click="deleteDoor(scope.$index)"></i>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="table-them">
        <div class="title-group" style="padding: 10px 0 10px;">
          <div class="icon-title img-title" style="display: inline-block;">功能区信息</div>
          <div class="btn-group">
            <div class="btn-add" @click="editFunBtn"><span class="img-add">新增</span></div>
          </div>
        </div>
        <el-table
          ref="multipleTable"
          :data="funTableData"
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            prop="functionAreaName"
            label="功能区名称"
            align="center">
          </el-table-column>
          <el-table-column
            prop="areaDescribe"
            label="描述"
            align="center">
          </el-table-column>
          <el-table-column
            label="是否存储区"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.isFunctionArea ? scope.row.isFunctionArea == '1' ? '是' : '否' : ''}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="RFIDListName"
            label="RFID编号"
            align="center">
          </el-table-column>
          <el-table-column
            label="道阐"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.roadGate ? scope.row.roadGate == '1' ? '是' : '否' : ''}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="VehicleModelName"
            label="运输准出/入车型"
            align="center">
          </el-table-column>
          <el-table-column
            width="160"
            align="center"
            label="操作">
            <template slot-scope="scope">
              <i class="icon-edit table-icon" @click="editorFun(scope.$index,scope.row)"></i>
              <i class="icon-del table-icon" @click="deleteFun(scope.$index)"></i>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div style="text-align: center; margin: 10px auto 10px;">
        <el-button size="small" @click="backRouterPage"> 返回</el-button>
        <el-button size="small" type="primary" @click="saveWarehouserInfor">保存</el-button>
      </div>
    </el-main>

    <el-dialog
      title="仓库大门信息"
      :visible.sync="warehouseDoorDialog"
      width="800px">
      <div class="search-group dialog-div-min clearfix">
        <div class="clearfix">
          <div class="input-box">
            <label class="input-label"><span>*</span>大门名称</label>
            <el-input placeholder="大门名称" :maxlength="20" v-model="doorFrom.doorName" clearable></el-input>
          </div>
          <div class="input-box">
            <label class="input-label">宽度</label>
            <el-input placeholder="宽度" v-model.number="doorFrom.doorWidth" clearable></el-input>
          </div>
          <div class="input-box">
            <label class="input-label">道阐</label>
            <el-select placeholder="请选择" v-model="doorFrom.roadGate">
              <el-option
                v-for="item in webJudgeList.roadGateList"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="input-box">
            <label class="input-label">RFID编号</label>
            <el-select placeholder="请选择"
               v-model="doorFrom.tsRFIDIds"
               multiple
               collapse-tags>
              <el-option
                v-for="item in allSelectDataObj.rfidList"
                :key="item.tsRfidId"
                :label="item.locationName"
                :value="item.tsRfidId">
              </el-option>
            </el-select>
          </div>
          <div class="input-box">
            <label class="input-label">准出/入车型</label>
            <el-select placeholder="请选择"
               multiple
               collapse-tags
               v-model="doorFrom.transportVehicleModels">
              <el-option
                v-for="item in allSelectDataObj.transportationModeT"
                :key="item.tsDataDicId"
                :label="item.name"
                :value="item.tsDataDicId">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="warehouseDoorDialog = false">返回</el-button>
        <el-button type="primary" @click="wareDoorVisibleConfirm">保存</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="功能区信息"
      :visible.sync="warehouseFunDialog"
      width="800px">
      <div class="search-group dialog-div-min clearfix">
        <div class="clearfix">
          <div class="input-box">
            <label class="input-label"><span>*</span>功能区名称</label>
            <el-input placeholder="功能区名称" :maxlength="10" v-model="funFrom.functionAreaName" clearable></el-input>
          </div>
          <div class="input-box">
            <label class="input-label">描述</label>
            <el-input placeholder="描述" :maxlength="20" v-model="funFrom.areaDescribe" clearable></el-input>
          </div>
          <div class="input-box">
            <label class="input-label">是否存储区</label>
            <el-select placeholder="请选择" v-model="funFrom.isFunctionArea">
              <el-option
                v-for="item in webJudgeList.isAreaList"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="input-box">
            <label class="input-label">道阐</label>
            <el-select placeholder="请选择" v-model="funFrom.roadGate">
              <el-option
                v-for="item in webJudgeList.roadGateList"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="input-box">
            <label class="input-label">RFID编号</label>
            <el-select placeholder="请选择"
                       v-model="funFrom.tsRFIDIds"
                       multiple
                       collapse-tags>
              <el-option
                v-for="item in allSelectDataObj.rfidList"
                :key="item.tsRfidId"
                :label="item.locationName"
                :value="item.tsRfidId">
              </el-option>
            </el-select>
          </div>
          <div class="input-box">
            <label class="input-label">准出/入车型</label>
            <el-select placeholder="请选择"
               multiple
               collapse-tags
               v-model="funFrom.transportVehicleModels">
              <el-option
                v-for="item in allSelectDataObj.transportationModeT"
                :key="item.tsDataDicId"
                :label="item.name"
                :value="item.tsDataDicId">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="warehouseFunDialog = false">返回</el-button>
        <el-button type="primary" @click="wareFunVisibleConfirm">保存</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import deepClone from 'deep-clone';
  import Table from "@/components/Table";
  import { confirmPop }from "@/common/config/utils"
  import {loadDicValList, loadProCityList} from "@/common/config/api/basic";
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
    divisionAll,
    getCompanyByDivisionIdApi,
    getFactoryByCompanyIdApi,
    rfidGetList
    // 数据字典
    // loadDicValList
  } from '@/common/config/api/InfoBase';

  export default {
    name: "warehouse-add",
    components: { Table },
    data() {
      return {
        doorTableData: [],
        funTableData: [],
        warehouseDoorDialog: false,
        warehouseFunDialog: false,
        currentWareHouseId: null,//当前条的WareHouseId
        // 数字字典
        allSelectDataObj: {
          siteTypeList: [], //场地类型
          warehouseTypeList: [], //仓库类型
          storageTypeList: [], //仓储类型
          accurateReservoirModelsList: [], //准储车型
          transportationModeT: [], //运输准出入车型:transportation_mode2
          rfidList: [], //RFID编号
        },
        fromListData: {
          tsDivisionList: [], //事业部下拉
          tsCompanyList: [], //公司下拉
          tsFactoryList: [], //工厂下拉
          regioProvinceList: [], //省下拉
          regioCityList: [],//市下拉
        },
        //初始化下拉列表==数字字典
        wareFromSelectData: {
          fieldTypeList: [], //场地类型,
          storageTypeList: [], //仓储类型,
          vehicleStorageTypeList: [], //准储类型,
          wareHouseList: [], //仓库名称,
          wareHouseTypeList: [], //仓库类型
          rfidList: [], //RFID编号
          transportationModeT: [], //运输准出入车型
        },
        webJudgeList: {
          roadGateList: [{name: "无道闸", value: '0'}, {name: "有道闸", value: '1'}], //道闸 row.roadGate == '0' ? "无道闸" : "有道闸";
          isAreaList: [{name: "不是", value: '0'}, {name: "是", value: '1'}] //道闸 row.isFunctionArea == '0' ? "不是" : "是";
        },
        addWareFromData: {
          wareHouseName: null, //仓库名称 ,
          tsDivisionId: null, //事业部
          tsCompanyId: null, //公司
          tsFactoryId: null, //工厂
          province: null, //省
          city: null,//城市
          address: '',//地址 ,
          contactName: '',//联系人 ,
          contactPhone: '',//联系电话 ,
          wareHouseType: null, // 仓库类型
          storageType: null, //仓储类型 ,
          vehicleStorageType: null, //准储类型 ,
          fieldType: null, //场地类型 ,
          vehicleStorageNum: null, //标准库位数 ,
          wareHouseArea: null, // 仓库面积 ,
          vehicleStorageMaxNum: null, //最大库位数 ,
        },
        //新增大门
        doorFrom: {
          doorName: '',
          doorWidth: '',
          roadGate: '',
          tsRFIDIds: [],
          transportVehicleModels: [],
        },
        funFrom: {
          functionAreaName: '',
          areaDescribe: '',
          isFunctionArea: '',
          roadGate: '',
          tsRFIDIds: [],
          transportVehicleModels: [],
        },
        //表格row——checked
        funTableDataChecked: [],
        doorTableDataChecked: [],
        cloneDoorRow: {},
        activeDoor: '',
        activeFun: '',
        editDoorIndex: null, //编辑时记录index
        editFunIndex: null,
        doorIndex: null,
        funIndex: null,
      }
    },
    methods: {
      //返回
      backRouterPage() {
        this.$router.back(-1);
      },
      handleDelDataDoor() {
        this.doorTableData.splice(this.doorIndex, 1)
      },
      //表格删除
      deleteDoor(index) {
        this.doorIndex = index;
        confirmPop('确认删除',this.handleDelDataDoor)
      },
      handleDelDataFun() {
        this.funTableData.splice(this.funIndex, 1)
      },
      deleteFun(index) {
        this.funIndex = index;
        confirmPop('确认删除',this.handleDelDataFun)
      },
      initFrom() {
        this.doorFrom = {
          doorName: '',
          doorWidth: '',
          functionAreaName: '',
          areaDescribe: '',
          isFunctionArea: null,
          roadGate: '',
          roadGate: '',
          tsRFIDIds: [],
          transportVehicleModels: [],
        }
      },
      //大门编辑
      editorDoor(index, row) {
        this.warehouseDoorDialog = true;
        this.activeDoor = 'edit';
        this.doorFrom = row;
        this.editDoorIndex = index;
      },
      //功能编辑
      editorFun(index, row) {
        this.warehouseFunDialog = true;
        this.activeFun = 'edit';
        this.funFrom = row;
        this.editFunIndex = index;
      },
      //大门新增
      editDoorBtn(num) {
        this.warehouseDoorDialog = true;
        this.activeDoor = 'add';
        this.doorFrom = {
          doorName: '',
          doorWidth: '',
          roadGate: '',
          tsRFIDIds: [],
          transportVehicleModels: [],
        }
      },
      //功能新增
      editFunBtn() {
        this.warehouseFunDialog = true;
        this.activeFun = 'add';
        this.funFrom = {
          functionAreaName: '',
          areaDescribe: '',
          isFunctionArea: '',
          roadGate: '',
          tsRFIDIds: [],
          transportVehicleModels: [],
        }
      },
      //根据ID遍历name
      forMaterArr(data) {
        var tabFor = {
          locationName: '',
          tsRfidIdName: ''
        }
        data.tsRFIDIds.forEach((items, index) => {
          this.allSelectDataObj.rfidList.forEach((item) => {
            if (items == item.tsRfidId) {
              if ((index + 1) != (data.tsRFIDIds.length)) {
                tabFor.tsRfidIdName += item.locationName + ',';
                return;
              }
              else {
                tabFor.tsRfidIdName += item.locationName;
                return
              }
            }
          })
        })
        data.transportVehicleModels.forEach((items, index) => {
          this.allSelectDataObj.transportationModeT.forEach((item) => {
            if (items == item.tsDataDicId) {
              if ((index + 1) != (data.tsRFIDIds.length)) {
                tabFor.locationName += item.name + ',';
                return;
              }
              else {
                tabFor.locationName += item.name;
                return
              }
            }
          })
        })
        return tabFor;
      },
      //大门更新————新增保存
      wareDoorVisibleConfirm() {
        if(!this.doorFrom.doorName || (this.doorFrom.doorName && !this.doorFrom.doorName.trim())) {
          this.feedMessage('warning', '请完善必填信息！');
          return false;
        }
        let regT = /^\d+(\.\d{1,2})?$/;
        if(this.doorFrom.doorWidth && !regT.test(this.doorFrom.doorWidth)) {
          this.feedMessage('warning', '宽度必须是正整数或两位小数');
          return false;
        }
        var pv = this.forMaterArr(this.doorFrom);
        var p = {
          isDelete: 3,
          tsWareHouseId: this.doorFrom.tsWareHouseId,
          doorName: this.doorFrom.doorName,
          doorWidth: this.doorFrom.doorWidth ? this.doorFrom.doorWidth : null,
          roadGate: this.doorFrom.roadGate ? this.doorFrom.roadGate : null,
          transportVehicleModels: this.doorFrom.transportVehicleModels,
          tsRFIDIds: this.doorFrom.tsRFIDIds,
          RFIDListName: pv.tsRfidIdName,
          VehicleModelName: pv.locationName
        }
        if(this.activeDoor == 'add'){
          this.doorTableData.push(p);
        }else{
          this.doorTableData.splice(this.editDoorIndex, 1, p);
        }
        this.warehouseDoorDialog = false;
      },
      //功能更新————新增保存
      wareFunVisibleConfirm() {
        if(!this.funFrom.functionAreaName || (this.funFrom.functionAreaName && !this.funFrom.functionAreaName.trim())) {
          this.feedMessage('warning', '请完善必填信息！');
          return false;
        }
        var pv = this.forMaterArr(this.funFrom);
        var p = {
          isDelete: 3,
          tsWareHouseId: this.currentWareHouseId, // 仓库ID
          areaDescribe: this.funFrom.areaDescribe,//描述 ,
          functionAreaName: this.funFrom.functionAreaName,//功能区名称 ,
          isFunctionArea: this.funFrom.isFunctionArea,//是否是存储区：0不是，1是 ,
          roadGate: this.funFrom.roadGate,//道闸,0是无道闸，1是有道闸 ,
          transportVehicleModels: this.funFrom.transportVehicleModels,//运输准出入车型 ,
          tsRFIDIds: this.funFrom.tsRFIDIds,//RFID列表
          RFIDListName: pv.tsRfidIdName,
          VehicleModelName: pv.locationName
        }
        if(this.activeFun == 'add'){
          this.funTableData.push(p);
        }else{
          this.funTableData.splice(this.editDoorIndex, 1, p);
        }
        this.warehouseFunDialog = false;
      },
      //仓库————编辑-新增（保存）
      saveWarehouserInfor() {
        // var params = this.addWareFromData;
        var p = {
          tsWareHouseId: this.currentWareHouseId ? this.currentWareHouseId : null, //仓库ID
          city: this.addWareFromData.city, //城市
          province: this.addWareFromData.province, //省
          wareHouseName: this.addWareFromData.wareHouseName, //仓库名称
          address: this.addWareFromData.address, //地址
          contactName: this.addWareFromData.contactName, //联系人
          contactPhone: this.addWareFromData.contactPhone, //联系电话
          vehicleStorageNum: this.addWareFromData.vehicleStorageNum,//标准库位数
          wareHouseArea: this.addWareFromData.wareHouseArea, //仓库面积 ,
          vehicleStorageMaxNum: this.addWareFromData.vehicleStorageMaxNum, //最大库位数 ,
          fieldType: this.addWareFromData.fieldType, //场地类型
          storageType: this.addWareFromData.storageType, //仓储类型,
          tsCompanyId: this.addWareFromData.tsCompanyId, //公司ID
          tsDivisionId: this.addWareFromData.tsDivisionId, //事业部ID
          tsFactoryId: this.addWareFromData.tsFactoryId, //工厂ID
          wareHouseType: this.addWareFromData.wareHouseType, //仓库类型
          vehicleStorageType: this.addWareFromData.vehicleStorageType, //准储类型
          insertWareHouseDoorRequestList: this.doorTableData.length > 0 ? this.doorTableData : null, //仓库大门列表
          insertWareHouseFunctionAreaRequestList: this.funTableData.length > 0 ? this.funTableData : null,//仓库功能区列表
        }
        if (!p.wareHouseName || !p.tsDivisionId || !p.tsCompanyId || !p.tsFactoryId || (p.wareHouseName && !p.wareHouseName.trim())) {
          this.feedMessage('warning', '请完善必填信息')
          return false;
        }
        //值检验
        // if(p.contactPhone){
        //   // let reg = /^[0-9-()（）]{7,20}$/g;
        //   let reg = /^[0-9][\(\)\-]*$/;
        //   let phTrim = p.contactPhone.replace(/(^\s*)|(\s*$)/g, "");
        //   if(phTrim && !reg.test(phTrim)) {
        //     this.feedMessage('warning', '请输入正确的电话号码！');
        //     return false;
        //   }
        // }
        if(p.vehicleStorageNum || p.vehicleStorageMaxNum || p.wareHouseArea) {
          if(p.vehicleStorageNum > 99999 || p.wareHouseArea > 99999 || p.vehicleStorageMaxNum > 99999) {
            return this.feedMessage('warning', '标准库位数、最大库位数、仓库面积不能大于99999！')
          }
          let reg = /^\+?[1-9][0-9]*$/;
          if(p.vehicleStorageNum && !reg.test(p.vehicleStorageNum) || p.vehicleStorageMaxNum && !reg.test(p.vehicleStorageMaxNum)) {
            this.feedMessage('warning', '标准库位数和最大库位数必须是正整数');
            return false;
          }
          let regT = /^\d+(\.\d{1,2})?$/;
          if(p.wareHouseArea && !regT.test(p.wareHouseArea)){
            this.feedMessage('warning', '仓库面积必须是正整数或两位小数');
            return false;
          }
        }
        if(p.city){
          this.fromListData.regioCityList.find((item) => { //获取市名
            if(p.city == item.tsRegionId) {
              p.cityName = item.regionName;
            }
          })
        }
        if(p.province){
          this.fromListData.regioProvinceList.find((item) => { //根据id遍获取省名
            if(p.province == item.tsRegionId) {
              p.provinceName = item.regionName;
            }
          })
        }
        wareHouseInsertApi(p).then(res => {
          if (res.success) {
            this.feedMessage('success', res.repMsg);
            this.$router.back(-1);
          }
        })
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
        //编号:RFID
        rfidGetList({
          "pageNum": 1,
          "pageSize": 100000,
        }).then(res => {
          if (res.success) {
            this.allSelectDataObj.rfidList = res.repData.list;
          }
        })
      },
      //------------------------------------------------------------------数字字典--搜索
      //获取省
      provinceAndCityList() {
        loadProCityList('p', {}).then(res => {
          if (res.success) {
            this.fromListData.regioProvinceList = res.repData;
          }
        })
      },
      //省change时获取城市
      provinceChange(proId) {
        this.addWareFromData.city = '';
        if (proId) {
          loadProCityList('c', {id: proId}).then(res => {
            if (res.success) {
              this.fromListData.regioCityList = res.repData;
            }
          })
        }
      },
      cityChange(id) {
      },
      //事业部List
      disSelectList() {
        divisionAll({}).then(res => {
          if (res.success) {
            this.fromListData.tsDivisionList = res.repData.list;
          }
        })
      },
      //搜索 (事业部selectChange——数字字典公司List)
      disvonChangeSearch(disvId) {
        this.fromListData.tsCompanyList = [];
        this.fromListData.tsFactoryList = [];
        this.addWareFromData.tsCompanyId = null;
        this.addWareFromData.tsFactoryId = null;
        getCompanyByDivisionIdApi({tsDivisionId: disvId}).then(res => {
          if (res.success) {
            this.fromListData.tsCompanyList = res.repData;
          }
        })
      },
      //公司selectChange——数字字典工厂List
      companyChange(comId) {
        this.fromListData.tsFactoryList = [];
        this.addWareFromData.tsFactoryId = null;
        getFactoryByCompanyIdApi({tsCompanyId: comId}).then(res => {
          if (res.success) {
            this.fromListData.tsFactoryList = res.repData;
          }
        })
      },
    },
    created() {
      this.allSelectListData(); //数字字典
      this.provinceAndCityList(); //获取省
      this.disSelectList(); //事业部List
    },
    mounted() {
    }
  }
</script>
<style>
  .ware-table .el-footer,
  .fun-table .el-footer {
    display: none !important;
  }
  .addware-content .table-them {
    margin-top: 20px;
  }
</style>
<style lang="less" scoped>
  .them-content {
    .search-group {
      border-bottom: 1px solid #eee;
    }
  }
  .them-tile-info {
    font-size: 18px;
    color: #796ac1;
    text-align: left;
    display: inline-block;
  }
  .table-control {
    display: inline-block;
    float: right;
    margin-top: 15px;
  }
  .btn-group-con {
    height: 60px;
    line-height: 60px;
  }

  .isDisable {
    cursor: no-drop;
  }
  .table-icon {
    display: inline-block;
    width: 20px;
    height: 40px;
    margin: 0 10px 0;
  }
  // 弹框
  .dialog-div-min {
    .input-box {
      width: 350px;
    }
  }
</style>
