<!--车辆维保计划-->
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
  import CarMoveN from "./CarMoveN"
  import CarMoveY from "./CarMoveY"
  export default {
    name: "CarWash",
    components: {
      CarMoveN,
      CarMoveY
    },
    data() {
      return {
        tabIndex: 0,
        currenView: 'CarMoveN'
      }
    },
    methods: {
      tab(index) {
        this.tabIndex = index;
        this.currenView = index === 0 ? 'CarMoveN' : index === 1 ? 'CarMoveY' : '';
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
