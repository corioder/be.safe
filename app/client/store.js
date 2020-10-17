import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    links: [
      { component: 'home', path: '/' },
      { component: 'aware', path: '/aware' },
      { component: 'informed', path: '/informed' },
      { component: 'proactive', path: '/proactive' },
    ],
    APIS: {
      API: 'http://localhost:8081/',
      STRAPI: '',
      TWITTER: '',
    },
    data: {
      perday: [],
      today: {},
      yesterday: {},
      common: {},
      provinces: {},
      countryperday: {},
      prognosis: {},
    },
    categories: [],
  },
  mutations: {
    PERDAY(state, payload) {
      state.data.perday = payload;
      state.data.today = payload[payload.length - 1];
      state.data.yesterday = payload[payload.length - 2];
    },
    COMMON(state, payload) {
      state.data.common = payload;
    },
    PROVINCES(state, payload) {
      state.data.provinces = payload;
    },
    COUNTRYPERDAY(state, payload) {
      state.data.countryperday = payload;
    },
    PROGNOSIS(state, payload) {
      state.data.prognosis = payload;
    },
    CATEGORIES(state, payload) {
      const type = [
        {
          name: 'Potwierdzone przypadki',
          isPositive: false,
          displayOnHomepage: true,
        },
        {
          name: 'Aktywne przypadki',
          isPositive: false,
          displayOnHomepage: true,
        },
        {
          name: 'Zgony',
          isPositive: false,
          displayOnHomepage: true,
        },
        {
          name: 'Liczba wyzdrowiałych',
          isPositive: true,
          displayOnHomepage: true,
        },
        {
          name: 'Kwarantanna',
          isPositive: false,
          displayOnHomepage: false,
        },
        {
          name: 'Nadzór epidemologiczny',
          isPositive: false,
          displayOnHomepage: false,
        },
        {
          name: 'Liczba testów',
          isPositive: true,
          displayOnHomepage: true,
        },
        {
          name: 'Przetestowane osoby',
          isPositive: true,
          displayOnHomepage: false,
        },
        {
          name: 'Liczba testów negatywnych',
          isPositive: true,
          displayOnHomepage: false,
        },
        {
          name: 'Liczba hospitalizowanych',
          isPositive: false,
          displayOnHomepage: false,
        },
        {
          name: 'Zajęte respiratory',
          isPositive: false,
          displayOnHomepage: false,
        },
      ];
      let categories = payload;
      for (let i in payload) {
        categories[i].isPositive = type[i].isPositive;
        categories[i].displayOnHomepage = type[i].displayOnHomepage;
        categories[i].name = type[i].name;
      }
      state.categories = categories;
    },
  },
  actions: {
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
  },
  getters: {
    getCategoriesForHome(state) {
      return state.categories.filter((category) => {
        if (category.displayOnHomepage) return true;
        else return false;
      });
    },
  },
  modules: {},
});
