import {confirmPop}from "@/common/config/utils"
//--表格刷新
export let loadRefresh = {
  methods: {
    //搜索
    search(){
      this.tableData.currentPage = 1;
      this.loadDataList();
    },
    //清空数据
    reset(){
      this.resetForm(this.formData);
    },
    searchMore() {
      this.pop = !this.pop
    },
    handleSelectionChange(selection) {
      this.selectRows = selection;
    },
    handleCurrentChange(val) {
      this.tableData.currentPage = val;
      this.loadDataList();
    },
  },
  created() {
    this.loadDataList();
  }
}

//-------返修创建计划
export let creatRepair = {
  methods: {
    handleCreate(warehouseId,repair,createTypeCode){ //传参 当前仓库id  维修状态
      this.createPlanData.transportWay = '';
      if(!this.selectRows.length){
          this.msgInfo('至少勾选一条数据');
          return
      }
      let createTypeCodeBool = this.selectRows.every((item) => {
        return Boolean(+item[createTypeCode])
      })
      let createTypeCodeBool2 = this.selectRows.every((item) => {
        return !Boolean(+item[createTypeCode])
      })

      if(createTypeCodeBool){
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
        this.createPlanData.vin = arr.join(',');
        this.createPlanData[warehouseId] = this.selectRows[0][warehouseId];
        this.popAddVisible = true;
      }
      else if(createTypeCodeBool2){
        //判断维修类型是否为空
        if(this.selectRows.length === 1&& !this.selectRows[0][repair]){
          this.msgInfo('请先确认维修类型');
          return
        }
        let repairId = this.selectRows[0][repair]; //选择的维修状态
        let repairBool = this.selectRows.some((item) => {
          return repairId !== item[repair];
        })
        if(repairBool){
          this.msgInfo('维修类型不一致');
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
        this.createPlanData.vin = arr.join(',');
        this.createPlanData[warehouseId] = this.selectRows[0][warehouseId];
        this.popAddVisible = true;
      }
      else{
        this.msgInfo('生成方式不一致');
      }
    }
  }
}

//-------无弹框返修创建计划
export let creatRepair2 = {
  methods: {
    handleCreate(warehouseId,repair){ //传参 当前仓库id  维修状态
      if(!this.selectRows.length){
        this.msgInfo('至少勾选一条数据');
        return
      }
      //判断维修类型是否为空
      if(this.selectRows.length === 1&& !this.selectRows[0][repair]){
        this.msgInfo('请先确认维修类型');
        return
      }
      let repairId = this.selectRows[0][repair]; //选择的维修状态
      let repairBool = this.selectRows.some((item) => {
        return repairId !== item[repair];
      })
      if(repairBool){
        this.msgInfo('维修类型不一致');
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
      this.saveCreate();
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
      let arr = [];
      this.selectRows.forEach((item) => {
        arr.push(item.vin);
      })
      this.createPlanData.vin = arr.join(',');
      this.createPlanData[warehouseId] = this.selectRows[0][warehouseId];
      this.popAddVisible = true;
    }
  }
}
//--无弹框非返修创建计划
export let creatWarehouse2 = {
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
      this.saveCreate();
    }
  }
}



// 立即修 缓修
export let repairAll = {
  methods: {
    sureRepairFirst(repair,createTypeCode){
      if(!this.selectRows.length) {
        this.msgInfo('至少勾选一条数据');
        return;
      }
      let createTypeCodeBool = this.selectRows.some((item) => {
        return Boolean(+item[createTypeCode])
      })
      if(createTypeCodeBool){
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
    sureRepairSecond(repair,createTypeCode){
      if(!this.selectRows.length) {
        this.msgInfo('至少勾选一条数据');
        return;
      }
      let createTypeCodeBool = this.selectRows.some((item) => {
        return Boolean(+item[createTypeCode])
      })
      if(createTypeCodeBool){
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
  }
}

//--删除计划
export let delPlan = {
  methods: {
    handleDel(){
      if(!this.selectRows.length) {
        this.msgInfo('至少勾选一条数据');
        return;
      }
      confirmPop('确认删除',this.handleDelData)
    }
  }
}
