<template>
	<div class="aware">
		<select @change="changeChart($event.target.value)">
			<option value="">Wybierz państwo</option>
			<option v-for="(country, code) in countries" :key="`${code}_chart`" :value="code" :selected="code == 'US' ? 'selected' : ''">{{ country }}</option>
		</select>
		<internationalCharts ref="intCharts" />
	</div>
</template>

<script>
	import internationalCharts from '@/components/charts/internationalCharts.vue';
	import countries from '@/assets/data/countries.json';
	export default {
		name: 'aware',
		components: {
			internationalCharts,
		},
		methods: {
			changeChart(value) {
				this.$refs.intCharts.changeChart(value);
			},
		},
		mounted() {
			this.changeChart('US');
		},
		data() {
			return {
				countries: countries,
			};
		},
	};
</script>

<style lang="scss" scoped>
	@import '@/scss/mixins/_flex.scss';
	@import '@/scss/vars/_colors.scss';
	select {
		display: block;
		font-size: 16px;
		font-weight: 600;
		color: $richBlack;
		line-height: 1.3;
		padding: 6px;
		width: calc(100vw - 24px);
		max-width: 300px;
		margin: 0;
		border: none;
		box-shadow: 0 1px 0 2px rgba(0, 0, 0, 0.04);
		border-radius: 10px;
		appearance: none;
		background-color: $babyPowder;
		background-image: url('../assets/icons/dropdown.svg');
		background-repeat: no-repeat;
		background-position: right 1em top 50%;
		background-size: auto;
		transform: scale(1);
		transition: transform 0.1s ease-in-out;
		option {
			font-weight: 400;
		}
	}
	select:hover {
		transform: scale(1.01);
	}
	select:focus {
		outline: none;
		transform: scale(1.05);
		box-shadow: 0 2px 0 4px rgba(0, 0, 0, 0.04);
	}
</style>
