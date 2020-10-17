<template>
  <div class="chart">
    <apexcharts width="280" height="350" type="area" :options="chartOptions" :series="series"></apexcharts>
  </div>
</template>

<script>
  import VueApexCharts from 'vue-apexcharts';

  export default {
    name: 'chart',
    components: {
      apexcharts: VueApexCharts,
    },
    props: {
      chartId: {
        type: String,
        required: true,
      },
      chartData: {
        type: Object,
        required: true,
      },
    },
    mounted() {
      console.log(this.chartData);
    },
    data() {
      return {
        chartOptions: {
          chart: {
            id: this.chartId,
          },
          xaxis: {
            categories: this.chartData.dates,
          },
          stroke: {
            curve: 'smooth',
          },
          fill: {
            colors: [this.chartData.color],
          },
          dataLabels: {
            enabled: false,
          },
          colors: [this.chartData.color],
          // markers: {
          //   colors: [this.chartData.color],
          // },
        },
        series: [
          {
            name: 'liczba',
            data: this.chartData.data,
          },
        ],
      };
    },
  };
</script>
<style lang="scss" scoped>
  .chart {
    position: relative;
    // z-index: -1;
  }
</style>
