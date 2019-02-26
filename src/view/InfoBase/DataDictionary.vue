<template>
  <div style="width: 100%;height: 100%">
    <el-container style="width: 100%;height: 100%;">
      <el-header style="height: auto; padding: 0;">
        <!-- search-group -->
        <div class="search-group clearfix">
          <div class="clearfix">
            <!-- input 输入框 -->
            <div class="input-box">
              <label class="input-label">字典名称</label>
              <el-input v-model="formData.name" placeholder="字典名称" clearable></el-input>
            </div>
            <!-- input 输入框 -->
            <div class="input-box">
              <label class="input-label">描述</label>
              <el-input v-model="formData.describe" placeholder="描述" clearable></el-input>
            </div>
            <div class="search-box">
              <div class="search-reset" @click="reset"><span class="img-reset">清空</span></div>
              <div class="search-sub"  @click="search"><span class="img-sub">搜索</span></div>
            </div>
          </div>
        </div>
      </el-header>
      <!--table-->
      <el-main style="padding: 10px;" class="table">
        <Table :data='tableData'
               @handleEdit="handleEdit"
               @handleLook="handleLook"
               @current-change="handleCurrentChange"
               >
          <!--<template slot-scope="{scope}" slot="code">-->
            <!--<div>{{scope.row.code}}</div>-->
          <!--</template>-->
        </Table>
      </el-main>
    </el-container>
    <!--编辑弹框-->
    <el-dialog  title="编辑数据字典" :visible.sync="popEditVisible" width="680px" center>
      <div class="clearfix">
        <!-- input 输入框 -->
        <div class="input-box">
          <label class="input-label"><span>*</span>字典名称</label>
          <el-input v-model="editFormData.name" placeholder="" disabled clearable></el-input>
        </div>
        <!-- input 输入框 -->
        <div class="input-box">
          <label class="input-label"><span>*</span>描述</label>
          <el-input v-model="editFormData.describe" placeholder="" clearable></el-input>
        </div>
        <!-- input 输入框 -->
        <div class="input-box">
          <label class="input-label">备注</label>
          <el-input v-model="editFormData.note" placeholder="" clearable></el-input>
        </div>
        <div style="text-align: right;">
          <el-button class="" style="margin-right: 10px;" @click="cancleEdit" size="medium">返回</el-button>
          <el-button class="" style="margin-right: 15px;" type="primary" @click="saveEdit" size="medium">保存</el-button>
        </div>
      </div>
    </el-dialog>
    <!--列表值弹框-->
    <el-dialog  title="编辑字典值" :visible.sync="popLookVisible" width="1040px"  center>
      <div>
        <!-- btn-group -->
        <div class="btn-group clearfix">
          <div class="btn-add" @click="addItem"><span class="img-add">新增</span></div>
        </div>
        <el-table
          :data="popListData"
          tooltip-effect="dark"
          style="width: 100%; margin: 10px auto;overflow: auto;max-height: 400px;"
        >
          <el-table-column label="名称" width="280" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.name" placeholder="" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="字典名称" width="180" align="center">
            <template slot-scope="scope">
              <el-select v-model="scope.row.parentDicId"  :disabled = 'scope.row.isDirectly === 0'
                         @change="changeOptions(scope.row, scope.row.parentDicId)"
                         placeholder="请选择">
                <el-option
                  v-for="item in popOptions.name"
                  :key="item.tsDataDicId"
                  :label="item.name"
                  :value="item.tsDataDicId">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="字典值" width="180" align="center">
            <template slot-scope="scope">
              <el-select v-model="scope.row.parentValueId" placeholder="请选择" :disabled = 'scope.row.isDirectly === 0'>
                <el-option
                  v-for="item in scope.row.options"
                  :key="item.tsDataDicId"
                  :label="item.name"
                  :value="item.tsDataDicId">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="描述" width="180" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.describe" placeholder="" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="分数值" width="80" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.score " placeholder="" ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="排序" width="80" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.sort" placeholder="" ></el-input>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align: right;">
          <el-button class="" style="margin-right: 10px;" @click="cancleLook" size="medium">返回</el-button>
          <el-button class="" style="margin-right: 15px;" type="primary" @click="saveLook" size="medium">保存</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Table from "@/components/Table"
  import {loadDicList, loadDicUpdate, loadDicValList, updateDicValList} from "@/common/config/api/InfoBase"
  import {Init} from "@/common/config/getOptions"
  export default {
    name: "dataDictionary",
    components: {
      Table,
    },
    computed:{
      localOptions: {
        get(){
          return this.$store.state.codeOptions.options;
        },
        set(){
        }
      }
    },
    data() {
      return {
        isSaveFlag: true,
        popEditVisible: false, //编辑弹框
        popLookVisible: false, //列表值弹框
        popListData: [],
        formData: {
          name: "",
          describe: "",
        },
        editFormData: {},
        popOptions: {
          name: [],
        },
        tableData: {
          selectShow: false,
          tableHeight: 0,
          total: 0,
          listData: [],
          currentPage: 1,
          pageSize: 30,
          operations: [
            {
              label: '列表值',
              width: '70',
              data: [
                {
                  icon: 'icon-eye',
                  Fun: 'handleLook',
                  id: '1',
                }
              ]
            },
            {
              label: '操作',
              width: '70',
              data: [
                {
                  icon: 'icon-edit',
                  Fun: 'handleEdit',
                  id: '1',
                }
              ]
            }
          ],
          tableHead: [
            {
              name: "字典名称",
              value: 'name',
              // show: 'template',
              // width: 1200,
            },
            {
              name: "描述",
              value: 'describe'
            },
          ],
        },
      }
    },
    methods: {
      loadData() {
        let self = this;
        let p = {
          "pageNum": self.tableData.currentPage,
          "pageSize": self.tableData.pageSize,
          "name": self.formData.name || '',
          "describe": self.formData.describe || '',
        }
        loadDicList(p).then(res => {
          self.tableData.total = res.repData.total;
          self.tableData.listData = res.repData.list;
          self.popOptions.name = res.repData.list;
        })
      },
      handleCurrentChange(val) {
        this.tableData.currentPage = val;
        this.loadData();
      },
      search() {
        this.tableData.currentPage = 1;
        this.loadData();
      },
      reset(){
        this.resetForm(this.formData);
      },
// ---------------------- pop---------------
      handleEdit(data) {
        this.popEditVisible = true;
        this.editFormData = Object.assign({}, data.row);
      },
      cancleEdit() {
        this.popEditVisible = false;
      },
      saveEdit() {
        let self = this;
        if(self.isSaveFlag){
          this.isSaveFlag = false;
          setTimeout(()=>{
            self.isSaveFlag = true;
          }, 2000)
          if(!self.editFormData.describe || self.editFormData.describe.length === 0){
            self.msgInfo('描述不能为空')
            return;
          }
          if(!self.editFormData.describe || self.editFormData.describe.length > 20){
            self.msgInfo('描述长度不能超过20')
            return;
          }
          if(self.editFormData.note && self.editFormData.note.length > 100){
            self.msgInfo('备注长度不能超过100')
            return;
          }
          let p = {
            "describe": self.editFormData.describe,
            "note": self.editFormData.note,
            "tsDataDicId": self.editFormData.tsDataDicId
          }
          loadDicUpdate(p).then(res => {
            self.popEditVisible = false;
            self.loadData();
          })
        }
      },
      handleLook(data) {
        this.popListData = [];
        this.popLookVisible = true;
        let self = this;
        let p = {
          "id": data.row.tsDataDicId
        }
        loadDicValList(p).then(res => {
          let data = [];
          res.repData.forEach((item) => {
            data.push(Object.assign({}, item ,{options: this.localOptions[item.paDicCode]}));

            // loadDicValList({"id": item.parentDicId}).then(r => {
            //   data.push(Object.assign({}, item ,{options: r.repData}));
            //   self.popListData = data;
            // })
            self.popListData = data;
          })
        })
      },
      cancleLook() {
        this.popLookVisible = false;
      },
      addItem(){
        if(this.popListData[0].isDirectly === 0){
          this.popListData.push({name: '', isDirectly: 0, parentId: this.popListData[0].parentId})
        }else{
          this.popListData.push({name: '', isDirectly: this.popListData[0].isDirectly, parentId: this.popListData[0].parentId,
            parentValueId: '',options: []});
        }
      },
      changeOptions(row, id){
        row.parentValueId = '';
        let p = {
          "id": id
        }
        loadDicValList(p).then(res => {
          row.options = res.repData;
        })
      },
      saveLook() {
        let self = this;
        if(self.isSaveFlag){
          this.isSaveFlag = false;
          setTimeout(()=>{
            self.isSaveFlag = true;
          }, 2000)
          let bool =  self.popListData.every((item) => {
            return item.name && item.name.trim() !== '';
          })
          if(bool){
            updateDicValList({requestList: self.popListData}).then(res => {
              self.msgInfo(res.repMsg);
              self.popLookVisible = false;
              self.loadData();
              Init().then(res => {
                this.$store.commit('SET_OPTIONS', res.repData)
              })
                .catch(error => {
                  console.log(error);
                })
            })
          }else{
            self.msgInfo('名称不能为空');
          }
        }
      },
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
