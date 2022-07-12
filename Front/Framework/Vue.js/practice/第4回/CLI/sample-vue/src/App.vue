npm<template>
  <div id="app" class="main ui container">
    <h1>Hello, Vue.js</h1>
    <CustomButton :name="message" @click="clickButton" />

    <h2>{{ text }}</h2>
    <div class="ui form">
      <InputBox title="タイトル" :message="errorMessage" v-model="text" typeName="text"
        placeholder="タイトルを入力してください" />
      <CustomButton name="OK" @click="clickOkButton" />
    </div>
  </div>
</template>

<script>
import CustomButton from "./components/custombutton.vue";
import InputBox from "./components/inputbox.vue";

export default {
  name: "App",
  components: {
    CustomButton,
    InputBox,
  },
  data() {
    return {
      message: "Pleace Click Button",
      errorMessage: '',
      text: "",
    };
  },
  methods: {
    clickButton() {
        this.message = "Button Clicked!";
    },
    clickOkButton() {
      this.errorMessage = '入力に誤りがあります'
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
