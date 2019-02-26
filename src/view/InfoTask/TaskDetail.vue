<!--业务详情-->
<template>
  <el-container style="width: 100%;height: 100%;" class="task-datail">
    <el-header style="height: auto; padding: 0;">
      <!-- search-group -->
      <div class="search-group clearfix">
        <!--搜索弹框-->
        <div :class="pop?'search-up':'search-more'" @click="searchMore"></div>
        <el-collapse-transition>
        <div v-show="pop" class="search-pop clearfix">
          <div class="input-box">
            <label class="input-label">车型</label>
            <el-select v-model="formData.typeCode" placeholder="请选择车型">
              <el-option
                v-for="option in options.vehicle_type"
                :key="option.code"
                :label="option.name"
                :value="option.code">
              </el-option>
            </el-select>
          </div>
          <div class="input-box">
            <label class="input-label">车型级</label>
            <el-select v-model="formData.typeLevel" placeholder="请选择车型级">
              <el-option
                v-for="option in options.vehicle_type_level"
                :key="option.code"
                :label="option.name"
                :value="option.code">
              </el-option>
            </el-select>
          </div>
          <div class="input-box">
            <label class="input-label">车辆种类</label>
            <el-select v-model="formData.categoryCode" placeholder="请选择车辆种类">
              <el-option
                v-for="option in options.vehicle_category"
                :key="option.code"
                :label="option.name"
                :value="option.code">
              </el-option>
            </el-select>
          </div>
          <div class="input-box">
            <label class="input-label">点位信息</label>
            <el-select v-model="formData.pointLocationCode" placeholder="请选择点位信息">
              <el-option
                v-for="option in options.point_location"
                :key="option.code"
                :label="option.name"
                :value="option.code">
              </el-option>
            </el-select>
          </div>
        </div>
        </el-collapse-transition>
        <!--搜索-->
        <div class="clearfix">
          <div class="input-box">
            <label class="input-label">VIN码</label>
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入VIN码"
              v-model="formData.vinList"
              >
            </el-input>
          </div>
          <div class="input-box">
            <label class="input-label">颜色</label>
            <el-select v-model="formData.colorCode" placeholder="请选择颜色">
              <el-option
                v-for="option in options.color"
                :key="option.code"
                :label="option.name"
                :value="option.code">
              </el-option>
            </el-select>
          </div>
          <div class="input-box">
            <label class="input-label">驱动方式</label>
            <el-select v-model="formData.driveModeCode" placeholder="请选择驱动方式">
              <el-option
                v-for="option in options.drive_mode"
                :key="option.code"
                :label="option.name"
                :value="option.code">
              </el-option>
            </el-select>
          </div>
          <div class="input-box">
            <label class="input-label">销售区域</label>
            <el-select v-model="formData.salesAreaCode" placeholder="请选择销售区域">
              <el-option
                v-for="option in options.sales_area"
                :key="option.code"
                :label="option.name"
                :value="option.code">
              </el-option>
            </el-select>
          </div>
          <div class="input-box">
            <label class="input-label">状态</label>
            <el-select v-model="formData.activityStatusCode" placeholder="请选择状态">
              <el-option
                v-for="option in options.activity_status"
                :key="option.code"
                :label="option.name"
                :value="option.code">
              </el-option>
            </el-select>
          </div>
          <div class="search-box">
            <div class="search-reset" @click="reset"><span class="img-reset">清空</span></div>
            <div class="search-sub" @click="search"><span class="img-sub">搜索</span></div>
          </div>
        </div>
      </div>
      <!-- btn-group -->

    </el-header>
    <el-main class="table" style='padding: 10px;'>
      <Table :data='tableData'
             @handleLook="handleLook"
             @selection-change="handleSelectionChange" @size-change="handleSizeChange"
             @current-change="handleCurrentChange">
        <template slot-scope="{scope}" slot="vin">
          <div @click.stop="inActiveDetail(scope.row)" style="cursor: pointer;color: #60A4FF;text-align: center;">{{scope.row.vin}}</div>
        </template>
      </Table>
    </el-main>
  </el-container>
</template>

