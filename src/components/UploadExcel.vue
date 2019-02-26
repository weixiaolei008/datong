<template>
  <el-upload
    :action="url"
    :data="headers"
    :before-upload="beforeAvatarUpload"
    :on-success="handleSuccess"
    :show-file-list="false"
  >
    <div class="btn-import"><span class="img-import">导入</span></div>
  </el-upload>
</template>

<script>
  import {sGet ,exportUrl}from "@/common/config/utils"
    export default {
      name: "UploadExcel",
      data() {
        return {
          url: '',
          headers:{
            token: ''
          },
        }
      },
      methods: {
        beforeAvatarUpload(file) {
          let Xls = file.name.split('.');
          if(Xls[1] === 'xls'||Xls[1] === 'xlsx'){
            return file
          }else {
            this.$message.error('上传文件只能是 xls/xlsx 格式!')
            return false
          }
        },
        handleSuccess(res){
          if(res.repCode == '0000') {
            this.$emit('handle-success',  res.repData.relativeUrl);
          }else{
            this.$message.error(res.repMsg)
            return false
          }
        }
      },
      created() {
        let user = sGet('_WHUser');
        this.headers.token = user.token;
        this.url = exportUrl + 'fileUpload/uploadExcel'
      }
    }
</script>

<style scoped>

</style>
