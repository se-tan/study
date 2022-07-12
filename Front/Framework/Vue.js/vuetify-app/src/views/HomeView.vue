<template>
  <v-container>
    <div class="display-1 pa-5">Learn about Responsive Design.</div>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3">
        <SaleGraph />
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="3">
        <SaleGraph />
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="3">
        <SaleGraph />
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="3">
        <SaleGraph />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SaleGraph from "../components/SaleGraph.vue";

export default {
  components: { SaleGraph },
  mounted() {
    console.log(this.$vuetify.breakpoint)
  }
};
</script>
