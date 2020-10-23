<template>
	<div class="home">
		<landing />
		<boxes />
		<!-- router connects charts to this route -->
	</div>
</template>

<script>
	import landing from '../components/landing.vue';
	import boxes from '../components/boxes/boxes.vue';

	export default {
		name: 'home',
		components: {
			landing,
			boxes,
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
