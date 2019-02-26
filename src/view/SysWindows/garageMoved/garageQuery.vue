<!-- 系统窗口／库改车辆窗口（出库）／查询 -->
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
  import garageQueryN from "./garageQueryN"
  import garageQueryY from "./garageQueryY"
  export default {
    name: "garageQuery",
    components: {
      garageQueryN,
      garageQueryY
    },
    data() {
      return {
        tabIndex: 0,
        currenView: 'garageQueryN'
      }
    },
    methods: {
      tab(index) {
        this.tabIndex = index;
        this.currenView = index === 0 ? 'garageQueryN' : index === 1 ? 'garageQueryY' : '';
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


