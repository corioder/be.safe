<template>
	<div class="preventive">
		<articlePreview v-for="article in $store.state.articles" :key="`article_${article.id}`" :article="article" />
	</div>
</template>

<script>
	import articlePreview from '../components/articlePreview.vue';
	export default {
		name: 'preventive',
		components: {
			articlePreview,
		},
	};
</script>

<style lang="scss" scoped>
	@import '../scss/mixins/_flex.scss';
	.preventive {
		@include flex(column);
		margin-bottom: 32px;
	}
	@media (min-width: 768px) {
		.preventive {
			margin-bottom: 64px;
		}
	}
</style>
