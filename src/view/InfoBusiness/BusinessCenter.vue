<!--业务中心-->
  <template>
  <el-container style="width: 100%;height: 100%;" class="business-center">
    <el-header style="height: auto; padding: 0;">
      <!-- search-group -->
      <div class="search-group clearfix">
        <!--搜索-->
        <div class="clearfix">
          <div class="input-box">
            <label class="input-label">VIN码</label>
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入VIN码"
              v-model="formData.vinList">
            </el-input>
          </div>
          <div class="input-box">
            <label class="input-label">下线时间</label>
            <el-date-picker
              v-model="formData.offlineTime"
              value-format="yyyy-MM-dd HH-mm-ss"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
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
            <label class="input-label">任务名称</label>
            <el-select v-model="formData.planType" placeholder="请选择任务名称">
              <el-option
                v-for="option in options.plan_type"
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
             @current-change="handleCurrentChange">
        <template slot-scope="{scope}" slot="vin">
          <div @click.stop="inActiveDetail(scope.row)" style="cursor: pointer;color: #60A4FF;text-align: center">{{scope.row.vin}}</div>
        </template>
      </Table>
    </el-main>
  </el-container>
</template>

<script>
  import Table from "@/components/Table"
  import {loadBusinessCenterList} from "@/common/config/api/InfoBusiness"
  import {getSplitString,w200}from "@/common/config/utils"

  export default {
    name: "BusinessCenter",
    components: {
      Table
    },
    data() {
      return {
        tableHeight:'',
        pop: false, //弹框
        selectRows: [],
        tableData: {
          selectShow: false,
          tableHeight: 0,
          currentPage: 1,
          total: 0, //列表总数
          listData: [],
          tableHead: [
            {
              name: "VIN码",
              value: 'vin',
              show: 'template',
              width: w200
            },
            {
              name: "任务名称",
              value: 'planName'
            },
            {
              name: "状态",
              value: 'status'
            },
            {
              name: "颜色",
              value: 'color'
            },
            {
              name: "点位信息",
              value: 'pointLocation'
            },
            {
              name: "下线时间",
              value: 'offlineTime',
              width: '180'
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
        //查询
        formData: {
          colorCode: '', // 车辆颜色Code
          offlineTime: '', //下线时间
          pointLocationCode: '', //点位信息code ,
          vinList: '', //vin码列表
          planType: '', //任务名称
        },
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.tableData.currentPage = val;
        this.loadDataList();
      },
      //搜索
      search(){
        this.tableData.currentPage = 1;
        this.loadDataList();
      },
      //清空数据
      reset(){
        this.resetForm(this.formData);
      },
      newAddService(){
        this.$router.push("/ServiceAdd");
      },
      handleLook(data){
        this.$router.push({
          path: '/BusinessDetail',
          query: {
            planId: data.row.planId, //任务id
            planType: data.row.planType, //任务类型
          }
        })
      },
      inActiveDetail(data){
        // console.log(data);
        this.$router.push({
          path: '/BusinessDetail',
          query: {
            planId: data.planId, //任务id
            planType: data.planType, //任务类型
          }
        })
      },
      /*////////////////////////////////////////////////////////*/
      //列表接口
      loadDataList() {
        let self = this
        let p = {
          pageNum: self.tableData.currentPage,
          pageSize: 30,
          vinList: getSplitString(self.formData.vinList), //VIN码
          colorCode: self.formData.colorCode, //颜色
          pointLocationCode: self.formData.pointLocationCode, //点位信息
          planType: self.formData.planType, //计划类型（任务名称） ,
          inboundTimeFrom: self.formData.offlineTime !== null ? self.formData.offlineTime[0] : '', //下线开始时间
          inboundTimeTo: self.formData.offlineTime !== null ? self.formData.offlineTime[1] : '', //下线结束时间
        }
        loadBusinessCenterList(p).then(res => {
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
  .business-center .el-table th>.cell{
    text-align: center;
  }
</style>


