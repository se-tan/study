// (1) コンポーネントの設定
const Home = { templete: "<div>初めてのVue Resource</div>" };
const News = { templete: "<div>今週のニュースは...</div>" };
const About = { templete: "<div>会社までのアクセス方法は...</div>" };

// (2) ルーティングの設定
const router = new VueRouter({
  routes: [
    { path: "/", component: Home },
    { path: "/news", component: News },
    { path: "about", component: About },
  ],
});

// (3) Vueインスタンスへrouterインスタンスを渡す
const app = new Vue({
  data: {
    title: "Vue-Router",
  },
  router,
}).$mount("#app");
