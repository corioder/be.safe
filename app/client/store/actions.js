export default {
  async fetchData({ commit, state }) {
    try {
      const response = await fetch(state.APIS.API + 'perday');
      const data = await response.json();
      commit('PERDAY', data);
    } catch (error) {
      console.error(error);
    }
    try {
      const response = await fetch(state.APIS.API + 'common');
      const data = await response.json();
      commit('COMMON', data[0]);
    } catch (error) {
      console.error(error);
    }
    try {
      const response = await fetch(state.APIS.API + 'provinces');
      const data = await response.json();
      commit('PROVINCES', data);
    } catch (error) {
      console.error(error);
    }
    try {
      const response = await fetch(state.APIS.API + 'countryperday');
      const data = await response.json();
      commit('COUNTRYPERDAY', data);
    } catch (error) {
      console.error(error);
    }
    try {
      const response = await fetch(state.APIS.API + 'prognosis');
      const data = await response.json();
      commit('PROGNOSIS', data);
    } catch (error) {
      console.error(error);
    }

    try {
      const response = await fetch(state.APIS.API + 'categories');
      const data = await response.json();
      commit('CATEGORIES', data);
    } catch (error) {
      console.error(error);
    }
  },
};
