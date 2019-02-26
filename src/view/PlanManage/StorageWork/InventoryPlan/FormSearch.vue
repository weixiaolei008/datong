<template>
  <!-- search-group -->
  <div class="search-group clearfix">
    <div :class="data.pop?'search-up':'search-more'" @click="searchMore"></div>
    <el-collapse-transition>
      <div v-show="data.pop" class="search-pop clearfix" style="width: 100%;">
        <!-- 单选下拉框 -->
        <div class="input-box" v-for="(item, index) in data.arr2" :key="index">
          <label class="input-label">{{item.label}}</label>
          <el-select v-model="data.formData[item.value]" :placeholder="'请选择'+item.label" v-if="item.type != 'input'">
            <el-option
              v-for="item in data.options[item.value]"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input v-model="data.formData[item.value]" :placeholder="'请输入'+item.label" clearable v-if="item.type == 'input'"></el-input>
        </div>
      </div>
    </el-collapse-transition>
    <div class="clearfix">
      <div class="input-box">
        <label class="input-label">计划创建时间</label>
        <el-date-picker
          v-model="data.formData.timeValue"
          value-format="yyyy-MM-dd HH-mm-ss"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <!-- 单选下拉框 -->
      <div class="input-box" v-for="(item, index) in data.arr1" :key="index">
        <label class="input-label">{{item.label}}</label>
        <el-select v-model="data.formData[item.value]" :placeholder="'请选择'+item.label" v-if="item.type != 'input'">
          <el-option
            v-for="item in data.options[item.value]"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input v-model="data.formData[item.value]" :placeholder="'请输入'+item.label" clearable v-if="item.type == 'input'"></el-input>
      </div>
      <div class="input-box">
        <label class="input-label">计划盘点时间</label>
        <el-date-picker
          v-model="data.formData.timeValue"
          value-format="yyyy-MM-dd HH-mm-ss"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div class="input-box">
        <label class="input-label">计划结束时间</label>
        <el-date-picker
          v-model="data.formData.timeValue"
          value-format="yyyy-MM-dd HH-mm-ss"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div class="input-box">
        <label class="input-label">发布时间</label>
        <el-date-picker
          v-model="data.formData.timeValue"
          value-format="yyyy-MM-dd HH-mm-ss"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div class="input-box">
        <label class="input-label">实际完成时间</label>
        <el-date-picker
          v-model="data.formData.timeValue"
          value-format="yyyy-MM-dd HH-mm-ss"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>

      <div class="search-box">
        <div class="search-sub"  @click="search"><span class="img-sub">搜索</span></div>
        <div class="search-reset" @click="reset"><span class="img-reset">清空</span></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {formatTime} from "@/common/config/utils"
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
      }
    },
    methods: {
      searchMore() {
        this.data.pop = !this.data.pop
      },
      reset(){
        this.resetForm(this.data.formData)
      },
      search(){
        this.$emit('search', this.data.formData)
      }
    }
  }
</script>

<style lang="less">

</style>

