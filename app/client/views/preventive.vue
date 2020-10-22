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
	}
</style>
