import {confirmPop}from "@/common/config/utils"
//--表格刷新
export let loadRefresh = {
  methods: {
    search(){
      this.tableData.currentPage = 1;
      this.loadData();
    },
    handleSelectionChange(selection) {
      this.selectRows = selection;
    },
    handleCurrentChange(val) {
      this.tableData.currentPage = val;
      this.loadData();
    },
  },
  created() {
    this.loadData();
  }
}
//--删除计划
export let delPlan = {
  methods: {
    delSure(){
      if(!this.selectRows.length) {
        this.msgInfo('至少勾选一条数据');
        return;
      }
      confirmPop('确认删除',this.handleDel)
    }
  }
}
