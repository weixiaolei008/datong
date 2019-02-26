<!--系统窗口／氢能源窗口／氢能源计划-->
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
  import HydroPlanN from "./HydroPlanN"
  import HydroPlanY from "./HydroPlanY"
  export default {
    name: "HydroPlan",
    components: {
      HydroPlanN,
      HydroPlanY
    },
    data() {
      return {
        tabIndex: 0,//0-接收车辆，1-通知提车
        currenView: 'HydroPlanN'
      }
    },
    methods: {
      tab(index) {
        this.tabIndex = index;
        this.currenView = index === 0 ? 'HydroPlanN' : index === 1 ? 'HydroPlanY' : '';
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


