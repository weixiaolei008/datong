<!--任务看板-->
<template>
  <div class="task-board" >
    <!--1-->
    <div class="group" v-for="items in list">
      <div class="title">{{items.title}}</div>
      <div class="list clearfix">
        <div class="list-item list-items" v-for="item in items.child" @click="inDetail(item)">
          <div style="padding: 15px 0;font-size: 18px;color:#666">{{item.title}}</div>
          <div style="padding-bottom: 30px;">
            <div><span class="name">今日创建任务数量</span><span class="val">{{getVal(item.value, 'createdTodayQuantity')}} 辆</span></div>
            <div><span class="name">前日未完成任务数量</span><span class="val">{{getVal(item.value, 'unfinishedYesterdayQuantity')}} 辆</span></div>
            <div><span class="name">今日待完成任务数量</span><span class="val">{{getVal(item.value, 'toBeFinishedTodayQuantity')}} 辆</span></div>
            <div><span class="name">今日已完成任务数量</span><span class="val">{{getVal(item.value, 'finishedToday')}} 辆</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {loadTaskBoard} from "@/common/config/api/InfoTask"

  export default {
    name: "TaskBoard",
    components: {},
    data() {
      return {
        list: [
          {
            title: '下线车辆入库业务',
            child: [
              {
                title: '正常车辆入库',
                value: 'offlineNormal'
              },
              {
                title: '缺件车辆入库',
                value: 'offlineLack'
              },
              {
                title: '库改车辆入库',
                value: 'offlineTransform'
              }
            ]
          },
          {
            title: '车辆退库入库',
            child: [
              {
                title: '销售车辆退库入库',
                value: 'returnWarehouseSale'
              }
            ]
          },
          {
            title: ' 发运车辆出库',
            child: [
              {
                title: '国内车辆出库',
                value: 'dispatchDomestic'
              },
              {
                title: '海外车辆出库',
                value: 'dispatchOverseas'
              },
              {
                title: '房车出库',
                value: 'dispatchTouringCar'
              }
            ]
          },
          {
            title: ' 车辆退工厂出库',
            child: [
              {
                title: '缺件车辆出库',
                value: 'returnPlantLack'
              },
              {
                title: '库改车辆出库',
                value: 'returnPlantTransform'
              }
            ]
          },
          {
            title: ' 车辆库间调拨',
            child: [
              {
                title: '仓储车辆移库入库VDC',
                value: 'betweenVDCInbound'
              },
              {
                title: '仓储车辆移库出库VDC',
                value: 'betweenVDCOutbound'
              },
              {
                title: 'PDI车辆返修入库',
                value: 'betweenPDIInbound'
              },
              {
                title: 'PDI车辆返修出库',
                value: 'betweenPDIOutbound'
              },
              {
                title: '质损车辆返修入库',
                value: 'betweenDamageInbound'
              },
              {
                title: '质损车辆返修出库',
                value: 'betweenDamageOutbound'
              },
              {
                title: '批量返修车辆入库',
                value: 'betweenBatchInbound'
              },
              {
                title: '批量返修车辆出库',
                value: 'betweenBatchOutbound'
              },
              {
                title: '4S店返修车辆调拨入库',
                value: 'betweenFoursInbound'
              },
              {
                title: '4S店返修车辆调拨出库',
                value: 'betweenFoursOutbound'
              },
              {
                title: '氢能源车辆入库',
                value: 'betweenHydrogenInbound'
              },
              {
                title: '氢能源车辆出库',
                value: 'betweenHydrogenOutbound'
              },
              {
                title: 'SVO车辆入库',
                value: 'betweenSVOInbound'
              },
              {
                title: 'SVO车辆出库',
                value: 'betweenSVOOutbound'
              },
              {
                title: 'PPO车辆入库',
                value: 'betweenPPOInbound'
              },
              {
                title: 'PPO车辆出库',
                value: 'betweenPPOOutbound'
              },
              {
                title: '领用车辆入库',
                value: 'betweenDrawInbound'
              },
              {
                title: '领用车辆出库',
                value: 'betweenDrawOutbound'
              },
              {
                title: '二次报交车辆入库',
                value: 'betweenDoubleInbound'
              },
              {
                title: '二次报交车辆出库',
                value: 'betweenDoubleOutbound'
              },
              {
                title: '仓储车辆移库出库VSC',
                value: 'betweenVSCOutbound'
              }
            ]
          },
          {
            title: ' 库内作业',
            child: [
              {
                title: '车辆维保任务',
                value: 'inMaintenance'
              },
              {
                title: '车辆清洗任务',
                value: 'inCleaning'
              },
              {
                title: '车辆移位任务',
                value: 'inShift'
              },
              {
                title: 'PDI车辆返修任务',
                value: 'inPDIRepair'
              },
              {
                title: '质损车辆返修任务',
                value: 'inDamageRepair'
              },
              {
                title: '原位批量返修车辆任务',
                value: 'inOriginalBatchRepair'
              },
              {
                title: '移位批量返修车辆任务',
                value: 'inShiftBatchRepair'
              },
              {
                title: '4S店库内返修车辆任务',
                value: 'inFoursRepair'
              }
            ]
          },
        ],

        allData: {},
      }
    },
    methods: {
      inDetail(item){
        this.$router.push({
          path: '/TaskDetail',
          query: {
            taskDetailId: this.getVal(item.value, 'planCode')
          }
        })
      },
      getVal(val, str){
        // let a = Object.assign({},this.allData[val]);
        let a = {...this.allData[val]};
        return a[str];
      },
      loadDataList() {
        let self = this;
        loadTaskBoard({}).then(res => {
          self.allData = res.repData;
        })

      },
    },
    created() {
      this.loadDataList()
    },
    beforeDestroy(){
    }
  }
