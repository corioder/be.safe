import Vue from 'vue';
import VueRouter from 'vue-router';
import home from './views/home.vue';
import aware from './views/aware.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: home,
  },
  {
    path: '/aware',
    name: 'aware',
    component: aware,
    // route level code-splitting
    // this generates a separate chunk (aware.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "aware" */ './views/aware.vue'),
  },
  {
    path: '/informed',
    name: 'informed',
    component: () => import(/* webpackChunkName: "informed" */ './views/informed.vue'),
  },
  {
    path: '/proactive',
    name: 'proactive',
    component: () => import(/* webpackChunkName: "proactive" */ './views/proactive.vue'),
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
