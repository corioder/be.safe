import Vue from 'vue';
import VueRouter from 'vue-router';
import home from './views/home.vue';
import informed from './views/informed.vue';

import charts from './components/charts/charts.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		components: {
			default: home,
			charts: charts,
		},
		props: { charts: { isHome: true } },
	},
	{
		path: '/informed',
		name: 'informed',
		components: {
			default: informed,
			charts: charts,
		},
		props: { charts: { isHome: false } },
	},
	{
		path: '/aware',
		name: 'aware',
		component: () => import(/* webpackChunkName: "aware" */ './views/aware.vue'),
	},
	{
		path: '/preventive',
		name: 'preventive',
		component: () => import(/* webpackChunkName: "preventive" */ './views/preventive.vue'),
	},
	{
		path: '*',
		name: 'pageNotFound',
		component: () => import(/* webpackChunkName: "pageNotFound" */ './views/pageNotFound.vue'),
	},
];

const router = new VueRouter({
	mode: 'hash',
	routes,
	scrollBehavior() {
		return { x: 0, y: 0 };
	},
});

export default router;
