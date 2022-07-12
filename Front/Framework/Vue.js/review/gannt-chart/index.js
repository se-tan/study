const app = Vue.createApp({
  data() {
    return {
      start_month: '2021-11',
      end_month: '2021-03',
      block_size: 30,
      block_number: 0,
      calendars: [],
    };
  },
  methods: {
    getDays(year, month, block_number) {
      const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      let days = [];
      let date = moment(`${year}-${month}-01`);
      let num = date.daysInMonth();
      for (let i = 0; i < num; i++) {
        days.push({
          day: date.date(),
          dayOfWeek: dayOfWeek[date.day()],
          block_number,
        });
        date.add(1, 'day');
        block_number++;
      }
      return days;
    },
    getCalendar() {
      let block_number = 0;
      let days;
      let start_month = moment(this.start_month);
      let end_month = moment(this.end_month);
      let between_month = end_month.diff(start_month, 'months');
      for (let i = 0; i <= between_month; i++) {
        days = this.getDays(start_month.year(), start_month.format('MM'), block_number);
        this.calendars.push({
          date: start_month.format('YYYY年MM月'),
          year: start_month.yaer(),
          month: start_month.month(),
          start_block_number: block_number,
          calendar: days.length,
          days: days,
        });
        start_month.add(1, 'months');
        block_number = days[days.length - 1].block_number;
        block_number++;
      }
      return block_number;
    },
  },
  mounted() {
    this.getCalendar();
  },
}).mount('#app');
