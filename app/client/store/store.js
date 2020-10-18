import Vue from "vue";
import Vuex from "vuex";
import colorByName from "./components/colorByName.js";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    links: [
      { component: "home", path: "/" },
      { component: "aware", path: "/aware" },
      { component: "informed", path: "/informed" },
      { component: "proactive", path: "/proactive" }
    ],
    APIS: {
      API: __API__, // webpack will resolve this, use .env API=apiUrl
      STRAPI: __STRAPI__, // webpack will resolve this, use .env STRAPI=strapiUrl
      TWITTER: __TWITTER__ // webpack will resolve this, use .env TWITTER=twitterUrl
    },
    data: {
      perday: [],
      today: {},
      yesterday: {},
      common: {},
      provinces: {},
      ctountryperday: {},
      prognosis: {}
    },
    categories: []
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
          name: "Potwierdzone przypadki",
          isPositive: false,
          displayOnHomepage: true
        },
        {
          name: "Aktywne przypadki",
          isPositive: false,
          displayOnHomepage: true
        },
        {
          name: "Zgony",
          isPositive: false,
          displayOnHomepage: true
        },
        {
          name: "Liczba wyzdrowiałych",
          isPositive: true,
          displayOnHomepage: true
        },
        {
          name: "Kwarantanna",
          isPositive: false,
          displayOnHomepage: false
        },
        {
          name: "Nadzór epidemologiczny",
          isPositive: false,
          displayOnHomepage: false
        },
        {
          name: "Liczba testów",
          isPositive: true,
          displayOnHomepage: true
        },
        {
          name: "Przetestowane osoby",
          isPositive: true,
          displayOnHomepage: false
        },
        {
          name: "Liczba testów negatywnych",
          isPositive: true,
          displayOnHomepage: false
        },
        {
          name: "Liczba hospitalizowanych",
          isPositive: false,
          displayOnHomepage: false
        },
        {
          name: "Zajęte respiratory",
          isPositive: false,
          displayOnHomepage: false
        }
      ];
      let categories = payload;
      for (const i in payload) {
        categories[i].isPositive = type[i].isPositive;
        categories[i].displayOnHomepage = type[i].displayOnHomepage;
        categories[i].name = type[i].name;
      }
      state.categories = categories;
    },
  },
  actions: {
    async fetchData({ commit, state }) {
      const fetchEndpoint = async enpoint => {
        const response = await fetch(state.APIS.API + enpoint);
        return await response.json();
      };

      const perdayPromise = fetchEndpoint("perday");
      const commonPromise = fetchEndpoint("common");
      const provincesPromise = fetchEndpoint("provinces");
      const countryperdayPromise = fetchEndpoint("countryperday");
      const prognosisPromise = fetchEndpoint("prognosis");
      const categoriesPromise = fetchEndpoint("categories");

      try {
        const perday = await perdayPromise;
        commit("PERDAY", perday);
      } catch (err) {
        console.error(err);
      }

      try {
        const common = await commonPromise;
        commit("COMMON", common[0]);
      } catch (err) {
        console.error(err);
      }

      try {
        const provinces = await provincesPromise;
        commit("PROVINCES", provinces);
      } catch (err) {
        console.error(err);
      }

      try {
        const countryperday = await countryperdayPromise;
        commit("COUNTRYPERDAY", countryperday);
      } catch (err) {
        console.error(err);
      }

      try {
        const prognosis = await prognosisPromise;
        commit("PROGNOSIS", prognosis);
      } catch (err) {
        console.error(err);
      }

      try {
        const categories = await categoriesPromise;
        commit("CATEGORIES", categories);
      } catch (err) {
        console.error(err);
      }
    }
  },
  getters: {
    getCategoriesForHome(state) {
      return state.categories.filter(category => {
        if (category.displayOnHomepage) return true;
        else return false;
      });
    },
    getColorByName(state) {
      return text => colorByName(text);
    },
    getChartData(state) {
      return chartType => {
        return {
          data: new Proxy(state.data.perday, {
            get(obj, prop) {
              if (!isNaN(Number(prop))) {
                return Number(obj[prop][chartType]);
              }
              return obj[prop];
            }
          }),
          dates: new Proxy(state.data.perday, {
            get(obj, prop) {
              if (!isNaN(Number(prop))) {
                return obj[prop]["date"];
              }
              return obj[prop];
            }
          })
        };
      };
    }
  },
  modules: {}
});
