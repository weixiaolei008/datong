<!--PDI车辆返修计划-->
<template>
  <el-container style="width: 100%;height: 100%;">
    <el-header style="height: auto; padding: 0;">
      <div class="header-tabs">
        <span class="header-tab-item" :class="{ 'header-tab-active': tabIndex == 0 }" @click="tab(0)">接收车辆</span>
        <span style="color: #aaa">|</span>
        <span class="header-tab-item" :class="{ 'header-tab-active': tabIndex == 1 }" @click="tab(1)">通知提车</span>
      </div>
    </el-header>
    <div :is="currenView"></div>
  </el-container>
</template>

<script>
  import PdiPlanWindowsR from "./PdiPlanWindowsR"
  import PdiPlanWindowsN from "./PdiPlanWindowsN"
  export default {
    name: "PdiPlanWindows",
    components: { PdiPlanWindowsR, PdiPlanWindowsN },
    data() {
      return {
        tabIndex: 0,
        currenView: 'PdiPlanWindowsN'
      }
    },
    methods: {
      tab(index) {
        this.tabIndex = index;
        this.currenView = index === 0 ? 'PdiPlanWindowsN' : index === 1 ? 'PdiPlanWindowsR' : '';
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

