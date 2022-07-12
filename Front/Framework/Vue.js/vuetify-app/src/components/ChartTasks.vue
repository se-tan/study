<template>
  <v-app>
    <v-container d-flex>
      <v-layout cols="auto" class="pa-0 indigo darken-2">
        <div class="pa-3 my-auto white--text">タスク</div>
        <div class="pa-3 my-auto white--text">開始日</div>
        <div class="pa-3 my-auto white--text">完了期日</div>
        <div class="pa-3 my-auto white--text">担当</div>
        <div class="pa-3 my-auto white--text">進捗</div>
      </v-layout>
      <div>
        <CalendarView />
      </div>
    </v-container>
  </v-app>
</template>

<script>
import CalendarView from "./CalendarView.vue";

export default {
  components: { CalendarView },
};
</script>
