/*
*/
<template>
  <el-form-item :label="label" :prop="prop" :rules="rules" style="width: 350px; float: left;">
    <el-select v-model="myValue" :placeholder="placeholder" v-on:change="change">
      <el-option v-for="item in selectdata" :key="item.id" :label="item.lable" :value="item.value"></el-option>
    </el-select>
  </el-form-item>
</template>
<script>
  export default {
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
      rules:[Object,Array]
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
        this.$emit("input",this.myValue)
      }
    }
  }
</script>
<style scoped>

</style>
