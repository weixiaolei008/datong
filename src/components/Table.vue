<template>
  <div style="width: 100%;height: 100%;">
    <el-container style="width: 100%;height: 100%;">
      <el-main style="padding: 0;" v-if="data.tableHeight">
        <el-table ref="multipleTable" stripe :data="data.listData" tooltip-effect="dark" :height="data.tableHeight"
          :row-class-name='getClass'
          @selection-change="handleSelectionChange" @row-click="toggleSelection"
        >
          <el-table-column type="selection" width="55" v-if="data.selectShow">
          </el-table-column>
          <template v-for="(item,index) in data.tableHead">
            <el-table-column
              v-if="item.show !== false && item.show === 'template'"
              :key="index"
              :label="item.name"
              :width="item.width || ''"
              height="40">
              <template slot-scope="scope">
                <slot :name="item.value" :scope="scope"></slot>
              </template>
            </el-table-column>
            <el-table-column
              v-else-if="item.show !== false && item.show !== 'template'"
              :key="index"
              :label="item.name"
              :prop="item.value"
              :width="item.width || data.width || ''"
              :formatter="item.formatter"
              show-overflow-tooltip
              align="center">
            </el-table-column>
          </template>
          <el-table-column
            fixed="right"
            v-for="(operation, index) in data.operations"
            :key="index+'a'"
            :width="operation.width || ''"
            :label="operation.label"
            align="center">
            <template slot-scope="scope">
              <i
                style="display: inline-block;width: 50px;height: 30px;line-height: 30px;cursor: pointer"
                v-for="item in operation.data"
                :class="item.icon"
                :key="item.id"
                @click.stop="handleOperation(scope.$index, scope.row, item.id,item.label, operation.data, data)">
                {{item.text}}
              </i>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer style="height: 40px;">
        <el-pagination style="width: 500px;margin: 0 auto; padding: 0;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="data.currentPage"
          layout="prev, pager, next, total"
          :page-size="30" :total="data.total">
        </el-pagination>
      </el-footer>
    </el-container>
  </div>

</template>

<script>
  export default {
    name: "Table",
    data() {
      return {
      }
    },
    props: {
      data:{
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    // props: ['data', 'tableHead', 'currentPage', 'total', 'operations', 'tableHeight'],
    methods: {
      getClass({row, rowIndex}) {
        if(row.isHold == '是'){
          return 'text-red'
        }
        if(row.isSelfPickup == 1){
          return 'text-green'
        }
      },
      // 操作（事件）
      handleOperation(index, row, id, label, operation, data) {
        var itemData = {
          index: index,
          id: id,
          label: label,
          row: row,
          operation:operation,
          tableData: data
        }
        for (let i = 0; i < operation.length; i++) {
          if (id === operation[i].id) {
            this.$emit(operation[i].Fun, itemData);
          }
        }
      },
			//点击行选中复选框
			toggleSelection(row) {
        if(this.data.tgSelectRow){
          return false;
        }
				var rows = [];
				rows.push(row);
				if(rows) {
					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row);
					});
				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},
      //表格Checkbox 选中
      handleSelectionChange(selection) {
        this.$emit('selection-change', selection);
      },
      //每页显示条数
      handleSizeChange(val) {
        this.$emit('size-change', val);
      },
      //页面切换
      handleCurrentChange(val) {
        this.$emit('current-change', val);
      }
    },
    mounted() {
    }
  }
</script>

<style>
  .el-table__row{
    height: 50px;
  }
  .text-green{
    color: limegreen;
  }
  .text-red{
    color: red;
  }
</style>
