<!--海外车-->
<template>
  <el-container style="width: 100%;height: 100%;">
    <el-header style="height: auto; padding: 0;">
      <div class="header-tabs">
        <span class="header-tab-item" :class="{ 'header-tab-active': tabIndex == 0 }" @click="tab(0)">未创建</span>
        <span>|</span>
        <span class="header-tab-item" :class="{ 'header-tab-active': tabIndex == 1 }" @click="tab(1)">已创建</span>
      </div>
    </el-header>
    <div :is="currenView"></div>
  </el-container>
</template>

<script>
  import OverseasCarN from "./OverseasCarN"
  import OverseasCarY from "./OverseasCarY"
  export default {
    name: "OverseasCar",
    components: {
      OverseasCarN,
      OverseasCarY
    },
    data() {
      return {
        tabIndex: 0,
        currenView: 'OverseasCarN'
      }
    },
    methods: {
      tab(index) {
        this.tabIndex = index;
        this.currenView = index === 0 ? 'OverseasCarN' : index === 1 ? 'OverseasCarY' : '';
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
