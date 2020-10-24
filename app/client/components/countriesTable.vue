<template>
	<div v-if="this.$store.state.map.countries != undefined" class="countriesData">
		<h5>Ograniczenia w Podróżach zagranicznych</h5>
		<div class="countriesTable">
			<table>
				<thead>
					<tr>
						<td>Nazwa kraju</td>
						<td>Granica lądowa</td>
						<td>Granica powietrzna</td>
						<td>Wymagania</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="country in this.$store.state.map.countries" :key="`${country.name}Data`">
						<td>{{ country.name }}</td>
						<td>{{ country.landborder }}</td>
						<td>{{ country.airborder }}</td>
						<td>{{ country.requirement }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'countriesTable',
	};
</script>

<style lang="scss" scoped>
	@import '@/scss/vars/_colors.scss';
	@import '@/scss/mixins/_flex.scss';
	.countriesData {
		width: calc(100vw - 24px);
		max-width: 800px;
		margin: 32px 0;
		padding: 12px;
		border: none;
		border-radius: 10px;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
		color: $richBlack;
		h5 {
			font-weight: 600;
			font-size: 14px;
		}
		.countriesTable {
			display: flex;
			flex-wrap: nowrap;
			overflow-x: auto;
			table {
				flex: 0 0 auto;
				width: 652px;
				border-collapse: collapse;
				font-size: 10px;
				border: none;
				border-radius: 10px 10px 0 0;
				overflow: hidden;
				thead {
					text-align: left;
					background-color: $cinnabar;
					color: $babyPowder;
					font-weight: 600;
					tr {
						td {
							padding: 12px;
						}
					}
				}
				tbody {
					width: 100%;
					tr {
						border-bottom: 1px solid #ddd;
						width: 100%;
						td {
							padding: 12px;
							// border: $richBlack 2px solid;
							// border: $richBlack 1.5px solid;
						}
					}
					tr:nth-of-type(even) {
						background-color: #fff;
					}
				}
			}
		}
	}
	@media (min-width: 414px) {
		.countriesData {
			h5 {
				font-size: 16px;
			}
			.countriesTable {
				table {
					font-size: 12px;
				}
			}
		}
	}
	@media (min-width: 700px) {
		.countriesData {
			width: calc(100% - 24px);
			.countriesTable {
				width: 100%;
				table {
					width: 100%;
				}
			}
		}
	}
	@media (min-width: 768px) {
		.countriesData {
			margin: 64px 0;
		}
	}
</style>
