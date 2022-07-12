<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />

    <h1>{{ message }}</h1>

    <HelloVuex></HelloVuex>

    <hr />

    <UserList></UserList>

    <hr />

    <h1>Count: {{ count }}</h1>
    <button @click="increment">UP</button><br />
    <button @click="decrement">DOWN</button>

    <hr />
  </div>
</template>

<script>
import HelloVuex from "@/components/HelloVuex.vue";
import UserList from "@/components/UserList.vue";

export default {
  name: "app",
  components: {
    HelloVuex,
    UserList,
  },
  computed: {
    message() {
      // computed プロパティ経由でVuexにアクセスする
      return this.$store.state.message;
    },
    count() {
      return this.$store.state.count;
    },
  },
  methods: {
    // actions で定義した処理を呼び出して実行する
    increment() {
      this.$store.dispatch("incrementOne");
    },
    // mutations で定義した処理を呼び出して実行する
    // mutations は他のコンポーネントでも呼び出せる
    decrement() {
      this.$store.commit("decrement");
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
