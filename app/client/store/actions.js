export default {
  async fetchData({ commit, state }) {
    const fetchEndpoint = async (enpoint) => {
      const response = await fetch(state.APIS.API + enpoint);
      return await response.json();
    };

    const perdayPromise = fetchEndpoint('perday');
    const commonPromise = fetchEndpoint('common');
    const provincesPromise = fetchEndpoint('provinces');
    const countryperdayPromise = fetchEndpoint('countryperday');
    const prognosisPromise = fetchEndpoint('prognosis');
    const categoriesPromise = fetchEndpoint('categories');

    try {
      const perday = await perdayPromise;
      commit('PERDAY', perday);
    } catch (err) {
      console.error(err);
    }

    try {
      const common = await commonPromise;
      commit('COMMON', common[0]);
    } catch (err) {
      console.error(err);
    }

    try {
      const provinces = await provincesPromise;
      commit('PROVINCES', provinces);
    } catch (err) {
      console.error(err);
    }

    try {
      const countryperday = await countryperdayPromise;
      commit('COUNTRYPERDAY', countryperday);
    } catch (err) {
      console.error(err);
    }

    try {
      const prognosis = await prognosisPromise;
      commit('PROGNOSIS', prognosis);
    } catch (err) {
      console.error(err);
    }

    try {
      const categories = await categoriesPromise;
      commit('CATEGORIES', categories);
    } catch (err) {
      console.error(err);
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
