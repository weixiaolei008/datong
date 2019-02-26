<!--任务 活动详情-->
<template>
  <el-container style="width: 100%;height: 100%;" class="Tactivity-detail">
    <el-main class="table" style='padding: 10px;'>
      <div class="active-title">
        <div style="padding-bottom: 20px">{{baseInfo.currentPlan}}</div>
        <ul>
          <li>VIN码：<span>{{baseInfo.vin}}</span></li>
          <li>任务名称：<span>{{baseInfo.sourcePlan}}</span></li>
          <li>仓库：<span>{{baseInfo.warehouse}}</span></li>
          <li>功能区：<span>{{baseInfo.functionalZone}}</span></li>
          <li>库位：<span>{{baseInfo.location}}</span></li>
        </ul>
      </div>
      <div class="active-cont">
        <div class="progress" v-for="(item,index) in list" :class="{'progress-blue': item.activityStatusCode==9 ,'progress-green': item.activityStatusCode==2,'progress-gray': item.activityStatusCode==1 }">
          <div class="progress-title" >{{item.activityType}}<i v-show="index!=(list.length-1)"></i></div>
          <div style="padding-top: 10px;">
            <div class="switch">
              <span :class="{'icon-repair': item.hasRepair===1,'icon-norepair': item.hasRepair===0,}"></span>
              <span :class="{'icon-repair': item.hasRepair===0,'icon-norepair': item.hasRepair===1,}"></span>
            </div>
            <div class="switch" style="font-size: 12px;">&nbsp;&nbsp;&nbsp;返修&nbsp;&nbsp;&nbsp;无返修</div>
            <div class="switch" style="padding:10px 0" v-if="baseInfo.planStatusCode != 4 && baseInfo.planStatusCode != 3">
              <span class="icon-start hand" @click="loadTActivityDetailStausData(2)"
                    v-show="baseInfo.planStatusCode == 5"></span>
              <span class="icon-start2 hand"
                    v-show="baseInfo.planStatusCode != 5"></span>
              <span class="icon-shop hand" @click="loadTActivityDetailStausData(5)"
                    v-show="baseInfo.planStatusCode == 2"></span>
              <span class="icon-shop2 hand"
                    v-show="baseInfo.planStatusCode != 2"></span>
              <span class="icon-over" @click="loadTActivityDetailStausData(4)"></span>
            </div>
            <div class="switch" style="padding:10px 0" v-if="baseInfo.planStatusCode == 4 || baseInfo.planStatusCode == 3">
              <span class="icon-start2"></span>
              <span class="icon-shop2"></span>
              <span class="icon-over2"></span>
            </div>
            <div class="switch">{{item.activityStatus}}</div>
          </div>
          <div v-for="i in item.rfidInfoList" style="line-height: 30px"><span>RFID： </span>{{i}}</div>
        </div>
      </div>
      <div style="position: relative" class="active-cont" v-for="items in child" :style="{marginLeft: 350*(items.belongedActivityOrder-1) + 'px'}">
       <span style="position: absolute;top: 50px;width:126px;white-space: normal;line-height: 20px;">{{items.planName}}</span>
        <div class="progress" v-for="(item,index) in items.activityList" :class="{'progress-blue': item.activityStatusCode==9 ,'progress-green': item.activityStatusCode==2,'progress-gray': item.activityStatusCode==1 }">
          <div class="progress-title" style="width: 80px;height: 80px;line-height: 80px">{{item.activityType}}<i v-show="index!=(items.activityList.length-1)"></i></div>
          <div class="switch" style="padding: 10px 0">{{item.activityStatus}}</div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  import {loadTActivityDetail,loadTActivityDetailStatus} from "@/common/config/api/InfoTask"

  export default {
    name: "TActivityDetail",
    components: {

    },
    data() {
      return {
        list:[],
        child: [],
        baseInfo: {
          currentPlan: '', //当前计划
          functionalZone: '', //功能区
          location: '', //库位 ,
          planStatusCode: '', //计划状态code
          sourcePlan: '', //任务名称（计划源）
          subRepairPlanList: '', //所属返修计划列表
          vin: '', // VIN码
          warehouse: '', //仓库
        },
      }
    },
    methods: {
      //活动详情
      loadTActivityDetailData() {
        let self = this;
        let p = {
          activityId: self.$route.query.currentActivityId
        }
        loadTActivityDetail(p).then(res =>{
          self.baseInfo.currentPlan = res.repData.currentPlan; //当前计划
          self.baseInfo.vin = res.repData.vin; //VIN码
          self.baseInfo.sourcePlan = res.repData.sourcePlan; //任务名称（计划源）
          self.baseInfo.warehouse = res.repData.warehouse; //仓库
          self.baseInfo.functionalZone = res.repData.functionalZone; //功能区
          self.baseInfo.location = res.repData.location; //库位
          self.baseInfo.planStatusCode = res.repData.planStatusCode; //计划状态
          self.list = res.repData.activityList;
          self.child = res.repData.subRepairPlanList; //所属返修计划列表
        })
      },
      loadTActivityDetailStausData(val){
        let self = this;
        let p ={
          activityId:self.$route.query.currentActivityId, //活动id
          targetPlanStatus: val, //目标计划状态
        }
        loadTActivityDetailStatus(p).then(res =>{
          res && res.success && self.msgInfo(res.repData);
          self.loadTActivityDetailData();
        })
      }
    },
    mounted(){
    },
    created() {
      this.loadTActivityDetailData();
    }
  }
