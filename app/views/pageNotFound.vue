<template>
	<div class="pageNotFound">
		<main>
			<img src="@/assets/404.svg" alt="Ilustracja brak strony której szukasz" />
			<h1>Ups!</h1>
			<h2>Nie znaleźliśmy strony, której szukasz...</h2>
		</main>
		<router-link tag="button" to="/" aria-label="link do strony głównej">Strona główna</router-link>
	</div>
</template>

<script>
	export default {
		name: 'pageNotFound',
	};
</script>

<style lang="scss" scoped>
	@import '@/scss/mixins/_flex.scss';
	@import '@/scss/vars/_colors.scss';
	.pageNotFound {
		@include flex(column);
		width: 100vw;
		color: $richBlack;
		text-align: center;
		position: absolute;
		left: 0;
		top: 50px;
		main {
			@include flex(column);
			width: calc(100vw - 24px);
			box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
			border-radius: 10px;
			padding: 12px;
			max-width: 724px;
			img {
				width: calc(100% - 24px);
				max-width: 700px;
			}
			h1 {
				margin: 0;
				margin-top: 6px;
				font-weight: 600;
				font-size: 18px;
			}
			h2 {
				margin: 0;
				margin-top: 6px;
				font-weight: 400;
				font-size: 18px;
			}
		}
		button {
			margin-top: 20px;
			padding: 6px 12px;
			border: none;
			border-radius: 10px;
			background-color: $babyPowder;
			box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
			font-size: 18px;
			color: $richBlack;
			transition: transform 0.2s ease-in-out;
		}
		button:hover {
			transform: scale(1.01);
		}
		button:focus {
			outline: none;
			box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
		}
	}
</style>
