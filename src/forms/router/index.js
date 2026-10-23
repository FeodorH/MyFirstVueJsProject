import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: '',
    component: () => import('@/forms/components/Main.vue'),
  },
  {
    path: '/allForms',
    name: 'allForms',
    component: () => import('@/forms/components/FormList.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router