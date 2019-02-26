<template>
  <el-container style="width: 100%; height: 100%;">
    <!--<el-header style="height: 270px; padding: 10px;">-->
    <!--<img width='' height='200' :src="src"/>-->
    <!--<div class="input-box" style="margin: 5px 0 0 0;">-->
    <!--<label class="input-label" style="width: auto">区域</label>-->
    <!--<el-select v-model="regionId" placeholder="请选择区域">-->
    <!--<el-option v-for="item in regionLsit" :key="item.code" :label="item.name" :value="item.code">-->
    <!--</el-option>-->
    <!--</el-select>-->
    <!--</div>-->
    <!--</el-header>-->
    <el-main style="padding: 0;">
      <img width=100% :src="src" style="padding: 10px;"/>
      <div class="clearfix">
        <div class="input-box" style="margin: 5px 0 5px 10px;">
          <label class="input-label" style="width: auto">区域</label>
          <el-select v-model="regionId" placeholder="请选择区域" @change='loadData'>
            <el-option v-for="item in regionLsit" :key="item.code" :label="item.name" :value="item.code">
            </el-option>
          </el-select>
        </div>
      </div>
      <div style='width: 100%; padding: 10px 15px;' class="clearfix">
        <div class="exhibition">
          <p style="background: #BAFFF3;"></p>
          <span style="color: #BAFFF3;">占用</span>
        </div>
        <div class="exhibition">
          <p style="background: #EDEDF2;"></p>
          <span style="color: #EDEDF2;">闲置</span>
        </div>
        <div class="exhibition">
          <p style="background: #B2CDF8;"></p>
          <span style="color: #B2CDF8;">预入</span>
        </div>
        <div class="exhibition">
          <p style="background: #FFDD8A;"></p>
          <span style="color: #FFDD8A;">预出</span>
        </div>
      </div>
      <div class="region">
        <ul v-for="o in data" style="clear: both;">
          <li class="column" v-text="o.rowNo"></li>
          <li v-for="i in o.storageVisualizationDtoList"
              class="freeStyle"
              :class="'free'+ i.status" :alt="i.storageLocationNo" :title="i.storageLocationNo"></li>
        </ul>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  import {storageVisualization, queryStorageList} from "@/common/config/api/InfoInventory"
  import {sSet, sGet, getQueryString} from '@/common/config/utils';

  var token = getQueryString('token');
  var areaCode = getQueryString('areaCode');
  var whCode = getQueryString('whCode');
  // token = '1_3316240538ae432eb30d4056e8aba395';
  // whCode = 101;
  // areaCode = 'A';
  export default {
    name: 'appwh',
    components: {},
    data() {
      return {
        free: 'free',
        regionId: areaCode,
        wareHouseCode: whCode,
        regionLsit: [],
        data: [],
        src: '',
      };
    },
    computed: {
      options: {
        get() {
          return this.$store.state.codeOptions.options;
        },
      }
    },
    methods: {
      // 6河东 7张泾 8长安
      tsWareHouse(val) {
        if(whCode == 100){
          val = 6
        }
        else if(whCode == 101){
          val = 7
        }
        else if(whCode == 102){
          val = 8
        }
        else{
          val = ''
        }
        if (val == 6 || val == 7 || val == 8) {
          this.src = require('../../common/image/index/ck-' + val + '.png')
        } else {
          this.src = ''
        }
        storageVisualization({
          "wareHouseCode": whCode
        }).then(res => {
          // this.regionId = ''
          this.regionLsit = res.repData.functionAreaList
        })
      },
      loadData() {
        let self = this;
        queryStorageList({
          "functionAreaBrevityCode": this.regionId,
          "wareHouseCode": this.wareHouseCode,
        }).then(res => {
          self.data = res.repData.storageVisualizationParentDtoList
        })
      }
    },
    created() {
      if(!token){
        return;
      }
      sSet('_WHUser', {"token": token});
      this.tsWareHouse();
      this.loadData();
    }
  };
</script>

<style scoped lang="less">
  .region {
    display: block;
    white-space: nowrap;
    padding: 0 8px;
  }

  .exhibition {
    width: 60px;
    line-height: 20px;
    float: left;
    margin-right: 5px;
    font-size: 12px;
  }

  .exhibition p {
    width: 10px;
    height: 10px;
    display: inline;
    float: left;
    margin-top: 5px;
    border-radius: 50%;
    margin-right: 5px;
  }

  .column {
    width: 45px;
    line-height: 12px;
    color: #fff;
    text-align: center;
    background: #0C4AAC;
    margin: 3px;
    font-size: 12px;
    float: left;
  }

  .freeStyle {
    width: 12px;
    height: 12px;
    display: inline-block;
    margin: 3px 2px;
    cursor: pointer;
    border-radius: 6px;
  }

  .free1 {
    background: #EDEDF2;
  }

  .free2 {
    background: #BAFFF3;
  }

  .free3 {
    background: #B2CDF8;
  }

  .free4 {
    background: #FFDD8A;
  }

  .borderStyle {
    border: 1px dashed red;
    width: 25px;
    height: 25px;
    display: inline-block;
    margin: 5px;
    cursor: pointer;
  }
</style>
