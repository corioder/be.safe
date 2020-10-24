<template>
	<div class="aware">
		<select @change="changeChart()" v-model="countySelectd">
			<option disabled value="">Please select one</option>
			<option v-for="(county, code) in counties" :key="`${code}_chart`" :value="code">{{ county }}</option>
		</select>

		<div v-if="countySelectd != ''">
			<div v-if="loaded" :key="countySelectd">
				<chart v-for="chart in charts" :chartData="currentChartData[chart.getDataName]" :name="chart.name" :key="`${chart.getDataName}_int_chart`" />
			</div>
			<loading v-else />
		</div>
	</div>
</template>

<script>
	import chart from '@/components/charts/chart.vue';
	import loading from '@/components/loading.vue';
	import { df } from '@/utils/fetchFromRDS';
	import proxyArrayProperties from '@/utils/proxyArrayProperties';

	export default {
		name: 'aware',
		components: {
			loading,
			chart,
		},
		data() {
			return {
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
						name: 'Wyzdrowieli',
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
			async changeChart() {
				this.loaded = false;
				if (this.chartData[this.countySelectd]) {
					this.currentChartData = this.chartData[this.countySelectd];
					this.loaded = true;
					return;
				}

				const data = await this.$store.getters.getInternationalData(this.countySelectd);
				this.chartData[this.countySelectd] = {};
				for (let i = 0; i < this.charts.length; i++) {
					const name = this.charts[i].getDataName;
					this.chartData[this.countySelectd][name] = {
						data: proxyArrayProperties(data, `${df[name]}`, (n) => Number(n)),
						dates: proxyArrayProperties(data, `${df.date}`),
					};
				}
				this.currentChartData = this.chartData[this.countySelectd];

				this.loaded = true;
			},
		},
	};
</script>

<style lang="scss" scoped></style>
