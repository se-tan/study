import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import NotFound from "../views/NotFound.vue";

const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    meta: { title: "Not Found" },
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { title: "Home" },
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    meta: { title: "About" },
  },
  {
    path: "/post",
    name: "Post",
    component: () => import(/* webpackChunkName: "post" */ "../views/Post.vue"),
    meta: { title: "Post" },
  },
  {
    path: "/post/:id",
    name: "PageShow",
    component: () =>
      import(/* webpackChunkName: "post" */ "../views/PageShow.vue"),
    props: true,
    meta: { title: "PostShow" },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  next();
});

export default router;
