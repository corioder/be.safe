import colorByName from './components/colorByName';
import proxyArrayProperties from '@/utils/proxyArrayProperties';
import fetchFromRDS from '@/utils/fetchFromRDS';
import fetchData from '@/utils/fetchData';

export default {
	getCategoriesForHome(state) {
		return state.categories.filter((category) => {
			if (category.displayOnHomepage) return true;
			else return false;
		});
	},
	getColorByName: (state) => (text) => colorByName(text),
	getChartData(state) {
		return (chartType) => {
			return {
				data: proxyArrayProperties(state.data.perday, `${chartType}`, (n) => Number(n)),
				categories: proxyArrayProperties(state.data.perday, `date`),
			};
		};
	},
	getTable(state) {
		return async () => {
			let data = null;
			if (state.table.countries?.length > 0) data = state.table;
			else {
				try {
					state.table = await fetchData(state.APIS.API, state.APIS.TAB_ENPOINT);
					data = state.table;
				} catch (err) {
					throw err;
				}
			}
			return data;
		};
	},
	getInternationalAPHT(state) {
		return async () => {
			let data = null;
			if (state.internationalAPHT.length > 0) data = state.internationalAPHT;
			else {
				try {
					state.internationalAPHT = await fetchData(state.APIS.API, state.APIS.INT_ENPOINT);
					data = state.internationalAPHT;
				} catch (err) {
					throw err;
				}
			}

			return data;
		};
	},
	getInternationalData(state) {
		return async (countryCode) => {
			let data = null;
			if (state.international[countryCode]) data = state.international[countryCode];
			else {
				try {
					data = await fetchFromRDS(countryCode);
					state.international[countryCode] = data;
				} catch (err) {
					throw err;
				}
			}
			return data;
		};
	},
};
