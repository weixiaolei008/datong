<!-- 人员能级管理/详情 -->
<template>
  <div id="myChart" style="width: 100%;height:100%;"></div>
</template>
<script>
  import echarts from 'echarts'

  export default {
    name: 'eCharts',
    components: {},
    data() {
      return {};
    },
    props: ['data', 'indicator'],
    methods: {
      drawLine() {
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        myChart.setOption({
          // tooltip: {
          //   // trigger: 'axis'
          // },
          radar: {
            center: ['50%', '50%'],
            name: {
              textStyle: {
                color: '#333',
                // backgroundColor: '#999',
                // borderRadius: 3,
                // padding: [3, 5]
              }
            },
            axisLine: {                         // (圆内的几条直线)坐标轴轴线相关设置
              lineStyle: {
                color: '#F1F1F1',                   // 坐标轴线线的颜色。
                width: 1,                      	 // 坐标轴线线宽。
                type: 'solid',                   // 坐标轴线线的类型。
              }
            },
            splitLine: {                        // (这里是指所有圆环)坐标轴在 grid 区域中的分隔线。
              lineStyle: {
                color: '#FFFFFF',                       // 分隔线颜色
                width: 2, 							 // 分隔线线宽
              }
            },
            splitArea: {                        // 坐标轴在 grid 区域中的分隔区域，默认不显示。
              show: true,
              areaStyle: {                            // 分隔区域的样式设置。
                color: ['#F1F1F1', '#F9F9F9'],       // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
              }
            },
            indicator: this.indicator
          },
          series: [{
            type: 'radar',
            // tooltip: {
            //   trigger: 'item'
            // },
            itemStyle: {
              normal: {
                color: '#A0C6FB',
                // lineStyle: {
                //   color: 'rgba(232,0,0,.7)',
                // },
                // opacity: 0.05,
                areaStyle: {type: 'default'}
              },
            },
            data: [{
              value: this.data[0].value,
              name: '个人能力',
              label: {
                normal: {
                  show: true,
                  formatter:function(params) {
                    return params.value;
                  },
                  textStyle: {
                    fontSize: 16,
                  }
                }
              }
            }]
            // this.data
          }]
        });
      },
    },
    mounted() {
      let self = this
      setTimeout(function () {
        self.drawLine(); //加载表图
      }, 500)
    },
    created() {

    }
  };
</script>

<style scoped lang="less">

</style>
