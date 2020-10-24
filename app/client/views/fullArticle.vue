<template>
	<div class="fullArticle" v-if="article.mainphoto != undefined">
		<div class="photo" :style="`background-image:url(${$store.state.APIS.STRAPI + article.mainphoto.url});`"></div>
		<div class="container">
			<h3>{{ article.title }}</h3>
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
		methods: {
			updateArticle(routeID) {
				if (routeID == undefined) return;
				const articles = this.$store.state.articles;

				for (let i = 0; i < articles.length; i++) {
					if (routeID == articles[i].id) {
						this.article = articles[i];
						return;
					}
				}
				this.$router.push('/404');
			},
		},
		watch: {
			$route(to, from) {
				this.updateArticle(to.params.id);
			},
		},

		mounted() {
			this.updateArticle(this.$route.params.id);
		},
	};
</script>

<style lang="scss" scoped>
	@import '@/scss/mixins/_flex.scss';
	@import '@/scss/vars/_colors.scss';
	h3 {
		// font-weight: 800;
		max-width: 100vw;
	}
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
	@media (min-width: 768px) {
		.fullArticle {
			.container {
				margin-top: -70px;
				max-width: 80vw;
				padding: 15px 50px;
				p {
					width: 100%;
				}
			}
		}
	}
	@media (min-width: 1024px) {
		.fullArticle {
			.container {
				margin-top: -80px;
				max-width: 70vw;
				padding: 20px 70px;
			}
		}
	}
	@media (min-width: 1440px) {
		.fullArticle {
			.photo {
				width: calc(80vw - 24px);
				height: 30vw;
				background-position: center;
				background-size: cover;
				background-repeat: no-repeat;
				border-radius: 10px;
			}
			.container {
				margin-top: -110px;
				max-width: 65vw;
				padding: 20px 100px;
			}
		}
	}
</style>
<style lang="scss">
	@import '@/scss/mixins/_flex.scss';
	@import '@/scss/vars/_colors.scss';
	.article {
		@include flex(column, flex-start);
		line-height: 200%;

		img {
			width: 100%;
			border-radius: 10px;
			max-width: 600px;
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
			padding: 0 5px;
			margin: 0;
			line-height: 150%;
		}
		a:visited {
			color: $babyPowder;
		}
	}
</style>
