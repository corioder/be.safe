import colorByName from './components/colorByName';
import proxyArrayProperties from '../utils/proxyArrayProperties';

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
};
