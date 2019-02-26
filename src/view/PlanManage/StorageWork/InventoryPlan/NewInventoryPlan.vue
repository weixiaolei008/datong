<template>
  <el-container style="width: 100%;height: 100%;">
    <el-header style="height: auto; padding: 0;">
      <div class="header-tabs">
        <span class="header-tab-item" :class="{ 'header-tab-active': tabIndex == 0 }" @click="tab(0)">盘点计划</span>
        <span>|</span>
        <span class="header-tab-item" :class="{ 'header-tab-active': tabIndex == 1 }" @click="tab(1)">自定义盘点</span>
      </div>
    </el-header>
    <el-main>
      <div :is="currenView"></div>
    </el-main>

  </el-container>
</template>

<script>
  import NewInventoryPlanN from "./NewInventoryPlanN"
  import NewInventoryPlanY from "./NewInventoryPlanY"
  export default {
    name: "NewInventoryPlan",
    components: {
      NewInventoryPlanN,
      NewInventoryPlanY
    },
    data() {
      return {
        tabIndex: 0,
        currenView: 'NewInventoryPlanN'
      }
    },
    methods: {
      tab(index) {
        this.tabIndex = index;
        this.currenView = index === 0 ? 'NewInventoryPlanN' : index === 1 ? 'NewInventoryPlanY' : '';
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
