<template>
	<div class="aware">
		<countriesTable />
	</div>
</template>

<script>
	import countriesTable from '@/components/countriesTable.vue';
	export default {
		name: 'aware',
		components: {
			countriesTable,
		},
	};
</script>

<style lang="scss" scoped>
	@import '@/scss/mixins/_flex.scss';
	.aware {
		@include flex(column);
		margin-bottom: 32px;
	}
	@media (min-width: 768px) {
		.aware {
			margin-bottom: 64px;
		}
	}
</style>
