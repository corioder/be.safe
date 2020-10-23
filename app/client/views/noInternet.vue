<template>
	<div class="noInternet">
		<main>
			<img src="@/assets/noInternet.svg" />
			<h1>Ups!</h1>
			<h2>Brak inernetu. <br />Sprawdź swoje połączenie.</h2>
		</main>
	</div>
</template>

<script>
	export default {
		name: 'noInternet',
	};
</script>

<style lang="scss" scoped>
	@import '@/scss/mixins/_flex.scss';
	@import '@/scss/vars/_colors.scss';
	.noInternet {
		@include flex(column);
		width: 100vw;
		color: $richBlack;
		text-align: center;
		position: absolute;
		left: 0;
		top: 100px;
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
	}
</style>
