<template>
	<div class="chart">
		<Highcharts :options="chartOptions" />
	</div>
</template>

<script>
	import Highcharts from './highcharts.vue';

	export default {
		name: 'areaChart',
		components: {
			Highcharts,
		},
		props: {
			chartData: {
				type: Object,
				required: true,
			},
			name: {
				type: String,
				required: true,
			},
		},
		data() {
			return {
				chartOptions: {
					chart: {
						type: 'area',
						width: window.innerWidth - 50,
						backgroundColor: '#FDFFFC',
						alignTicks: false,
					},
					credits: {
						enabled: false,
					},
					title: {
						text: this.name,
					},
					xAxis: {
						categories: this.chartData.categories,
					},
					yAxis: {
						title: {
							text: '',
						},
					},
					series: [
						{
							name: this.name,
							data: this.chartData.data,
						},
					],
					colors: [this.$store.getters.getColorByName(this.name)],
					plotOptions: {
						area: {
							marker: {
								enabled: false,
							},
						},
					},
				},
			};
		},
	};
</script>
<style lang="scss" scoped>
	@import '@/scss/vars/_colors.scss';
	.chart {
		background-color: $babyPowder;
		margin-bottom: 32px;
	}
	@media (min-width: 768px) {
		.chart {
			margin-bottom: 64px;
		}
	}
</style>
