/*
* @property { rules :  {String Object} 表单验证 一种验证传对象 一种以上把对象组成数组 }
  :rules="{ required: true, message: '请选择活动区域', trigger: 'change' }"
* @property { prop :  {String} input的name 传回的字段名与html中input标签name值一样。 }
* @property { placeholder :  {String} 提示语，与html中input标签placeholder值一样。 }
* @property { label :  {String} 标签文本。 }
* @property { v-model :  {String} 语法糖，利用value接值父子组件相互传值 当前表单填写的内容  }
* @property { selectdata:  {Array} option中的数据 }
*/
<template>
  <el-form-item :label="label" :prop="prop" style="width: 350px; float: left;">
    <el-select v-model="myValue" :placeholder="placeholder" v-on:change="change">
      <el-option v-for="(item, index) in selectdata" :key="index" :label="item.lable" :value="item.value"></el-option>
    </el-select>
  </el-form-item>
</template>
<script>
  export default {
    name: "Select",
    props: {
      selectdata: {
        type: Array
      },
      prop: {
        type: String
      },
      placeholder:{
        type: String
      },
      label:{
        type: String
      },
      value:{
        type: String
      },
    },
    data() {
      return {
        myValue:""
      };
    },
    mounted(){
      this.myValue = this.value;
    },
    methods:{
      change(){
        this.$emit("changeVal",this.myValue)
      }
    }
  }
</script>
<style scoped>

</style>
