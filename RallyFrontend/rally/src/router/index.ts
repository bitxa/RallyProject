import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    {
      path: "/",
      redirect: "/panel",
    },

    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },

    {
      path: "/panel",
      name: "admin-panel",
      component: () => import("../views/AdminPanelView.vue"),
      children: [
        { path: "competitions", component: Object },
        { path: "circuits", component: Object },
        { path: "racers", component: Object },
      ],
    },
  ],
});

export default router;
