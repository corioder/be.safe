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
      API: __API__, // webpack will resolve this, use .env API=apiUrl
      STRAPI: __STRAPI__, // webpack will resolve this, use .env STRAPI=strapiUrl
      TWITTER: __TWITTER__, // webpack will resolve this, use .env TWITTER=twitterUrl
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
          name: 'potwierdzonych przypadków',
          isPositive: false,
          displayOnHomepage: true,
          todayName: 'confirmed',
        },
        {
          name: 'aktywnych przypadków',
          isPositive: false,
          displayOnHomepage: true,
          todayName: 'active',
        },
        {
          name: 'zgonów',
          isPositive: false,
          displayOnHomepage: true,
          todayName: 'deaths',
        },
        {
          name: 'wyzdrowiałych',
          isPositive: true,
          displayOnHomepage: true,
          todayName: 'recovered',
        },
        {
          name: 'osób na kwarantannie',
          isPositive: false,
          displayOnHomepage: false,
          todayName: 'quarantine',
        },
        {
          name: 'objętych nadzorem epidemologicznym',
          isPositive: false,
          displayOnHomepage: false,
          todayName: 'supervision',
        },
        {
          name: 'testów',
          isPositive: true,
          displayOnHomepage: true,
          todayName: 'tests',
        },
        {
          name: 'przetestowanych osób',
          isPositive: true,
          displayOnHomepage: false,
          todayName: 'people_tested',
        },
        {
          name: 'testów negatywnych',
          isPositive: true,
          displayOnHomepage: false,
          todayName: 'negative_tests',
        },
        {
          name: 'hospitalizowanych',
          isPositive: false,
          displayOnHomepage: false,
          todayName: 'hospitalized',
        },
        {
          name: 'zajętych respiratorów',
          isPositive: false,
          displayOnHomepage: false,
          todayName: 'respirators',
        },

        {
          name: 'przypadków na 100 000',
          isPositive: false,
          displayOnHomepage: false,
          todayName: 'activePerHoundredThousand',
        },
      ];
      let categories = payload;
      for (let i in payload) {
        categories[i].isPositive = type[i].isPositive;
        categories[i].displayOnHomepage = type[i].displayOnHomepage;
        categories[i].name = type[i].name;
        categories[i].amount = state.data.today[type[i].todayName];
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
