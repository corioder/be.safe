<template>
	<div class="loading" :style="`height:${h}vh`">
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
		<h5 v-html="err"></h5>
	</div>
</template>

<script>
	export default {
		name: 'loading',
		props: {
			err: {
				required: false,
			},
			h: {
				required: false,
				default: 100,
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import '@/scss/components/_loading.scss';
	@import '@/scss/mixins/_flex.scss';
	.loading {
		@include flex(column);
		justify-content: center;
		h5 {
			font-size: 16px;
			text-align: center;
			color: $richBlack;
			font-weight: 600;
		}
	}
</style>
