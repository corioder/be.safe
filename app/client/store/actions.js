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
			const perdayPromise = fetchData(state.APIS.API, 'perday');
			const commonPromise = fetchData(state.APIS.API, 'common');
			const provincesPromise = fetchData(state.APIS.API, 'provinces');
			const countryperdayPromise = fetchData(state.APIS.API, 'countryperday');
			const prognosisPromise = fetchData(state.APIS.API, 'prognosis');
			const categoriesPromise = fetchData(state.APIS.API, 'categories');
			const articlesPromise = fetchData(state.APIS.STRAPI + '/', 'articles');

			let perday, common, provinces, countryperday, prognosis, categories, articles;
			[perday, common, provinces, countryperday, prognosis, categories, articles] = await Promise.all([
				perdayPromise,
				commonPromise,
				provincesPromise,
				countryperdayPromise,
				prognosisPromise,
				categoriesPromise,
				articlesPromise,
			]);

			commit('PERDAY', perday);
			commit('COMMON', common[0]);
			commit('PROVINCES', provinces);
			commit('COUNTRYPERDAY', countryperday);
			commit('PROGNOSIS', prognosis);
			commit('CATEGORIES', categories);
			commit('ARTICLES', articles);
		} catch (err) {
			throw err;
		}
	},
};
