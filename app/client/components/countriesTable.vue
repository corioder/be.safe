<template>
	<div v-if="this.$store.state.map.countries != undefined">
		<table>
			<thead>
				<tr>
					<th>Ograniczenia w Podróżach zagranicznych</th>
				</tr>
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
	table {
		width: 90vw;
		thead {
			width: 100%;
			tr {
				width: 100%;
				th {
					width: 100%;
				}
			}
		}
		tbody {
			width: 100%;
			tr {
				width: 100%;
				td {
					width: 33%;
				}
			}
		}
	}
</style>
