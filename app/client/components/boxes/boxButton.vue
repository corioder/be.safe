<template>
	<button>
		Zobacz więcej <br />
		statystyk
	</button>
</template>

<script>
	export default {
		name: 'boxButton',
	};
</script>

<style lang="scss" scoped>
	@import '@/scss/mixins/_flex.scss';
	@import '@/scss/vars/_colors.scss';

	button {
		@include flex(column);
		justify-content: center;
		width: calc(100vw - 24px);
		max-width: 300px;
		border-radius: 10px;
		border: none;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
		text-align: center;
		font-weight: 600;
		font-size: 14px;
		color: $richBlack;
		margin: 0;
		transition: transform 0.2s ease-in-out;
		height: 133px;
	}
	button:hover {
		transform: scale(1.01);
	}
	button:focus {
		outline: none;
		box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
	}
</style>
