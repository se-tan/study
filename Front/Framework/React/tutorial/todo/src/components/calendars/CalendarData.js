import React, { useState, useCallback, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from "@fullcalendar/core/locales-all";
import interactionPlugin from "@fullcalendar/interaction";

const thisMonth = () => {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
    2,
    "0"
  )}`;
};

function CalendarData(props) {
  const handleDataClick = useCallback((arg) => {
    alert(arg.dataStr);
  }, []);

  return (
    <div className="mt-3">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locales={allLocales}
        locale="ja"
        events={[
          { title: "event 1", start: `${thisMonth()}-03` },
          {
            title: "event 2",
            start: `${thisMonth()}-23`,
            end: `${thisMonth()}-25`,
          },
          { title: "event 3", start: "2021-12-29T10:00:00" },
        ]}
        dateClick={handleDataClick}
      />
    </div>
  );
}

export default CalendarData;
