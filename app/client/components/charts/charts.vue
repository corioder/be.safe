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
		created() {
			console.log(`created`);
		},
		data() {
			return {
				homeCharts: [
					{
						name: "Potwierdzone przypadki",
						getDataName: "confirmed",
					},
					{
						name: "Aktywne przypadki",
						getDataName: "active",
					},
					{
						name: "Testy",
						getDataName: "tests",
					},
					{
						name: "Wyzdrowieli",
						getDataName: "recovered",
					},
					{
						name: "Zgony",
						getDataName: "deaths",
					},
				],
				informedCharts: [
					// homeCharts and this
					{
						name: "Zajęte respiratory",
						getDataName: "respirators",
					},
					{
						name: "Hospitalizowani",
						getDataName: "hospitalized",
					},
					{
						name: "Osoby na kwarantannie",
						getDataName: "quarantine",
					},
					{
						name: "Osoby pod nadzorem epidemiologicznym",
						getDataName: "supervision",
					},
					{
						name: "Negatywne testy",
						getDataName: "negative_tests",
					},
					{
						name: "Przetestowane osoby",
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
