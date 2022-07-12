<template>
  <v-app>
    <v-app-bar absolute color="teal lighten-3" dark>
      <v-toolbar-title>tech page</v-toolbar-title>
    </v-app-bar>
    <v-container class="ml-0 mt-16">
      <v-row>
        <v-col cols="4">
          <v-btn color="blue-grey lighten-4" width="100" @click="clickTopBtn"
            >top page</v-btn
          >
        </v-col>
      </v-row>
      <v-row>
        <v-card class="ml-3" color="yellow lighten-5">
          <v-card-title>{{ webPost.title }}</v-card-title>
          <v-card-text>{{ webPost.content }}</v-card-text>
        </v-card>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "WebPage",
  data: () => ({
    webPost: {
      title: "",
      content: "",
    },
  }),
  mounted() {
    // REST API の呼び出し
    const el = this;
    this.axios.get("/web/entries/latest").then((response) => {
      el.webPost = response.data;
    });
  },
  methods: {
    clickTopBtn() {
      this.$router.push("/");
    },
  },
};
</script>
