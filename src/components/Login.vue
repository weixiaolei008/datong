<template>
  <div class="login-bg">
    <!--<div class="index-box">-->
    <div :style="loginBox">
      <div class="login-lf"></div>
      <div class="login-rt" :style="rtStyle">
        <div class="login-logo" :style="loginStyle">
          <img src="../common/image/index/icon_logo.png">
        </div>

        <div class="login-input">
          <el-input
            id="usernameInput"
            placeholder="请输入用户名"
            v-model="loginName">
            <label slot="prefix" class="el-input__icon el-icon-iconName" for="usernameInput"></label>
          </el-input>
        </div>

        <div class="login-input">
          <el-input
            id="passwordInput"
            placeholder="请输入密码"
            v-model="loginPassword"
            type="password">
            <label slot="prefix" class="el-input__icon el-icon-iconPassword " for="passwordInput"></label>
          </el-input>
        </div>

        <div class="login-input" style="position: relative">
          <el-input
            id="codeInput"
            placeholder="请输入验证码"
            v-model="loginCode"
            :maxlength = 6>
            <label slot="prefix" class="el-input__icon el-icon-iconCode" for="codeInput"></label>
          </el-input>
          <span style="background: #7e8c8d; color: #fff; text-align: center; width: 100px; height: 50px; position: absolute; top: 0; right:0;">验证码图片</span>
        </div>

        <div class="loginbutonDiv">
          <el-button class="buttonSize button-solid" type="primary" @click="login">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import md5 from 'js-md5';
  import {sSet, sGet} from '@/common/config/utils';
  import {Login, getMenu} from "@/common/config/api/basic"

  export default {
    data() {
      return {
        loginName: '',
        loginPassword: '',
        loginCode:'',
        menu: [],
        screenWidth: $(window).width(),
        screenHeight: $(window).height(),
      }
    },

    computed: {
      loginBox: function () {
        if (this.screenWidth < 1400) {
          return {
            'width': (this.screenWidth - 220) + 'px',
            'height': (this.screenHeight - 140) + 'px',
            'background': '#ffffff',
            'position': 'absolute',
            'top': '70px',
            'left': '110px'
          }
        }
        else {
          return {
            'width': (this.screenWidth - 340) + 'px',
            'height': (this.screenHeight - 240) + 'px',
            'background': '#ffffff',
            'position': 'absolute',
            'top': '120px',
            'left': '170px'
          }
        }
      },
      rtStyle: function () {
        if (this.screenWidth < 1400) {
          return {
            'width': '25%',
            'right': '30px',
            'paddingTop': '20px',
          }
        }
        else if (this.screenWidth >= 1400 && this.screenWidth < 1650) {
          return {
            'width': '25%',
            'right': '45px',
            'paddingTop': '30px',
          }
        }
        else {
          return {
            'width': '25%',
            'right': '70px',
            'paddingTop': '100px',
          }
        }
      },
      loginStyle: function () {
        if (this.screenWidth < 1400) {
          return {
            'marginBottom': '5px',
            'marginTop': '10px',
          }
        }
        else if (this.screenWidth >= 1400 && this.screenWidth < 1650) {
          return {
            'marginBottom': '15px',
            'marginTop': '10px',
          }
        }
        else {
          return {
            'marginBottom': '40px',
            'marginTop': '20px',
          }
        }
      }
    },
    mounted() {
      const that = this
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth
          window.screenHeight = document.body.clientHeight
          that.screenWidth = window.screenWidth
          that.screenHeight = window.screenHeight
        })()
      }

    },
    watch: {
      screenWidth(val) {
        if (!this.timer) {
          this.screenWidth = val
          this.timer = true
          let that = this
          setTimeout(function () {
            that.timer = false
          }, 400)
        }
      },
      screenHeight(val) {
        if (!this.timer) {
          this.screenHeight = val
          this.timer = true
          let that = this
          setTimeout(function () {
            that.timer = false
          }, 400)
        }
      }
    },
    methods: {
      login() {
        // let _this = this;
        let _password = md5(md5(this.loginPassword + 'QAZWSXEDCRFV09876543210'));
        let p = {
          "userName": this.loginName,
          "password": _password,
          "codeKey": "",
          "ltype": 2,
          "type": 0,
          "vcode": ""
        }
        Login(p).then(res => {
          if (res.repData) {
            // 缓存设置
            sSet('_WHUser', res.repData);
            // vuex 设置
            // this.$store.commit('SET_TOKEN',res.repData);
            // this.getMenu();
            this.$router.push('/Loading');
          }
        })
      },
      getMenu() {
        getMenu().then(res => {
          this.menu = res.repData;
          let len = this.menu.length;
          for (var i = 0; i < len; i++) {
            var list2 = this.menu[i].childList;
            if (list2.length > 0) {
              // 二级菜单
              for (var j = 0; j < list2.length; j++) {
                var list3 = list2[j].childList;
                if (list3.length > 0) {
                  //三级菜单
                  for (var k = 0; k < list3.length; k++) {
                    var list4 = list3[k].childList;
                    if (list4.length > 0) {
                      list3[k].target = list4[0].target;
                    }
                  }
                  list2[j].target = list3[0].target;
                }
                else {
                }
              }
              this.menu[i].target = list2[0].target;
            }
            else {
            }
          }
          sSet('_WHMenu', this.menu);
          let menuState = {"isLv2":0,"isLv3":0,"isLv4":0,"isMenu":0};
          sSet('_WHMenuState', menuState);
          let firstPage = this.menu[0].target;
          this.$router.push(firstPage);
        })
          .catch(error => {
            console.log(error);
          })
      }
    },
  }
