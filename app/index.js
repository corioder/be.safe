import polyfills from './utils/polyfills.js';
const polyfillsPromise = polyfills();

import Vue from 'vue';

import App from './App.vue';
import router from './router.js';
import store from './store/store.js';

window.noInternt = false;

window.addEventListener('online', () => {
	if (router.currentRoute.name == 'noInternet') router.replace({ name: 'home' });
});

polyfillsPromise
	.then(() => {
		Vue.config.productionTip = false;

		if (!__IS_DEV__) {
			if ('serviceWorker' in navigator) {
				window.addEventListener('load', () => {
					navigator.serviceWorker.register('/sw.js');
				});
			}
		}

		window.loadingPromise = store.dispatch('fetchData');

		new Vue({
			router,
			store,
			el: '#root',
			render: (h) => h(App),
		});
	})
	.catch(console.error);
