<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  //防止页面后退
  // history.pushState(null, null, document.URL);
  // window.addEventListener('popstate', function () {
  //   history.pushState(null, null, document.URL);
  // });
  import 'babel-polyfill' //IE显示空白页
  export default {
    name: 'App'
  }
</script>

<style>
</style>
