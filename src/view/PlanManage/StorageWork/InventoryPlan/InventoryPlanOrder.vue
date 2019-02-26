<template>
  <el-container style="width: 100%;height: 100%;">
    <el-header style="height: auto; padding: 0;">
      <div class="header-tabs">
        <span class="header-tab-item" :class="{ 'header-tab-active': tabIndex == 0 }" @click="tab(0)">盘点清单</span>
        <span>|</span>
        <span class="header-tab-item" :class="{ 'header-tab-active': tabIndex == 1 }" @click="tab(1)">复盘清单</span>
      </div>
    </el-header>
    <div :is="currenView"></div>
  </el-container>
</template>

<script>
  import InventoryPlanOrderN from "./InventoryPlanOrderN"
  import InventoryPlanOrderY from "./InventoryPlanOrderY"
  export default {
    name: "InventoryPlanOrder",
    components: {
      InventoryPlanOrderN,
      InventoryPlanOrderY
    },
    data() {
      return {
        tabIndex: 0,
        currenView: 'InventoryPlanOrderN'
      }
    },
    methods: {
      tab(index) {
        this.tabIndex = index;
        this.currenView = index === 0 ? 'InventoryPlanOrderN' : index === 1 ? 'InventoryPlanOrderY' : '';
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
