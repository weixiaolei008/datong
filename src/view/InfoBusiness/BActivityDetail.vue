<!--任务 活动详情-->
<template>
  <el-container style="width: 100%;height: 100%;" class="Bactivity-detail">
    <el-main class="table" style='padding: 10px;'>
      <div class="active-title">
        <ul>
          <li>VIN码：<span>{{baseInfo.vin}}</span></li>
          <li>任务名称：<span>{{baseInfo.planName}}</span></li>
          <li>仓库：<span>{{baseInfo.warehouse}}</span></li>
          <li>功能区：<span>{{baseInfo.functionalZone}}</span></li>
          <li>库位：<span>{{baseInfo.location}}</span></li>
        </ul>
      </div>
      <div class="active-cont">
        <div class="progress" v-for="(item,index) in list" >
          <div class="progress-title" >{{item.activityType}}<i v-show="index!=(list.length-1)"></i></div>
          <div style="height: 32px;padding-top: 20px;">
            <div class="switch">{{item.activityStatus}}</div>
          </div>
          <div v-for="i in item.rfidInfoList" style="line-height: 30px"><span>RFID： </span>{{i}}</div>
        </div>

      </div>
    </el-main>
  </el-container>
</template>

<script>
  import {loadBActivityDetail} from "@/common/config/api/InfoBusiness"

  export default {
    name: "BActivityDetail",
    components: {

    },
    data() {
      return {
        list:[],
        baseInfo: {
          activityList: '', //活动列表
          functionalZone: '', //功能区
          location: '', //库位 ,
          planStatusCode: '', //计划状态code
          planName: '', //任务名称
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
          planId:self.$route.query.planId, //任务id
          planType:self.$route.query.planType, //任务类型
        }
        loadBActivityDetail(p).then(res =>{
          self.baseInfo.vin = res.repData.vin; //VIN码
          self.baseInfo.planName = res.repData.planName; //任务名称
          self.baseInfo.warehouse = res.repData.warehouse; //仓库
          self.baseInfo.functionalZone = res.repData.functionalZone; //功能区
          self.baseInfo.location = res.repData.location; //库位
          self.list = res.repData.activityList;
        })
      },
    },
    mounted(){
    },
    created() {
      this.loadTActivityDetailData();
    }
  }
</script>

<style lang="less">
  .Bactivity-detail{
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
        color: #3383F2;
        .progress-title{
          position: relative;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 6px solid #3383F2;
          color:#3383F2;
          text-align: center;
          line-height: 100px;
          margin: 0 auto;
          i{
            display: inline-block;
            width: 100px;
            height: 2px;
            background: #D9D9D9;
            position: absolute;
            left: 150px;
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
    }
  }

</style>




