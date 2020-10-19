<template>
  <div class="charts">
    <div class="homeCharts" v-if="isHome">
      <chart
        v-for="homeChart in homeCharts"
        :chartData="$store.getters.getChartData(homeChart.getDataName)"
        :name="homeChart.name"
        :key="`${homeChart.getDataName}_chart`"
      />
    </div>
    <div class="awareCharts" v-else>
      <chart
        v-for="awareChart in awareCharts"
        :chartData="$store.getters.getChartData(awareChart.getDataName)"
        :name="awareChart.name"
        :key="`${awareChart.getDataName}_chart`"
      />
    </div>
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
        awareCharts: [
          {
            name: 'Potwierdzone przypadki',
            getDataName: 'confirmed',
          },
          {
            name: 'Aktywne przypadki',
            getDataName: 'active',
          },
          {
            name: 'Testy',
            getDataName: 'tests',
          },
          {
            name: 'Wyzdrowieli',
            getDataName: 'recovered',
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
            name: 'Negatywne testy',
            getDataName: 'negative_tests',
          },
          {
            name: 'Przetestowane osoby',
            getDataName: 'people_tested',
          },
        ],
        homeCharts: [
          {
            name: 'Potwierdzone przypadki',
            getDataName: 'confirmed',
          },
          {
            name: 'Aktywne przypadki',
            getDataName: 'active',
          },
          {
            name: 'Testy',
            getDataName: 'tests',
          },
          {
            name: 'Wyzdrowieli',
            getDataName: 'recovered',
          },
          {
            name: 'Zgony',
            getDataName: 'deaths',
          },
        ],
        isHome: true,
      };
    },
    created() {
      if (this.$route.name == 'aware') this.isHome = false;
      else this.isHome = true;
    },
  };
</script>

<style lang="scss" scoped>
  @import '../scss/mixins/_flex.scss';
  @import '../scss/vars/_colors.scss';
  .awareCharts {
    @include flex(column);
    background-color: $babyPowder;
  }
</style>
