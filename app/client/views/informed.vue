<template>
	<div
		class="informed"
		:style="
			$store.state.isNavOpened
				? 'z-index:-1; position: relative;'
				: 'z-index:0; position: initial;'
		"
	>
		<boxes />
	<!-- router connects charts to this route -->
	</div>
</template>

<script>
	import boxes from "@/components/boxes/boxes.vue";
	import charts from "@/components/charts/charts.vue";

	export default {
		name: "informed",
		components: {
			boxes,
			charts,
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/scss/mixins/_flex.scss";
	@import "@/scss/vars/_colors.scss";
	.informed {
		@include flex(column);
		background-color: $babyPowder;
	}
</style>
