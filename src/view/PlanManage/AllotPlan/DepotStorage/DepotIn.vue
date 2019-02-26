<template>
  <el-container style="width: 100%;height: 100%;">
    <el-header style="height: auto; padding: 0;">
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
            <label class="input-label">VIN码</label>
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
            <label class="input-label">是否超期</label>
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
            <label class="input-label">车型</label>
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
            <label class="input-label">颜色</label>
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
            <label class="input-label">车型级</label>
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

          <div class="search-box">
            <div class="search-sub" @click="warehouseSearch(warehouseFormData)"><span class="img-sub">搜索</span></div>
            <div class="search-reset" @click="warehouseClean(warehouseFormData)"><span class="img-reset">清空</span></div>
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
        </div>

      </div>
    </el-header>

    <div class="btn-group clearfix" style="border-top: 1px solid #eee; margin-top: 10px;padding-top:10px;margin: 10px 10px;">
      <div class="btn-export"><span class="img-extend">导出数据</span></div>
    </div>

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

  </el-container>
</template>

<script>
  import Table from "@/components/Table"

  export default {
    name: "DepotIn",
      components: {
        Table
      },
      data() {
        return {
          pop: false,
          tableHeight: 0,
          selectValue1:'',
          myValue: '下拉框',
          placeholder: '下拉框zanweifu',
          componyLabelPosition: 'left',
          timeValue: '',
          componyDialogVisible: false,
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
                  width: '200'
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
        test(){
          // let time = this.timeValue[0];
          // let beginTime = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
          // console.log(beginTime);
        }
    },
    mounted() {
      this.tableData.tableHeight = document.getElementsByClassName('table')[0].clientHeight - 70;
    },
    created() {
      this.test();
    }
  }
</script>

<style scoped lang="less">

</style>
