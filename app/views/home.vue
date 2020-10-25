<template>
	<div class="home">
		<landing />
		<boxes />
		<coronaDescription />
		<articlePreview v-if="$store.state.articles.length > 0" :article="$store.state.articles[Math.floor($store.state.articles.length * Math.random())]" />
		<phoneNumbers />
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
	.home {
		margin-top: 32px;
		@include flex(column);
	}
</style>
