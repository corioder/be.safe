<template>
	<div class="home">
		<landing />
		<boxes />
		<coronaDescription />
		<articlePreview v-if="$store.state.articles.length > 0" :article="$store.state.articles[Math.floor($store.state.articles.length * Math.random())]" />
		<phoneNumbers />
		<footer>
			<a href="https://tilda.cc">Ikonki</a>
			<p>aktywne przypadki - różnica między zakażonymi a wyzdrowiałymi i zmarłymi, liczona jako ogólna pula</p>
		</footer>
	</div>
</template>

<script>
	import landing from '@/components/landing.vue';
	import boxes from '@/components/boxes/boxes.vue';
	import coronaDescription from '@/components/coronaDescription.vue';
	import articlePreview from '@/components/articlePreview.vue';
	import phoneNumbers from '@/components/phoneNumbers.vue';

	export default {
		name: 'home',
		components: {
			landing,
			boxes,
			coronaDescription,
			articlePreview,
			phoneNumbers,
		},
	};
</script>

<style lang="scss" scoped>
	@import '@/scss/mixins/_flex.scss';
	@import '@/scss/vars/_colors.scss';
	.home {
		margin-top: 32px;
		@include flex(column);
	}
	footer {
		@include flex;
		a {
			font-size: 10px;

			text-decoration: none;
			color: $babyPowder;
			background-color: $littleBoyBlue;
			display: inline-block;
			padding: 0 5px;
			margin: 0;
			line-height: 150%;
			margin-right: 4px;
		}
		p {
			font-size: 10px;
		}
	}
</style>
