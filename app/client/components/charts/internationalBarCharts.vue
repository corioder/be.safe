<template>
	<div>
		<!-- !!
		<barChart :chartData="chartData" :name="'recovered'"/>
		!! -->
	</div>
</template>

<script>
	import barChart from './parts/barChart.vue';
	import loading from '@/components/loading.vue';
	import { df } from '@/utils/fetchFromRDS';
	import proxyArrayProperties from '@/utils/proxyArrayProperties';

	export default {
		name: 'internationalCharts',
		components: {
			loading,
			barChart,
		},
		data() {
			return {};
		},
		computed: {
			chartData() {
				this.$store.getters.getInternationalData()

			}
		}
	};
</script>

<style lang="scss" scoped></style>
