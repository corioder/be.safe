<template>
	<div class="aware">
		<worldMap />
		<select @change="$refs.intCharts.changeChart($event.target.value)">
			<option value="">Please select one</option>
			<option v-for="(county, code) in counties" :key="`${code}_chart`" :value="code">{{ county }}</option>
		</select>

		<internationalCharts ref="intCharts" />
	</div>
</template>

<script>
	import internationalCharts from '@/components/charts/internationalCharts.vue';
	import worldMap from '@/components/map/worldMap.vue';

	export default {
		name: 'aware',
		components: {
			internationalCharts,
			worldMap,
		},
		data() {
			return {
				counties: {
					AF: 'Afganistan',
					US: 'Stany Zjednoczone',
				},
			};
		},
	};
</script>

<style lang="scss" scoped></style>
