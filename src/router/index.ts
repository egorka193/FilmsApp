import { createRouter, createWebHistory } from 'vue-router';
import { RoutesNames } from './types';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: RoutesNames.Home,
      path: '/home',
      alias: ['/'],
      component: () => import('@/components/views/HomePage.vue'),
    },
    {
      name: RoutesNames.Search,
      path: '/search',
      component: () => import('@/components/views/SearchPage/SearchPage.vue'),
    },
    {
      name: RoutesNames.Lists,
      path: '/lists',
      component: () => import('@/components/views/ListsPage/ListsPage.vue'),
    },
    {
      name: RoutesNames.Profile,
      path: '/profile',
      component: () => import('@/components/views/ProfilePage.vue'),
    },
    {
      name: RoutesNames.List,
      path: '/lists/:id',
      props: true,
      component: () => import('@/components/views/ListPage.vue'),
    },
    {
      name: RoutesNames.Film,
      path: '/film/:id',
      component: () => import('@/components/views/FilmPage.vue'),
      props: true,
    },
    {
      name: 'NotFound',
      path: '/:catchAll(.*)', 
      component: () => import('@/components/views/ErrorPage.vue'), 
    },
  ],
});

export default router;
