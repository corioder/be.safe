<template>
  <div class="charts">
    <chart
      v-for="chartName in chartNames"
      :chartData="$store.getters.getChartData(chartName.getDataName)"
      :name="chartName.name"
      :key="`${chartName.getDataName}_chart`"
    />
  </div>
</template>

<script>
  import chart from '../components/chart.vue';

  export default {
    name: 'charts',
    components: {
      chart,
    },
    data() {
      return {
        chartNames: [
          {
            name: 'Potwierdzone przypadki',
            getDataName: 'confirmed',
          },
          {
            name: 'Aktywne przypadki',
            getDataName: 'active',
          },
          {
            name: 'Zgony',
            getDataName: 'deaths',
          },
          {
            name: 'Zajęte respiratory',
            getDataName: 'respirators',
          },
          {
            name: 'Wyzdrowieli',
            getDataName: 'recovered',
          },
          {
            name: 'Hospitalizowani',
            getDataName: 'hospitalized',
          },
          {
            name: 'Osoby na kwarantannie',
            getDataName: 'quarantine',
          },
          {
            name: 'Osoby pod nadzorem epidemiologicznym',
            getDataName: 'supervision',
          },
          {
            name: 'Testy',
            getDataName: 'tests',
          },
          {
            name: 'Negatywne testy',
            getDataName: 'negative_tests',
          },
          {
            name: 'Przetestowane osoby',
            getDataName: 'people_tested',
          },
        ],
      };
    },
  };
</script>

<style lang="scss" scoped>
  @import '../scss/mixins/_flex.scss';
  @import '../scss/vars/_colors.scss';
  .charts {
    @include flex(column);
    background-color: $babyPowder;
  }
</style>
