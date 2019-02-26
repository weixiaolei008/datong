<template>
  <div class="header-style clearfix">
    <div class="header-logo">
      <img src="../common/image/index/icon_header_logo.png">
    </div>
    <div class="header-router">{{$route.name}}</div>
    <div class="header-user" @click="outConfirm">{{user.userName}}</div>

    <div>
      <!--<el-dialog title="退出登录" :visible.sync="popEditVisible" width="400px" top="20vh" center style="background: none;">-->
      <!--&lt;!&ndash;<div style="font-size: 16px; text-align: center">确认退出</div>&ndash;&gt;-->
      <!--<span slot="footer" class="dialog-footer">-->
      <!--<el-button @click="popEditVisible = false">取 消</el-button>-->
      <!--<el-button type="primary" @click="popEditVisible = false">确 定</el-button>-->
      <!--</span>-->
      <!--</el-dialog>-->
    </div>
  </div>
</template>

<script>
  import {sSet, sGet,url} from '@/common/config/utils';
  import {Init} from "@/common/config/getOptions"
  import {LoginOut} from "@/common/config/api/basic";

  export default {
    data() {
      return {
        user: {},
        popEditVisible: false,
      }
    },
    mounted() {
      this.user = sGet('_WHUser');

      Init().then(res => {
        // this.$store.dispatch('SetOptions', res.repData)
        this.$store.commit('SET_OPTIONS', res.repData)
      })
        .catch(error => {
          console.log(error);
        })
    },
    methods: {
      outConfirm() {
        this.$confirm('<strong style="font-size: 18px !important; color: #333; height: 50px; display: block;">退出当前用户</strong>', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString: true,
          type: 'warning',
          center: true,
          showClose: false
        }).then(() => {
          // this.ssoLoginOut();
          this.userClear();
        }).catch(() => {
        });
      },
      userClear() {
        LoginOut({}).then(res => {
          if (res) {
            sessionStorage.clear()
            window.location.href = 'https://c2bapi02-cv.saicmotor.com/sso/sso_logout_script?toUrl=' + url;
            // this.$router.push('/index');
          }
        })
      }
    }
  }
</script>
<style scoped>
  .header-style {
    width: 100%;
    height: 60px;
    background: #538EFF;
    position: relative;
  }

  .header-logo {
    width: 85px;
    height: 36px;
    padding: 10px 0 0 30px;
    float: left;
  }

  .header-logo img {
    width: 100%;
    height: 100%;
  }

  .header-router {
    float: left;
    height: 100%;
    line-height: 60px;
    margin-left: 220px;
    font-size: 14px;
    color: #fff;
  }

  .header-user {
    position: absolute;
    line-height: 60px;
    top: 0;
    right: 40px;
    text-align: right;
    color: #fff;
    min-width: 100px;
    padding-right: 32px;
    background: url("../common/image/index/icon_out.png") no-repeat right center;
    background-size: 24px;
    cursor: pointer;
  }
</style>
