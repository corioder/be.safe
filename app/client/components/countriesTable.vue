<template>
	<div v-if="this.$store.state.map.countries != undefined">
		<h5>Ograniczenia w Podróżach zagranicznych</h5>
		<table>
			<thead>
				<tr>
					<td>Nazwa kraju</td>
					<td>Granica lądowa</td>
					<td>Granica powietrzna</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="country in this.$store.state.map.countries" :key="`${country.name}Data`">
					<td>{{ country.name }}</td>
					<td>{{ country.landborder }}</td>
					<td>{{ country.airborder }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	export default {
		name: 'countriesTable',
	};
</script>

<style lang="scss" scoped>
	@import '@/scss/vars/_colors.scss';
	div {
		// color: $richBlack;
		width: calc(100vw - 24px);
		max-width: 700px;
		margin: 0;
		padding: 12px;
		border: none;
		border-radius: 10px;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
		table {
			width: calc(100% - 24px);
			display: table;
			border-collapse: collapse;
		}

		// tbody {
		// 	vertical-align: middle;
		// }

		// tr {
		// 	vertical-align: middle;
		// }

		td,
		th {
			padding: 12px;
			border: $richBlack 2px solid;
		}
	}
</style>
