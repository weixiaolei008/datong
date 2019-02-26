<template>
  <div class="inventory-board" >
    <!-- search-group -->
    <div class="search-group clearfix">
      <div class="clearfix">
        <!-- input 输入框 -->
        <div class="input-box">
          <label class="input-label">VIN码</label>
          <el-select
            v-model="vin"
            filterable
            remote
            reserve-keyword
            placeholder="请输入VIN码"
            :remote-method="remoteMethod"
            :loading="loading">
            <el-option
              v-for="item in vinOption"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </div>
        <div class="search-box">
          <div class="search-reset" @click="reset"><span class="img-reset">清空</span></div>
          <div class="search-sub"  @click="search"><span class="img-sub">搜索</span></div>
        </div>
      </div>
    </div>
    <!--0-->
    <div class="group">
      <div class="title">
        整车总库存：{{all}}
      </div>
      <div class="list clearfix">
        <div class="list-item" v-for="item in list" @click="toDetail(item.warehouseCode)">
          <span class="name">{{item.label}}</span><span class="line"></span><span class="val">{{item.quantity}}辆</span>
        </div>
      </div>
    </div>
    <!--1-->
    <div class="group">
      <div class="title">
        VDC当前库存：{{vdcAll}}
      </div>
      <div class="list clearfix">
        <div class="list-item" v-for="item in list1" @click="toDetail(item.warehouseCode)">
          <span class="name">{{item.label}}</span><span class="line"></span><span class="val">{{item.quantity}}辆</span>
        </div>
      </div>
    </div>
    <!--5-->
    <div class="group">
      <div class="title">
        VDC在途库存：{{vdcOutAll}}
      </div>
      <div class="list clearfix">
        <div class="list-item" v-for="item in list5" @click="toDetail(item.warehouseCode)">
          <div>{{item.quantity}}辆</div>
          <div>{{item.label}}</div>
        </div>
      </div>
    </div>
    <!--2-->
    <div class="group">
      <div class="title">
        VSC总库存：{{vscAll}}
      </div>
      <div class="list clearfix">
        <div class="list-item" v-for="item in list2" @click="toDetail(item.warehouseCode)">
          <span class="name">{{item.label}}</span><span class="line"></span><span class="val">{{item.quantity}}辆</span>
        </div>
      </div>
    </div>
    <!--3-->
    <div class="group">
      <div class="title">
        在外总库存：{{outAll}}
      </div>
      <div class="list clearfix">
        <div class="list-item" v-for="item in list3" @click="toDetail(item.warehouseCode)">
          <span class="name">{{item.label}}</span><span class="line"></span><span class="val">{{item.quantity}}辆</span>
        </div>
      </div>
    </div>
    <!--4-->
    <div class="group">
      <div class="title">
        VSC在途库存：{{vscOutAll}}
      </div>
      <div class="list clearfix">
        <div class="list-item" v-for="item in list4" @click="toDetail(item.warehouseCode)">
          <div>{{item.quantity}}辆</div>
          <div>{{item.label}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {loadInventoryBoard, searchInventoryDetail, getVinList} from "@/common/config/api/InfoInventory"

  export default {
    name: "InventoryBoard",
    components: {},
    data() {
      return {
        vin: '',
        loading: false,
        vinOption: [],
        all: '0',
        vdcAll : '0',
        vscAll : '0',
        outAll : '0',
        vscOutAll: '0',
        vdcOutAll: '0',
        list: [
          {
            label: '整车总库存',
            warehouseCode: '',
            quantity: '0'
          },
        ],
        list1: [
          {
            label: '河东VDC',
            warehouseCode: '',
            quantity: '0'
          },
          {
            label: '张泾VDC',
            warehouseCode: '',
            quantity: '0'
          },
          {
            label: '长安VDC',
            warehouseCode: '',
            quantity: '0'
          }
        ],
        list2: [
          {
            label: '南沙VSC',
            warehouseCode: '',
            quantity: '0'
          },
          {
            label: '天津VSC',
            warehouseCode: '',
            quantity: '0'
          },
          {
            label: '大连VSC',
            warehouseCode: '',
            quantity: '0'
          },
          {
            label: '重庆VSC',
            warehouseCode: '',
            quantity: '0'
          }
        ],
        list3: [
          {
            label: 'SVO车间',
            warehouseCode: '',
            quantity: '0'
          },
          {
            label: 'PPO车间',
            warehouseCode: '',
            quantity: '0'
          },
          {
            label: '批量返修车间',
            warehouseCode: '',
            quantity: '0'
          },
          {
            label: 'PDI返修车间',
            warehouseCode: '',
            quantity: '0'
          },
          // {
          //   label: '缺件补件车间',
          //   warehouseCode: '',
          //   quantity: '0'
          // },
          {
            label: '质损返修车间',
            warehouseCode: '',
            quantity: '0'
          },
          {
            label: '二次报交车间',
            warehouseCode: '',
            quantity: '0'
          },
          {
            label: '4S店返修车间',
            warehouseCode: '',
            quantity: '0'
          },
          // {
          //   label: '库改车间',
          //   warehouseCode: '',
          //   quantity: '0'
          // },
          {
            label: '领用车库',
            warehouseCode: '',
            quantity: '0'
          },
          {
            label: '氢能源库',
            warehouseCode: '',
            quantity: '0'
          }
        ],
        list4: [
          {
            label: '河东VDC-南沙VSC',
            warehouseCode: '',
            quantity: '0'
          },
          {
            label: '河东VDC-天津VSC',
            warehouseCode: '',
            quantity: '0'
          },
          {
            label: '河东VDC-大连VSC',
            warehouseCode: '',
            quantity: '0'
          },
          {
            label: '河东VDC-重庆VSC',
            warehouseCode: '',
            quantity: '0'
          },
          {
            label: '长安VDC-南沙VSC',
            warehouseCode: '',
            quantity: '0'
          },
          {
            label: '长安VDC-天津VSC',
            warehouseCode: '',
            quantity: '0'
          },
          {
            label: '长安VDC-大连VSC',
            warehouseCode: '',
            quantity: '0'
          },
          {
            label: '长安VDC-重庆VSC',
            warehouseCode: '',
            quantity: '0'
          },
          {
            label: '张泾VDC-南沙VSC',
            warehouseCode: '',
            quantity: '0'
          },
          {
            label: '张泾VDC-天津VSC',
            warehouseCode: '',
            quantity: '0'
          },
          {
            label: '张泾VDC-大连VSC',
            warehouseCode: '',
            quantity: '0'
          },
          {
            label: '张泾VDC-重庆VSC',
            warehouseCode: '',
            quantity: '0'
          }
        ],
        list5: [
          {
            label: '河东VDC-长安VDC',
            warehouseCode: '',
            quantity: '0'
          },
          {
            label: '长安VDC-河东VDC',
            warehouseCode: '',
            quantity: '0'
          },
          {
            label: '长安VDC-张泾VDC',
            warehouseCode: '',
            quantity: '0'
          },
          {
            label: '张泾VDC-长安VDC',
            warehouseCode: '',
            quantity: '0'
          },
          {
            label: '张泾VDC-河东VDC',
            warehouseCode: '',
            quantity: '0'
          },
          {
            label: '河东VDC-张泾',
            warehouseCode: '',
            quantity: '0'
          }
        ],
      }
    },
    methods: {
      remoteMethod(query) {
        if (query.length > 5) {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            getVinList({vin: query}).then(res => {
              this.vinOption = res.repData;
            })
          }, 200);
        } else {
          this.vinOption = [];
        }
      },
      reset(){
        this.vin = ''
      },
      search(){
        let self = this;
        searchInventoryDetail({vin: self.vin}).then(res => {
          if(res && res.repData && res.repData.result == '成功'){
            this.$router.push({path: '/InventoryDetail', query: {code: res.repData.warehouseCode, vin: self.vin}});
          }else{
            this.msgInfo(res.repData.result)
          }
        })
      },
      loadData() {
        let self = this;
        let p = {
        }
        loadInventoryBoard(p).then(res => {
          if(!res) return;
          let data = res.repData;
          self.all = data.plantAll.quantity;
          self.vdcAll = data.vdcAll.quantity;
          self.vdcOutAll = data.vdcOutAll.quantity;
          self.vscAll = data.vscAll.quantity;
          self.outAll = data.outAll.quantity;
          self.vscOutAll = data.vscOutAll.quantity;
          // this.$set(self.list1[0],"val", 22)
          self.list[0].quantity = data.plantAll.quantity;
          self.list[0].warehouseCode = data.plantAll.warehouseCode;
          self.list1[0].quantity = data.hedongVDC.quantity;
          self.list1[0].warehouseCode = data.hedongVDC.warehouseCode;
          self.list1[1].quantity = data.zhangjingVDC.quantity;
          self.list1[1].warehouseCode = data.zhangjingVDC.warehouseCode;
          self.list1[2].quantity = data.changanVDC.quantity;
          self.list1[2].warehouseCode = data.changanVDC.warehouseCode;

          self.list2[0].quantity = data.nanshaVSC.quantity;
          self.list2[0].warehouseCode = data.nanshaVSC.warehouseCode;
          self.list2[1].quantity = data.tianjinVSC.quantity;
          self.list2[1].warehouseCode = data.tianjinVSC.warehouseCode;
          self.list2[2].quantity = data.dalianVSC.quantity;
          self.list2[2].warehouseCode = data.dalianVSC.warehouseCode;
          self.list2[3].quantity = data.chongqingVSC.quantity;
          self.list2[3].warehouseCode = data.chongqingVSC.warehouseCode;

          self.list3[0].quantity = data.svo.quantity;
          self.list3[0].warehouseCode = data.svo.warehouseCode;
          self.list3[1].quantity = data.ppo.quantity;
          self.list3[1].warehouseCode = data.ppo.warehouseCode;
          self.list3[2].quantity = data.batchRepair.quantity;
          self.list3[2].warehouseCode = data.batchRepair.warehouseCode;
          self.list3[3].quantity = data.pdirepair.quantity;
          self.list3[3].warehouseCode = data.pdirepair.warehouseCode;
          // self.list3[4].quantity = data.lack.quantity;
          // self.list3[4].warehouseCode = data.lack.warehouseCode;
          self.list3[4].quantity = data.damage.quantity;
          self.list3[4].warehouseCode = data.damage.warehouseCode;

          self.list3[5].quantity = data.doubleReturn.quantity;
          self.list3[5].warehouseCode = data.doubleReturn.warehouseCode;
          self.list3[6].quantity = data.fourSRepair.quantity;
          self.list3[6].warehouseCode = data.fourSRepair.warehouseCode;
          // self.list3[7].quantity = data.transform.quantity;
          // self.list3[7].warehouseCode = data.transform.warehouseCode;
          self.list3[7].quantity = data.draw.quantity;
          self.list3[7].warehouseCode = data.draw.warehouseCode;
          self.list3[8].quantity = data.hydrogen.quantity;
          self.list3[8].warehouseCode = data.hydrogen.warehouseCode;

          self.list4[0].quantity = data.hedongToNansha.quantity;
          self.list4[0].warehouseCode = data.hedongToNansha.warehouseCode;
          self.list4[1].quantity = data.hedongToTianjin.quantity;
          self.list4[1].warehouseCode = data.hedongToTianjin.warehouseCode;
          self.list4[2].quantity = data.hedongToDalian.quantity;
          self.list4[2].warehouseCode = data.hedongToDalian.warehouseCode;
          self.list4[3].quantity = data.hedongToChongqing.quantity;
          self.list4[3].warehouseCode = data.hedongToChongqing.warehouseCode;

          self.list4[4].quantity = data.changanToNansha.quantity;
          self.list4[4].warehouseCode = data.changanToNansha.warehouseCode;
          self.list4[5].quantity = data.changanToTianjin.quantity;
          self.list4[5].warehouseCode = data.changanToTianjin.warehouseCode;
          self.list4[6].quantity = data.changanToDalian.quantity;
          self.list4[6].warehouseCode = data.changanToDalian.warehouseCode;
          self.list4[7].quantity = data.changanToChongqing.quantity;
          self.list4[7].warehouseCode = data.changanToChongqing.warehouseCode;

          self.list4[8].quantity = data.zhangjingToNansha.quantity;
          self.list4[8].warehouseCode = data.zhangjingToNansha.warehouseCode;
          self.list4[9].quantity = data.zhangjingToTianjin.quantity;
          self.list4[9].warehouseCode = data.zhangjingToTianjin.warehouseCode;
          self.list4[10].quantity = data.zhangjingToDalian.quantity;
          self.list4[10].warehouseCode = data.zhangjingToDalian.warehouseCode;
          self.list4[11].quantity = data.zhangjingToChongqing.quantity;
          self.list4[11].warehouseCode = data.zhangjingToChongqing.warehouseCode;

          self.list5[0].quantity = data.hedongToChangan.quantity;
          self.list5[0].warehouseCode = data.hedongToChangan.warehouseCode;
          self.list5[1].quantity = data.changanToHedong.quantity;
          self.list5[1].warehouseCode = data.changanToHedong.warehouseCode;
          self.list5[2].quantity = data.changanToZhangjing.quantity;
          self.list5[2].warehouseCode = data.changanToZhangjing.warehouseCode;
          self.list5[3].quantity = data.zhangjingToChangan.quantity;
          self.list5[3].warehouseCode = data.zhangjingToChangan.warehouseCode;
          self.list5[4].quantity = data.zhangjingToHedong.quantity;
          self.list5[4].warehouseCode = data.zhangjingToHedong.warehouseCode;
          self.list5[5].quantity = data.hedongToZhangjing.quantity;
          self.list5[5].warehouseCode = data.hedongToZhangjing.warehouseCode;
        })
      },
      toDetail(code){
        this.$router.push({path: '/InventoryDetail', query: {code: code}});
      }
    },
    created() {
      this.loadData()
    },
    beforeDestroy(){
    }
  }
