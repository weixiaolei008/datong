<template>
  <div style="width: 100%;height: 100%">
    <el-container style="width: 100%;height: 100%;">
      <el-header style="height: auto; padding: 0;">
        <!-- search-group -->
        <div class="search-group clearfix">
          <div class="clearfix">
            <!-- input 输入框 -->
            <div class="input-box">
              <label class="input-label">证照名称</label>
              <el-input v-model="formData.licensesName" placeholder="证件名称" clearable></el-input>
            </div>
            <div class="search-box">
              <div class="search-reset" @click="reset"><span class="img-reset">清空</span></div>
              <div class="search-sub"  @click="search"><span class="img-sub">搜索</span></div>
            </div>
          </div>
        </div>
        <!-- btn-group -->
        <div class="btn-group clearfix">
          <div @click="handleAdd" class="btn-add"><span class="img-add">新增</span></div>
        </div>
      </el-header>
      <!--table-->
      <el-main style="padding: 10px;" class="table">
        <Table :data='tableData'
               @handleEdit="handleEdit"
               >
        </Table>
      </el-main>
    </el-container>
    <!--新增弹框-->
    <el-dialog  title="证照信息新增/修改" :visible.sync="popAddVisible" width="680px" center>
      <div class="clearfix">
        <!-- input 输入框 -->
        <div class="input-box">
          <label class="input-label"><span>*</span>证照名称</label>
          <el-input v-model="editFormData.licensesName" :disabled="isEdit" placeholder="证件名称" clearable></el-input>
        </div>
        <!-- input 输入框 -->
        <div class="input-box">
          <label class="input-label"><span>*</span>证照类型</label>
          <el-input v-model="editFormData.licensesType" placeholder="证照类型" clearable></el-input>
        </div>
        <!-- input 输入框 -->
        <div class="input-box">
          <label class="input-label">描述</label>
          <el-input type="textarea" :rows="2" placeholder="请输入内容"
                    style="width: 513px!important;"
            v-model="editFormData.describe">
          </el-input>
        </div>
      </div>
      <div style="text-align: right;">
        <el-button class="" style="margin-right: 10px;" @click="cancleAdd" size="medium">返回</el-button>
        <el-button class="" style="margin-right: 15px;" type="primary" @click="saveAdd" size="medium">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Table from "@/components/TableNoPage"
  import {loadLicensesList, LicensesUpdate, LicensesAdd} from "@/common/config/api/InfoBase"

  export default {
    name: "LicenseManage",
    components: {
      Table,
    },
    data() {
      return {
        isSaveFlag: true,
        isEdit: false,
        popAddVisible: false, //编辑弹框
        formData: {
          licensesName: "",
        },
        editFormData: {
          licensesName: "",
          licensesType: "",
          describe: "",
        },
        tableData: {
          selectShow: false,
          tableHeight: 0,
          listData: [],
          tableHead: [
            {
              name: "证照名称",
              value: 'licensesName',
            },
            {
              name: "证照类型",
              value: 'licensesType'
            },
            {
              name: "描述",
              value: 'describe'
            }
          ], //表头
          operations: [
            {
              label: '操作',
              width: '100',
              data: [
                {
                  icon: 'icon-edit',
                  Fun: 'handleEdit',
                  id: '1',
                }
              ]
            }
          ],
        },
      }
    },
    methods: {
      loadData() {
        let self = this;
        let p = {
          "licensesName": self.formData.licensesName
        }
        loadLicensesList(p).then(res => {
          self.tableData.listData = res.repData;
        })
      },
      search() {
        this.tableData.currentPage = 1;
        this.loadData()
      },
      reset(){
        this.resetForm(this.formData)
      },
      handleEdit(data){
        this.isEdit = true,
        this.popAddVisible = true;
        this.editFormData = Object.assign({}, data.row);
      },
      handleAdd(){
        this.isEdit = false,
        this.editFormData = {};
        this.popAddVisible = true;
      },
      cancleAdd() {
        this.popAddVisible = false;
      },
      saveAdd() {
        let self = this;
        if(self.isSaveFlag){
          this.isSaveFlag = false;
          setTimeout(()=>{
            self.isSaveFlag = true;
          }, 2000)
          if(!self.editFormData.licensesName || !self.editFormData.licensesName.trim()){
            self.msgInfo('证件名称不能为空');
            return;
          }
          if(self.editFormData.licensesName && self.editFormData.licensesName.trim().length > 10){
            self.msgInfo('证件名称长度不能大于10');
            return;
          }
          if(!self.editFormData.licensesType || !self.editFormData.licensesType.trim()){
            self.msgInfo('证件类型不能为空');
            return;
          }
          if(self.editFormData.licensesType && self.editFormData.licensesType.trim().length > 20){
            self.msgInfo('证件类型长度不能大于20');
            return;
          }
          if(self.editFormData.describe && self.editFormData.describe.trim().length > 20){
            self.msgInfo('描述长度不能大于20');
            return;
          }
          if(this.isEdit){
            let p = {
              "describe": self.editFormData.describe,
              "licensesType": self.editFormData.licensesType,
              "tsLicensesId":  self.editFormData.tsLicensesId
            }
            LicensesUpdate(p).then(res => {
              self.msgInfo(res.repMsg);
              this.popAddVisible = false;
              self.loadData();
            })
          }else{
            let p = {
              "describe": self.editFormData.describe,
              "licensesName": self.editFormData.licensesName,
              "licensesType": self.editFormData.licensesType,
              "licensesTypes": self.editFormData.licensesType ? self.editFormData.licensesType.split(',') : [],
            }
            LicensesAdd(p).then(res => {
              self.msgInfo(res.repMsg);
              this.popAddVisible = false;
              self.loadData();
            })
          }
        }

      },
    },
    mounted(){
    },
    created() {
      this.loadData()
    },
    beforeDestroy(){
    }
  }
</script>

<style lang="less">
</style>
