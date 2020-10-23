<template>
	<div class="home">
		<landing />
		<boxes />
		<!-- router connects charts to this route -->
		<articlePreview v-if="$store.state.articles.length > 0" :article="$store.state.articles[Math.floor($store.state.articles.length * Math.random())]" />
	</div>
</template>

<script>
	import landing from '../components/landing.vue';
	import boxes from '../components/boxes/boxes.vue';
	import articlePreview from '../components/articlePreview.vue';

	export default {
		name: 'home',
		components: {
			landing,
			boxes,
			articlePreview,
		},
	};
</script>

<style lang="scss" scoped>
	@import '../scss/mixins/_flex.scss';
	.home {
		margin-top: 32px;
		@include flex(column);
	}
</style>
