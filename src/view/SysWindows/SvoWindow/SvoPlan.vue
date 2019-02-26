<!-- 系统窗口／SVO窗口／SVO计划 -->
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
  import SvoPlanN from "./SvoPlanN"
  import SvoPlanY from "./SvoPlanY"
  export default {
    name: "SvoPlan",
    components: {
      SvoPlanN,
      SvoPlanY
    },
    data() {
      return {
        tabIndex: 0,
        currenView: 'SvoPlanN'
      }
    },
    methods: {
      tab(index) {
        this.tabIndex = index;
        this.currenView = index === 0 ? 'SvoPlanN' : index === 1 ? 'SvoPlanY' : '';
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


