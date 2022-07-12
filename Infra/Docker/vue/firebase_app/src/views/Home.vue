<template>
  <div>
    <b-container fluid="lg">
      <h1>FireBaseを使った読み書き確認</h1>
      <b-form-input v-model="message"></b-form-input>
      <b-button variant="primary" @click="addMessage">Add Message</b-button>
    </b-container>
  </div>
</template>

<script>
import fb from "firebase/app";
import { getDatabase } from "firebase/database";

const db = getDatabase(fb)

export default {
  name: "Home",
  data() {
    return {
      message: "",
    };
  },
  methods: {
    addMessage() {
      db
        .database()
        .ref("slack")
        .set({
          content: this.message,
          user: {
            name: "John Doe",
          },
        });
    },
  },
};
</script>
