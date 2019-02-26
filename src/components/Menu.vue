<template>
  <div class="menu">
    <!-- 一级导航 -->
    <ul class="menu-lv1">
      <div style="height: 1.5em;"></div>
      <li class="menu-li" :class="{menuActive:isMenu==index}" v-for="(item,index) in menu" @click="menu1(index)">
        <router-link :to="item.target?item.target:'/404'" style="padding: 10px 0; display: block;">
          <i></i>
          <span :class="'menu-'+item.style"></span>
          <p>{{item.name}}</p>
        </router-link>
      </li>
    </ul>
    <!-- 二级导航 -->
    <ul class="menu-lv2">
      <li v-for="(items,index) in listLv2">
        <router-link :to="items.target?items.target:'/404'">
          <p v-if="items.childList.length > 0 && isLv2==index" class="activeOn" @click="menu2(index)">{{items.name}}</p>
          <p v-else :class="{active2:(isLv2==index && items.childList.length == 0)}" @click="menu2(index)">{{items.name}}</p>
        </router-link>
        <!-- 三级导航 -->
        <ul class="menu-lv3" v-show="isLv2 == index">
          <li :class="{active3:(isLv3==index && item.childList.length == 0)}" v-for="(item,index) in items.childList">
            <router-link :to="item.target?item.target:'/404'">
              <p v-if="item.childList.length == 0" class="p-lv3" :class="{activeOn:isLv3==index}" @click="menu3(index)">{{item.name}}</p>
              <p v-else-if="item.childList.length > 0 && isLv3==index" :class="{activeOn:isLv3==index}" class="p-lv4-on" @click="menu3(index)">{{item.name}}</p>
              <p v-else="item.childList.length > 0 && isLv3!=index" class="p-lv4-off" @click="menu3(index)">{{item.name}}</p>
            </router-link>
            <ul class="menu-lv4" v-show="isLv3 == index">
              <li :class="{active3:(isLv4==index && i.childList.length == 0)}" v-for="(i,index) in item.childList">
                <router-link :to="i.target?i.target:'/404'">
                  <p class="p-lv3" :class="{activeOn:isLv4==index}" @click="menu4(index)">{{i.name}}</p>
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
  import menuJson from "@/common/data/options.json"
  import {getMenu} from "@/common/config/api/basic"
  import {sSet, sGet} from '@/common/config/utils';

  export default {
    name: "Menu",
    components: {
      menuJson
    },
    data() {
      return {
        menu: [], //一级菜单列表
        listLv2: [],  // 二级菜单
        isMenu: '', // 一级菜单状态
        isLv2: '',  // 二级菜单状态
        isLv3: '',  // 三级菜单状态
        isLv4: '',  // 四级菜单状态
        menuState: {}  // 菜单缓存
      }
    },
    mounted() {
      this.menu = sGet('_WHMenu');
      let _menuState = sGet('_WHMenuState');
      if (_menuState) {
        this.menuState = _menuState;
        this.isMenu = _menuState.isMenu?_menuState.isMenu:0;
        this.isLv2 = _menuState.isLv2?_menuState.isLv2:0;
        this.isLv3 = _menuState.isLv3?_menuState.isLv3:0;
        this.isLv4 = _menuState.isLv4?_menuState.isLv4:0;
        this.listLv2 = this.menu[this.isMenu].childList;
      }
      else{
        this.listLv2 = this.menu[0].childList;
      }
    },
    methods: {
      menu1(index) {
        this.menuState.isMenu = index;
        this.menuState.isLv2 = 0;
        this.menuState.isLv3 = 0;
        this.menuState.isLv4 = 0;
        sSet('_WHMenuState',this.menuState);
        this.isMenu = index;
        this.listLv2 = this.menu[index].childList;
        this.isLv2 = this.menuState.isLv2;
        this.isLv3 = this.menuState.isLv3;
        this.isLv4 = this.menuState.isLv4;
        // let len = this.listLv2.length
        // for (var i = 0; i < len; i++) {
        //   if (this.listLv2[i].childList.length > 0) {
        //     this.listLv2[i].target = this.listLv2[i].childList[0].target;
        //   }
        // }
      },
      menu2(index) {
        this.menuState.isLv2 = index;
        this.menuState.isLv3 = 0;
        this.menuState.isLv4 = 0;
        sSet('_WHMenuState',this.menuState);
        this.isLv2 = index;
        this.isLv3 = this.menuState.isLv3;
        this.isLv4 = this.menuState.isLv4;
      },
      menu3(index) {
        this.menuState.isLv3 = index;
        this.menuState.isLv4 = 0;
        sSet('_WHMenuState',this.menuState);
        this.isLv3 = index;
        this.isLv4 = this.menuState.isLv4;
      },
      menu4(index) {
        this.menuState.isLv4 = index;
        sSet('_WHMenuState',this.menuState);
        this.isLv4 = index;
      }
    },
    created() {
    }
  }
