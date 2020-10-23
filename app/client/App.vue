<template>
	<div id="app">
		<div v-if="!loaded && loadingTimeoutDone && $route.name != 'noInternet'">
			<loading :loadingError="''" />
		</div>

		<div v-if="loaded || $route.name == 'noInternet'">
			<header v-show="$route.name != 'pageNotFound' && $route.name != 'noInternet'">
				<div class="logoContainer">
					<logo :text="$route.name == 'home' ? 'safe' : $route.name == 'fullArticle' ? 'preventive' : $route.name" />
				</div>
				<navigation />
			</header>
			<div style="margin-top: 60px">
				<keep-alive>
					<router-view />
				</keep-alive>
				<div v-show="$route.name == 'informed'">
					<keep-alive>
						<charts />
					</keep-alive>
				</div>
			</div>

			<noInternetBar />
		</div>
	</div>
</template>

<script>
	import logo from './components/logo.vue';
	import navigation from './components/navigation.vue';
	import loading from './components/loading.vue';
	import charts from './components/charts/charts.vue';
	import noInternetBar from './components/noInternetBar.vue';

	export default {
		name: 'App',
		components: {
			logo,
			navigation,
			loading,
			charts,
			noInternetBar,
		},
		data() {
			return {
				loaded: false,
				loadingTimeoutDone: false,
			};
		},
		created() {
			setTimeout(() => {
				this.loadingTimeoutDone = true;
			}, 400);

			window.loadingPromise
				.then(() => {
					this.loaded = true;
				})
				.catch((err) => {
					window.noInternt = true;
					if (this.$route.name != 'noInternet') this.$router.replace({ name: 'noInternet' });
				});
		},
	};
</script>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;800&display=swap');
	@import './scss/vars/_colors.scss';
	* {
		font-family: 'Open Sans', sans-serif;
		box-sizing: border-box;
	}
	html {
		background-color: $babyPowder;
		font-weight: 400;
	}
	body::-webkit-scrollbar {
		display: none;
	}
	header {
		position: fixed;
		z-index: 999;
		left: 0;
		top: 0;
		width: 100vw;
		height: 60px;
		background-color: $babyPowder;
		.logoContainer {
			position: relative;
			left: 12px;
			top: 12px;
		}
	}
</style>