</script>
<style>
  .login-bg .el-input__inner{
    border: none !important;
    padding-left: 35px !important;
    -webkit-box-shadow: 0 0 0px 1000px #fff inset;
    overflow: hidden;
  }
</style>
<style scoped>
  .login-bg {
    width: 100%;
    height: 100%;
    background: url(../common/image/index/icon_login_bg.png) no-repeat;
    background-attachment: fixed;
    background-size: cover;
  }

  .login-lf {
    width: 100%;
    height: 100%;
    background: url(../common/image/index/icon_login_box.png) no-repeat 0 0;
    background-size: 70% 100%;
  }

  .login-logo {
    width: 100%;
    /*margin: 20px auto 20px;*/
  }

  .login-logo img {
    width: 100%;
  }

  .login-rt {
    position: absolute;
    top: 0;
  }

  .login-input {
    width: 100%;
    height: 50px;
    line-height: 50px;
    /*margin: 0 auto;*/
    margin-bottom: 20px;
    border-bottom: 1px solid #c1c1c1;
    overflow: hidden;
    position: relative;
  }
  .el-icon-iconName {
    height: 50px;
    background: url(../common/image/index/icon_user.png) no-repeat center;
    background-size: 22px;
  }

  .el-icon-iconPassword {
    height: 50px;
    background: url(../common/image/index/icon_password.png) no-repeat center;
    background-size: 20px;
  }

  .el-icon-iconCode {
    height: 50px;
    background: url(../common/image/index/icon_code.png) no-repeat center;
    background-size: 20px;
  }

  .loginbutonDiv {
    text-align: center;
  }


  .buttonSize {
    width: 100%;
    height: 40px;
    border-radius: 4px;
  }

  /*实心*/
  .button-solid {
    background: #D9524F;
    color: white;
    border-color: #D9524F;
  }

  .button-solid.is-active,
  .button-solid:active {
    background: #D9524F;
    border-color: #D9524F;
    color: white;
  }

  .button-solid:focus,
  .button-solid:hover {
    background: #d85e5b;
    border-color: #d85e5b;
    color: white;
  }
</style>
