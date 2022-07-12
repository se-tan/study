import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    message: 'Hello Vuex',
    users: [
      { name: 'John', email: 'john@example.com', age: 22 },
      { name: 'Merry', email: 'merry@facebook.com', age: 33 },
      { name: 'Ken', email: 'ken@amazon.com', age: 29 },
    ],
    count: 0,
  },
  getters: {
    users(state) {
      return state.users.filter(user => user.age < 30);
    },
  },
  mutations: {
    increment(state, num) {
      state.count += num;
    },
    setUsers(state, users) {
      state.users = users;
    },
  },
  actions: {
    incrementOne(context) {
      /*
        contextはstoreインスタンスが持つ
        プロパティ、メソッドを保持するオブジェクト
      */
      context.commit('increment', 1);
    },
    decrementOne(context) {
      context.commit('increment', -1)
    },
    getUsers({commit}) {
      return axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
          commit('setUsers', response.data);
        });
    },
  },
  modules: {
  }
})
