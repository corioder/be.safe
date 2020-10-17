import Vue from 'vue';

import App from './App.vue';
import router from './router.js';
import store from './store/store.js';

Vue.config.productionTip = false;

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}

new Vue({
  router,
  store,
  el: '#root',
  render: (h) => h(App),
});
