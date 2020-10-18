<template>
  <div class="charts"><chart chartId="test" :chartData="$store.getters.getChartData('confirmed')" /></div>
</template>

<script>
import chart from "../components/chart.vue";

export default {
  name: "charts",
  components: {
    chart
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/mixins/_flex.scss";
.charts {
  @include flex(column);
  width: 100vw;
}
</style>
