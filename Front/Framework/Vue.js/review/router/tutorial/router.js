// ルートコンポーネントを定義
// 他のファイルからインポートすることも可能
// const Foo = { templete: "<div>foo</div>" };
// const Bar = { templete: "<div>bar</div>" };
const User = {
  templete: `
    <div class="user">
        <h2>User {{ $route.params.id }}</h2>
        <router-view></router-view>
    </div>
    `,
};

const UserHome = { templete: "<div>Home</div>" };
const UserProfile = { templete: "<div>Profile</div>" };
const UserPosts = { templete: "<div>Posts</div>" };

// ルートを定義
// 各ルートは1つのコンポーネントとマッピングされる必要がある
// const routes = [
// { path: "/foo", component: Foo },
// { path: "/bar", component: Bar },
// 動的セグメント
// { path: "/user/:id", component: User },
// ];

// ルーターインスタンスを作成して、ルートオプションを返す
const router = new VueRouter({
  routes: [
    {
      path: "user/:id",
      component: User,
      children: [
        { path: "", component: UserHome },
        { path: "profile", component: UserProfile },
        { path: "posts", component: UserPosts },
      ],
    },
  ], // `routes: routes` の短縮表記
});

// root となるインスタンスを作成してマウントする
// アプリケーション全体がルーターを認知できるよう、
// ルーターをインジェクトすること
const app = new Vue({
  router,
}).$mount("#app");
