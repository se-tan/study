<template>
  <v-app>
    <v-toolbar>ガントチャート</v-toolbar>
    <ChartTasks />
  </v-app>
</template>

<script>
import ChartTasks from "../components/ChartTasks.vue";

export default {
  components: {
    ChartTasks,
  },
};
</script>
