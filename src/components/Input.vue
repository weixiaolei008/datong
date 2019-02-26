/*
* @property { rules :  {String Object} 表单验证 一种验证传对象 一种以上把对象组成数组}
  例  :rules="[{ required: true, message: '测试', trigger: 'blur'}]"
* @property { prop :  {String} input的name 传回的字段名与html中input标签name值一样。 }
* @property { placeholder :  {String} 提示语，与html中input标签placeholder值一样。 }
* @property { label :  {String} 标签文本。 }
* @property { v-model :  {String} 语法糖，利用value接值父子组件相互传值 当前表单填写的内容  }
*/
<template>
  <el-form-item style="width: 300px; float: left; margin-left: 20px;" :label="label" :prop="prop" >
    <el-input v-model="myValue" :placeholder="placeholder" clearable></el-input>
  </el-form-item>
</template>
<script>
  export default {
    name: "Input",
    props: {
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
      }
    },
    data() {
      return {
        myValue: ''
      };
    },
    mounted(){
      this.myValue = this.value;
    },
    watch:{
      myValue(val){
        this.$emit("changeVal",val)
      }
    }
  }
</script>
