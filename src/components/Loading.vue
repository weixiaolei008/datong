<template>
  <div class="loading-msg">{{msg}}</div>
</template>

<script>
  import {sSet, sGet, getQueryString} from '@/common/config/utils';
  import {getUserInfoSso, LoginSso} from "@/common/config/api/basic";
  import {getMenu} from "@/common/config/api/basic"

  export default {
    name: "Loading",
    data() {
      return {
        msg: '',
        menu: [],
        uuid: '',
        userName: '',
      }
    },
    methods: {
      getMenuList() {
        console.log(1);
        let self = this;
        getMenu().then(res => {
          if (!res.repData.length) {
            self.msg = '暂无权限,请联系管理员！';
            sessionStorage.clear();
            return
          }
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
          let menuState = {"isLv2": 0, "isLv3": 0, "isLv4": 0, "isMenu": 0};
          sSet('_WHMenuState', menuState);
          let firstPage = this.menu[0].target;
          this.$router.push(firstPage);
        })
          .catch(error => {
            console.log(error);
          })
      },
      loadSso() {
        let self = this;
        let p = {
          "type": 1,
          "userName": this.userName,
          "uuid":  this.uuid,
        }
        LoginSso(p).then(res => {
          if(res.repCode == '0000'){
            sSet('_WHUser', res.repData);
            // vuex 设置
            // this.$store.commit('SET_TOKEN', res.repData);
            this.getMenuList();
          }
          else {
            self.msg = res.repMsg;
            return;
          }
        })
          .catch(error => {
            console.log(error);
          })
      },

      goPage() {
        if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
          return 'mobile';
        }
        else {
          return 'pc';
        }
      },
    },
    created() {
      var code = getQueryString('code');
      let self = this
      console.log('code' + code);
      if (code) {
        var userAgent = this.goPage();
        if (userAgent == 'pc') {
          getUserInfoSso({parameter: code}).then(res => {
            self.uuid = res.repData.uuid;
            self.userName = res.repData.userName;
            self.loadSso();
          })
        }
        else {
          // this.$router.push('AppTest?code=' + code);
        }
      }
      else {
        this.getMenuList();
      }
    }
  }
</script>

<style scoped>
  .loading-msg {
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -60px;
    text-align: center;
    font-size: 40px;
    line-height: 80px;
  }
</style>
