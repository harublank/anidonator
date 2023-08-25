import { createRouter, createWebHistory } from 'vue-router'
import { LoginPage } from '../ui/pages'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'Welcome to Ani-Donation | Donate to your anime :3',
      component: LoginPage,
    },

  ],
})