<script>
  import Table from "@/components/Table"
  import {loadTaskDetail} from "@/common/config/api/InfoTask"
  import {loadDicValList} from "@/common/config/api/basic"
  import {getSplitString,w200}from "@/common/config/utils"

  export default {
    name: "TaskDetail",
    components: {
      Table,
    },
    data() {
      return {
        tableHeight:'',
        pop: false, //弹框
        tableData: {
          selectShow: false,
          tableHeight: 0,
          currentPage: 1,
          total: 0, //列表总数
          listData: [],
          tableHead: [
            {
              name: "VIN号",
              value: 'vin',
              show: 'template',
              width: w200
            },
            {
              name: "当前活动",
              value: 'currentActivity'
            },
            {
              name: "当前任务",
              value: 'currentPlan'
            },
            {
              name: "车型",
              value: 'type'
            },
            {
              name: "车型级",
              value: 'typeLevel'
            },
            {
              name: "颜色",
              value: 'color'
            },
            {
              name: "销售区域",
              value: 'salesArea'
            },
            {
              name: "驱动方式",
              value: 'driveMode'
            },
            {
              name: "车辆种类",
              value: 'category'
            },
            {
              name: "点位信息",
              value: 'pointLocation'
            },
            {
              name: "状态",
              value: 'activityStatus'
            }
          ],
          operations: [
            {
              label: '操作',
              width: '80',
              data: [
                {
                  icon: 'icon-eye',
                  Fun: 'handleLook',
                  id: '1',
                }

              ]
            }
          ],
        },
        formData: {
          activityStatusCode: '', //活动状态Code
          categoryCode: '', // 车辆种类Code
          colorCode: '', //车辆颜色Code
          driveModeCode: '', //驱动方式code
          pointLocationCode: '', //点位信息code
          salesAreaCode: '', //销售区域code
          typeCode: '', // 车型code
          typeLevel: '', //车型级
          vinList: '', //vin码列表
          activityStatusCode: '', //状态
        }
      }
    },
    methods: {
      handleSelectionChange(val) {
        console.log(val);
      },
      //分页
      handleSizeChange(val) {
        console.log(val);
      },
      handleCurrentChange(val) {
        this.tableData.currentPage = val;
        this.loadDataList();
      },
      //搜索
      search(){
        this.loadDataList();
      },
      //清空数据
      reset(){
        this.resetForm(this.formData);
      },
      searchMore() {
        this.pop = !this.pop
      },
      handleLook(data){
        this.$router.push({
          path: '/TActivityDetail',
          query: {
            currentActivityId: data.row.currentActivityId
          }
        })
      },
      inActiveDetail(data){
        this.$router.push({
          path: '/TActivityDetail',
          query: {
            currentActivityId: data.currentActivityId
          }
        })
      },
      /*////////////////////////////////////////////////*/
      //列表接口
      loadDataList() {
        let self = this;
        let p = {
          pageNum: self.tableData.currentPage,
          pageSize: 30,
          planType:self.$route.query.taskDetailId,
          vinList: getSplitString(self.formData.vinList), //VIN码
          typeCode: self.formData.typeCode, //车型
          typeLevel: self.formData.typeLevel ? self.formData.typeLevel:0, //车型级
          categoryCode: self.formData.categoryCode, //车辆种类
          colorCode: self.formData.colorCode, //颜色
          salesAreaCode: self.formData.salesAreaCode, //销售区域
          driveModeCode: self.formData.driveModeCode, //驱动方式
          pointLocationCode: self.formData.pointLocationCode, //点位信息
          activityStatusCode: self.formData.activityStatusCode, //状态
        }
        console.log(self.formData.typeLevel);
        loadTaskDetail(p).then(res => {
          if(res&&res.repData){
            self.tableData.listData = res.repData.list;
            self.tableData.total = res.repData.total;
          }
        })
      },

    },
    watch: {
    },
    computed:{
      options: {
        get(){
          return this.$store.state.codeOptions.options;
        },
        set(){
        }
      }
    },
    created() {
      this.loadDataList();
    }
  }
</script>

<style lang="less">
.task-datail .el-table th>.cell{
  text-align: center;
}
</style>



