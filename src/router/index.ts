import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'Home',
      path: '/home',
      alias: ['/'],
      component: () => import('@/components/views/HomePade.vue'),
    },
    {
      name: 'Search',
      path: '/search',
      component: () => import('@/components/views/SearchPage.vue'),
    },
    {
      name: 'Lists',
      path: '/lists',
      component: () => import('@/components/views/ListsPage.vue'),
    },
    {
      name: 'Profile',
      path: '/profile',
      component: () => import('@/components/views/ProfilePage.vue'),
    },
    {
      name: 'List',
      path: '/lists/list',
      component: () => import('@/components/views/ListPage.vue'),
    },
    {
      path: '/:catchAll(.*)', 
      component: () => import('@/components/views/ErrorPage.vue'), 
    },
  ],
});

export default router;
