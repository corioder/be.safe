<template>
	<div class="fullArticle">
		<div class="photo" :style="`background-image:url(${$store.state.APIS.STRAPI + article.mainphoto.url});`"></div>
		<div class="container">
			<h1>{{ article.title }}</h1>
			<article v-html="article.article" class="article"></article>
		</div>
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
			console.log(this.article);
		},
	};
</script>

<style lang="scss" scoped>
	@import '../scss/mixins/_flex.scss';
	@import '../scss/vars/_colors.scss';
	.fullArticle {
		color: $richBlack;
		@include flex(column);
		.photo {
			width: calc(100vw - 24px);
			height: 50vw;
			background-position: center;
			background-size: cover;
			background-repeat: no-repeat;
			border-radius: 10px;
		}
		.container {
			margin: 0;
			// margin-top: -100px;
			// max-width: 70vw;
			background-color: $babyPowder;
			// padding: 10px 100px;
			padding: 12px;

			border-radius: 10px;
			p {
				width: 100%;
			}
		}
	}
</style>
<style lang="scss">
	@import '../scss/mixins/_flex.scss';
	@import '../scss/vars/_colors.scss';
	.article {
		@include flex(column);
		line-height: 250%;

		img {
			width: 100%;
			border-radius: 10px;
		}
		p {
			text-align: left;
			// @include flex(column);
		}
		a {
			text-decoration: none;
			color: $babyPowder;
			background-color: $shamrockGreen;
			display: inline-block;
			padding: 0 10px;
			margin: 0;
		}
		a:visited {
			color: $babyPowder;
		}
	}
</style>
