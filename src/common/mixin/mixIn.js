import {Message,MessageBox} from 'element-ui';
export default {
  methods: {
    msgError(msg) {
      Message({
        message: msg,
        type: 'error',
        duration: 3 * 1000
      })
    },
    msgSuccess(msg) {
      Message({
        message: msg,
        type: 'success',
        duration: 3 * 1000
      })
    },
    msgInfo(msg) {
      Message({
        message: msg,
        type: 'warning',
        duration: 3 * 1000
      })
    },
    resetForm(data) {
      let formKeys = Object.keys(data);
      for (let k of formKeys){
        data[k] = '';
      }
    },
    saveTip(data, msg) {
      let formKeys = Object.keys(data);
      for (let k of formKeys){
        if(!data[k]){
          this.msgInfo(msg[k])
          return;
        }
      }
    },
    feedMessage(type, msg) {
      return Message({
        showClose: true,
        duration: 3 * 1000,
        type: type,
        message: msg
      })
    }
  },
  mounted(){
    if (document.getElementsByClassName('table')[0]&& this.tableData && this.tableData.tableHeight == 0){
      this.tableData.tableHeight = document.getElementsByClassName('table')[0].clientHeight - 60;
    }
  }
}
