import fetchData from '@/utils/fetchData';

export default {
	async fetchData({ commit, state, getters }) {
		try {
			const API = state.APIS.API + state.APIS.API_ENPOINT;
			const perdayPromise = fetchData(API, 'perday');
			const categoriesPromise = fetchData(API, 'categories');
			const articlesPromise = fetchData(state.APIS.STRAPI + '/', 'articles');

			getters.getInternationalAPHT();
			getters.getTable();

			// critical data
			let perday, articles, categories;
			[perday, articles, categories] = await Promise.all([perdayPromise, articlesPromise, categoriesPromise]);

			commit('PERDAY', perday);
			commit('ARTICLES', articles);
			commit('CATEGORIES', categories);
		} catch (err) {
			if (__IS_DEV__) {
				console.error(err);
			}
			throw err;
		}
	},
};
