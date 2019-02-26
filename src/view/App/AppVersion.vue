<template>
  <div class="app-version">
    <div style="margin-bottom: 20px;">App版本更新</div>
    <div>IOS</div>
    <div>
      <el-input class="item" style="width: 450px;" v-model="iosUrl" disabled placeholder="URL" clearable></el-input>
      <el-input class="item" v-model="iosVersion" placeholder="版本号" clearable></el-input>
      <span style="font-size: 12px;margin-left: 5px;">版本号格式（例：1.0.1）</span>
    </div>
    <div>Android</div>
    <div>
      <el-input class="item" style="width: 450px;" v-model="androidUrl" disabled placeholder="URL" clearable></el-input>
      <el-input class="item" v-model="androidVersion" placeholder="版本号" clearable></el-input>
      <span style="font-size: 12px;margin-left: 5px;">版本号格式（例：1）</span>
    </div>
    <div>
      <el-button style="margin-left: 280px;" type="primary" @click="updateData" size="medium">提交</el-button>
    </div>
  </div>
</template>

<script>
  import {loadVersion, updateVersion} from "@/common/config/api/basic"
    export default {
      name: "AppVersion",
      data(){
        return{
          iosUrl: '',
          iosVersion: '',
          androidUrl: '',
          androidVersion: '',
        }
      },
      methods: {
        loadData(){
          let self = this;
          loadVersion({}).then(res => {
            if(res && res.repData){
              self.iosUrl = res.repData.iosPackageUrl;
              self.iosVersion = res.repData.iosVersionNum;
              self.androidUrl = res.repData.androidPackageUrl;
              self.androidVersion = res.repData.androidVersionNum;
            }
          })
        },
        updateData(){
          let self = this;
          if(!self.androidVersion.trim()){
            this.msgInfo('版本不能为空')
            return
          }
          if(!self.iosVersion.trim()){
            this.msgInfo('版本不能为空')
            return
          }
          let p = {
            "androidPackageUrl": self.androidUrl,
            "androidVersionNum":  self.androidVersion,
            "iosPackageUrl":  self.iosUrl,
            "iosVersionNum": self.iosVersion,
          }
          updateVersion(p).then(res => {
            if(res && res.repData){
              self.msgInfo(res.repMsg)
              this.loadData();
            }
          })
        }
      },
      created(){
        this.loadData()
      }
    }
</script>

<style scoped>
  .app-version{
    padding: 20px 50px;
  }
  .item{
    width: 300px;
    margin-top: 10px;
    margin-bottom: 20px;
  }
</style>
