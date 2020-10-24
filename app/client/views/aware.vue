<template>
	<div class="aware">
		<autocomplete :search="search" @submit="changeChart($event)" placeholder="Szukaj państwa" />
		<h5>
			{{ selectedCountry }}
		</h5>
		<internationalAreaCharts ref="intCharts" />
		<internationalBarCharts />
	</div>
</template>

<script>
	import internationalAreaCharts from '@/components/charts/internationalAreaCharts.vue';
	import internationalBarCharts from '@/components/charts/internationalBarCharts.vue';
	import countries from '@/assets/data/countries.json';
	import autocomplete from '@/components/autocomplete/autocomplete.vue';

	export default {
		name: 'aware',
		components: {
			autocomplete,
			internationalAreaCharts,
			internationalBarCharts,
		},
		data() {
			return {
				countries,
				countriesArray: [],
				selectedCountry: '',
			};
		},
		methods: {
			changeChart(value) {
				if (value.toLowerCase() == 'polska') this.$router.push('/informed');
				this.selectedCountry = value;
				this.$refs.intCharts.changeChart(Object.keys(this.countries).find((key) => this.countries[key] == value));
			},
			search(input) {
				if (input.length < 1) {
					return [];
				}
				return this.countriesArray.filter((country) => {
					return country.toLowerCase().startsWith(input.toLowerCase());
				});
			},
		},

		mounted() {
			this.changeChart('Stany Zjednoczone');
			for (let i in this.countries) {
				this.countriesArray.push(this.countries[i]);
			}
		},
	};
</script>

<style lang="scss" scoped>
	@import '@/scss/mixins/_flex.scss';
	@import '@/scss/vars/_colors.scss';
	.aware {
		@include flex(column);
		h5 {
			font-size: 16px;
			font-weight: 600;
		}
	}
</style>
<style lang="scss">
	@import '@/scss/vars/_colors.scss';

	.autocomplete {
		margin: 64px 0;
		width: calc(100vw - 24px);
		max-width: 500px;
		input {
			padding: 10px;
			width: 100%;
			background-color: $babyPowder;
			border: none;
			border-radius: 10px;
			box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
			transform: scale(1);
			transition: transform 0.2s ease-in-out;
		}
		input:focus {
			outline: none;
			transform: scale(1.01);
		}
		ul {
			width: calc(100vw - 24px);
			max-width: 500px;
			background-color: $babyPowder;
			font-weight: 400;
			color: $richBlack;
			border-radius: 10px;
			box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);

			li {
				width: calc(100vw - 24px);
				max-width: 500px;
				margin-bottom: 12px;
				width: 100%;
				list-style: none;
				padding: 2px;
				transform: scale(1);
				transition: transform 0.2s ease-in-out;
			}
			li:hover {
				cursor: pointer;
				transform: scale(1.01);
			}
		}
	}
</style>
