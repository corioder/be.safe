<template>
	<div class="chart">
		<Highcharts :options="chartOptions" />
	</div>
</template>

<script>
	import Highcharts from './highcharts.vue';

	export default {
		name: 'barChart',
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
						type: 'bar',
						width: window.innerWidth - 48,
						height: 5000,
						backgroundColor: '#FDFFFC',
						alignTicks: false,
						zoomType: 'x',
					},
					tooltip: {
						outside: true,
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
						// top: '-100.5%',
					},
					series: [
						{
							name: this.name,
							data: this.chartData.data,
						},
					],
					colors: [this.$store.getters.getColorByName(this.name)],
					plotOptions: {
						bar: {
							dataLabels: {
								enabled: true,
								color: '#011627',
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
