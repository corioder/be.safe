export default {
  async fetchData({ commit, state }) {
    const fetchEndpoint = async (enpoint) => {
      try {
        const response = await fetch(state.APIS.API + enpoint);
        return await response.json();
      } catch (err) {
        throw err;
      }
    };

    try {
      const perdayPromise = fetchEndpoint('perday');
      const commonPromise = fetchEndpoint('common');
      const provincesPromise = fetchEndpoint('provinces');
      const countryperdayPromise = fetchEndpoint('countryperday');
      const prognosisPromise = fetchEndpoint('prognosis');
      const categoriesPromise = fetchEndpoint('categories');

      let perday, common, provinces, countryperday, prognosis, categories;
      [perday, common, provinces, countryperday, prognosis, categories] = await Promise.all([
        perdayPromise,
        commonPromise,
        provincesPromise,
        countryperdayPromise,
        prognosisPromise,
        categoriesPromise,
      ]);
      commit('PERDAY', perday);
      commit('COMMON', common[0]);
      commit('PROVINCES', provinces);
      commit('COUNTRYPERDAY', countryperday);
      commit('PROGNOSIS', prognosis);
      commit('CATEGORIES', categories);
    } catch (err) {
      throw err;
    }

    try {
      const response = await fetch(state.APIS.STRAPI + '/articles');
      const data = await response.json();
      console.log(data);
      commit('ARTICLES', data);
    } catch (error) {
      console.error(error);
    }
  },
};
