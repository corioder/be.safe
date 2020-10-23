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

<style lang="scss" scoped></style>
