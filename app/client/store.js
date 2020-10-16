import Vue from 'vue';
import Vuex from 'vuex';

const CATEGORIES = [
  {
    name: 'Potwierdzone przypadki',
    amount: undefined,
    amountOfNew: undefined,
    percentChange: undefined,
  },
  {
    name: 'Aktywne przypadki',
    amount: undefined,
    amountOfNew: undefined,
    percentChange: undefined,
  },
  {
    name: 'Zgony',
    amount: undefined,
    amountOfNew: undefined,
    percentChange: undefined,
  },
  {
    name: 'Liczba wyzdrowiałych',
    amount: undefined,
    amountOfNew: undefined,
    percentChange: undefined,
  },
  {
    name: 'Kwarantanna',
    amount: undefined,
    amountOfNew: undefined,
    percentChange: undefined,
  },
  {
    name: 'Nadzór epidemologiczny',
    amount: undefined,
    amountOfNew: undefined,
    percentChange: undefined,
  },
  {
    name: 'Liczba testów',
    amount: undefined,
    amountOfNew: undefined,
    percentChange: undefined,
  },
  {
    name: 'Przetestowane osoby',
    amount: undefined,
    amountOfNew: undefined,
    percentChange: undefined,
  },
  {
    name: 'Liczba testów negatywnych',
    amount: undefined,
    amountOfNew: undefined,
    percentChange: undefined,
  },
  {
    name: 'Liczba hospitalizowanych',
    amount: undefined,
    amountOfNew: undefined,
    percentChange: undefined,
  },
  {
    name: 'Zajęte respiratory',
    amount: undefined,
    amountOfNew: undefined,
    percentChange: undefined,
  },
];

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
      API: 'http://10.0.1.50:8081/',
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
      console.log(payload[payload.length - 1]);
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
          isPositive: false,
          displayOnHomepage: true,
        },
        {
          isPositive: false,
          displayOnHomepage: true,
        },
        {
          isPositive: false,
          displayOnHomepage: true,
        },
        {
          isPositive: true,
          displayOnHomepage: true,
        },
        {
          isPositive: false,
          displayOnHomepage: false,
        },
        {
          isPositive: false,
          displayOnHomepage: false,
        },
        {
          isPositive: true,
          displayOnHomepage: true,
        },
        {
          isPositive: true,
          displayOnHomepage: false,
        },
        {
          isPositive: true,
          displayOnHomepage: false,
        },
        {
          isPositive: false,
          displayOnHomepage: false,
        },
        {
          isPositive: false,
          displayOnHomepage: false,
        },
      ];
      let categories = payload;
      for (let i in payload) {
        categories[i].isPositive = type[i].isPositive;
        categories[i].displayOnHomepage = type[i].displayOnHomepage;
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
        throw error;
      }
      try {
        const response = await fetch(state.APIS.API + 'common');
        const data = await response.json();
        commit('COMMON', data[0]);
      } catch (error) {
        throw error;
      }
      try {
        const response = await fetch(state.APIS.API + 'provinces');
        const data = await response.json();
        commit('PROVINCES', data);
      } catch (error) {
        throw error;
      }
      try {
        const response = await fetch(state.APIS.API + 'countryperday');
        const data = await response.json();
        commit('COUNTRYPERDAY', data);
      } catch (error) {
        throw error;
      }
      try {
        const response = await fetch(state.APIS.API + 'prognosis');
        const data = await response.json();
        commit('PROGNOSIS', data);
      } catch (error) {
        throw error;
      }

      commit('CATEGORIES', CATEGORIES);
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
