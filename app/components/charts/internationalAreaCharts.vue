<template>
	<div>
		<div v-if="countySelectd != ''">
			<div v-if="loaded" :key="countySelectd">
				<areaChart v-for="chart in charts" :chartData="currentChartData[chart.getDataName]" :name="chart.name" :key="`${chart.getDataName}_int_chart`" />
			</div>
			<loading :err="err.message" v-else />
		</div>
	</div>
</template>

<script>
	import areaChart from './parts/areaChart.vue';
	import loading from '@/components/loading.vue';
	import { df } from '@/utils/fetchFromRDS';
	import proxyArrayProperties from '@/utils/proxyArrayProperties';

	export default {
		name: 'internationalAreaCharts',
		components: {
			loading,
			areaChart,
		},
		data() {
			return {
				err: {
					message: '',
					timeout: null,
				},
				loaded: false,
				chartData: {},
				currentChartData: {},
				countySelectd: '',
				counties: {
					AF: 'Afganistan',
					US: 'Stany Zjednoczone',
				},
				charts: [
					{
						name: 'Potwierdzone przypadki',
						getDataName: 'confirmed',
					},
					{
						name: 'Aktywne przypadki',
						getDataName: 'active',
					},
					{
						name: 'Ozdrowieńcy',
						getDataName: 'recovered',
					},
					{
						name: 'Zgony',
						getDataName: 'deaths',
					},
				],
			};
		},
		methods: {
			async changeChart(countySelectd) {
				if (this.err.timeout) clearTimeout(this.err.timeout);

				this.loaded = false;
				this.countySelectd = countySelectd;

				if (countySelectd == '') return;
				if (this.chartData[this.countySelectd]) {
					this.currentChartData = this.chartData[this.countySelectd];
					this.loaded = true;
					return;
				}

				try {
					const data = await this.$store.getters.getInternationalData(this.countySelectd);
					this.chartData[this.countySelectd] = {};
					for (let i = 0; i < this.charts.length; i++) {
						const name = this.charts[i].getDataName;
						this.chartData[this.countySelectd][name] = {
							data: proxyArrayProperties(data, `${df[name]}`, (n) => Number(n)),
							categories: proxyArrayProperties(data, `${df.date}`),
						};
					}
					this.currentChartData = this.chartData[this.countySelectd];
				} catch (err) {
					this.err.message = this.$store.state.unexpectedErr;
					this.err.timeout = setTimeout(() => {
						const localCountySelectd = countySelectd;
						this.chartData(localCountySelectd);
					}, this.$store.state.retryTimeout);
					return;
				}

				this.loaded = true;
			},
		},
	};
</script>

<style lang="scss" scoped></style>
