<template>
	<div class="charts">
		<div class="homeCharts" v-if="isHome">
			<chart
				v-for="homeChart in homeCharts"
				:chartData="$store.getters.getChartData(homeChart.getDataName)"
				:name="homeChart.name"
				:key="`${homeChart.getDataName}_chart`"
			/>
			<chartButton @click.native="$router.push('/informed')" />
		</div>
		<div class="informedCharts" v-else>
			<chart
				v-for="informedChart in informedCharts"
				:chartData="$store.getters.getChartData(informedChart.getDataName)"
				:name="informedChart.name"
				:key="`${informedChart.getDataName}_chart`"
			/>
		</div>
	</div>
</template>

<script>
	import chart from './chart.vue';
	import chartButton from './chartButton.vue';

	export default {
		name: 'charts',
		components: {
			chart,
			chartButton,
		},
		data() {
			return {
				informedCharts: [
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
					{
						name: 'Liczba aktywnych na 100 000 osób w Polsce',
						getDataName: 'activePerHoundredThousand',
					},
				],
				homeCharts: [
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
				],
				isHome: true,
			};
		},
		created() {
			if (this.$route.name == 'informed') this.isHome = false;
			else this.isHome = true;
		},
	};
</script>

<style lang="scss" scoped>
	@import '../../scss/mixins/_flex.scss';
	@import '../../scss/vars/_colors.scss';
	.informedCharts,
	.homeCharts {
		@include flex(column);
		background-color: $babyPowder;
	}
</style>
