<template>
	<div class="coronaDescription">
		<h3>Co to jest SARS-CoV-2?</h3>
		<p>
			SARS-CoV-2 to wirus, powodujący chorobę COVID-19, której objawami są: gorączką, suchy kaszel, zmęczenie, ból mięśni, ból gardła, biegunka, zapalenie
			spojówek, ból głowy, utrata smaku lub węchu oraz wysypka skórna lub przebarwienia palców u rąk i stóp. Przenosi się drogą kropelkową, czyli podczas
			kaszlu, kichania czy mówienia.
		</p>
		<p>
			Pierwsze ognisko wirusa SARS-CoV-2 wykryto w Wuhan w Chinach. Jego nosicielami były najprawdopodobniej zwierzęta. Na jednym z tamtejszych targowisk mogło
			dojść do zakupu/spożycia zwierzęcia zarażonego doprowadzając do pojawienia się choroby COVID-19 wśród gatunku ludzkiego.
		</p>
		<p>11 marca 2020 epidemia wirusa SARS-CoV-2 została uznana przez Światową Organizację Zdrowia.</p>
	</div>
</template>

<script>
	export default {
		name: 'coronaDescription',
	};
</script>

<style lang="scss" scoped>
	@import '@/scss/mixins/_flex.scss';
	@import '@/scss/vars/_colors.scss';
	.coronaDescription {
		margin: 0;
		margin-top: 32px;
		width: calc(100vw - 24px);
		max-width: 500px;
		padding: 12px;
		@include flex(column, flex-start);
		line-height: 200%;

		border-radius: 10px;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
		h3 {
			font-weight: 600;
			background-color: $orange;
			color: $babyPowder;
			padding: 3px 10px;
		}
	}
	@media (min-width: 768px) {
		.coronaDescription {
			margin-top: 64px;
			max-width: 600px;
		}
	}
	@media (min-width: 1024px) {
		.coronaDescription {
			max-width: 800px;
		}
	}
</style>
