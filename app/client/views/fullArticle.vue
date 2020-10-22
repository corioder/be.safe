<template>
	<div class="fullArticle">
		<h1>{{ article.title }}</h1>
		<article v-html="article.article" class="article"></article>
	</div>
</template>

<script>
	export default {
		name: 'fullArticle',
		data() {
			return {
				article: {},
			};
		},
		mounted() {
			const routeID = this.$route.params.id;
			const articles = this.$store.state.articles;
			let foundArticle = false;
			for (let i in articles) {
				if (routeID == articles[i].id) {
					this.article = articles[i];
					foundArticle = true;
				}
			}
			if (!foundArticle) $router.push('/404');
		},
	};
</script>

<style lang="scss" scoped>
	.fullArticle {
		max-width: calc(100vw - 0.1px);
		p {
			width: 100%;
		}
	}
</style>
<style lang="scss">
	.article {
		img {
			width: 50vw;
		}
	}
</style>
