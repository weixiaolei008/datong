<template>
  <div style="padding: 30px 20px;">
    <div class="clearfix" style="padding: 0 5px">
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
    </div>
    <div style="text-align: center;">
      <el-button style="margin-right: 10px;" @click="cancle">返回</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NewInventoryPlanY",
    components: {
    },
    data() {
      return {
        data: {
          formData: {
          },
          arr1: [
            {
              label: '盘点类型',
              value: 'aim'
            },
            {
              label: '年',
              type: 'input',
              value: 'status'
            },
            {
              label: '月',
              type: 'input',
              value: 'status'
            },
            {
              label: '批次',
              type: 'input',
              value: 'status'
            },
          ],
          options: {
            aim:[
              {
                label: '22',
                value: '222'
              }
            ]
          }
        }
      }
    },
    methods: {
      save(){

      },
      cancle(){
        this.$router.push({path: '/InventoryPlan'});
      },
    },
    mounted() {
    },
    created() {
    }
  }
</script>

<style lang="less" scoped>
  .line{
    padding: 30px 5px;
    margin-top: 30px;
    border-top: 1px solid #eee;
  }
</style>
