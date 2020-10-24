<template>
	<div>
		<div v-if="$store.state.articlesErr != null">AN ERROR OCCURRED</div>
		<div v-else class="preventive">
			<disinfectionDistanceMasks />
			<div class="container">
				<h6>Artykuły</h6>
				<articlePreview v-for="article in $store.state.articles" :key="`article_${article.id}`" :article="article" />
			</div>
		</div>
	</div>
</template>

<script>
	import disinfectionDistanceMasks from '@/components/disinfectionDistanceMasks/disinfectionDistanceMasks.vue';
	import articlePreview from '@/components/articlePreview.vue';
	export default {
		name: 'preventive',
		components: {
			disinfectionDistanceMasks,
			articlePreview,
		},
	};
</script>

<style lang="scss" scoped>
	@import '@/scss/mixins/_flex.scss';
	@import '@/scss/vars/_colors.scss';
	h6 {
		display: inline;
		font-size: 18px;
		font-weight: 600;
		margin-bottom: -16px;
		font-weight: 600;
		background-color: $shamrockGreen;
		color: $babyPowder;
		padding: 3px 10px;
	}
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
