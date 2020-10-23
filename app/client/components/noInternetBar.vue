<template>
	<div class="bar" v-if="isOffline">Brak internetu, dane mogą być nieaktualne</div>
</template>

<script>
	export default {
		name: 'noInternetBar',
		data() {
			return {
				isOffline: false,
			};
		},

		created() {
			window.addEventListener('offline', () => (this.isOffline = true));
			window.addEventListener('online', () => (this.isOffline = false));
		},
	};
</script>

<style lang="scss" scoped>
	@import '@/scss/vars/_colors.scss';
	.bar {
		background-color: $cinnabar;
		width: 100vw;
		position: fixed;
		bottom: 0;
		left: 0;
		padding: 2px 10px;
		color: $babyPowder;
		font-size: 14px;
	}

	@media (min-width: 375px) {
		.bar {
			font-size: 16px;
		}
	}
</style>
