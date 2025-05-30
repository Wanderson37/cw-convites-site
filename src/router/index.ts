import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/MainLayoutView.vue'),
    meta: { transition: 'slideX' },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
      },
      {
        path: 'convites',
        name: 'convites',
        component: () => import('@/views/ConvitesView.vue'),
      },
      {
        path: 'convites/:id',
        name: 'convite-details',
        component: () => import('@/views/ConviteDetailsView.vue'),
      },
      {
        path: 'carrinho',
        name: 'carrinho',
        component: () => import('@/views/CarrinhoView.vue'),
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/views/AboutView.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
