<template>
	<div class="charts">
		<areaChart :chartData="$store.getters.getChartData(visibleChart.getDataName)" :name="visibleChart.name" />
		<button @click="collapse = !collapse">{{ collapse ? 'pokaż więcej wykresów' : 'ukryj wykresy' }}</button>

		<div v-show="!collapse">
			<areaChart v-for="chart in charts" :chartData="$store.getters.getChartData(chart.getDataName)" :name="chart.name" :key="`${chart.getDataName}_chart`" />
		</div>
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
				visibleChart: {
					name: 'Potwierdzone przypadki w Polsce',
					getDataName: 'confirmed',
				},
				charts: [
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
		button {
			margin: 12px;
			padding: 12px;
			border: none;
			background-color: $orange;
			color: $babyPowder;
			font-size: 16px;
		}
	}
</style>
