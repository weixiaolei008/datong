<template>
  <div style="padding: 30px 20px;">
    <div class="clearfix" style="padding: 0 5px">

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
      <div class="input-box" v-for="(item, index) in data.arr3" :key="index+'a'">
        <label class="input-label">{{item.label}}</label>
        <el-select v-model="item.value" :placeholder="'请选择'+item.label" v-if="item.type != 'input'">
          <el-option
            v-for="item in data.options['aim']"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input v-model="data.formData[item.value]" :placeholder="'请输入'+item.label" clearable v-if="item.type == 'input'"></el-input>
        <span @click="addStorage">+</span><span @click="delStorage(index)" v-if="index != 0">-</span>
      </div>
    </div>
    <div class="clearfix line" >
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
    <div style="text-align: center;">
      <el-button style="margin-right: 10px;" @click="cancle">返回</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script>
    export default {
      name: "NewInventoryPlanN",
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
              {
                label: '百分比',
                type: 'input',
                value: 'status'
              },
              {
                label: '库区',
                type: 'input',
                value: 'status'
              },
            ],
            arr2: [
              {
                label: '车辆类型',
                type: 'select',
                value: 'aim'
              },
              {
                label: '车辆种类',
                type: 'select',
                value: 'aim'
              },
              {
                label: '点位信息',
                type: 'select',
                value: 'aim'
              },
              {
                label: '车型级',
                type: 'select',
                value: 'aim'
              },
              {
                label: '销售区域',
                type: 'select',
                value: 'aim'
              },
              {
                label: '驱动方式',
                type: 'select',
                value: 'aim'
              },
            ],
            arr3: [
              {
                label: '仓库',
                type: 'select',
                value: ''
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
        addStorage(){
          this.data.arr3.push({
            label: '仓库',
            type: 'select',
            value: ''
          })
          console.log(this.data.arr3);
        },
        delStorage(index){
          this.data.arr3.splice(index,1)
        }
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
