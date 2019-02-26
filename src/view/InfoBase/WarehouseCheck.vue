<template>
  <div style="height: 100%; overflow:auto;">
  	<div class="table-them clearfix" style="padding-top: 10px;">
	  	<div class="title-group" style="padding: 0 0 10px;">
	      <div class="icon-title img-title">仓库信息</div>
	    </div>
	  	<div class="input-box">
	      <div class="input-label">仓库名称</div><div class="input">{{fromData.wareHouseName}}</div>
	    </div>
	    <div class="input-box">
	      <div class="input-label">事业部名称</div><div class="input">{{fromData.divisionName}}</div>
	    </div>
	    <div class="input-box">
	      <div class="input-label">公司名称</div><div class="input">{{fromData.companyName}}</div>
	    </div>
	    <div class="input-box">
	      <div class="input-label">工厂名称</div><div class="input">{{fromData.factoryName}}</div>
	    </div>
	    <div class="input-box">
	      <div class="input-label">省 / 自治区</div><div class="input">{{fromData.provinceName}}</div>
	    </div>
	    <div class="input-box">
	      <div class="input-label">市</div><div class="input">{{fromData.cityName}}</div>
	    </div>
	    <div class="input-box">
	      <div class="input-label">地址</div><div class="input">{{fromData.address}}</div>
	    </div>
	    <div class="input-box">
	      <div class="input-label">联系人</div><div class="input">{{fromData.contactName}}</div>
	    </div>
	    <div class="input-box">
	      <div class="input-label">联系电话</div><div class="input">{{fromData.contactPhone}}</div>
	    </div>
	    <div class="input-box">
	      <div class="input-label">仓库类型</div><div class="input">{{fromData.storageType}}</div>
	    </div>
	    <div class="input-box">
	      <div class="input-label">仓储类型</div><div class="input">{{fromData.storageType}}</div>
	    </div>
	    <div class="input-box">
	      <div class="input-label">准储车型</div><div class="input">{{fromData.vehicleStorageType}}</div>
	    </div>
	    <div class="input-box">
	      <div class="input-label">场地类型</div><div class="input">{{fromData.fieldType}}</div>
	    </div>
	    <div class="input-box">
	      <div class="input-label">标准库位数</div><div class="input">{{fromData.vehicleStorageNum}}</div>
	    </div>
	    <div class="input-box">
	      <div class="input-label">仓库面积</div><div class="input">{{fromData.wareHouseArea}}</div>
	    </div>
	    <div class="input-box">
	      <div class="input-label">最大库位数</div><div class="input">{{fromData.vehicleStorageMaxNum}}</div>
	    </div>
	  </div>

    <div class="table-them">
   		<div class="title-group" style="margin-bottom: 10px;">
        <div class="icon-title img-title" style="display: inline-block;">仓库大门信息</div>
      </div>
      <el-table
        ref="multipleTable"
        :data="doorTableData"
        tooltip-effect="dark"
        style="width: 100%">
         <el-table-column
          prop="tsWareHouseDoorId"
          label="ID"
          align="center">
        </el-table-column>
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
          prop="roadGate"
          label="RFID编号"
          align="center">
        </el-table-column>
        <el-table-column
          label="道阐"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.roadGate}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="transportVehicleModel"
          label="运输准出/入车型"
          align="center">
        </el-table-column>
      </el-table>
   	</div>

    <div class="table-them">
   		<div class="title-group" style="padding: 10px 0 10px;">
        <div class="icon-title img-title" style="display: inline-block;">功能区信息</div>
	    </div>
      <el-table
        ref="multipleTable"
        :data="funTableData"
        tooltip-effect="dark"
        style="width: 100%">
         <el-table-column
          prop="tsWareHouseFunctionAreaId"
          label="ID"
          align="center">
        </el-table-column>
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
            <span>{{scope.row.isFunctionArea}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="roadGate"
          label="RFID编号"
          align="center">
        </el-table-column>
        <el-table-column
          label="道阐"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.roadGate}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="transportVehicleModel"
          label="运输准出/入车型"
          align="center">
        </el-table-column>
      </el-table>
   	</div>
  </div>
</template>
<script>
    import { wareHouseGetByIdApi } from '@/common/config/api/InfoBase';
    export default {
    	name: "warehouse-check",
      data() {
      	return {
      		fromData: {},
					doorTableData: [],
					funTableData: []
      	}
      },
      methods: {
        wareHouseGetByIdChange() {
          wareHouseGetByIdApi({tsWareHouseId: this.$route.query.id}).then(res => {
            if(res.success) {
              this.fromData = res.repData;
              this.doorTableData  = res.repData.wareHouseDoorDtoList;
              this.funTableData  = res.repData.wareHouseFunctionAreaDtoList;
            }
          })
        },
      },
      created() {
      	this.wareHouseGetByIdChange();
      },
      mounted() {
      }
    }
</script>
<style scoped lang="less">
	.input{
		width: 200px;
	  height: 38px;
	  line-height: 38px;
	  text-indent: 10px;
	  float: left;
	  border-radius: 4px;
	  border: 1px solid #dcdfe6;
	}
</style>