</script>

<style lang="less">
  .Tactivity-detail{
    white-space: nowrap;
    overflow-x: auto;
    .active-title{
      font-size: 18px;
      color: #666666;
      padding: 20px;
      ul{
        border-left:7px solid #4B70B9;
        padding-left: 20px;
        li{
          padding: 8px 0;
        }
      }
    }
    .active-cont{
      .progress{
        width: 350px;
        vertical-align: top;
        text-align: center;
        display: inline-block;
        color: #D9D9D9;
        .progress-title{
          position: relative;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          white-space: normal;
          border: 6px solid #D9D9D9;

          text-align: center;
          line-height: 100px;
          margin: 0 auto;
          i{
            display: inline-block;
            width: 100px;
            height: 2px;
            background: #D9D9D9;
            position: absolute;
            left: 160px;
            top:50%;
          }
        }
        .switch{
          span{
            display: inline-block;
            width: 30px;
            height: 30px;
          }
        }
        p{
          padding: 10px 0;
        }

      }
      .progress-blue{
        .progress-title{
          border: 6px solid #3383F2;
        }
        .icon-over{
          background: url("../../../src/common/image/btn/over_grant.png") no-repeat center center;
        }
        .icon-start{
          background: url("../../../src/common/image/btn/start_grant.png") no-repeat center center;
        }
        .icon-shop{
          background: url("../../../src/common/image/btn/shop.png") no-repeat center center;
        }
        .icon-over2{
          background: url("../../../src/common/image/btn/over_grant.png") no-repeat center center;
        }
        .icon-start2{
          background: url("../../../src/common/image/btn/start_grant.png") no-repeat center center;
        }
        .icon-shop2{
          background: url("../../../src/common/image/btn/shop.png") no-repeat center center;
        }
        color: #3383F2;
      }
      .progress-green{
        .progress-title{
          border: 6px solid #93BE51;
        }
        .icon-repair{
          background: url("../../../src/common/image/btn/icon3.png") no-repeat center center;
        }
        .icon-over{
          background: url("../../../src/common/image/btn/over_grant2.png") no-repeat center center;
        }
        .icon-start{
          background: url("../../../src/common/image/btn/start_grant2.png") no-repeat center center;
        }
        .icon-shop{
          background: url("../../../src/common/image/btn/shop2.png") no-repeat center center;
        }
        .icon-over2{
          background: url("../../../src/common/image/btn/over_grant.png") no-repeat center center;
        }
        .icon-start2{
          background: url("../../../src/common/image/btn/start_grant.png") no-repeat center center;
        }
        .icon-shop2{
          background: url("../../../src/common/image/btn/shop.png") no-repeat center center;
        }
        color: #93BE51;
      }
      .progress-gray{
        .progress-title{
          border: 6px solid #ccc;
        }
        .icon-repair{
          background: url("../../../src/common/image/btn/icon2.png") no-repeat center center;
        }
        .icon-start{
          background: url("../../../src/common/image/btn/start_grant2.png") no-repeat center center;
        }
        .icon-over{
          background: url("../../../src/common/image/btn/over_grant2.png") no-repeat center center;
        }
        .icon-over2{
          background: url("../../../src/common/image/btn/over_grant.png") no-repeat center center;
        }
        .icon-start2{
          background: url("../../../src/common/image/btn/start_grant.png") no-repeat center center;
        }
        .icon-shop2{
          background: url("../../../src/common/image/btn/shop.png") no-repeat center center;
        }
        color: #ccc;
      }
    }
    .hand{
      cursor: pointer;
    }
  }

</style>


