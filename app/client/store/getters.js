import colorByName from './components/colorByName';
import proxyArrayProperties from '@/utils/proxyArrayProperties';
import fetchFromRDS from '@/utils/fetchFromRDS';

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
	getInternationalData(state) {
		return async (countryCode) => {
			let data = null;
			if (state.international[countryCode]) data = state.international[countryCode];
			else {
				// TODO: err check
				data = await fetchFromRDS(countryCode);
				state.international[countryCode] = data;
			}

			return data;
		};
	},

	getInternationalActivePerHoundredThousand(state) {
		return async () => {
			let data = null;
			if (state.internationalActivePerHoundredThousand.length > 0) data = state.internationalActivePerHoundredThousand;
			else {
				// TODO: err check
				const response = await fetch(state.APIS.API + state.APIS.INT_ENPOINT);
				data = await response.json();
				state.internationalActivePerHoundredThousand = data;
			}

			return data;
		};
	},
};
