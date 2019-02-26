<template>
  <div style="height: 100%; overflow:auto;">
    <div class="table-them clearfix" style="padding: 10px 20px;">
      <div class="title-group" style="padding: 0 0 10px;">
        <div class="icon-title img-title">申诉处理</div>
      </div>
      <div class="input-box">
        <div class="input-label">VIN</div><div class="input">{{fromData.vin}}</div>
      </div>
      <div class="input-box">
        <label class="input-label"><span>*</span>申诉结果</label>
        <el-select v-model="fromData.result" @change="resetChange" :disabled="isDisabledCheck">
          <el-option
            v-for="item in resultList"
            :key="item.code"
            :label="item.name"
            :value="item.code">
          </el-option>
        </el-select>
      </div>
      <div class="input-box">
        <label class="input-label">事故类型</label>
        <el-select v-model="fromData.tsDataDicId" :disabled="isDisabledType">
          <el-option
            v-for="item in options.accident_type"
            :key="item.tsDataDicId"
            :label="item.name"
            :value="item.tsDataDicId">
          </el-option>
        </el-select>
      </div>
      <div class="input-box" v-if="this.getAllUserList">
        <label class="input-label">责任人1</label>
        <el-select v-model="fromData.resUserId1" :disabled="isDisabledType">
          <el-option
            v-for="item in this.getAllUserList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="input-box" v-if="this.getAllUserList">
        <label class="input-label">责任人2</label>
        <el-select v-model="fromData.resUserId2" :disabled="isDisabledType">
          <el-option
            v-for="item in this.getAllUserList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="input-box">
        <label class="input-label">责任1</label>
        <el-select v-model="fromData.responsibilityId1" :disabled="isDisabledType">
          <el-option
            v-for="item in options.accident_responsibility"
            :key="item.tsDataDicId"
            :label="item.name"
            :value="item.tsDataDicId">
          </el-option>
        </el-select>
      </div>
      <div class="input-box">
        <label class="input-label">责任2</label>
        <el-select v-model="fromData.responsibilityId2" :disabled="isDisabledType">
          <el-option
            v-for="item in options.accident_responsibility"
            :key="item.tsDataDicId"
            :label="item.name"
            :value="item.tsDataDicId">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="table-them clearfix" style="padding: 10px 20px;">
    	<div class="input-box">
        <div class="input-label">申诉人</div><div class="input">{{fromData.appealPerson}}</div>
      </div>
      <div class="input-box">
        <div class="input-label">处理人</div><div class="input">{{fromData.dealBy}}</div>
      </div>
      <div class="input-box" v-if="this.newData">
        <div class="input-label">处理时间</div><div class="input" >{{this.newData}}</div>
      </div>
      <div class="clearfix"></div>
      <div class="input-box input-box-w">
        <div class="input-label">处理意见</div>
        <el-input style="width: 70%"  v-model="fromData.dealOpinion" :disabled="isDisabledCheck" ></el-input>
      </div>
    </div>
    <div class="table-them clearfix" style="padding: 10px 20px;">
      <div class="input-box" v-if="fromData.body">
        <div class="input-label">车身</div><div class="input">{{fromData.body}}</div>
      </div>
      <div class="input-box" v-if="fromData.headlinghts">
        <div class="input-label">车灯</div><div class="input">{{fromData.headlinghts}}</div>
      </div>
      <div class="input-box" v-if="fromData.tire">
        <div class="input-label">轮胎</div><div class="input">{{fromData.tire}}</div>
      </div>
      <div class="input-box" v-if="fromData.glass">
        <div class="input-label">玻璃</div><div class="input">{{fromData.glass}}</div>
      </div>
      <div class="input-box" v-if="fromData.instrument">
        <div class="input-label">仪表</div><div class="input">{{fromData.instrument}}</div>
      </div>
      <div class="input-box" v-if="fromData.seat">
        <div class="input-label">座椅</div><div class="input">{{fromData.seat}}</div>
      </div>
      <div class="input-box" v-if="fromData.others">
        <div class="input-label">其他</div><div class="input">{{fromData.others}}</div>
      </div>
    </div>
    <div class="table-them clearfix" style="padding: 10px 20px;">
      <div class="input-box">
        <div class="input-label">车型</div><div class="input">{{fromData.vehicleType}}</div>
      </div>
      <div class="input-box">
        <div class="input-label">提报人</div><div class="input">{{fromData.reportPerson}}</div>
      </div>
      <div class="input-box">
        <div class="input-label">申诉时间</div><div class="input">{{fromData.appealDate}}</div>
      </div>
      <div class="input-box">
        <div class="input-label">车辆类型</div><div class="input">{{fromData.typeLevel}}</div>
      </div>
      <div class="input-box">
        <div class="input-label">驱动方式</div><div class="input">{{fromData.driveMode}}</div>
      </div>
      <div class="input-box">
        <div class="input-label">颜色</div><div class="input">{{fromData.color}}</div>
      </div>
      <div class="input-box">
        <div class="input-label">点位</div><div class="input">{{fromData.point}}</div>
      </div>
      <div class="input-box">
        <div class="input-label">状态</div><div class="input">{{fromData.status == '1' ? '已处理':'未处理'}}</div>
      </div>
      <div class="input-box input-box-w">
        <div class="input-label">作业活动</div><div class="input input-w">{{fromData.activityName}}</div>
      </div>
      <div class="input-box input-box-w">
        <div class="input-label">作业类别</div><div class="input input-w">{{fromData.planName}}</div>
      </div>
      <div class="clearfix"></div>
     <!--  <div class="input-box input-box-w">
        <div class="input-label">事故地点</div><div class="input input-w">{{fromData.accidentPlace}}</div>
      </div> -->
      <div class="input-box input-box-w">
        <div class="input-label">申诉反馈</div><div class="input input-w">{{fromData.feedback}}</div>
      </div>
      <div class="input-box input-box-w">
        <div class="input-label">异常提报描述</div><div class="input input-w">{{fromData.reportDescribe}}</div>
      </div>
      <div class="input-box input-box-w">
        <div class="input-label">判责描述</div><div class="input input-w">{{fromData.decideDescribe}}</div>
      </div>
    </div>
    <div class="img-div">
    	<img :src="fromData.images1" alt="" v-if="fromData.images1">
    	<img :src="fromData.images2" alt="" v-if="fromData.images2">
    	<img :src="fromData.images3" alt="" v-if="fromData.images3">
    </div>
    <template>
      <div style="text-align: center; margin: 20px auto 50px;" >
        <el-button size="small" @click="backPage"> 返回 </el-button>
        <template v-if="this.$route.query.active == 'edit'">
	        <el-button size="small" type="primary" @click="appealHead" > 保存 </el-button>
        </template>
      </div>
    </template>
  </div>
