<!--批量车辆返修计划-->
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
  import BatchPlanR from "./BatchPlanR"
  import BatchPlanN from "./BatchPlanN"
  export default {
    name: "BatchPlan",
    components: {
      BatchPlanR,
      BatchPlanN
    },
    data() {
      return {
        tabIndex: 0,
        currenView: 'BatchPlanR'
      }
    },
    methods: {
      tab(index) {
        this.tabIndex = index;
        this.currenView = index === 0 ? 'BatchPlanR' : index === 1 ? 'BatchPlanN' : '';
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


