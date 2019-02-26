<template>
  <el-container style="width: 100%;height: 100%;">
    <el-header style="height: auto; padding: 0;">
      <div class="search-group clearfix">
        <div :class="pop?'search-up':'search-more'" @click="searchMore"></div>
        <el-collapse-transition>
          <div v-show="pop" class="search-pop clearfix">
            <div class="input-box">
              <label class="input-label">所属公司</label>
              <el-input placeholder="省/自治区" v-model="factoryFormData.companyName" clearable></el-input>
            </div>
            <div class="input-box">
              <label class="input-label">地址</label>
              <el-input placeholder="地址" v-model="factoryFormData.address" clearable></el-input>
            </div>
            <div class="input-box">
              <label class="input-label">联系人</label>
              <el-input placeholder="联系人" v-model="factoryFormData.contactName" clearable></el-input>
            </div>
            <div class="input-box">
              <label class="input-label">联系电话</label>
              <el-input placeholder="联系电话" v-model="factoryFormData.contactPhone" clearable></el-input>
            </div>
           
          </div>
        </el-collapse-transition>

        <div class="clearfix">
          <div class="input-box">
            <label class="input-label">VIN码</label>
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入VIN码"
              v-model="vinValue">
            </el-input>
          </div>
          <div class="input-box">
            <label class="input-label">当前仓库</label>
            <el-select
              v-model="tsDivisionIdFactory"
              multiple
              collapse-tags
              placeholder="请选择">
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
            <el-select
              v-model="tsDivisionIdFactory"
              multiple
              collapse-tags
              placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="input-box">
            <label class="input-label">按驱动方式</label>
            <el-select
              v-model="tsCompanyIdFactory"
              multiple
              collapse-tags
              placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="input-box">
            <label class="input-label">按车型</label>
            <el-select
              v-model="tsFactoryIdFactory"
              multiple
              collapse-tags
              placeholder="请选择">
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
            <el-select
              v-model="tsDivisionIdFactory"
              multiple
              collapse-tags
              placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="input-box">
            <label class="input-label">按颜色</label>
            <el-select
              v-model="tsCompanyIdFactory"
              multiple
              collapse-tags
              placeholder="请选择">
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
            <el-select
              v-model="tsFactoryIdFactory"
              multiple
              collapse-tags
              placeholder="请选择">
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
            <el-input placeholder="车辆种类" clearable></el-input>
          </div>
          <div class="input-box">
            <label class="input-label">按销售区域</label>
            <el-select
              v-model="tsFactoryIdFactory"
              multiple
              collapse-tags
              placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="search-box">
            <div class="search-sub" @click="factorySearch(factoryFormData)"><span class="img-sub">搜索</span></div>
            <div class="search-reset" @click="factoryClean(factoryFormData)"><span class="img-reset">清空</span></div>
          </div>

        </div>

      </div>
    </el-header>

    <div class="btn-group clearfix" style="border-top: 1px solid #eee; margin-top: 10px;padding-top:10px;margin: 10px 10px;">
      <div class="btn-add" @click="addFactory"><span class="img-add">新增</span></div>
      <div class="btn-del" @click="deltFactory"><span class="img-del">删除</span></div>
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

    <el-dialog
      :title="tialogTitle"
      :visible.sync="factoryDialogVisible"
      width="50%"
      :before-close="factoryVisibleCancel">
      <div class="search-group clearfix">
        <div class="clearfix">
          
          <div class="input-box">
            <label class="input-label"><span>*</span>工厂名称</label>
            <el-input placeholder="工厂名称" v-model="factoryFormDataAdd.factoryName" clearable></el-input>
          </div>
         
          <div class="input-box">
            <label class="input-label">所属事业部</label>
            <el-select v-model="tsDivisionIdFactoryAdd" placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>

          <div class="input-box">
            <label class="input-label"><span>*</span>所属公司</label>
            <el-select v-model="tsCompanyIdFactoryAdd" placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          
          <div class="input-box" style="opacity: 0;">
            <label class="input-label">占位空格</label>
            <el-input></el-input>
          </div>

          <div class="input-box">
            <label class="input-label">省 / 自治区</label>
            <el-select v-model="provinceAdd" placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="input-box">
            <label class="input-label">市</label>
            <el-select v-model="cityAdd" placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>

          <div class="input-box">
            <label class="input-label">地址</label>
            <el-input placeholder="地址" v-model="factoryFormDataAdd.address" clearable></el-input>
          </div>

          <div class="input-box">
            <label class="input-label">邮编</label>
            <el-input placeholder="地址" v-model="factoryFormDataAdd.postCode" clearable></el-input>
          </div>

          <div class="input-box">
            <label class="input-label">成立时间</label>
            <el-date-picker
              v-model="foundDateFactoryAdd"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>

        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="factoryVisibleCancel(factoryFormDataAdd)">返回</el-button>
        <el-button type="primary" @click="factoryVisibleConfirm(factoryFormDataAdd)">保存</el-button>
      </span>
    </el-dialog>

  </el-container>
