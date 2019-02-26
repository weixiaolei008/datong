<template>
  <!-- search-group -->
  <div class="search-group clearfix">
    <div :class="data.pop?'search-up':'search-more'" @click="searchMore"></div>
    <el-collapse-transition>
      <div v-show="data.pop" class="search-pop clearfix" style="width: 100%;">
        <!-- 单选下拉框 -->
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
          placeholder="请输入内容"
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
  export default {
    name: "FromSearch",
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
        localOptions: {},
        first: true,
        keyBase: {
	    	  color: 'color',//颜色
	    	  driveMode: 'drive_mode', //驱动方式
	    	  salesArea: 'sales_area',//销售区域
	    	  origWarehouseId: 'warehouse_code', // 始发仓库
	    	  vehicleType: 'vehicle_type',//车型
	    	  typeLevel: 'vehicle_type_level', //车型级
	    	  category: 'vehicle_category',//车辆种类
	    	  pointLocation: 'point_location', //点位信息
	    	  status: this.data.status == 1 ? 'window_status' : 'window_status_inform', //状态(预计划与计划里的状态不用同一个数据字典)
        },
      }
    },
    watch: {
      options: {
        handler: function(val) {
          let keys = Object.entries(this.keyBase);
          let self = this
          keys.forEach((item) => {
            // console.log([item[0]],  val[item[1]], '90------------------')
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
        // this.$emit('searchChange', this.data.formData);
      },
      search(){
        this.$emit('searchChange', this.data.formData);
      }
    },
    created() {
      console.log(this.data.status)
    }
  }
</script>

<style lang="less">

</style>

