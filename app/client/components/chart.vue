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
          // numberFormatter() {
          //   return 1
          // }
        },
        title: {
          text: "Covid 19"
        },
        xAxis: {
          categories: this.chartData.dates,
          labels: {
            formatter() {
              return this.value;
            }
          }
        },
        yAxis: {
          title: {
            text: "Liczba zakażeń"
          }
        },
        series: [
          {
            dataFormatter() {
              console.log(this);
            },
            name: "liczba",
            data: this.chartData.data
          }
        ]

        // chart: {
        // type: "bar",
        // id: this.chartId
        // },
        // xaxis: {
        //   categories: this.chartData.dates
        // },
        // stroke: {
        //   curve: "smooth"
        // },
        // fill: {
        //   colors: [this.chartData.color]
        // },
        // dataLabels: {
        //   enabled: false
        // },
        // colors: [this.chartData.color]
        // markers: {
        //   colors: [this.chartData.color],
        // },
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
