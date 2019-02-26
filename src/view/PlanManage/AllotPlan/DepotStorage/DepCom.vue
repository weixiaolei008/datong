<template>
  <div style="width: 100%;height: 100%; overflow: hiden;">
  	<el-header style="height: auto; padding: -20px 20px 0;" >
      <div class="search-group clearfix">
        <div :class="pop?'search-up':'search-more'" @click="searchMore"></div>
        <el-collapse-transition>
          <div v-show="pop" class="search-pop clearfix">
            <div class="input-box">
              <label class="input-label">当前仓库</label>
              <el-select v-model="selectValue1" placeholder="请选择">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="input-box">
              <label class="input-label">状态</label>
              <el-select v-model="selectValue1" placeholder="请选择">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="input-box">
              <label class="input-label">车辆种类</label>
              <el-select v-model="selectValue1" placeholder="请选择">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </el-collapse-transition>

        <div class="clearfix">
          <div class="input-box">
            <label class="input-label">按VIN码</label>
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="selectValue1">
            </el-input>
          </div>

          <div class="input-box">
            <label class="input-label">当前仓库</label>
            <el-select v-model="selectValue1" placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="input-box">
            <label class="input-label">状态</label>
            <el-select v-model="selectValue1" placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
         	<div class="input-box">
            <label class="input-label">指令下达时间</label>
            <el-date-picker
              v-model="timeValue"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <div class="search-box">
            <div class="search-sub" @click="warehouseSearch(warehouseFormData)"><span class="img-sub">搜索</span></div>
            <div class="search-reset" @click="warehouseClean(warehouseFormData)"><span class="img-reset">清空</span></div>
          </div>
        </div>
      </div>

      <div class="btn-group clearfix" style="border-top: 1px solid #eee; margin-top: 10px;padding-top:10px;margin: 10px 10px;">
       	<div class="btn-add" @click="addDeoCOm"><span class="img-add">创建计划</span></div>
       	<div class="btn-receive"><span class="img-receive">接收车辆</span></div>
        <div class="btn-del"><span class="img-del">删除</span></div>
        <div class="btn-import"><span class="img-import">导入数据</span></div>
        <div class="btn-export"><span class="img-extend">导出</span></div>
      </div>
    </el-header>

    <!-- <pre>{{currentData}}</pre> -->

    <el-main class="table" style='padding: 10px;'>
       <Table :data='tableData'
         @handleEdit="handleEdit"
         @handleLook="handleLook"
         @selection-change="handleSelectionChange"
         @current-change="handleCurrentChange">
        <template slot-scope="{scope}" slot="code">
          <div>{{scope.row.code}}</div>
        </template>
      </Table>
    </el-main>

    <el-dialog
      :title="depComTitle"
      :visible.sync="depComDialogVisible"
      width="30%"
      :before-close="depComSh">
      <div class="search-group clearfix">
      	<div style="margin-bottom: 20px;">
			    <span class="demonstration" style="width:100px; display:inline-block; margin-right:10px;text-align:right;">计划创建时间</span>
			    <el-date-picker
			      v-model="value1"
			      type="date"
			      placeholder="选择日期">
			    </el-date-picker>
			  </div>
        <div class="input-box">
          <label class="input-label" style="width: 100px;">按VIN码</label>
          <el-input
	          style="width: 220px;"
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="selectValue1">
          </el-input>
        </div>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: center; margin: -30px auto 10px;">
        <el-button @click="depComSh()">返 回</el-button>
        <el-button type="primary" @click="depComVisibleConfirm()">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
	import Table from "@/components/Table";
	export default {
    name: "DepCom",
    components: { Table },
    props: ['currentData'],
    data() {
      return {
        pop: false,
        VclientHeight: document.body.clientHeight,
        WHeight: window.innerHeight || document.documentElement.clientHeight,
        depComTitle: '',
        depComDialogVisible: false,
        selectValue1:'',
        myValue: '下拉框',
        value1: '',
        divisionForm: {
          divisionName: '',
          companyName: ''
        },
        divisionTableData: [],
        currentPage: 1,
        warehouseFormData: {
            name:'',
            region: '',
            cor:'',
            cur: '',
            pop: '',
            pho: ''
        },
        timeValue: '',
        label:'xialai',
        options1: [
          {
            label:'select1',
            value: '西哦啊据',
            index: '1'
          },
          {
            label:'select1',
            value: '西哦啊据1',
            index: '2'
          }
        ],
        tableData: {
          selectShow: true,
          tableHeight: 0,
          currentPage: 1,
          total: 100, //列表总数
          listData: [
            {
                name: '小虎1',
                value1: 'fde3fr',
                value2: '上海市普陀区金沙江路 1518 弄',
                value3: 'username',
                value4: 'dew',
                value5: 'cer 1518 弄',
                value6: 'e3e2'
            },
            {
                name: '小虎2',
                value1: 'fde3fr',
                value2: '上海市普陀区金沙江路 1518 弄',
                value3: 'username',
                value4: 'dew',
                value5: 'cer 1518 弄',
                value6: 'e3e2'
            },
            {
                name: '小虎3',
                value1: 'fde3fr',
                value2: '上海市普陀区金沙江路 1518 弄',
                value3: 'username',
                value4: 'dew',
                value5: 'cer 1518 弄',
                value6: 'e3e2'
            },
            {
                name: '小虎1',
                value1: 'fde3fr',
                value2: '上海市普陀区金沙江路 1518 弄',
                value3: 'username',
                value4: 'dew',
                value5: 'cer 1518 弄',
                value6: 'e3e2'
            },
            {
                name: '小虎2',
                value1: 'fde3fr',
                value2: '上海市普陀区金沙江路 1518 弄',
                value3: 'username',
                value4: 'dew',
                value5: 'cer 1518 弄',
                value6: 'e3e2'
            },
            {
                name: '小虎3',
                value1: 'fde3fr',
                value2: '上海市普陀区金沙江路 1518 弄',
                value3: 'username',
                value4: 'dew',
                value5: 'cer 1518 弄',
                value6: 'e3e2'
            },{
                name: '小虎1',
                value1: 'fde3fr',
                value2: '上海市普陀区金沙江路 1518 弄',
                value3: 'username',
                value4: 'dew',
                value5: 'cer 1518 弄',
                value6: 'e3e2'
            },
            {
                name: '小虎2',
                value1: 'fde3fr',
                value2: '上海市普陀区金沙江路 1518 弄',
                value3: 'username',
                value4: 'dew',
                value5: 'cer 1518 弄',
                value6: 'e3e2'
            },
            {
                name: '小虎3',
                value1: 'fde3fr',
                value2: '上海市普陀区金沙江路 1518 弄',
                value3: 'username',
                value4: 'dew',
                value5: 'cer 1518 弄',
                value6: 'e3e2'
            },{
                name: '小虎1',
                value1: 'fde3fr',
                value2: '上海市普陀区金沙江路 1518 弄',
                value3: 'username',
                value4: 'dew',
                value5: 'cer 1518 弄',
                value6: 'e3e2'
            },
            {
                name: '小虎2',
                value1: 'fde3fr',
                value2: '上海市普陀区金沙江路 1518 弄',
                value3: 'username',
                value4: 'dew',
                value5: 'cer 1518 弄',
                value6: 'e3e2'
            },
            {
                name: '小虎3',
                value1: 'fde3fr',
                value2: '上海市普陀区金沙江路 1518 弄',
                value3: 'username',
                value4: 'dew',
                value5: 'cer 1518 弄',
                value6: 'e3e2'
            }
          ],
          tableHead: [
              {
                name: "序号",
                value: 'value1',
                show: 'template',
              },
              {
                name: "库改内容",
                value: 'value2',
                width: '200'
              },
              {
                name: "申请部门",
                value: 'value3',
                width: '200'
              },
              {
                name: "VIN号",
                value: 'value4',
                width: '100'
              },
              {
                name: "车型",
                value: 'value1',
              },
              {
                name: "车型级",
                value: 'value5',
              },
              {
                name: "车辆种类",
                value: 'value6',
              },
              {
                name: "颜色",
                value: 'value1',
                show: 'template',
              },
              {
                name: "销售区域",
                value: 'value2',
                 width: '200'
              },
              {
                name: "驱动方式",
                value: 'value3',
              },
              {
                name: "点位信息",
                value: 'value4',
              },
              {
                name: "当前仓库",
                value: 'value1',
                 width: '200'
              },
              {
                name: "申请人",
                value: 'value5',

              },
              {
                name: "指令下达时间",
                value: 'value6',
                 width: '200'
              },
              {
                name: "状态",
                value: 'value6',
              }
          ],
        },
      }
    },
    watch: {
      VclientHeight(val){
        console.log('watch-val', val)
      },
      tableData(val){
        console.log('tableData', val)
      }
    },
    methods: {
      handleEdit(index, row) {
        this.popEditVisible = true;
        this.editFormData = row;
      },
      handleLook(index, row) {
        this.popLookVisible = true;
        let self = this;
        let p = {
          "pageNum": 1,
          "pageSize": 30,
          "parameter": row.code
        }
        this.$api.loadDicValList(p).then(res => {
          self.popListData = res.repData;
        })
        .catch(error => {
          self.msgError(error.repMsg)
        })

      },
      addDeoCOm() {
      	this.depComDialogVisible = true;
      	this.depComTitle = "创建计划";
      },
      depComSh() {
      	this.depComDialogVisible = false;
      },
      createStatusClick(){

      },
      change() {

      },
      //搜索查询
      warehouseSearch(){

      },
      //清除表单搜索值
      warehouseClean(){

      },
      handleSelectionChange(val) {
        console.log(val, 'beixuan');
      },
      //分页
      handleSizeChange(val) {
        console.log(val);
      },
      handleCurrentChange(val) {
        console.log(val);
      },
      //表格事件
      onClickChange(a, b, operation) {
          console.log('操作---', a, b, operation, operation.label)
          if(operation.label == '编辑') {
              console.log('编辑---')
              this.componyDialogVisible = true;
          }
      },
      searchMore() {
        this.pop = !this.pop
      },
      NodepComList() {
       
      },
	    watchClientHeight() {
	      var tableDom = document.getElementsByClassName('table')[0];
	      var tableOffTop = tableDom.offsetTop;
	      var paTop = tableDom.offsetParent.offsetTop;
	      this.tableData.tableHeight = this.WHeight - (tableOffTop + paTop + 110);
	    }
    },
    mounted() {
      this.NodepComList();
      this.$nextTick(function () {
          this.watchClientHeight();
      })
      // var that = this;
      // window.onresize = () => {
      // 	console.log('222');
      // 	that.watchClientHeight();
      // }
    },
    created() {
    }
	}
</script>

<style scoped lang="less">

</style>