</script>

<style scoped lang="less">
  .menu {
    width: 250px;
    height: 100%;
    background: #E8EDFB;
    position: relative;
    padding-left: 80px;
  }

  .menu-c {
    width: 36px;
    height: 36px;
    border-radius: 100%;
    display: block;
    margin: 0 auto;
  }

  .activeOn{
    color: #17345A;
  }

  .menu-lv1 {
    width: 80px;
    height: 100%;
    background: #0C4AAC;
    position: fixed;
    top: 60px;
    left: 0;
    font-size: @f12;
    .menu-li {
      /*padding: 10px 0;*/
      position: relative;
      width: 100%;
      min-height: 30px;
      cursor: pointer;
      .menu-base:extend(.menu-c) {
        background: url("../common/image/menu/icon_menu_base.png") no-repeat center #00CC99;
      }
      .menu-sys:extend(.menu-c) {
        background: url("../common/image/menu/icon_menu_sys.png") no-repeat center #FC8A7D;
      }
      .menu-plan:extend(.menu-c) {
        background: url("../common/image/menu/icon_menu_plan.png") no-repeat center #7D8CFC;
      }
      .menu-business:extend(.menu-c) {
        background: url("../common/image/menu/icon_menu_business.png") no-repeat center #FF60A5;
      }
      .menu-task:extend(.menu-c) {
        background: url("../common/image/menu/icon_menu_task.png") no-repeat center #63CFE0;
      }
      .menu-inventory:extend(.menu-c) {
        background: url("../common/image/menu/icon_menu_inventory.png") no-repeat center #67A2FF;
      }
      .menu-windows:extend(.menu-c) {
        background: url("../common/image/menu/icon_menu_windows.png") no-repeat center #B68BFF;
      }
      .menu-event:extend(.menu-c) {
        background: url("../common/image/menu/icon_menu_event.png") no-repeat center #FF60A5;
      }
      p {
        width: 100%;
        padding-top: .1em;
        line-height: 1.2em;
        color: #fff;
        text-align: center;
        display: none;
      }
    }
    .menuActive {
      height: 100px;
      padding: 0;
      background: url("../common/image/menu/icon_menu_select.png") right center no-repeat;
      background-size: 70px 100px;
      i {
        display: block;
        height: 15px;
      }
      p {
        color: #333;
        display: block;
      }
    }
  }

  .menu-lv2 {
    padding: 10px 0 10px 10px;
    li {
      /*width: 100%;*/
      min-height: 44px;
      line-height: 44px;
      color: @gray;
      font-size: @f16;
      cursor: pointer;
      p {
        height: 44px;
        padding-left: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 500;
      }
    }
    .active2 {
      background: #F8FAFF;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      color: #17345A;
    }
    .menu-lv3 {
      padding-left: 10px;
      /*display: none;*/
      li {
        min-height: 40px;
        line-height: 40px;
        /*color: #17345A;*/
        p {
          height: 40px;
          line-height: inherit;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: @f14;
          padding-left: 15px;
        }
        .p-lv3 {
          background: url("../common/image/menu/icon_menu_lv3.png") 5px center no-repeat;
          background-size: 5px;
        }
        .p-lv4-off {
          background: url("../common/image/menu/icon_menu_lv4_off.png") 3px center no-repeat;
          background-size: 5px 10px;
        }
        .p-lv4-on {
          background: url("../common/image/menu/icon_menu_lv4_on.png") 0 center no-repeat;
          background-size: 11px 6px;
        }
      }
      .active3 {
        background: #F8FAFF;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        color: #17345A;
      }
      .menu-lv4 {
        padding-left: 10px;
      }
    }
  }
</style>
