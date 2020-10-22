<template>
	<div class="loading">
		<div class="lds-roller">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
		<h1>{{ loadingErrorMessage }}</h1>
	</div>
</template>

<script>
	import mapErrorNames from "./js/mapErrorNames";

	export default {
		name: "loading",
		props: {
			loadingError: {
				required: true,
				type: String,
			},
		},
		computed: {
			loadingErrorMessage() {
				return mapErrorNames(this.loadingError);
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "../../scss/components/_loading.scss";
	@import "../../scss/mixins/_flex.scss";
	.loading {
		@include flex(column);
		justify-content: center;
		// height: calc(100vh - 120px);
		height: 100vh;
		h1 {
			font-size: 24px;
			text-align: center;
		}
	}
</style>
