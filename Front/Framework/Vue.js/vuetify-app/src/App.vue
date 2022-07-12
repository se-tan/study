<template>
  <v-app>
    <HeaderMenus />
    <FooterMenus />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import HeaderMenus from "./components/HeaderMenus.vue";
import FooterMenus from "./components/FooterMenus.vue";

export default {
  components: {
    HeaderMenus,
    FooterMenus,
  },
};
</script>
