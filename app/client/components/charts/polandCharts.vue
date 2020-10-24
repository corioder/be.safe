<template>
	<div class="charts">
		<lineChart v-for="chart in charts" :chartData="$store.getters.getChartData(chart.getDataName)" :name="chart.name" :key="`${chart.getDataName}_chart`" />
	</div>
</template>

<script>
	import lineChart from './lineChart.vue';
	import chartButton from './chartButton.vue';

	export default {
		name: 'polandCharts',
		components: {
			lineChart,
			chartButton,
		},
		data() {
			return {
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
						name: 'Wyzdrowieli w Polsce',
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
