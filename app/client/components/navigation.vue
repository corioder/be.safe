<template>
	<nav>
		<button class="hamburger" @click="toggle">
			<span class="box">
				<span class="inner"></span>
			</span>
		</button>
		<div class="menu">
			<div class="linkContainer">
				<router-link
					v-for="to in $store.state.links"
					:to="to.path"
					tag="button"
					class="link"
					:class="{ 'link--active': $route.name == to.component || ($route.name == 'fullArticle' && to.component == 'preventive') }"
					:key="`${to.component}Link`"
					@click.native="toggle"
				>
					<img
						:src="
							$route.name == to.component || ($route.name == 'fullArticle' && to.component == 'preventive')
								? require(`@/assets/icons/${to.component}--richBlack.svg`)
								: require(`@/assets/icons/${to.component}--babyPowder.svg`)
						"
						:class="to.component"
					/>
					<span>
						{{ to.component }}
					</span>
				</router-link>
			</div>
		</div>
	</nav>
</template>

<script>
	export default {
		name: 'navigation',
		methods: {
			toggle() {
				document.querySelector('.hamburger').classList.toggle('hamburger--active');
				if (this.$store.state.isNavOpened) {
					setTimeout(() => {
						this.$store.commit('NAVOPEN');
					}, 300);
				} else this.$store.commit('NAVOPEN');
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import '@/scss/vars/_colors.scss';
	@import '@/scss/mixins/_flex.scss';
	@mixin line() {
		width: 100%;
		height: 5px;
		border-radius: 5px;
		background-color: $richBlack;
		position: absolute;
	}

	nav {
		position: absolute;
		z-index: 999;
		top: 10px;
		right: 12px;
	}

	.hamburger {
		padding: 10px;
		display: inline-block;
		cursor: pointer;
		background-color: transparent;
		border: 0;
		margin: 0;
		transition: transform 0.3s 0.1s ease-in-out;
	}
	.hamburger:focus {
		outline: $richBlack 1.5px solid;
	}

	.box {
		width: 35px;
		height: 24px;
		display: inline-block;
		position: relative;
	}

	.inner {
		@include line;

		left: 0;
		top: 50%;
		transform: translateY(-50%);
		transition: transform 0.2s 0.2s ease-in-out;
	}

	.inner::before,
	.inner::after {
		@include line;

		content: '';
		left: 0;
		transition: transform 0.2s 0.2s;
	}

	.inner::before {
		top: -11px;
	}

	.inner::after {
		top: 11px;
	}

	.menu {
		width: 155px;
		min-height: calc(100vh - 0.1px);
		background-color: $richBlack;
		position: absolute;
		top: -10px;
		right: -12px;
		transform: translateX(100%);
		transition: transform 0.2s 0.2s;
	}

	.linkContainer {
		margin-top: 18px;
		margin-left: 12px;
		margin-right: 12px;
		width: 100%;
		@include flex(column, flex-start);
	}
	.link {
		margin: 0;
		padding: 6px;
		border: none;
		border-radius: 5px;
		width: calc(100% - 2 * 12px);
		background-color: transparent;
		color: $babyPowder;
		font-size: 16px;
		text-align: left;
		transition: transform 0.2s ease-in-out;
		position: relative;
		img {
			width: 20px;
			position: absolute;
			top: 7px;
			left: 3px;
		}
		img.preventive {
			top: 14px;
		}
		span {
			margin-left: 32px;
		}
	}

	//////////////////////////////////////
	.hamburger--active {
		transform: translateX(-155px);
	}

	.hamburger--active .inner {
		transform: rotate(45deg);
	}

	.hamburger--active .inner::before {
		transform: translateY(11px);
	}

	.hamburger--active .inner::after {
		transform: translateY(-11px) rotate(-90deg);
	}

	.hamburger--active ~ .menu {
		transform: translateX(0);
	}

	.link--active {
		background-color: $babyPowder;
		color: $richBlack;
	}
	.link:focus {
		border: 1px $babyPowder solid;
	}
	.link:hover {
		transform: scale(1.05);
	}
</style>
