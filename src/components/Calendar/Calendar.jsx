import React, { useContext, useEffect, useRef } from "react";
import { Calendar } from "@fullcalendar/core";
import listPlugin from "@fullcalendar/list";
import dayGridPlugin from "@fullcalendar/daygrid";
import { TodoContext } from "../Main/Todo";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";

export default function CalendarList() {
  const { todos } = useContext(TodoContext);

  const calendarSmall = useRef(null);
  const calendarLarge = useRef(null);

  // TODO: useMediaQuery() or smth else to get just one useEffect
  // LIST CALENDAR VIEW
  useEffect(() => {
    const calendar = new Calendar(calendarSmall.current, {
      plugins: [listPlugin, dayGridPlugin, bootstrap5Plugin],
      headerToolbar: {
        left: "prev,next today",
        right: "dayGridMonth,listWeek",
      },
      initialView: "listWeek",
      contentHeight: "auto",
      eventTimeFormat: {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      },

      events: todos
        .filter((todo) => !todo.done)
        .map((todo) => {
          return {
            title: todo.name,
            start: todo?.dueDate,
          };
        }),
      eventDisplay: "auto",
      dayMaxEvents: true,
      themeSystem: "bootstrap5",
    });

    calendar.render();

    return () => {
      calendar.destroy();
    };
  }, [todos]);
}
