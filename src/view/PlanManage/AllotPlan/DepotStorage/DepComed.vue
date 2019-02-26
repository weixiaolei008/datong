<template>
  <div style="width: 100%;height: 100%; overflow: hiden;">
  	<el-header style="height: auto; padding: -20px 20px 0;" >
      <div class="search-group clearfix">
        <div :class="pop?'search-up':'search-more'" @click="searchMore"></div>
        <el-collapse-transition>
          <div v-show="pop" class="search-pop clearfix">
            <div class="input-box">
              <label class="input-label">销售区域</label>
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
              <label class="input-label">驱动方式</label>
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
            <label class="input-label"><span>*</span>按VIN码</label>
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="selectValue1">
            </el-input>
          </div>

          <div class="input-box">
            <label class="input-label">销售区域</label>
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
            <label class="input-label">驱动方式</label>
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
            <label class="input-label">点位信息</label>
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
            <label class="input-label">申请人</label>
            <el-input placeholder="申请人" clearable></el-input>
          </div>

          <div class="input-box">
            <label class="input-label">申请部门</label>
            <el-select v-model="selectValue1" placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>

          <div class="search-box">
            <div class="search-sub" @click="warehouseSearch(warehouseFormData)"><span class="img-sub">搜索</span></div>
            <div class="search-reset" @click="warehouseClean(warehouseFormData)"><span class="img-reset">清空</span></div>
          </div>
        </div>
      </div>

      <div class="btn-group clearfix" style="border-top: 1px solid #eee; margin-top: 10px;padding-top:10px;margin: 10px 10px;">
        <div class="btn-del"><span class="img-del">删除</span></div>
        <div class="btn-export"><span class="img-extend">导出</span></div>
      </div>
    </el-header>
    <pre>{{currentData}}</pre>
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
  </div>
</template>
<script>
	import Table from "@/components/Table";
	export default {
    name: "DepComed",
    components: { Table },
    props: ['currentData'],
    data() {
      return {
        pop: false,
        VclientHeight: document.body.clientHeight,
        WHeight: window.innerHeight || document.documentElement.clientHeight,
        selectValue1:'',
        myValue: '下拉框',
        divisionForm: {
          divisionName: '',
          companyName: ''
        },
        divisionTableData: [],
        warehouseFormData: {
            name:'',
            region: '',
            cor:'',
            cur: '',
            pop: '',
            pho: ''
        },
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
                name: "事业部",
                value: 'value1',
                show: 'template',
              },
              {
                name: "省、自治区",
                value: 'value2',
              },
              {
                name: "市",
                value: 'value3',
              },
              {
                name: "地址",
                value: 'value4',
              },
              {
                name: "邮编",
                value: 'value1',
              },
              {
                name: "联系人",
                value: 'value5',

              },
              {
                name: "联系电话",
                value: 'value6',
              }
          ],
          operations: [
            {
              label: '编辑',
              width: '200',
              data: [
                {
                  label: '编辑',
                  Fun: 'handleSubmit',
                  type:'editor',
                  size: 'mini',
                  id: '1',
                  classname: 'show',
                  icon: 'el-icon-edit-outline'
                }
              ]
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
      watchClientHeight(tableDom) {
        // 通过捕获系统的onresize事件触发我们需要执行的事件
        var tableOffTop = tableDom.offsetTop;
        var paTop = tableDom.offsetParent.offsetTop;
        this.tableData.tableHeight = this.WHeight - (tableOffTop + paTop + 110);
      }
    },
    mounted() {
      this.NodepComList();
      var tableDom = document.getElementsByClassName('table')[0];
      this.$nextTick(function () {
          this.watchClientHeight(tableDom);
      })
      // var that = this;
      // window.onresize = function windowResize () {
      //   that.watchClientHeight()
      // }
    },
    created() {
    }
	}
</script>

<style scoped lang="less">

</style>