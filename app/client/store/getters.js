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
				dates: proxyArrayProperties(state.data.perday, `date`),
			};
		};
	},
	getInternationalData(state) {
		// data format
		const df = {
			date: 0,
			confirmed: 1,
			deaths: 2,
			recovered: 3,
			active: 4,
			activePerHoundredThousand: 5,
		};

		return async (countryCode) => {
			let data = null;
			if (state[countryCode]) data = state[countryCode];
			else {
				data = await fetchFromRDS(countryCode);
				state[countryCode] = data;
			}

			return data
		};
	},
};