</script>

<style lang="less">
  .inventory-board{
    height: 100%;
    overflow: auto;
    .group{
      margin-bottom: 60px;
      margin-left: 30px;
      margin-top: 35px;
      .title{
        font-size: 20px;
        color: #666666;
        line-height: 24px;
        padding-left: 5px;
        margin-left: 15px;
        border-left: 6px solid #74D1FC;
      }
      .list{
        .list-item{
          cursor: pointer;
          float: left;
          position: relative;
          width: 286px;
          line-height: 100px;
          margin-top: 30px;
          margin-right: 30px;
          box-shadow: 0 0 14px 0 rgba(116,209,252,0.50);
          border-radius: 12px;
          text-align: center;
          div:nth-child(1){
            padding-top: 20px;
            line-height: 30px;
          }
          div:nth-child(2){
            padding-bottom: 20px;
            line-height: 30px;
          }
          &:nth-last-child(1){
            margin-right: 0px;
          }
          &:before{
            position: absolute;
            content: '';
            width: 6px;
            height: 54px;
            background: #74D1FC;
            left: 0;
            top: 23px;
          }
          .name{
            display: inline-block;
            width: 143px;
          }
          .val{
            display: inline-block;
            width: 143px;
          }
          .line{
            position: absolute;
            display: inline-block;
            width: 2px;
            height: 54px;
            left: 143px;
            top: 23px;
            background: #74D1FC;
          }
        }
      }
    }
  }
</style>
