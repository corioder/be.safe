import Vue from 'vue';

import VueRouter from 'vue-router';

import home from './views/home.vue';
import informed from './views/informed.vue';
import aware from './views/aware.vue';
import preventive from './views/preventive.vue';
import fullArticle from './views/fullArticle.vue';

import noInternet from './views/noInternet.vue';
import pageNotFound from './views/pageNotFound.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: home,
	},
	{
		path: '/informed',
		name: 'informed',
		component: informed,
	},
	{
		path: '/aware',
		name: 'aware',
		component: aware,
	},
	{
		path: '/preventive',
		name: 'preventive',
		component: preventive,
	},
	{
		path: '/preventive/:id',
		name: 'fullArticle',
		component: fullArticle,
	},
	{
		path: '/faq',
		name: 'faq',
		component: () => import('@/views/faq.vue'),
	},
	{
		path: '/noInternet',
		name: 'noInternet',
		component: noInternet,
	},
	{
		path: '*',
		name: 'pageNotFound',
		component: pageNotFound,
	},
];

const router = new VueRouter({
	mode: 'hash',
	routes,
	scrollBehavior() {
		return { x: 0, y: 0 };
	},
});

router.beforeEach((to, from, next) => {
	if (window.noInternt && to.name != 'noInternet') next({ name: 'noInternet' });
	if (to.name == 'noInternet' && !window.noInternt) next({ name: 'home' });
	else next();
});
export default router;
