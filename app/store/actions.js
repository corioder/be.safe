import fetchData from '@/utils/fetchData';

export default {
	async fetchData({ commit, state, getters }) {
		try {
			const API = state.APIS.API + state.APIS.API_ENPOINT;
			const perdayPromise = fetchData(API, 'perday');
			const categoriesPromise = fetchData(API, 'categories');

			getters.getInternationalAPHT();
			getters.getTable();

			// critical data
			let perday, categories;
			[perday, categories] = await Promise.all([perdayPromise, categoriesPromise]);

			commit('PERDAY', perday);
			commit('CATEGORIES', categories);
		} catch (err) {
			if (__IS_DEV__) {
				console.error(err);
			}
			throw err;
		}
	},
};
