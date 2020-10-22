<template>
	<div class="home">
		<boxes />
		<!-- router connects charts to this route -->
	</div>
</template>

<script>
	import boxes from "../components/boxes/boxes.vue";

	export default {
		name: "home",
		components: {
			boxes,
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
