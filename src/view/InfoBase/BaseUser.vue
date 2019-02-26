<template>
  <div style="width: 100%;height: 100%">
    <el-container style="width: 100%;height: 100%;">
      <el-header style="height: auto; padding: 0;">
        <!--<button style="width: 100px; height: 30px" @click="Login"></button>-->
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm clearfix"
                 @submit.native.prevent>
          <Input
            prop="add"
            placeholder="测试的"
            label="省"
            :value="ruleForm.add"
            @changeVal="(val) => ruleForm.add = val"
          >
          </Input>
          <Input
            prop="add2"
            placeholder="测试"
            label="市"
            :value="ruleForm.add2"
            @changeVal="(val) => ruleForm.add2 = val">
          </Input>
          <Select
            prop="select"
            placeholder="下拉框"
            label="下拉框"
            :value="ruleForm.select"
            :selectdata="selectdata"
            @changeVal="(val) => ruleForm.select = val"
          ></Select>
          <Input
            prop="add"
            placeholder="测试的"
            label="省"
            :value="ruleForm.add"
            @changeVal="(val) => ruleForm.add = val"
          >
          </Input>
          <Input
            prop="add"
            placeholder="测试的"
            label="省"
            :value="ruleForm.add"
            @changeVal="(val) => ruleForm.add = val"
          >
          </Input>
          <Input
            prop="add"
            placeholder="测试的"
            label="省"
            :value="ruleForm.add"
            @changeVal="(val) => ruleForm.add = val"
          >
          </Input>
          <Input
            prop="add"
            placeholder="测试的"
            label="省"
            :value="ruleForm.add"
            @changeVal="(val) => ruleForm.add = val"
          >
          </Input>
        </el-form>
      </el-header>
      <el-main style="padding: 0;">
        <Table :data='rows'
               :tableHead='tableHead'
               className="red"
               :currentPage="currentPage"
               :total="90"
               :operations="operations"
               @selection-change="handleSelectionChange" @size-change="handleSizeChange"
               @current-change="handleCurrentChange">
          <template slot-scope="{scope}" slot="name">
            <div>{{scope.row.name}}</div>
          </template>
        </Table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import Table from "@/components/Table"
  import Input from "@/components/Input"
  import Select from "@/components/Select"
  import md5 from 'js-md5';

  export default {
    name: "BaseUser",
    components: {
      Table,
      Input,
      Select
    },
    data() {
      return {
        listH: 0,
        rows: [
          {
            name: '小虎',
            custname: '1415151',
            address: '上海市普陀区金沙江路 1518 弄',
            className: 'username'
          },
          {
            name: '王小虎wkljh',
            custname: '1415151',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            name: '王小虎gf',
            custname: '1415151',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            name: '王小虎adsg',
            custname: '1415151',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            name: '王小虎32rgf',
            custname: '1415151',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            name: '王小虎afaga',
            custname: '1415151',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            name: '王小虎15tr',
            custname: '1415151',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            name: '王小虎31231',
            custname: '1415151',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            name: '王小虎131',
            custname: '1415151',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            name: '王小虎23',
            custname: '1415151',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            name: '王小虎23',
            custname: '1415151',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            name: '王小虎23',
            custname: '1415151',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            name: '王小虎23',
            custname: '1415151',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            name: '王小虎23',
            custname: '1415151',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            name: '王小虎23',
            custname: '1415151',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            name: '王小虎23',
            custname: '1415151',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            name: '王小虎23',
            custname: '1415151',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            name: '王小虎23',
            custname: '1415151',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            name: '王小虎23',
            custname: '1415151',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            name: '王小虎23',
            custname: '1415151',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            name: '王小虎23',
            custname: '1415151',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            name: '王小虎23',
            custname: '1415151',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            name: '王小虎23',
            custname: '1415151',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            name: '王小虎23',
            custname: '1415151',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            name: '王小虎23',
            custname: '1415151',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            name: '王小虎23',
            custname: '1415151',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            name: '王小虎23',
            custname: '1415151',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            name: '王小虎23',
            custname: '1415151',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            name: '王小虎23',
            custname: '1415151',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            name: '王小虎23',
            custname: '1415151',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            name: '王小虎23',
            custname: '1415151',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            name: '王小虎23',
            custname: '1415151',
            address: '上海市普陀区金沙江路 1518 弄'
          },
        ],
        currentPage: 1,
        tableHead: [
          {
            name: "用户名",
            value: 'name',
            show: 'template',
          },
          {
            name: "custname",
            value: 'custname',

          },
          {
            name: "custname",
            value: 'custname',

          },
          {
            name: "ceshi",
            value: 'address',
            width: '120',
            overflow: true
          },
          {
            name: "ceshi",
            value: 'address',
            width: '120',
            overflow: true
          },
          {
            name: "ceshi",
            value: 'address',
            width: '120',
            overflow: true
          },
          {
            name: "ceshi",
            value: 'address',
            width: 120,
            overflow: true
          },
          {
            name: "ceshi",
            value: 'address',
            width: 120,
            overflow: true
          },
          {
            name: "ceshi",
            value: 'address',
            width: 120,
            overflow: true
          },
          {
            name: "ceshi",
            value: 'address',
            width: 120,
            overflow: true
          },
          {
            name: "ceshi",
            value: 'address',
            width: 120,
            overflow: true
          },
          {
            name: "ceshi",
            value: 'address',
            width: 120,
            overflow: true
          },
          {
            name: "ceshi",
            value: 'address',
            width: 120,
            overflow: true
          },
          {
            name: "ceshi",
            value: 'address',
            width: 120,
            overflow: true
          },
          {
            name: "ceshi",
            value: 'address',
            width: 120,
            overflow: true
          },
          {
            name: "ceshi",
            value: 'address',
            width: 120,
            overflow: true
          },
          {
            name: "ceshi",
            value: 'address',
            width: 120,
            overflow: true
          },
          {
            name: "ceshi",
            value: 'address',
            width: 120,
            overflow: true

          },
          {
            name: "ceshi",
            value: 'address',
            width: 120,
            overflow: true
          },
          {
            name: "ceshi",
            value: 'address',
            width: 120,
            overflow: true
          },
          {
            name: "ceshi",
            value: 'address',
            width: 120,
            overflow: true
          },
          {
            name: "ceshi",
            value: 'address',
            width: 120,
            overflow: true

          },
          {
            name: "ceshi",
            value: 'address',
            width: 120,
            overflow: true
          },
          {
            name: "ceshi",
            value: 'address',
            width: 120,
            overflow: true
          }
        ],
        ruleForm: {
          add: "",
          add2: "",
          select: ""
        },
        selectdata: [
          {lable: "区域1", value: "1"},
          {lable: "区域2", value: "2"},
          {lable: "区域3", value: "3"},
          {lable: "区域4", value: "4"},
          {lable: "区域5", value: "5"}
        ],
        operations: [
          {
            label: '操作',
            width: '100',
            data: [
              {
                label: '通过',
                Fun: 'handleSubmit',
                size: 'mini',
                id: '1',
                classname: 'show'
              }
            ]
          },
          {
            label: '333',
            width: '100',
            data: [
              {
                label: '拒绝',
                Fun: 'handleRefuse',
                size: 'mini',
                id: '1',
                classname: 'show'
              }
            ]
          }
        ],
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
      }
    },
    created() {
      this.Login();
    }
  }
</script>

<style scoped>

</style>
