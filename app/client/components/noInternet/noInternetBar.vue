<template>
	<div class="bar" @offline="ifOffline = true" @online="isOffline = false" v-if="isOffline">Brak internetu, dane mogą być nieaktualne</div>
</template>

<script>
	export default {
		name: 'noInternetBar',
		data() {
			return {
				isOffline: false,
			};
		},
	};
</script>

<style lang="scss" scoped>
	@import '../../scss/vars/_colors.scss';
	.bar {
		background-color: $cinnabar;
		width: 100vw;
		position: fixed;
		bottom: 0;
		left: 0;
		padding: 2px 10px;
		color: $babyPowder;
	}
</style>
