<template>
	<div>
		<div v-if="loaded">
			<barChart :chartData="chartData" name="Aktywne przypadki na 100 tysięcy mieszkańców" />
		</div>
		<loading v-else />
	</div>
</template>

<script>
	import barChart from './parts/barChart.vue';
	import loading from '@/components/loading.vue';
	import { df } from '@/utils/fetchFromRDS';
	import proxyArrayProperties from '@/utils/proxyArrayProperties';

	export default {
		name: 'internationalBarCharts',
		components: {
			loading,
			barChart,
		},
		data() {
			return {
				loaded: false,
				chartData: {},
			};
		},
		created() {
			this.chart();
		},
		methods: {
			async chart() {
				// TODO: err check
				const data = await this.$store.getters.getInternationalActivePerHoundredThousand();
				this.chartData = {
					data: proxyArrayProperties(data, `apht`),
					categories: proxyArrayProperties(data, `name`),
				};
				this.loaded = true;
			},
		},
	};
</script>

<style lang="scss" scoped></style>
