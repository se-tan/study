import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Bootstrap from "bootstrap-vue";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap/dist/css/bootstrap.css";
import firebase from "firebase/app";

Vue.use(Bootstrap);
Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyAVJXNJXQgmzrBdZlt0G-SjADfq6J9SVaE",
  authDomain: "vue-slack-clone-5ac47.firebaseapp.com",
  databaseURL: "https://vue-slack-clone-5ac47-default-rtdb.firebaseio.com",
  projectId: "vue-slack-clone-5ac47",
  storageBucket: "vue-slack-clone-5ac47.appspot.com",
  messagingSenderId: "250873908208",
  appId: "1:250873908208:web:03f80d6cb7a6e4b06e2b35",
};

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");