<template>
  <el-container style="width: 100%;height: 100%;">
    <el-header style="height: auto; padding: 0;">
      <template v-if="tabsNav">
        <ul class="tabs-lis clearfix" style="padding: 20px; border-bottom: 1px solid #eee;" >
          <li
            v-for="(item, index ) in tabsNav"
            @click="tabsClick(index, item)"
            :class="{tabsActive:active===index}">
            {{item.label}}
          </li>
        </ul>
      </template>
    </el-header>
    <div :is="currencView" :currentData="currentData"></div>
  </el-container>
</template>

<script>
  import DepComed from "./DepComed"
  import DepCom from "./DepCom"

  export default {
    name: "DepotOut",
    components: { DepComed, DepCom },
    data() {
      return {
        active: 0,
        currencView: 'DepCom',
        tabsNav: [
          { id: 'tb1', label: '未创建', type: 'create', isCreate: false },
          { id: 'tb2', label: '已创建', type: 'created', isCreate: true }
        ],
        tableDataHeight: 0,
        currentData: {},
      }
    },
    methods: {
      tabsClick(index, item) {
        this.active = index;
        this.tabsStatus = item.type;
        this.currencView = item.isCreate  ? 'DepComed' : 'DepCom';
        this.currentData = item;
      },
      createStatusClick(){

      },
      Login() {
        let p = {}
        this.$api.login2(p).then(res => {
          console.log(res);
        })
          .catch(error => {
            console.log(error);
          })
      },
      searchMore() {
        this.pop = !this.pop
      },
    },
    mounted() {
    },
    created() {
    }
  }
</script>

<style >
  .depot-tabs .el-tabs__header {
    padding: 20px 20px 0 !important;
    margin: 0 0 1px !important;
  }
</style>

<style scoped lang="less">
  .tabs-lis {
    padding: 20px 20px 0 !important;
    li {
      display: inline-block;
      padding: 0 0 10px;
      margin: 0 20px 10px;
      &+li:before {
        content: ' ';
        border-left: 1px solid #eee;
        position: relative;
        left: -20px;
      }
    }
    .tabsActive {
      border-bottom: 2px solid #67A2FF;
      color: #67A2ff;
    }
  }
</style>

