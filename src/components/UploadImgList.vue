<template>
  <div class="clearfix" style="display:inline-block;">
    <el-upload
      style="width: 20px;height: 40px;float: left"
      :action="url"
      :data="headers"
      list-type="picture"
      :show-file-list="false"
      :on-success="handleSuccess"
    >
      <i class="icon-upload" style="display: inline-block;width:20px;height:40px"></i>

    </el-upload>
    <span @click="look" class="icon-eye" style="display: inline-block;width: 20px;height:40px;float: left;margin-left: 5px;"></span>
    <el-dialog title="图片详情" :visible.sync="dialogVisible"  center>
      <img  :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import {sGet,exportUrl}from "@/common/config/utils"
    export default {
      name: "UploadImgList",
      data() {
        return {
          dialogImageUrl: '',
          dialogVisible: false,
          url: '',
          headers:{
            token: ''
          },
        }
      },
      methods: {
        handleSuccess(res,file){
          this.dialogImageUrl = file.url;
        },
        look() {
          this.dialogVisible = true;
        }
      },
      created() {
        let user = sGet('_WHUser');
        this.headers.token = user.token;
        this.url = exportUrl + 'fileUpload/uploadImg'
      }
    }
</script>

<style scoped>

</style>
