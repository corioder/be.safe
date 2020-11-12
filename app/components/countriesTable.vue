<template>
	<div>
		<div v-if="loaded" class="countriesData">
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
						<tr>
							<button @click="collapse = !collapse">{{ collapse ? 'pokaż dane' : 'ukryj dane' }}</button>
						</tr>
						<tr v-show="!collapse" v-for="country in data" :key="`${country.name}Data`">
							<td>{{ country.name }}</td>
							<td>{{ country.landborder }}</td>
							<td>{{ country.airborder }}</td>
							<td>{{ country.requirement }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<loading :err="err.message" v-else />
	</div>
</template>

<script>
	import loading from '@/components/loading.vue';

	export default {
		name: 'countriesTable',
		components: {
			loading,
		},
		data() {
			return {
				collapse: true,
				data: {},
				loaded: false,
				err: {
					message: '',
					timeout: null,
				},
			};
		},
		created() {
			this.table();
		},
		methods: {
			async table() {
				if (this.err.timeout) clearTimeout(this.err.timeout);

				try {
					this.data = await this.$store.getters.getTable();
				} catch (err) {
					this.err.message = this.$store.state.unexpectedErr;
					this.err.timeout = setTimeout(() => {
						this.table();
					}, this.$store.state.retryTimeout);
					return;
				}

				this.loaded = true;
			},
		},
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
						button {
							margin: 12px;
							padding: 12px;
							border: none;
							background-color: $cinnabar;
							color: $babyPowder;
							border-radius: 10px;
							width: 120px;
						}
						td {
							padding: 12px;
						}
					}
					tr:first-of-type {
						border-bottom: none;
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
