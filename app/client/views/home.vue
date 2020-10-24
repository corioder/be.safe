<template>
	<div class="home">
		<landing />
		<boxes />
		<coronaDescription />
		<articlePreview v-if="$store.state.articles.length > 0" :article="$store.state.articles[Math.floor($store.state.articles.length * Math.random())]" />
		<phoneNumbers />
		<a href="https://tilda.cc">Ikonki</a>
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
	a {
		text-decoration: none;
		color: $babyPowder;
		background-color: $littleBoyBlue;
		display: inline-block;
		padding: 0 5px;
		margin: 0;
		line-height: 150%;
	}
</style>