</script>

<style lang="less">
  .task-board{
    height: 100%;
    overflow: auto;
    .group{
      margin: 30px 0 0 30px;
      .title{
        font-size: 20px;
        color: #666666;
        line-height: 24px;
        padding-left: 5px;
        margin-left: 15px;
        border-left: 6px solid #4B70B9;
      }
      &:nth-child(2){
        .title{
          border-left: 6px solid #EA74A2;
        }
        .list{
          .list-item{
            box-shadow: 0 0 14px 0 rgba(234,116,162,0.50);
            &:before{
              background: #EA74A2;
            }
          }
        }
      }
      &:nth-child(3){
        .title{
          border-left: 6px solid #74D1FC;
        }
        .list{
          .list-item{
            box-shadow: 0 0 14px 0 rgba(116,209,252,0.50);
            &:before{
              background: #74D1FC;
            }
          }
        }
      }
      &:nth-child(5){
        .title{
          border-left: 6px solid #74D1FC;
        }
        .list{
          .list-item{
            box-shadow: 0 0 14px 0 rgba(116,209,252,0.50);
            &:before{
              background: #74D1FC;
            }
          }
        }
      }
      .list{
        .list-item{
          float: left;
          position: relative;
          width: 286px;
          line-height: 35px;
          margin: 30px 0;
          margin-right: 30px;
          box-shadow: 0 0 14px 0 rgba(75,112,185,0.50);
          border-radius: 12px;
          text-align: center;
          &:before{
            position: absolute;
            content: '';
            width: 6px;
            height: 60px;
            background: #4B70B9;
            left: 0;
            top: 38%;
          }
          .name{
            display: inline-block;
            width: 130px;
            font-size: 14px;
            color: #818181;
          }
          .val{
            display: inline-block;
            width: 100px;
            font-size: 16px;
            color: #666666;
            text-align: right;
          }
        }
        .bg-red{
          box-shadow: 0 0 14px 0 rgba(234,116,162,0.50);
          &:before{
            background: #EA74A2;
          }
        }
        .bg-blue{
          box-shadow: 0 0 14px 0 rgba(116,209,252,0.50);
          &:before{
            background: #74D1FC;
          }
        }
      }
    }
  }
</style>

