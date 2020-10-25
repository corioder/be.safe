<template>
	<div class="articlePreview" @click="$router.push(`/preventive/${article.id}`)">
		<div class="photo" :style="{ backgroundImage: `url(${mainphotoUrl})` }" alt="" />
		<div class="text">
			<p>{{ article.date }}</p>
			<h4>{{ article.title }}</h4>
		</div>
	</div>
</template>

<script>
	import smallPhoto from "@/utils/smallPhoto"

	export default {
		name: 'articlePreview',
		props: {
			article: {
				type: Object,
				required: true,
			},
		},
		computed: {
			mainphotoUrl() {
				return `${this.$store.state.APIS.STRAPI}${smallPhoto(this.article.mainphoto.url)}`;
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import '@/scss/mixins/_flex.scss';
	@import '@/scss/vars/_colors.scss';
	.articlePreview {
		padding: 0;
		margin-top: 32px;
		@include flex;
		color: $richBlack;
		border-radius: 10px;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
		width: calc(100vw - 24px);
		max-width: 500px;
		.photo {
			width: 100px;
			height: 100px;
			border-radius: 10px;

			background-repeat: no-repeat;
			background-position: center;
			background-size: cover;
		}
		.text {
			margin-left: 12px;
			@include flex(column, flex-start);
			width: calc(100% - 100px - 12px);
			p {
				font-size: 10px;
				font-weight: 300;
				margin: 0;
				margin-bottom: 3px;
			}
			h4 {
				margin: 0;
				font-size: 14px;
				font-weight: 400;
			}
		}
	}
	.articlePreview:hover {
		cursor: pointer;
	}
	@media (min-width: 768px) {
		.articlePreview {
			max-width: 600px;
			margin-top: 64px;
			.photo {
				width: 150px;
				height: 150px;
			}
			.text {
				width: calc(100% - 150px - 12px);
				p {
					font-size: 14px;
				}
				h4 {
					font-size: 20px;
				}
			}
		}
	}
	@media (min-width: 1024px) {
		.articlePreview {
			max-width: 800px;
			.photo {
				width: 200px;
				height: 200px;
			}
			.text {
				width: calc(100% - 200px - 12px);
				p {
					font-size: 16px;
				}
				h4 {
					font-size: 24px;
				}
			}
		}
	}
</style>
