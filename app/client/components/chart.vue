<template>
  <div class="example">
    <apexcharts width="300" height="350" type="area" :options="chartOptions" :series="series"></apexcharts>
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
      id: {
        type: String,
      },
    },
    data() {
      return {
        chartOptions: {
          chart: {
            id: 'aa',
          },
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: 'smooth',
          },
          fill: {
            colors: [
              '#F44336',
              /* '#E91E63', */
              /*   '#9C27B0', */
            ],
          },
        },
        series: [
          {
            name: 'series-1',
            data: [30, 40, 45, 50, 49, 60, 70, 91],
          },
        ],
      };
    },
  };
</script>
