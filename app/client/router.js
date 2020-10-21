import Vue from 'vue';
import VueRouter from 'vue-router';
import home from './views/home.vue';
import informed from './views/informed.vue';

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
    component: () => import(/* webpackChunkName: "aware" */ './views/aware.vue'),
  },
  {
    path: '/preventive',
    name: 'preventive',
    component: () => import(/* webpackChunkName: "preventive" */ './views/preventive.vue'),
  },
  {
    path: '/preventive/:id',
    name: 'fullArticle',
    component: () => import(/* webpackChunkName: "fullArticle" */ './views/fullArticle.vue'),
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
