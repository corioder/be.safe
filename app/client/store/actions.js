export default {
	async fetchData({ commit, state }) {
		const fetchData = async (API, enpoint) => {
			try {
				const response = await fetch(API + enpoint);
				return await response.json();
			} catch (err) {
				throw err;
			}
		};

		try {
			const API = state.APIS.API + state.APIS.API_ENPOINT;
			const perdayPromise = fetchData(API, 'perday');
			const commonPromise = fetchData(API, 'common');
			const provincesPromise = fetchData(API, 'provinces');
			const countryperdayPromise = fetchData(API, 'countryperday');
			const prognosisPromise = fetchData(API, 'prognosis');
			const categoriesPromise = fetchData(API, 'categories');
			const articlesPromise = fetchData(state.APIS.STRAPI + '/', 'articles');
			const mapPromise = fetchData(state.APIS.API + state.APIS.MAP_ENPOINT, '');

			let perday, common, provinces, countryperday, prognosis, categories, articles, map;
			[perday, common, provinces, countryperday, prognosis, categories, articles, map] = await Promise.all([
				perdayPromise,
				commonPromise,
				provincesPromise,
				countryperdayPromise,
				prognosisPromise,
				categoriesPromise,
				articlesPromise,
				mapPromise
			]);

			commit('PERDAY', perday);
			commit('COMMON', common[0]);
			commit('PROVINCES', provinces);
			commit('COUNTRYPERDAY', countryperday);
			commit('PROGNOSIS', prognosis);
			commit('CATEGORIES', categories);
			commit('ARTICLES', articles);
			commit('MAP', map);
		} catch (err) {
			throw err;
		}
	},
};
