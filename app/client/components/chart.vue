<template>
  <div class="example">
    <apexcharts width="700" height="350" type="area" :options="chartOptions" :series="series"></apexcharts>
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
            colors: ['#000'],
          },
          dataLabels: {
            enabled: false,
          },
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
