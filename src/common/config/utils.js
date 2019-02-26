import {MessageBox} from 'element-ui';

export const  w120 = 120;
export const  w150 = 150;
export const  w180 = 180;
export const  w200 = 200;
export const  w240 = 240;

export const  w100 = 240;
export const  wVin = 200;
export const  wTime = 180; //时间
export const  wPhone = 150; //电话
export const  wLocation = 150; // 当前库位
export const  wFunArea = 120; //功能区
export const  wNormal = 100; //通常
export const  wColor = 150; //颜色
export const  wAddress = 160;//地址
export const  wInfo =   100;//点位信息
export const  wCarType = 160;//车辆种类
export const  wDriveMode = 160;//驱动方式
export const  wWarahouse = 160;//始发仓库-当前仓库

export let url = 'http://10.108.2.88';
export let exportUrl = url + ':28060/api/';

export function sSet(k, v) {
  try {
    sessionStorage.setItem(k, JSON.stringify(v));
  } catch (e) {
  }
}
export function sGet(k, v) {
  try {
    var v = sessionStorage.getItem(k);
    return v == null ? null : JSON.parse(v);
  } catch (e) {
  }
}

export function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}


export function confirmPop(msg, callBack) {
  MessageBox.confirm(msg, '', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    dangerouslyUseHTMLString:true,
    center: true,
    showClose: true
  }).then(() => {
    callBack();
  }).catch(() => {
  });
}

export function formatTime(val) {
  var date = new Date(val);
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join('-')
}

export function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export function getSplitString(str) {
  if(str){
    let arr = str.split(",");
    let resources = [];
    for (var i = 0; i < arr.length; i++) {
      let arr1 = arr[i].split(/\s+/);
      for (var j = 0; j < arr1.length; j++) {
        if (jQuery.trim(arr1[j]) != "") {
          resources.push(jQuery.trim(arr1[j]));
        }
      }
    }
    return resources;
  }else{
    return []
  }

}

export function strDate(time) {
  if(time < 10){
    return "0" + time;
  }else{
    return time;
  }
}
//获取当前时间，格式YYYY-MM-DD
export function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = strDate(date.getMonth() + 1);
  var day = strDate(date.getDate()) + ' ';
  var hour = strDate(date.getHours()) + ':';
  var minute = strDate(date.getMinutes())+ ':';
  var second = strDate(date.getSeconds());
  var currentdate = year + seperator1 + month + seperator1 + day + hour + minute + second;
  return currentdate;
}
// 处理后台返回的时间戳
export function timestampToTime(timestamp) {
  var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  // console.log(date, '------', timestamp)
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  var D = strDate(date.getDate()) + ' ';
  var h = strDate(date.getHours()) + ':';
  var m = strDate(date.getMinutes()) + ':';
  var s = strDate(date.getSeconds());
  return date ? Y+M+D+h+m+s : timestamp;
}
// export function timestampToTime(timestamp) {
    // // 转为正常的时间格式 年-月-日 时:分:秒
    // var date = new Date(timestamp);
    // console.log(date, '0 ')
    // var T_pos = date.indexOf('T');
    // var Z_pos = date.indexOf('Z');
    // console.log(T_pos, Z_pos)
    // // var year_month_day = date.substr(0,T_pos);
    // // var hour_minute_second = date.substr(T_pos+1,Z_pos-T_pos-1);
    // // var new_datetime = year_month_day+" "+hour_minute_second; // 2017-03-31 08:02:06

    // // 处理成为时间戳
    // // timestamp = new Date(Date.parse(new_datetime));
    // // timestamp = timestamp.getTime();
    // // timestamp = timestamp/1000;

    // // 增加8个小时，北京时间比utc时间多八个时区
    // // var timestamp = timestamp+8*60*60;

    // // 时间戳转为时间
    // // var beijing_datetime = new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    // // return beijing_datetime;
// }

//导出
export function exportFile(name,res) {
  var blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }) // application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
  var a = document.createElement('a')
  var href = window.URL.createObjectURL(blob) // 创建下载的链接
  a.href = href
  a.download = name // 下载后文件名
  document.body.appendChild(a)
  a.click() // 点击下载
  document.body.removeChild(a)// 下载完成移除元素
  window.URL.revokeObjectURL(href) // 释放掉blob对象
}
