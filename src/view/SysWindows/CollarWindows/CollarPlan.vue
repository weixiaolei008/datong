<!-- 领用车辆窗口/领用车辆计划 -->
<template>
  <el-container style="width: 100%;height: 100%;">
    <el-header style="height: auto; padding: 0;">
      <div class="header-tabs" >
        <span class="header-tab-item" :class="{ 'header-tab-active': tabIndex == 0 }" @click="tab(0)">接收车辆</span>
        <span>|</span>
        <span class="header-tab-item" :class="{ 'header-tab-active': tabIndex == 1 }" @click="tab(1)">通知车辆</span>
      </div>
    </el-header>
    <div :is="currenView" ></div>
  </el-container>
</template>

<script>
  import CollarPlanN from "./CollarPlanN"
  import CollarPlanY from "./CollarPlanY"
  export default {
    name: "CollarPlanCar",
    components: {
      CollarPlanN,
      CollarPlanY
    },
    data() {
      return {
        tabIndex: 0,
        currenView: 'CollarPlanN'
      }
    },
    methods: {
      tab(index) {
        this.tabIndex = index;
        this.currenView = index === 0 ? 'CollarPlanN' : index === 1 ? 'CollarPlanY' : '';
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
