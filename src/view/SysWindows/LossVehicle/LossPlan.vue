<!--质损车辆返修计划-->
<template>
  <el-container style="width: 100%;height: 100%;">
    <el-header style="height: auto; padding: 0;">
      <div class="header-tabs" >
        <span class="header-tab-item" :class="{ 'header-tab-active': tabIndex == 0 }" @click="tab(0)">接收车辆</span>
        <span style="color: #aaa">|</span>
        <span class="header-tab-item" :class="{ 'header-tab-active': tabIndex == 1 }" @click="tab(1)">通知提车</span>
      </div>
    </el-header>
    <div :is="currenView"></div>
  </el-container>
</template>

<script>
  import LossPlanR from "./LossPlanR"
  import LossPlanN from "./LossPlanN"
  export default {
    name: "LossPlan",
    components: {
      LossPlanR,
      LossPlanN
    },
    data() {
      return {
        tabIndex: 0,
        currenView: 'LossPlanR'
      }
    },
    methods: {
      tab(index) {
        this.tabIndex = index;
        this.currenView = index === 0 ? 'LossPlanR' : index === 1 ? 'LossPlanN' : '';
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

