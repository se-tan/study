import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    message: "Hello Vuex",
    users: [
      { name: "John", email: "john@example.com", age: 22 },
      { name: "Merry", email: "merry@facebook.com", age: 33 },
      { name: "Ken", email: "ken@amazon.com", age: 29 },
    ],
    count: 0,
  },
  getters: {
    users(state) {
      return state.users.filter((user) => user.age < 30);
    },
  },
  /* 
    mutations:  ある1つの state の変更処理
    actions:    ビジネスロジック(複雑な処理) 
  */
  mutations: {
    increment(state) {
      state.count++;
    },
    decrement(state) {
      state.count--;
    },
    setUsers(state, users) {
      state.users = users;
    },
  },
  actions: {
    // context はstoreインスタンスが持つ
    // プロパティ、メソッドを保持するオブジェクト
    incrementOne(context) {
      setTimeout(() => {
        context.commit("increment");
      }, 3000);
    },
    decrementOne(context) {
      context.commit("decrement");
    },
    getUsers({ commit }) {
      return axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
          commit("setUsers", response.data);
        });
    },
  },
});
