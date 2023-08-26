import { createRouter, createWebHistory } from 'vue-router'
import { OrgAdminShell } from '../ui/components'
import { LoginPage, AniAdminPage } from '../ui/pages'
import { ROUTES } from '../data'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: ROUTES.login,
      name: 'Welcome to Ani-Donation | Donate to your anime :3',
      component: LoginPage,
    },
    {
      path: ROUTES.aniAdmin.base,
      component: OrgAdminShell,
      children: [
        {
          path: "",
          name: "Where Everything starts",
          component: AniAdminPage
        }
      ]
    }

  ],
})
