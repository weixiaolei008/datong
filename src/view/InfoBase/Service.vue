<!--服务商管理-->
<template>
  <el-container style="width: 100%;height: 100%;">
    <el-header style="height: auto; padding: 0;">
      <!-- search-group -->
      <div class="search-group clearfix">
        <!--搜索-->
        <div class="clearfix">
          <div class="input-box">
            <label class="input-label">服务商名称</label>
            <el-input placeholder="请输入服务商名称" clearable v-model="formData.serviceProviderName"></el-input>
          </div>
          <div class="search-box">
            <div class="search-reset" @click="reset"><span class="img-reset">清空</span></div>
            <div class="search-sub" @click="search"><span class="img-sub">搜索</span></div>
          </div>
        </div>
      </div>
      <!-- btn-group -->
      <div class="btn-group clearfix">
        <div class="btn-add" @click="newAddService"><span class="img-add">新增</span></div>
        <div class="btn-del" @click="handleDel"><span class="img-del">删除</span></div>
      </div>
    </el-header>
    <el-main class="table" style='padding: 10px;'>
      <Table :data='tableData'
             @handleEdit="handleEdit"
             @handleLook="handleLook"
             @selection-change="handleSelectionChange" @size-change="handleSizeChange"
             @current-change="handleCurrentChange">
      </Table>
    </el-main>
  </el-container>
</template>

<script>
  import Table from "@/components/Table"
  import {loadSeviceList,loadSeviceDel} from "@/common/config/api/InfoBase"
  import {timestampToTime, getNowFormatDate,formReset,confirmPop,w200,w150,w120}from "@/common/config/utils"

  export default {
    name: "Service",
    components: {
      Table
    },
    data() {
      return {
        tableHeight:'',
        pop: false, //弹框
        popDetailVisible: false,
        selectRows: [], //选中数据
        tableData: {
          selectShow: true,
          tableHeight: 0,
          currentPage: 1,
          total: 0, //列表总数
          listData: [],
          tableHead: [
            {
              name: "服务商名称",
              value: 'serviceProviderName',
              width: w120
            },
            {
              name: "营业执照号",
              value: 'businessLicenseNo',
              width: w150
            },
            {
              name: "地址",
              value: 'address',
              width: w200
            },
            {
              name: "联系人",
              value: 'contactName'
            },
            {
              name: "联系电话",
              value: 'contactPhone',
              width: w150
            },
            {
              name: "成立时间",
              value: 'foundDate',
              width: '180',
              formatter:  function(row) {
                return row.foundDate ? timestampToTime(row.foundDate).substring(0,10) : ''
              }
            },
            {
              name: "车辆数",
              value: 'vehicleAmount'
            }
          ],
          operations: [
            {
              label: '操作',
              width: '120',
              data: [
                {
                  icon: 'icon-edit',
                  Fun: 'handleEdit',
                  id: '1',
                },{
                  icon: 'icon-eye',
                  Fun: 'handleLook',
                  id: '2',
                }

              ]
            }
          ],
        },
        formData:{
          serviceProviderName: '', //服务商名称
          tsServiceProviderId: '', //服务商ID
          businessLicenseNo: '', //营业执照号
          address: '', //地址
          city: '', //市
          cityName: '', //市名称
          contactName: '', // 联系人
          contactPhone: '', //联系电话
          foundDate: '', //成立时间
          vehicleAmount: '', //车辆数
        },
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.selectRows = val;
      },
      //分页
      handleSizeChange(val) {
        console.log(val);
      },
      handleCurrentChange(val) {
        this.tableData.currentPage = val;
        this.loadDataList();
      },
      //删除
      handleDel(){
        if(this.selectRows.length == 0){
          this.msgInfo('至少勾选一条数据');
          return;
        }
        confirmPop('确认删除',this.handleDelData)
      },
      Cancle(){
        this.popDetailVisible = false;
      },
      searchMore() {
        this.pop = !this.pop
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
      handleEdit(data){
        this.$router.push({
          path: '/ServiceEdit',
          query: {
            tsServiceProviderId: data.row.tsServiceProviderId
          }
        })
      },
      handleLook(data){
        this.$router.push({
          path: '/ServiceEdit',
          query: {
            tsServiceProviderId: data.row.tsServiceProviderId,
            isDisabled: true
          }
        })
      },
      /*///////////////////////////////////////////////////////////////////////*/
      //列表接口
      loadDataList(){
        let self = this;
        let p ={
          pageNum: self.tableData.currentPage,
          pageSize: 30,
          serviceProviderName: self.formData.serviceProviderName //服务商名称
        }
        loadSeviceList(p).then(res => {
          if(res&&res.repData){
            self.tableData.listData = res.repData.list;
            self.tableData.total = res.repData.total;
          }
        })
      },
      //删除接口
      handleDelData(){
        let self = this;
        let p;
        let arr = [];
        if(self.selectRows){
          self.selectRows.forEach((item) => {
            arr.push(item.tsServiceProviderId);
          })
          p = {
            "tsServiceProviderIds": arr,//勾选时导出的列表
          }
        }
        loadSeviceDel(p).then(res => {
          self.msgSuccess('删除成功');
          this.loadDataList();
        })
      },
    },
    mounted(){
    },
    created() {
      this.loadDataList();
    }
  }
</script>

<style lang="less">

</style>

