<template>
	<div class="charts">
		<areaChart v-for="chart in charts" :chartData="$store.getters.getChartData(chart.getDataName)" :name="chart.name" :key="`${chart.getDataName}_chart`" />
	</div>
</template>

<script>
	import areaChart from './parts/areaChart.vue';

	export default {
		name: 'polandCharts',
		components: {
			areaChart,
		},
		data() {
			return {
				collapse: true,
				charts: [
					{
						name: 'Potwierdzone przypadki w Polsce',
						getDataName: 'confirmed',
					},
					{
						name: 'Aktywne przypadki w Polsce',
						getDataName: 'active',
					},
					{
						name: 'Testy w Polsce',
						getDataName: 'tests',
					},
					{
						name: 'Ozdrowieńcy w Polsce',
						getDataName: 'recovered',
					},
					{
						name: 'Zgony w Polsce',
						getDataName: 'deaths',
					},

					{
						name: 'Zajęte respiratory w Polsce',
						getDataName: 'respirators',
					},
					{
						name: 'Hospitalizowani w Polsce',
						getDataName: 'hospitalized',
					},
					{
						name: 'Osoby na kwarantannie w Polsce',
						getDataName: 'quarantine',
					},
					{
						name: 'Osoby pod nadzorem epidemiologicznym w Polsce',
						getDataName: 'supervision',
					},
					{
						name: 'Negatywne testy w Polsce',
						getDataName: 'negative_tests',
					},
					{
						name: 'Przetestowane osoby w Polsce',
						getDataName: 'people_tested',
					},
				],
			};
		},
	};
</script>

<style lang="scss" scoped>
	@import '@/scss/mixins/_flex.scss';
	@import '@/scss/vars/_colors.scss';

	.charts {
		@include flex(column);
		background-color: $babyPowder;
	}
</style>
