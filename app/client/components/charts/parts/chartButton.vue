<template>
	<button @click="$router.push('/informed')">Zobacz więcej wykresów</button>
</template>

<script>
	export default {
		name: 'chartButton',
	};
</script>

<style lang="scss" scoped>
	@import '@/scss/vars/_colors.scss';
	button {
		border: none;
		padding: 10px;
		border-radius: 5px;
		font-size: 18px;
		background-color: $richBlack;
		color: $babyPowder;
		margin-bottom: 32px;
	}
	@media (min-width: 768px) {
		button {
			margin-bottom: 64px;
		}
	}
</style>
