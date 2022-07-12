<template>
    <div class="content">
        <h2>calendar {{ displayDate }}</h2>
        <div class="btn-area">
            <button class="btn" @click="prev">Prev</button>
            <button class="btn" @click="next">Next</button>
        </div>
        <div class="calendar">
            <div class="calendar-weekly">
                <div class="calendar-youbi" v-for="n in 7" :key="n">
                    {{ youbi(n - 1) }}
                </div>
            </div>
            <div
                class="calendar-weekly"
                v-for="(week, index) in calendars"
                :key="index"
            >
                <div
                    class="calendar-daily"
                    v-for="(day, index) in week"
                    :key="index"
                    :class="{ outside: currentMonth !== day.month }"
                >
                    <div class="calendar-day">
                        {{ day.day }}
                    </div>
                    <div v-for="dayEvent in day.dayEvents" :key="dayEvent.id">
                        <div
                            v-if="dayEvent.width"
                            class="calendar-event"
                            :style="`width:${dayEvent.width}%;background-color:${dayEvent.color}`"
                            draggable="true"
                        >
                            {{ dayEvent.name }}
                        </div>
                        <div v-else style="height: 26px"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";

export default {
    data() {
        return {
            currentDate: moment(),
            events: [
                {
                    id: 1,
                    name: "Meeting",
                    start: "2021-11-01",
                    end: "2021-11-01",
                    color: "blue",
                },
                {
                    id: 2,
                    name: "Event",
                    start: "2021-11-02",
                    end: "2021-11-03",
                    color: "limegreen",
                },
                {
                    id: 3,
                    name: "Meeting",
                    start: "2021-11-06",
                    end: "2021-11-06",
                    color: "deepskyblue",
                },
                {
                    id: 4,
                    name: "Rest",
                    start: "2021-11-08",
                    end: "2021-11-08",
                    color: "dimgray",
                },
                {
                    id: 5,
                    name: "Travel",
                    start: "2021-11-08",
                    end: "2021-11-11",
                    color: "navy",
                },
                {
                    id: 6,
                    name: "BirthDay",
                    start: "2021-11-16",
                    end: "2021-11-16",
                    color: "orange",
                },
                {
                    id: 7,
                    name: "Event",
                    start: "2021-11-12",
                    end: "2021-11-15",
                    color: "limegreen",
                },
                {
                    id: 8,
                    name: "Business trip",
                    start: "2021-11-12",
                    end: "2021-11-13",
                    color: "teal",
                },
                {
                    id: 9,
                    name: "Visit customer",
                    start: "2021-11-14",
                    end: "2021-11-14",
                    color: "red",
                },
                {
                    id: 10,
                    name: "Party",
                    start: "2021-11-15",
                    end: "2021-11-15",
                    color: "royalblue",
                },
                {
                    id: 12,
                    name: "Meeting",
                    start: "2021-11-18",
                    end: "2021-11-19",
                    color: "blue",
                },
                {
                    id: 13,
                    name: "Event",
                    start: "2021-11-21",
                    end: "2021-11-21",
                    color: "limegreen",
                },
                {
                    id: 14,
                    name: "Rest",
                    start: "2021-11-20",
                    end: "2021-11-20",
                    color: "dimgray",
                },
                {
                    id: 15,
                    name: "Event",
                    start: "2021-11-25",
                    end: "2021-11-28",
                    color: "limegreen",
                },
                {
                    id: 16,
                    name: "Meeting",
                    start: "2021-11-21",
                    end: "2021-11-21",
                    color: "deepskyblue",
                },
                {
                    id: 17,
                    name: "Trip",
                    start: "2021-11-23",
                    end: "2021-11-24",
                    color: "navy",
                },
                {
                    id: 18,
                    name: "Meeting",
                    start: "2021-11-28",
                    end: "2021-11-28",
                    color: "blue",
                },
                {
                    id: 19,
                    name: "Meeting",
                    start: "2021-11-12",
                    end: "2021-11-12",
                    color: "deepskyblue",
                },
                {
                    id: 20,
                    name: "BirthDay",
                    start: "2021-11-30",
                    end: "2021-11-30",
                    color: "orange",
                },
            ],
        };
    },
    methods: {
        // 当月1日を含む週の日曜日の日付を取得する
        getStartDate() {
            let date = moment(this.currentDate);
            // 当月1日を取得
            date.startOf("month");
            // 1日の曜日を数値で取得(日曜日：0～土曜日：6)
            const youbiNum = date.day();
            // 当月1日 - 1日の曜日数値 = 前月最終日の曜日数値
            return date.subtract(youbiNum, "days");
        },
        getEndDate() {
            let date = moment(this.currentDate);
            date.endOf("month");
            const youbiNum = date.day();
            return date.add(6 - youbiNum, "days");
        },
        getCalendar() {
            let startDate = this.getStartDate();
            const endDate = this.getEndDate();
            const weekNumber = Math.ceil(endDate.diff(startDate, "days") / 7);

            let calendars = [];
            let calendarDate = this.getStartDate();

            for (let week = 0; week < weekNumber; week++) {
                let weekRow = [];
                for (let day = 0; day < 7; day++) {
                    let dayEvents = this.getDayEvents(calendarDate, day);
                    weekRow.push({
                        day: calendarDate.get("date"),
                        month: calendarDate.format("YYYY-MM"),
                        dayEvents,
                    });
                    calendarDate.add(1, "days");
                }
                calendars.push(weekRow);
            }
            return calendars;
        },
        getDayEvents(date, day) {
            let stackIndex = 0;
            let dayEvents = [];
            let startedEvents = [];
            this.sortedEvents.forEach((event) => {
                let startDate = moment(event.start).format("YYYY-MM-DD");
                let endDate = moment(event.end).format("YYYY-MM-DD");
                let Date = date.format("YYYY-MM-DD");
                if (startDate <= Date && endDate >= Date) {
                    if (startDate === Date) {
                        [stackIndex, dayEvents] = this.getStackEvents(
                            event,
                            day,
                            date,
                            stackIndex,
                            dayEvents,
                            startedEvents,
                            event.start
                        );
                    } else if (day === 0) {
                        [stackIndex, dayEvents] = this.getStackEvents(
                            event,
                            day,
                            date,
                            stackIndex,
                            dayEvents,
                            startedEvents,
                            Date
                        );
                    } else {
                        startedEvents.push(event);
                    }
                }
            });
            return dayEvents;
        },
        // カレンダー1マスにつき width 95％分の幅を予定マスに設定する
        getEventWidth(end, start, day) {
            let betweenDays = moment(end).diff(moment(start), "days");
            if (betweenDays > 6 - day) {
                return (6 - day) * 100 + 95;
            } else {
                return betweenDays * 100 + 95;
            }
        },
        sortedEvents() {
            return this.events.slice().sort(function (a, b) {
                let startDate = moment(a.start).format("YYYY-MM-DD");
                let startDate_2 = moment(b.start).format("YYYY-MM-DD");
                if (startDate < startDate_2) return -1;
                if (startDate > startDate_2) return 1;
                return 0;
            });
        },
        getStackEvents(
            event,
            day,
            stackIndex,
            dayEvents,
            startedEvents,
            start
        ) {
            [stackIndex, dayEvents] = this.getStartedEvents(
                stackIndex,
                startedEvents,
                dayEvents
            );
            let width = this.getEventWidth(start, event.end, day);
            Object.assign(event, {
                stackIndex,
            });
            dayEvents.push({ ...event, width });
            stackIndex++;
            return [stackIndex, dayEvents];
        },
        getStartedEvents(stackIndex, startedEvents, dayEvents) {
            let startedEvent;
            do {
                startedEvent = startedEvents.find(
                    (event) => event.stackIndex === stackIndex
                );
                if (startedEvent) {
                    dayEvents.push(startedEvent); //ダミー領域として利用するため
                    stackIndex++;
                }
            } while (typeof startedEvent !== "undefined");
            return [stackIndex, dayEvents];
        },
        prev() {
            this.currentDate = moment(this.currentDate).subtract(1, "month");
        },
        next() {
            this.currentDate = moment(this.currentDate).add(1, "month");
        },
        youbi(dayIndex) {
            const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            return week[dayIndex];
        },
    },
    computed: {
        calendars() {
            return this.getCalendar();
        },
        displayDate() {
            return this.currentDate.format("YYYY[年]MM[月]");
        },
        currentMonth() {
            return this.currentDate.format("YYYY-MM");
        },
    },
    mounted() {
        console.log(this.getCalendar());
    },
};
</script>

<style>
.content {
    margin: 2em auto;
    width: 900ox;
}

.btn-area {
    margin: 0.5em 0;
}
.btn {
    padding: 4px 8px;
    margin-right: 8px;
}

.calendar {
    max-width: 900px;
    border-top: 1px solid #e0e0e0;
    font-size: 0.8em;
}
.calendar-weekly {
    display: flex;
    border-left: 1px solid #e0e0e0;
}
.calendar-youbi {
    flex: 1;
    border-right: 1px solid #e0e0e0;
    margin-right: -1px;
    text-align: center;
}
.calendar-daily {
    flex: 1;
    min-height: 120px;
    border-right: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    margin-right: -1px;
}
.calendar-day {
    text-align: center;
}
.calendar-event {
    color: white;
    margin-bottom: 1px;
    height: 25px;
    line-height: 25px;
}

.outside {
    background-color: #f7f7f7;
}
</style>
