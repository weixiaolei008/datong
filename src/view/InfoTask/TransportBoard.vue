<template>
  <div class="transport-board" >
    <div class="title">库间运输活动</div>
    <!--1-->
    <div class="group" v-for="items in list">
      <div class="title">{{items.title}}</div>
      <div class="list clearfix">
        <div class="list-item" v-for="item in items.child">
          <div>{{item.title}}</div>
          <!--<i style="color: transparent">金</i>-->
          <div><span>今日创建任务数量：</span>
            <span class="val">{{getVal(item.value, 'createdTodayQuantity')}}</span>
          </div>
          <div><span>前日未完成任务数量：</span>
            <span class="val">{{getVal(item.value, 'unfinishedYesterdayQuantity')}}</span>
          </div>
          <div><span>今日待完成任务数量：</span>
            <span class="val">{{getVal(item.value, 'toBeFinishedTodayQuantity')}}</span>
          </div>
          <div><span>今日已完成任务数量：</span>
            <span class="val">{{getVal(item.value, 'finishedToday')}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {loadTransportBoard} from "@/common/config/api/InfoTask"

  export default {
    name: "TransportBoard",
    components: {},
    data() {
      return {
        list: [
          {
            title: '板运活动',
            child: [
              {
                title: '河东VDC--长安VDC',
                value: 'plateHedongToChangan'
              },
              {
                title: '河东VDC--张泾VDC',
                value: 'plateHedongToZhangjing'
              },
              {
                title: '长安VDC--河东VDC',
                value: 'plateChanganToHedong'
              },
              {
                title: '长安VDC--张泾VDC',
                value: 'plateChanganToZhangjing'
              },
              {
                title: '张泾VDC--河东VDC',
                value: 'plateZhangjingToHedong'
              },
              {
                title: '张泾VDC--长安VDC',
                value: 'plateZhangjingToChangan'
              },
            ]
          },
          {
            title: '拖车活动',
            child: [
              {
                title: '河东VDC--长安VDC',
                value: 'trailHedongToChangan'
              },
              {
                title: '河东VDC--张泾VDC',
                value: 'trailHedongToZhangjing'
              },
              {
                title: '长安VDC--河东VDC',
                value: 'trailChanganToHedong'
              },
              {
                title: '长安VDC--张泾VDC',
                value: 'trailChanganToZhangjing'
              },
              {
                title: '张泾VDC--河东VDC',
                value: 'trailZhangjingToHedong'
              },
              {
                title: '张泾VDC--长安VDC',
                value: 'trailZhangjingToChangan'
              },
            ]
          },
          {
            title: '地跑活动',
            child: [
              {
                title: '河东VDC--长安VDC',
                value: 'groundHedongToChangan'
              },
              {
                title: '河东VDC--张泾VDC',
                value: 'groundHedongToZhangjing'
              },
              {
                title: '长安VDC--河东VDC',
                value: 'groundChanganToHedong'
              },
              {
                title: '长安VDC--张泾VDC',
                value: 'groundChanganToZhangjing'
              },
              {
                title: '张泾VDC--河东VDC',
                value: 'groundZhangjingToHedong'
              },
              {
                title: '张泾VDC--长安VDC',
                value: 'groundZhangjingToChangan'
              },
            ]
          }
        ],
        allData: {},
      }
    },
    methods: {
      getVal(val, str){
        // let a = Object.assign({},this.allData[val]);
        let a = {...this.allData[val]};
        return a[str];
      },
      loadData() {
        let self = this;
        loadTransportBoard({}).then(res => {
         self.allData = res.repData;
        })
      },
    },
    created() {
      this.loadData()
    },
    beforeDestroy(){
    }
  }
</script>

<style lang="less">
  .title{
    font-size: 24px;
    margin-left: 30px;
    margin-top: 20px;
  }
  .transport-board{
    height: 100%;
    overflow: auto;
    .group{
      margin-bottom: 60px;
      margin-left: 30px;
      margin-top: 35px;
      & > .title{
        font-size: 18px;
        color: #666666;
        line-height: 20px;
        padding-left: 5px;
        margin-left: 15px;
        border-left: 4px solid #74D1FC;
      }
      .list{
        .list-item{
          float: left;
          width: 200px;
          margin-top: 30px;
          margin-right: 30px;
          box-shadow: 0 0 14px 0 rgba(116,209,252,0.50);
          border-radius: 12px;
          font-size: 14px;
          line-height: 30px;
          padding: 20px;
          div:nth-child(1){
            font-size: 16px;
            font-weight: bold;
          }
        }
      }
    }
  }
</style>
