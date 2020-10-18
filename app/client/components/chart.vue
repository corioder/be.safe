<template>
  <div class="chart">
    <Highcharts :options="chartOptions"></Highcharts>
  </div>
</template>

<script>
import Highcharts from "highcharts";
import { genComponent } from "vue-highcharts";

export default {
  name: "chart",
  components: {
    Highcharts: genComponent("Highcharts", Highcharts)
  },
  props: {
    chartId: {
      type: String,
      required: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: "area"
        },
        title: {
          text: "Covid 19"
        },
        xAxis: {
          categories: this.chartData.dates
        },
        yAxis: {
          title: {
            text: "Liczba zakażeń"
          }
        },
        series: [
          {
            name: "liczba",
            data: this.chartData.data
          }
        ]
      }
    };
  }
};
</script>
<style lang="scss" scoped>
.chart {
  position: relative;
  // z-index: -1;
}
</style>
