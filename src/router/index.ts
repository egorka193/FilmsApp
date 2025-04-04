import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'Home',
      path: '/home',
      component: () => import('@/components/FAHomePade.vue'),
    },
    {
      name: 'Search',
      path: '/search',
      component: () => import('@/components/FASearch.vue'),
    },
    {
      name: 'Lists',
      path: '/lists',
      component: () => import('@/components/FALists.vue'),
    },
    {
      name: 'Profile',
      path: '/profile',
      component: () => import('@/components/FAProfile.vue'),
    },
    {
      name: 'List',
      path: '/lists/list',
      component: () => import('@/components/FAList.vue'),
    },
    {
      path: '/:catchAll(.*)', 
      component: () => import('@/components/FAError.vue'), 
    },
  ],
});

export default router;
