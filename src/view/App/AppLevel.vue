<template>
  <div style="width: 100%; height: 100%;">
    <Echarts :data='echartsData' :indicator='indicator'></Echarts>
  </div>
</template>

<script>
  import Echarts from '@/components/Echarts'
  import {getQueryString} from '@/common/config/utils';
  var experience = getQueryString('experience');
  var degree = getQueryString('degree');
  var safety = getQueryString('safety');

  export default {
      name: 'eCharts',
      components: {
        Echarts
      },
      data(){
        return{
          echartsData: [{
            value: [experience,degree,safety],
            name: '详细信息'
          }],
          indicator: [
            {
              name: '经验值',
              max: 10
            },
            {
              name: '专业程度',
              max: 10
            },
            {
              name: '安全值',
              max: 10
            }
          ],
        }
      }
    }
</script>

<style scoped>

</style>
