<template>
	<div class="landing">
		<h2>
			Bądź bezpieczny w czasie <span>pandemii <span class="bold">COVID-19</span></span>
		</h2>
		<div class="container">
			<div class="links">
				<router-link to="/informed" class="informed" tag="button">informacja</router-link>
				<router-link to="/aware" class="aware" tag="button">świadomość</router-link>
				<router-link to="/preventive" class="preventive" tag="button">profilaktyka</router-link>
			</div>
			<img src="@/assets/landing.svg" />
		</div>
	</div>
</template>

<script>
	export default {
		name: 'landing',
	};
</script>

<style lang="scss" scoped>
	@import '@/scss/mixins/_flex.scss';
	@import '@/scss/vars/_colors.scss';
	.landing {
		@include flex(column, flex-start);
		h2 {
			font-size: 18px;
			font-weight: 400;
			width: 250px;
			.bold {
				font-weight: 600;
			}
		}
		.container {
			@include flex(row);
			.links {
				@include flex(column, flex-start);
				button {
					border: none;
					padding: 6px;
					margin: 0;
					margin-bottom: 9px;
					font-size: 14px;
					color: $babyPowder;
				}
				.informed {
					background-color: $orange;
				}
				.aware {
					background-color: $cinnabar;
				}
				.preventive {
					background-color: $shamrockGreen;
					margin: 0;
				}
			}
			img {
				margin-left: 28px;
				width: calc(100vw - 93px - 28px - 24px);
				max-width: 300px;
			}
		}
	}
	@media (min-width: 375px) {
		h2 {
			margin-bottom: 0;
		}
	}
	@media (min-width: 1024px) {
		.landing {
			h2 {
				font-size: 20px;
				width: 300px;
				margin-bottom: -65px;
			}
			.container {
				.links {
					button {
						padding: 9px 12px;
						margin-bottom: 18px;
						font-size: 18px;
					}
				}
				img {
					margin-left: 56px;
					width: calc(100vw - 116px - 56px - 24px);
					max-width: 500px;
				}
			}
		}
	}
	@media (min-width: 1024px) {
		.landing {
			h2 {
				font-size: 24px;
				margin-bottom: -70px;
			}
			.container {
				.links {
					button {
						font-size: 20px;
					}
				}
				img {
					margin-left: 84px;
					width: calc(100vw - 140px - 56px - 24px);
					max-width: 600px;
				}
			}
		}
	}
</style>
