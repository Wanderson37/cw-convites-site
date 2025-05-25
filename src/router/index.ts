import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/MainLayoutView.vue'),
    meta: { transition: 'slideX' },
    children: [
      {
        path: '',
        component: () => import('@/views/HomeView.vue'),
      },
      {
        path: '/convites',
        component: () => import('@/views/ConvitesView.vue'),
      },
    ],
  },
  {
    path: '/convites/:id',
    component: () => import('@/views/ConviteDetailsView.vue'),
  },
  {
    path: '/about',
    name: 'about',

    component: () => import('../views/AboutView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
