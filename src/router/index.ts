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
      meta: { title: 'Home | FilmsApp' },
    },
    {
      name: RoutesNames.Search,
      path: '/search',
      component: () => import('@/components/views/SearchPage/SearchPage.vue'),
      meta: { title: 'Search | FilmsApp' },
    },
    {
      name: RoutesNames.Lists,
      path: '/lists',
      component: () => import('@/components/views/ListsPage/ListsPage.vue'),
      meta: { title: 'Lists | FilmsApp' },
    },
    {
      name: RoutesNames.Profile,
      path: '/profile',
      component: () => import('@/components/views/ProfilePage/ProfilePage.vue'),
      meta: { title: 'Profile | FilmsApp' },
    },
    {
      name: RoutesNames.List,
      path: '/lists/:id',
      props: true,
      component: () => import('@/components/views/ListPage.vue'),
      meta: { title: 'Lists/List | FilmsApp' },
    },
    {
      name: RoutesNames.Film,
      path: '/film/:id',
      component: () => import('@/components/views/FilmPage.vue'),
      props: true,
      meta: { title: 'Film | FilmsApp' },
    },
    {
      name: 'NotFound',
      path: '/:catchAll(.*)', 
      component: () => import('@/components/views/ErrorPage.vue'), 
      meta: { title: 'NotFound' },
    },
  ],
});

router.afterEach((to) => {
  document.title = (to.meta.title as string);
});

export default router;
