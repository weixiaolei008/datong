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

//-------立即修----缓修-------返修创建计划
export let creatRepair = {
  methods: {
    handleCreate(warehouseId = 'currentWarehouseId', repair = 'repairMethod'){
      if(!this.selectRows.length) {
        this.msgInfo('至少勾选一条数据');
        return;
      }
      // 维修判断
      if(this.selectRows.length === 1 && !this.selectRows[0][repair]){
        this.msgInfo('请先确定维修种类');
        return;
      }
      let repairId = this.selectRows[0][repair];
      if(!repairId){
        this.msgInfo('维修种类不一致');
        return;
      }
      let repairBool = this.selectRows.some((item) => {
        return repairId !== item[repair];
      })
      if(repairBool){
        this.msgInfo('维修种类不一致');
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
      confirmPop('创建计划',this.saveCreate)
    }
  }
}
export let creatRepairImport = {
  methods: {
    handleCreate(warehouseId = 'currentWarehouseId', repair = 'repairMethod', isImport){
      if(!this.selectRows.length) {
        this.msgInfo('至少勾选一条数据');
        return;
      }
      let importBool = this.selectRows.every((item) => {
        return !Boolean(+item[isImport])
      })
      let importBool2 = this.selectRows.every((item) => {
        return Boolean(+item[isImport])
      })
      if(importBool2){
        //当前仓库是否一致
        let currentWarehouseId = this.selectRows[0][warehouseId];
        let warehouseIdBool = this.selectRows.some((item) => {
          return currentWarehouseId !== item[warehouseId];
        })
        if(warehouseIdBool){
          this.msgInfo('请选择相同的当前仓库');
          return;
        }
        confirmPop('创建计划',this.saveCreate)
      }
      else if(importBool){
        // 维修判断
        if(this.selectRows.length === 1 && !this.selectRows[0][repair]){
          this.msgInfo('请先确定维修种类');
          return;
        }
        let repairId = this.selectRows[0][repair];
        if(!repairId){
          this.msgInfo('维修种类不一致');
          return;
        }
        let repairBool = this.selectRows.some((item) => {
          return repairId !== item[repair];
        })
        if(repairBool){
          this.msgInfo('维修种类不一致');
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
        confirmPop('创建计划',this.saveCreate)
      }
      else{
        this.msgInfo('生成方式不一致');
      }
    }
  }
}

//--非返修创建计划
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
      confirmPop('创建计划',this.saveCreate)
    }
  }
}

//--------------------------------------删除计划
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

// 立即修------------------缓修-------------------------出库修
export let repairAll = {
  methods: {
    sureRepairFirst(repair = 'repairMethod'){
      if(!this.selectRows.length) {
        this.msgInfo('至少勾选一条数据');
        return;
      }
      let repairBool = this.selectRows.some((item) => {
        return Boolean(item[repair])
      })
      if(repairBool){
        this.msgInfo('车辆维修类型已存在');
        return;
      }
      confirmPop('请确认立即修',this.handleRepairFirst)
    },
    sureRepairSecond(repair = 'repairMethod'){
      if(!this.selectRows.length) {
        this.msgInfo('至少勾选一条数据');
        return;
      }
      let repairBool = this.selectRows.some((item) => {
        return Boolean(item[repair])
      })
      if(repairBool){
        this.msgInfo('车辆维修类型已存在');
        return;
      }
      confirmPop('请确认缓修',this.handleRepairSecond)
    },
    sureRepairOut(repair = 'repairMethod'){
      if(!this.selectRows.length) {
        this.msgInfo('至少勾选一条数据');
        return;
      }
      let repairBool = this.selectRows.some((item) => {
        return Boolean(item[repair])
      })
      if(repairBool){
        this.msgInfo('车辆维修类型已存在');
        return;
      }
      confirmPop('请确认出库返修',this.handleRepairOut)
    }
  }
}
export let repairAllImport = {
  methods: {
    sureRepairFirst(repair = 'repairMethod', isImport){
      if(!this.selectRows.length) {
        this.msgInfo('至少勾选一条数据');
        return;
      }
      let importBool = this.selectRows.some((item) => {
        return Boolean(+item[isImport])
      })
      if(importBool){
        this.msgInfo('导入数据不可立即修');
        return;
      }
      let repairBool = this.selectRows.some((item) => {
        return Boolean(item[repair])
      })
      if(repairBool){
        this.msgInfo('车辆维修类型已存在');
        return;
      }
      confirmPop('请确认立即修',this.handleRepairFirst)
    },
    sureRepairSecond(repair = 'repairMethod', isImport){
      if(!this.selectRows.length) {
        this.msgInfo('至少勾选一条数据');
        return;
      }
      let importBool = this.selectRows.some((item) => {
        return Boolean(+item[isImport])
      })
      if(importBool){
        this.msgInfo('导入数据不可缓修');
        return;
      }
      let repairBool = this.selectRows.some((item) => {
        return Boolean(item[repair])
      })
      if(repairBool){
        this.msgInfo('车辆维修类型已存在');
        return;
      }
      confirmPop('请确认缓修',this.handleRepairSecond)
    },
    sureRepairOut(repair = 'repairMethod', isImport){
      if(!this.selectRows.length) {
        this.msgInfo('至少勾选一条数据');
        return;
      }
      let importBool = this.selectRows.some((item) => {
        return Boolean(+item[isImport])
      })
      if(importBool){
        this.msgInfo('导入数据不可出库返修');
        return;
      }
      let repairBool = this.selectRows.some((item) => {
        return Boolean(item[repair])
      })
      if(repairBool){
        this.msgInfo('车辆维修类型已存在');
        return;
      }
      confirmPop('请确认出库返修',this.handleRepairOut)
    }
  }
}

