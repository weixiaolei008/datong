import {confirmPop}from "@/common/config/utils"
//--表格刷新
export let loadRefresh = {
  methods: {
    search(){
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
//--创建计划
export let creatWarehouse = {
  methods: {
    handleCreate(warehouseId = 'currentWarehouseId'){
      if(!this.selectRows.length) {
        this.msgInfo('至少勾选一条数据');
        return;
      }
      //当前仓库是否一致
      let currentWarehouseId = this.selectRows[0][warehouseId];
      let warehouseIdBool = this.selectRows.some((item) => {
        return currentWarehouseId !== item[warehouseId];
      })
      if(warehouseIdBool){
        this.msgInfo('请选择相同的当前仓库');
        return;
      }
      let arr = [];
      this.selectRows.forEach((item) => {
        arr.push(item.vin);
      })
      this.popFormData.currentWarehouseName = this.selectRows[0].currentWarehouseName;
      this.popFormData.vins = arr.join(',');
      this.popCreateVisible = true;
    },
    cancleCreate() {
      this.popCreateVisible = false;
    },
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

