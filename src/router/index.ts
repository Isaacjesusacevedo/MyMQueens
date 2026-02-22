import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/view/home/HomeView.vue'

const router = createRouter({
  history: createWebHistory('/MyMQueens/'),  // ← mismo base que vite.config.ts
  routes: [
    { path: '/',          name: 'home',     component: HomeView },
    { path: '/servicios', name: 'services', component: () => import('@/view/services/ServicesView.vue') },
    { path: '/horarios',  name: 'schedule', component: () => import('@/view/schedule/ScheduleView.vue') },
    { path: '/contacto',  name: 'contact',  component: () => import('@/view/contacto/ContactView.vue') },
  ],
})

export default router