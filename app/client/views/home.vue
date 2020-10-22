<template>
	<div class="home">
		<boxes />
			<charts :isHome="true" />
		<chartButton @click.native="$router.push('/informed')" />
	</div>
</template>

<script>
	import boxes from "../components/boxes/boxes.vue";
	import charts from "../components/charts/charts.vue";
	import chartButton from "../components/charts/chartButton.vue";

	export default {
		name: "home",
		components: {
			boxes,
			charts,
			chartButton,
		},
	};
</script>

<style lang="scss" scoped>
	@import "../scss/mixins/_flex.scss";
	.home {
		margin-top: 32px;
		@include flex(column);
	}
</style>