</template>

<script>
  import Table from "@/components/Table"

  export default {
    name: "garageHtry",
      components: {
        Table
      },
      data() {
        return {
          tialogTitle: '',
          vinValue:'',
          tableSelectId: [],//表格选中的数据
          timeValue3:'',
          factoryDialogVisible: false,
          pop: false,
          tableHeight: 0,
          selectValue1:'',
          myValue: '下拉框',
          placeholder: '下拉框zanweifu',
          componyLabelPosition: 'left',
          componyDialogVisible: false,
          divisionForm: {
            divisionName: '',
            companyName: ''
          },
          divisionTableData: [],
          currentPage: 1,
          label:'xialai',
          //搜索
          tsDivisionIdFactory: [],
          tsCompanyIdFactory: [],
          tsFactoryIdFactory: [],
          foundDateFactory: '',
          factoryFormData: {
            address: '', //地址 ,
            contactName: '', //联系人 ,
            contactPhone: '', //联系电话 ,
            foundDate: '', //成立时间 ,
            companyName: '', //所属公司 ,
          },
          //新增、编辑
          provinceAdd: null, //省
          cityAdd: null, //市
          tsDivisionIdFactoryAdd: [],//事业部ID
          tsCompanyIdFactoryAdd: [],//公司ID
          tsFactoryIdFactoryAdd: [],//工厂ID
          foundDateFactoryAdd: '',//成立时间
          factoryFormDataAdd: {
            factoryName: '',//工厂名称
            address: '', //地址 ,
            postCode: '', //邮编 ,
            contactName: '', //联系人 ,
            contactPhone: '', //联系电话 ,
            companyName: '', //所属公司 ,
          },
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
          region: [],
          tableData: {
            selectShow: true,
            tableHeight: 0,
            currentPage: 1,
            total: 100, //列表总数
            listData: [
                {
                    id: 1,
                    name: '小虎1',
                    value1: 'fde3fr',
                    value2: '上海市普陀区金沙江路 1518 弄',
                    value3: 'username',
                    value4: 'dew',
                    value5: 'cer 1518 弄',
                    value6: 'e3e2'
                },
                {
                    id: 2,
                    name: '小虎2',
                    value1: 'fde3fr',
                    value2: '上海市普陀区金沙江路 1518 弄',
                    value3: 'username',
                    value4: 'dew',
                    value5: 'cer 1518 弄',
                    value6: 'e3e2'
                },
                {
                    id: 3,
                    name: '小虎3',
                    value1: 'fde3fr',
                    value2: '上海市普陀区金沙江路 1518 弄',
                    value3: 'username',
                    value4: 'dew',
                    value5: 'cer 1518 弄',
                    value6: 'e3e2'
                },
                {
                    id: 4,
                    name: '小虎4',
                    value1: 'fde3fr',
                    value2: '上海市普陀区金沙江路 1518 弄',
                    value3: 'username',
                    value4: 'dew',
                    value5: 'cer 1518 弄',
                    value6: 'e3e2'
                },
                {
                    id: 5,
                    name: '小虎5',
                    value1: 'fde3fr',
                    value2: '上海市普陀区金沙江路 1518 弄',
                    value3: 'username',
                    value4: 'dew',
                    value5: 'cer 1518 弄',
                    value6: 'e3e2'
                },
                {
                    id: 6,
                    name: '小虎6',
                    value1: 'fde3fr',
                    value2: '上海市普陀区金沙江路 1518 弄',
                    value3: 'username',
                    value4: 'dew',
                    value5: 'cer 1518 弄',
                    value6: 'e3e2'
                },{
                    id: 7,
                    name: '小虎7',
                    value1: 'fde3fr',
                    value2: '上海市普陀区金沙江路 1518 弄',
                    value3: 'username',
                    value4: 'dew',
                    value5: 'cer 1518 弄',
                    value6: 'e3e2'
                },
                {
                    id: 8,
                    name: '小虎8',
                    value1: 'fde3fr',
                    value2: '上海市普陀区金沙江路 1518 弄',
                    value3: 'username',
                    value4: 'dew',
                    value5: 'cer 1518 弄',
                    value6: 'e3e2'
                },
                {
                    id: 9,
                    name: '小虎9',
                    value1: 'fde3fr',
                    value2: '上海市普陀区金沙江路 1518 弄',
                    value3: 'username',
                    value4: 'dew',
                    value5: 'cer 1518 弄',
                    value6: 'e3e2'
                },{
                    id: 10,
                    name: '小虎10',
                    value1: 'fde3fr',
                    value2: '上海市普陀区金沙江路 1518 弄',
                    value3: 'username',
                    value4: 'dew',
                    value5: 'cer 1518 弄',
                    value6: 'e3e2'
                },
                {
                    id: 11,
                    name: '小虎11',
                    value1: 'fde3fr',
                    value2: '上海市普陀区金沙江路 1518 弄',
                    value3: 'username',
                    value4: 'dew',
                    value5: 'cer 1518 弄',
                    value6: 'e3e2'
                },
                {
                    id: 12,
                    name: '小虎12',
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
                  value: 'name',
                },
                {
                  name: "库改内容",
                  value: 'name',
                },
                {
                  name: "申请部门",
                  value: 'name',
                },
                {
                  name: "VIN号",
                  value: 'value2',
                  width: '200'
                },
                {
                  name: "车型",
                  value: 'value3',
                  width: '200'
                },
                {
                  name: "车型级",
                  value: 'value4',
                  width: '200'
                },
                {
                  name: "车辆种类",
                  value: 'value1',
                },
                {
                  name: "颜色",
                  value: 'value1',
                },
                {
                  name: "销售区域",
                  value: 'value5',
                },
                {
                  name: "驱动方式",
                  value: 'value6',
                  width: '200'
                },
                {
                  name: "点位信息",
                  value: 'value1',
                  show: 'template',
                },
                {
                  name: "当前仓库",
                  value: 'value2',
                  width: '200'
                },
                {
                  name: "申请人",
                  value: 'value2',
                  width: '200'
                },
                {
                  name: "送车指令下达时间",
                  value: 'value3',
                  width: '200'
                },
                {
                  name: "车辆接收交接时间",
                  value: 'value4',
                  width: '200'
                }
            ]
          }
        }
      },
    methods: {
        feedMessage(type, msg) {
          return this.$message({
            showClose: true,
            type: type,
            message: msg
          })
        },
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
        diviFsormSearch(){

        },
        //清除表单搜索值
        diviFsormClean(){

        },
        //搜索
        factorySearch(formData) {
          console.log(formData, 'formData');
        },
        //清空
        factoryClean(formData) {
          this.factoryFormData = {};
        },
        handleSelectionChange(val) {
          console.log(val, 'beixuan');
          this.tableSelectId = val;
        },
        addFactory() {
          this.tialogTitle = '新增';
          this.factoryDialogVisible = true;
        },
        deltFactory() {
          if(this.tableSelectId.length < 1) {
            this.feedMessage('error','请选择删除的数据！');
          }

          this.$confirm('此操作将永久删除该文件, 是否继续?', '确定删除？', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var list = this.tableSelectId;
            var datalist = this.tableData.listData;
            for(var row in list){
               for(var i = 0; i < datalist.length; i++){
                if(list[row].id == datalist[i].id){
                  datalist.splice(i, 1)
                }
               }
            }
            this.feedMessage('success','删除成功！');
          }).catch((err) => {
            this.feedMessage('eror',err);
          });
        },
        //重置表单
        infoForm() {
          this.factoryFormDataAdd     = {};
          this.tsDivisionIdFactoryAdd = '';
          this.tsCompanyIdFactoryAdd  = '';
          this.tsFactoryIdFactoryAdd  = '';
          this.foundDateFactoryAdd    = '';
          this.provinceAdd            = '';
          this.cityAdd                = '';
          console.log('qingk----------', this.factoryFormDataAdd)
        },
        //返回
        factoryVisibleCancel(done) {
          if(done) {

          }else{

          }
          this.infoForm();
          this.factoryDialogVisible = false;
        },

        //保存
        factoryVisibleConfirm(formdata) {
          formdata.cityAdd                = this.cityAdd; //市
          formdata.provinceAdd            = this.provinceAdd;
          formdata.tsDivisionIdFactoryAdd = this.tsDivisionIdFactoryAdd;//事业部ID
          formdata.tsCompanyIdFactoryAdd  = this.tsCompanyIdFactoryAdd;//公司ID
          formdata.tsFactoryIdFactoryAdd  = this.tsFactoryIdFactoryAdd;//工厂ID
          formdata.foundDateFactoryAdd    = this.foundDateFactoryAdd;//成立时间
          var params = formdata;
          console.log('params-----------', params)
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
