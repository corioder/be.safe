<template>
	<div>
		<div v-if="loaded">
			<barChart :chartData="chartData" name="Aktywne przypadki na 100 tysięcy mieszkańców" />
		</div>
		<loading :err="err.message" h="50" v-else />
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
				err: {
					message: '',
					timeout: null,
				},
			};
		},
		created() {
			this.chart();
		},
		methods: {
			async chart() {
				if (this.err.timeout) clearTimeout(this.err.timeout);

				try {
					const data = await this.$store.getters.getInternationalAPHT();
					this.chartData = {
						data: proxyArrayProperties(data, `apht`),
						categories: proxyArrayProperties(data, `name`),
					};
				} catch (err) {
					this.err.message = this.$store.state.unexpectedErr;
					this.err.timeout = setTimeout(() => {
						this.chart();
					}, this.$store.state.retryTimeout);
					return;
				}

				this.loaded = true;
			},
		},
	};
</script>

<style lang="scss" scoped></style>
