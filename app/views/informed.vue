<template>
	<div class="informed" :style="$store.state.isNavOpened ? 'z-index:-1; position: relative;' : 'z-index:0; position: initial;'">
		<boxes />
		<!-- router connects charts to this route -->
		<boxes :isForToday="false" />
	</div>
</template>

<script>
	import boxes from '@/components/boxes/boxes.vue';

	export default {
		name: 'informed',
		components: {
			boxes,
		},
	};
</script>

<style lang="scss" scoped>
	@import '@/scss/mixins/_flex.scss';
	@import '@/scss/vars/_colors.scss';
	.informed {
		@include flex(column);
		background-color: $babyPowder;
	}
</style>
