<template>
  <div style="width: 100%;height: 100%;min-width: 1200px;">
    <el-container style="width: 100%;height:100%;">
      <el-header style="padding: 0">
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside style="width: auto; background: #E8EDFB;">
          <Menu></Menu>
        </el-aside>
        <el-container style="padding: 10px;background: #F8FAFF;">
          <Content></Content>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import Menu from '@/components/Menu.vue'
  import Header from '@/components/Header.vue'
  import Content from '@/components/Main.vue'


  export default {
    name: 'viewHome',

    components: {
      Menu,
      Header,
      Content
    },


  }
</script>

<style scoped>

</style>
