import {Message} from 'element-ui';
export let loadRefresh = {
  methods: {
    search(){
      this.tableData.currentPage = 1;
      this.loadData();
    },
    handleSelectionChange(selection) {
      this.selectRows = selection;
    },
    handleCurrentChange(val) {
      this.tableData.currentPage = val;
      this.loadData();
    },
  },
  created() {
    this.loadData();
  }
}
