<template>
  <el-container style="width: 100%;height: 100%;">
    <el-header style="height: auto; padding: 0;">
      <!-- search-group -->
      <div class="search-group clearfix">
        <div :class="pop?'search-up':'search-more'" @click="searchMore"></div>
        <el-collapse-transition>
          <div v-show="pop" class="search-pop clearfix">
            <div class="input-box">
              <label class="input-label">所属工厂</label>
              <el-input placeholder="所属工厂" clearable></el-input>
            </div>
            <div class="input-box">
              <label class="input-label">省/自治区</label>
              <el-input placeholder="省/自治区" clearable></el-input>
            </div>
            <div class="input-box">
              <label class="input-label">市</label>
              <el-input placeholder="市" clearable></el-input>
            </div>
            <div class="input-box">
              <label class="input-label">地址</label>
              <el-input placeholder="地址" clearable></el-input>
            </div>
            <div class="input-box">
              <label class="input-label">联系人</label>
              <el-input placeholder="联系人" clearable></el-input>
            </div>
            <div class="input-box">
              <label class="input-label">联系电话</label>
              <el-input placeholder="联系电话" clearable></el-input>
            </div>
            <div class="input-box">
              <label class="input-label">仓库类型</label>
              <el-input placeholder="仓库类型" clearable></el-input>
            </div>
            <div class="input-box">
              <label class="input-label">仓库面积</label>
              <el-input placeholder="仓库面积" clearable></el-input>
            </div>
          </div>
        </el-collapse-transition>
        <div class="clearfix">
          <div class="input-box">
            <label class="input-label"><span>*</span>文本域</label>
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="textarea">
            </el-input>
          </div>
          <!-- input 输入框 -->
          <div class="input-box">
            <label class="input-label"><span>*</span>带星号input</label>
            <el-input placeholder="所属事业部" clearable></el-input>
          </div>
          <!-- input 输入框 -->
          <div class="input-box">
            <label class="input-label">无星号input</label>
            <el-input placeholder="所属事业部" clearable></el-input>
          </div>

          <div class="input-box">
            <label class="input-label"><span>*</span>双日期</label>
            <el-date-picker
              v-model="timeValue"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <!-- 单选下拉框 -->
          <div class="input-box">
            <label class="input-label"><span>*</span>单选下拉框</label>
            <el-select v-model="selectValue1" placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <!-- 多选下拉框 -->
          <div class="input-box">
            <label class="input-label">多选下拉框</label>
            <el-select
              v-model="selectValue2"
              multiple
              collapse-tags
              placeholder="请选择">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="input-sm-box">
            <label class="input-label">区间input</label>
            <el-input placeholder="能耗等级" clearable></el-input>
            <label style="width: 30px" class="input-label">至</label>
            <el-input placeholder="能耗等级" clearable></el-input>
          </div>
          <div class="search-box">
            <div class="search-sub"><span class="img-sub">搜索</span></div>
            <div class="search-reset"><span class="img-reset">清空</span></div>
          </div>
        </div>
      </div>
      <!-- btn-group -->
      <div class="btn-group clearfix">
        <div class="btn-add"><span class="img-add">新增</span></div>
        <div class="btn-receive"><span class="img-receive">接收车辆</span></div>
        <div class="btn-del"><span class="img-del">删除</span></div>
        <div class="btn-inform"><span class="img-inform">通知类</span></div>
        <div class="btn-import"><span class="img-import">导入</span></div>
        <div class="btn-export"><span class="img-extend">导出</span></div>
        <div class="btn-repair-first" @click="handleRepairFirst"><span class="img-repair-first">立即修</span></div>
        <div class="btn-repair-second" @click="handleRepairSecond"><span class="img-repair-second">缓修</span></div>
        <div class="btn-repair-out" @click="handleRepairOut"><span class="img-repair-out">出库返修</span></div>
      </div>
    </el-header>
    <div class="title-group">
      <div class="icon-title img-title">列表</div>
      <div class="radio-box" style="left: 100px">
        <el-radio-group v-model="radio" @change='switching(radio)'>
          <el-radio :label="1">主机厂</el-radio>
          <el-radio :label="2">服务商</el-radio>
        </el-radio-group>
      </div>
      <div class="btn-group clearfix">
        <div class="btn-add"><span class="img-add">新增</span></div>
        <div class="btn-receive"><span class="img-receive">接收车辆</span></div>
        <div class="btn-del"><span class="img-del">删除</span></div>
        <div class="btn-inform"><span class="img-inform">通知类</span></div>
        <div class="btn-import"><span class="img-import">导入</span></div>
        <div class="btn-export"><span class="img-extend">导出</span></div>
      </div>
    </div>
    <el-main class="table" style="padding: 10px 10px 0 10px;">
      <Table :data='tableData'
             @selection-change="handleSelectionChange" @size-change="handleSizeChange"
             @current-change="handleCurrentChange">
        <template slot-scope="{scope}" slot="name">
          <div>{{scope.row.name}}</div>
        </template>
      </Table>
    </el-main>
  </el-container>
</template>

<script>
  import Table from "@/components/Table"
  import jsonData from "@/common/data/data.json"

  export default {
    name: "Example",
    components: {
      Table,
      jsonData
    },
    data() {
      return {
        radio: 1,
        pop: false,
        options1: [{
          value: '选项1',
          label: '长安VDC'
        }, {
          value: '选项2',
          label: '张泾VDC'
        }],
        options2: [],
        selectValue1: '',
        selectValue2: '',
        textarea:'',
        timeValue: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        timeValue2: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        timeValue3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],

        tableData: {
          selectShow: false,
          tableHeight: 0,
          currentPage: 1,
          total: 90, //列表总数
          listData: [],
          operations: [
            {
              label: '列表值',
              width: '100',
              data: [
                {
                  icon: 'icon-edit',
                  Fun: 'handleLook',
                  id: '1',
                }
              ]
            },
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
          tableHead: [
            {
              name: "字典名称",
              value: 'code',
              // show: 'template',
              // width: 1200,
            },
            {
              name: "描述",
              value: 'dicDescribe'
            },
            {
              name: "长度",
              value: 'dicLength'
            }
          ],
        },
      }
    },
    methods: {
      switching(val) {
        if (val == 1) {
          this.flag = false;
        } else {
          this.flag = true;
        }
      },
      handleSelectionChange(val) {
        console.log(val);
      },
      //分页
      handleSizeChange(val) {
        console.log(val);
      },
      handleCurrentChange(val) {
        console.log(val);
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
        this.options2 = jsonData.warehouse;
        this.tableData.listData = jsonData.list;
        // console.log(this.timeValue[0]);
        // let time = this.timeValue[0];
        // let beginTime = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
        // console.log(beginTime);
      }
    },
    mounted() {

    },
    created() {
      this.test();
    }
  }
</script>

<style scoped lang="less">

</style>
