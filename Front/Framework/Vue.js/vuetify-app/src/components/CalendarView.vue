<style>
.scroll_area {
  max-width: 55vw;
  width: 100%;
}
::-webkit-scrollbar {
  width: 10px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #fff;
  border: none;
  border-radius: 10px;
  box-shadow: inset 0 0 2px #777; 
}
::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
  box-shadow: none;
}
</style>

<template>
  <v-layout class="scroll_area overflow-x-auto">
    <v-card v-for="(calendar, index) in calendars" :key="index" outlined tile>
      <v-toolbar dense flat color="green lighten-1 white--text text-center">
        {{ calendar.date }}
      </v-toolbar>

      <v-layout>
        <v-layout column
          v-for="(day, index) in calendar.days"
          :key="index"
          :style="`width:${block_size}px; left:${
            day.block_number * block_size
          }px`"
          class="align-center"
        >
          <span>{{ day.day }}</span>
          <span>{{ day.dayOfWeek }}</span>
        </v-layout>
      </v-layout>
    </v-card>
  </v-layout>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      start_month: "2022-05",
      end_month: "2022-08",
      block_size: 30,
      block_number: 0,
      calendars: [],
    };
  },
  methods: {
    getDays(year, month, block_number) {
      const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
      let days = [];
      let date = moment(`${year}-${month}-01`);
      let num = date.daysInMonth();
      for (let i = 0; i < num; i++) {
        days.push({
          day: date.date(),
          dayOfWeek: dayOfWeek[date.day()],
          block_number,
        });
        date.add(1, "day");
        block_number++;
      }
      return days;
    },
    getCalendar() {
      let block_number = 0;
      let days;
      let start_month = moment(this.start_month);
      let end_month = moment(this.end_month);
      let between_month = end_month.diff(start_month, "months");
      for (let i = 0; i <= between_month; i++) {
        days = this.getDays(
          start_month.year(),
          start_month.format("MM"),
          block_number
        );
        this.calendars.push({
          date: start_month.format("YYYY年MM月"),
          yaer: start_month.year(),
          month: start_month.month(),
          start_block_number: block_number,
          calendar: days.length,
          days: days,
        });
        start_month.add(1, "months");
        block_number = days[days.length - 1].block_number;
        block_number++;
      }
      return block_number;
    },
  },
  mounted() {
    this.getCalendar();
  },
};
</script>
