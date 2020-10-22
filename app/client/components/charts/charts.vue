<template>
	<div class="charts">
		<chart
			v-for="homeChart in homeCharts"
			:chartData="$store.getters.getChartData(homeChart.getDataName)"
			:name="homeChart.name"
			:key="`${homeChart.getDataName}_chart`"
		/>

		<div v-show="!isHome">
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
	import chart from "./chart.vue";

	export default {
		name: "charts",
		components: {
			chart,
		},
		props: {
			isHome: {
				required: true,
				type: Boolean,
			},
		},
		data() {
			return {
				homeCharts: [
					{
						name: "Potwierdzone przypadki w Polsce",
						getDataName: "confirmed",
					},
					{
						name: "Aktywne przypadki w Polsce",
						getDataName: "active",
					},
					{
						name: "Testy w Polsce",
						getDataName: "tests",
					},
					{
						name: "Wyzdrowieli w Polsce",
						getDataName: "recovered",
					},
					{
						name: "Zgony w Polsce",
						getDataName: "deaths",
					},
				],
				informedCharts: [
					// homeCharts and this
					{
						name: "Zajęte respiratory w Polsce",
						getDataName: "respirators",
					},
					{
						name: "Hospitalizowani w Polsce",
						getDataName: "hospitalized",
					},
					{
						name: "Osoby na kwarantannie w Polsce",
						getDataName: "quarantine",
					},
					{
						name: "Osoby pod nadzorem epidemiologicznym w Polsce",
						getDataName: "supervision",
					},
					{
						name: "Negatywne testy w Polsce",
						getDataName: "negative_tests",
					},
					{
						name: "Przetestowane osoby w Polsce",
						getDataName: "people_tested",
					},
				],
			};
		},
	};
</script>

<style lang="scss" scoped>
	@import "../../scss/mixins/_flex.scss";
	@import "../../scss/vars/_colors.scss";
	.charts {
		@include flex(column);
		background-color: $babyPowder;
	}
</style>
