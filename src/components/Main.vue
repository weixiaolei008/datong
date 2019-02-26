<template>
  <div class="home-style">
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    name: "Main"
  }
</script>

<style scoped lang='less'>
  .home-style {
    width: 100%;
    height: 100%;
    background: #fff;
    box-shadow: 5px 5px 10px #c1c1c1;
  }

</style>