</template>
<script>
  	import { timestampToTime, getNowFormatDate } from "@/common/config/utils";
    import {getAppealDetail, getActivityInfo, handlingAppeal, getAllUserApi} from "@/common/config/api/SysEvent"
    export default {
      name: "EventApplyEdit",
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
          prop: false,
          currentId: null,
          newData: '',
          isDisabledType: true,
          isDisabledCheck: false,
          tsDivisionId: null,
          activityInfoList: [], //责任人list
          getAllUserList: [],
          resultList: [
						{code: '1', name: '申诉驳回'},
						{code: '2', name: '申诉成功'}
					],
          fromData: {
          	result: null,
          	dealOpinion: null,
          	tsDataDicId: null,
          	resUserId1: null,
          	resUserId2: null,
          	responsibilityId1: null,
          	responsibilityId2: null
          },
        }
      },
      methods: {
        backPage() {
          this.$router.go(-1);
        },
        resetChange(val){
        	if(val == 2) {
        		this.isDisabledType = false;
        	}else{
        		this.isDisabledType = true;
        	}
        },
        //申诉审核
        appealHead(num) {
          if(!this.fromData.result) {
            this.feedMessage('error', '请完善必填信息！');
            return false;
          }
          let p = {
						"dealOpinion": this.fromData.dealOpinion,
				    "resUserId1": this.fromData.resUserId1,
				    "resUserId2": this.fromData.resUserId2,
				    "responsibilityId1": this.fromData.responsibilityId1,
				    "responsibilityId2": this.fromData.responsibilityId2,
				    "result": this.fromData.result,
				    "tsAbnormalAppealId": this.fromData.tsAbnormalAppealId,
				    "tsAbnormalReportId": this.fromData.tsAbnormalReportId,
				    "tsDataDicId": this.fromData.tsDataDicId//事故类型ID
          }
          handlingAppeal(p).then(res => {
            if(res.repData) {
              this.feedMessage('success', res.repMsg);
              this.$router.go(-1);
            }
          })
        },
        //责任人
        getAllUserChange() {
          getAllUserApi({}).then(res => {
            this.getAllUserList = res.repData;
          })
        },
        //查询仓库信息（新增或编辑时默认回显数据）
        byInformations() {
          getAppealDetail({id: this.currentId}).then(res => {
            if (res.repData) {
              this.fromData = res.repData;
              if(res.repData.result == '2'){
              	this.isDisabledType = false;
              }else{
              	this.isDisabledType = true;
              }
              if(res.repData.resUserId1 && res.repData.resUserId1 >= 0){
                this.fromData.resUserId1 = res.repData.resUserId1 + '';
              }else{
                this.fromData.resUserId1 = null;
              }
              if(res.repData.resUserId2 && res.repData.resUserId2 >= 0){
                this.fromData.resUserId2 = res.repData.resUserId2 + '';
              }else{
                this.fromData.resUserId2 = null;
              }

              if(res.repData.responsibilityId1 && res.repData.responsibilityId1 >= 0){
                this.fromData.responsibilityId1 = res.repData.responsibilityId1;
              }else{
                this.fromData.responsibilityId1 = null;
              }
              if(res.repData.responsibilityId2 && res.repData.responsibilityId2 >= 0){
                this.fromData.responsibilityId2 = res.repData.responsibilityId2;
              }else{
                this.fromData.responsibilityId2 = null;
              }
            }
          })
        },
        getActivityInfoList() {
        	getActivityInfo({}).then(res => {
        		if(res.repData) {
        			this.activityInfoList = res.repData;
        		}
        	})
        }
      },
      created() {
      	this.getActivityInfoList();
        this.getAllUserChange();
      	this.newData = getNowFormatDate();
        this.$route.query.active == 'edit' ? this.isDisabledCheck = false : this.isDisabledCheck = true;
        if(this.$route.query.id) {
        	console.log(this.$route.query.id, '00')
          this.currentId = this.$route.query.id;
          this.byInformations(this.$route.query.id);
        }
      }
    }
</script>

<style lang="less" scoped>
  .input, .input-w{
    height: 38px;
    line-height: 38px;
    text-indent: 10px;
    float: left;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    background: #f9f9f9;
    cursor: no-drop;
  }
  .input {
    width: 200px;
  }
  .input-w {
    width: 80%;
  }
  .input-box-w {
  	width: 100% !important;
    clear: both;
  	display: block;
    .input-label {
    }
    .input-w {
    	width: 70%;
    }
  }
  .img-div {
  	width: 100%;
  	padding: 20px;
  	img{
  		display: inline-block;
	    border: 1px solid #f9f9f9;
  		width: 28%;
  		height: 250px;
	    margin: 0 20px;
  	}
  }
</style>