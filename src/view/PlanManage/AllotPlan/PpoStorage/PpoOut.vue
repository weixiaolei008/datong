<!--质损返修车辆出库计划-->
<template>
  <el-container style="width: 100%;height: 100%;">
    <el-header style="height: auto; padding: 0;">
      <div class="header-tabs" >
        <span class="header-tab-item" :class="{ 'header-tab-active': tabIndex == 0 }" @click="tab(0)">未创建</span>
        <span style="color: #aaa">|</span>
        <span class="header-tab-item" :class="{ 'header-tab-active': tabIndex == 1 }" @click="tab(1)">已创建</span>
      </div>
    </el-header>
    <div :is="currenView"></div>
  </el-container>
</template>

<script>
  import PpoOutY from "./PpoOutY"
  import PpoOutN from "./PpoOutN"
  export default {
    name: "SvoOut",
    components: {
      PpoOutY,
      PpoOutN
    },
    data() {
      return {
        tabIndex: 0,
        currenView: 'PpoOutN'
      }
    },
    methods: {
      tab(index) {
        this.tabIndex = index;
        this.currenView = index === 0 ? 'PpoOutN' : index === 1 ? 'PpoOutY' : '';
      }
    },
    mounted() {
    },
    created() {
    }
  }
</script>

<style  lang="less">
</style>


