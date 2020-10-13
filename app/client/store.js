import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    links: [
      { name: 'home', link: '/' },
      { name: 'aware', link: '/aware' },
      { name: 'informed', link: '/informed' },
      { name: 'proactive', link: '/proactive' },
    ],
  },
  mutations: {},
  actions: {},
  modules: {},
});
