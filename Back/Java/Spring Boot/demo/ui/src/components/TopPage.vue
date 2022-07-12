<template>
  <v-app>
    <v-app-bar absolute color="teal lighten-3" dark>
      <v-toolbar-title>トップページ</v-toolbar-title>
    </v-app-bar>
    <v-container class="ml-0 mt-16">
      <v-row>
        <v-col cols="4">
          <v-btn color="brown lighten-3" width="100" @click="clickBtn"
            >Blog</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "TopPage",
  methods: {
    clickBtn() {
      this.$router.push("/web");
    },
  },
};
</script>
