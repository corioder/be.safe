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
      API: 'http://localhost:8080/',
      STRAPI: '',
      TWITTER: '',
    },
    data:{
      perday:[],
      common:{},
      testsperday:{},
      today:{},
      yesterday:{},
    }
  },
  mutations: {
    
  },
  actions: {
    getData({commit, state},path){
      fetch(state.urls.API + path)
      .then((response) => response.json())
      .then((data) => {
        this.$store.state.data.today = data[data.length - 1];
        this.$store.state.data.yesterday = data[data.length - 2];
      })
      // .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }
},
  modules: {},
});
