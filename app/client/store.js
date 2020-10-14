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
    urls: {
      API: 'http://10.0.1.50:8080/',
      STRAPI: '',
      TWITTER: '',
    },
  },
  mutations: {},
  actions: {},
  modules: {},
});
