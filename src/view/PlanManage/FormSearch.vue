<template>
  <!-- search-group -->
  <div class="search-group clearfix">
    <div :class="data.pop?'search-up':'search-more'" @click="searchMore"></div>
    <el-collapse-transition>
      <div v-show="data.pop" class="search-pop clearfix" style="width: 100%;">
        <!-- 单选下拉框 -->
        <slot></slot>
        <div class="input-box" v-for="(item, index) in data.arr2" :key="index">
          <label class="input-label">{{item.label}}</label>
          <el-select v-model="data.formData[item.value]" :placeholder="'请选择'+item.label" v-if="item.type == 'select'">
            <el-option
              v-for="option in localOptions[item.value]"
              :key="option.code"
              :label="option.name"
              :value="option.code">
            </el-option>
          </el-select>
          <el-date-picker
            v-if="item.type == 'time'"
            v-model="data.formData[item.value]"
            value-format="yyyy-MM-dd HH-mm-ss"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <el-input v-model="data.formData[item.value]" :placeholder="'请输入'+item.label" clearable v-if="item.type == 'input'"></el-input>
        </div>
      </div>
    </el-collapse-transition>
    <div class="clearfix">
      <div class="input-box">
        <label class="input-label">VIN码</label>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入VIN码"
          v-model="data.formData.vin">
        </el-input>
      </div>
      <!-- 单选下拉框 -->
      <div class="input-box" v-for="(item, index) in data.arr1" :key="index">
        <label class="input-label">{{item.label}}</label>
        <el-select v-model="data.formData[item.value]" :placeholder="'请选择'+item.label" v-if="item.type == 'select'">
          <el-option
            v-for="option in localOptions[item.value]"
            :key="option.code"
            :label="option.name"
            :value="option.code">
          </el-option>
        </el-select>
        <el-date-picker
          v-if="item.type == 'time'"
          v-model="data.formData[item.value]"
          value-format="yyyy-MM-dd HH-mm-ss"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-input v-model="data.formData[item.value]" :placeholder="'请输入'+item.label" clearable v-if="item.type == 'input'"></el-input>
      </div>
      <div class="search-box">
        <div class="search-reset" @click="reset"><span class="img-reset">清空</span></div>
        <div class="search-sub"  @click="search"><span class="img-sub">搜索</span></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {loadDicValList} from "@/common/config/api/basic"
  import {Init} from "@/common/config/getOptions"
  export default {
    name: "Form",
    props: {
      data:{
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    components: {
    },
    data(){
      return {
        // options: {},
        localOptions: {},
        first: true,
        keyBase: {
          type: 'vehicle_type',
          vehicleType: 'vehicle_type',
          typeLevel: 'vehicle_type_level',
          category: 'vehicle_category',
          color: 'color',
          createType: 'create_type',
          jobType: 'plan_type',
          salesArea: 'sales_area',
          driveMode: 'drive_mode',
          pointLocation: 'point_location',
          goalWarehouse: 'warehouse_code', // 仓库
          currentWarehouseId: 'warehouse_code', // 仓库
          goalWarehouseId: 'warehouse_code', // 仓库
          origWarehouseId: 'warehouse_code', // 仓库
          currentWarehouseCode: 'warehouse_code', // 仓库
          status: 'plan_status',
          isOverdue: 'yes_or_no',
          isBoole: 'yes_or_no',
          transportWay: 'transport_way',
          orderSource: 'create_type',
          // currentLocationId: 'warehouse_type',//库位
          currentFunctionalZoneId: 'functional_zone',//功能区
          goalRegionId: 'functional_zone', //功能区
          repairMethod: 'repair_method', //立即修/缓修
          dataSources: 'data_sources',
          handover_list: 'handover_list',
        },
      }
    },
    watch: {
      options: {
        handler: function(val) {
          let keys = Object.entries(this.keyBase);
          let self = this
          keys.forEach((item) => {
            self.localOptions = Object.assign({},self.localOptions, {[item[0]]: val[item[1]]})
          })
        },
        deep: true,
        immediate: true
      }
    },
    computed:{
      options: {
        get(){
          return this.$store.state.codeOptions.options;
        },
        set(){
        }
      }
    },
    methods: {
      searchMore() {
        this.data.pop = !this.data.pop;
      },
      reset(){
        this.resetForm(this.data.formData);
      },
      search(){
        this.$emit('search', this.data.formData);
      }
    },
    mounted(){
    },
    created(){
    }
  }
</script>

<style lang="less">

</style>

