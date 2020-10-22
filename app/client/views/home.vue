<template>
	<div class="home">
		<landing />
		<boxes />
		<charts />
	</div>
</template>

<script>
	import landing from '../components/landing.vue';
	import boxes from '../components/boxes/boxes.vue';
	import charts from '../components/charts/charts.vue';

	export default {
		name: 'home',
		components: {
			landing,
			boxes,
			charts,
		},
	};
</script>

<style lang="scss" scoped>
	@import '../scss/mixins/_flex.scss';
	.home {
		margin-top: 32px;
		@include flex(column);
	}
</style>
