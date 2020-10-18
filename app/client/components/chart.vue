<template>
  <div class="chart">
    <Highcharts :options="chartOptions"></Highcharts>
  </div>
</template>

<script>
  import Highcharts from 'highcharts';
  import { genComponent } from 'vue-highcharts';

  export default {
    name: 'chart',
    components: {
      Highcharts: genComponent('Highcharts', Highcharts),
    },
    props: {
      chartData: {
        type: Object,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        chartOptions: {
          chart: {
            type: 'area',
            width: window.innerWidth - 150,
            backgroundColor: '#FDFFFC',
            alignTicks: false,
          },
          title: {
            text: this.name,
          },
          xAxis: {
            categories: this.chartData.dates,
          },
          yAxis: {
            title: {
              text: '',
            },
          },
          series: [
            {
              name: this.name,
              data: this.chartData.data,
            },
          ],
          colors: [this.$store.getters.getColorByName(this.name)],
        },
      };
    },
  };
</script>
<style lang="scss" scoped>
  @import '../scss/vars/_colors.scss';
  .chart {
    background-color: $babyPowder;
    margin-bottom: 64px;
  }
</style>
