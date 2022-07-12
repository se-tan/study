import Vue from "vue";
import VueRouter from "vue-router";
import EnterpriseView from "../views/EnterpriseView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/enterprise",
    name: "enterprise",
    component: EnterpriseView,
  },
  {
    path: "/chart",
    name: "chart",
    component: () => import("../views/ChartView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
