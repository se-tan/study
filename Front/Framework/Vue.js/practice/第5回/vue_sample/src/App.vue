<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>{{ message }}</h1>
    <HelloVuex></HelloVuex>
    <UserList></UserList>
    <p><button @click="increment">UP</button></p>
    <p><button @click="decrement">DOWN</button></p>
    <h1>Count:{{ count }}</h1>

    <h1>ユーザー一覧</h1>
    <div v-for="user in users" :key="user.id">
      {{ user.name }} ： {{ user.email }}
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import HelloVuex from "./components/HelloVuex.vue";
import UserList from "./components/UserList.vue";

export default {
  name: "app",
  components: {
    HelloWorld,
    HelloVuex,
    UserList,
  },
  computed: {
    message() {
      return this.$store.state.message;
    },
    count() {
      return this.$store.state.count;
    },
    users() {
      return this.$store.state.users;
    },
  },
  mounted() {
    this.$store.dispatch("getUsers");
  },
  methods: {
    increment() {
      this.$store.dispatch("incrementOne");
    },
    decrement() {
      this.$store.dispatch("decrementOne");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
