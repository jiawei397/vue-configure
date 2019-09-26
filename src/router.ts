import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/system',
    },
    {
      path: '/system',
      name: 'system',
      // redirect: '/system/base',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "system" */ './views/system/index.vue'),
      children: [
        // {
        //   path: 'base',
        //   component: () => import(/* webpackChunkName: "system-basic" */ './views/system/Basic.vue')
        // },
        {
          path: 'resource',
          component: () => import(/* webpackChunkName: "system-resource" */ './views/system/Resource.vue'),
        },
      ],
    },
    {
      path: '/func',
      name: 'func',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "system" */ './views/Func.vue'),
    },
    {
      path: '/exhibition',
      name: 'exhibition',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "system" */ './views/Exhibition.vue'),
    },
  ],
});
