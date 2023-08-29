import { createRouter, createWebHistory } from "vue-router";
import { OrgAdminShell } from "../ui/components";
import {
  LoginPage,
  AniAdminPage,
  AniAdminUserPage,
  OrgPage,
} from "../ui/pages";
import { ROUTES } from "../data";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: ROUTES.login,
      name: "Welcome to Ani-Donation | Donate to your anime :3",
      component: LoginPage,
    },
    {
      path: ROUTES.aniAdmin.base,
      component: OrgAdminShell,
      children: [
        {
          path: "",
          name: "Where Everything starts",
          component: AniAdminPage,
        },
        {
          path: ROUTES.aniAdmin.user,
          name: "Create new users :)",
          component: AniAdminUserPage,
        },
        {
          path: ROUTES.aniAdmin.user,
          name: "Create new users :)",
          component: AniAdminUserPage,
        },
      ],
    },
    {
      path: ROUTES.orgPage,
      component: OrgAdminShell,
      children: [
        {
          path: "",
          name: "Organization View Page",
          component: OrgPage,
        },
      ],
    },
  ],
});
