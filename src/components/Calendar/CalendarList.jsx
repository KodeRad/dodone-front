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

  // MONTH CALENDAR VIEW
  useEffect(() => {
    const calendar = new Calendar(calendarLarge.current, {
      plugins: [dayGridPlugin, listPlugin, bootstrap5Plugin],
      headerToolbar: {
        left: "prev,next today",
        right: "dayGridMonth,listWeek",
      },
      initialView: "dayGridMonth",
      contentHeight: "auto",
      eventTimeFormat: {
        // like '14:30:00'
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
      themeSystem: "bootstrap5",

      // eventColor: "rgb(59 130 246)",
      // eventBorderColor: "rgb(59 130 246)",
      // eventTextColor: "rgb(59 130 246)",
      // eventBackgroundColor: "rgb(219 234 254)",

      dayMaxEvents: true,
      dayMaxEventRows: true, // for all non-TimeGrid views
      views: {
        timeGrid: {
          dayMaxEventRows: 2, // adjust to 6 only for timeGridWeek/timeGridDay
        },
      },
    });

    calendar.render();

    return () => {
      calendar.destroy();
    };
  }, [todos]);

  return (
    <>
      <div className="block lg:hidden" ref={calendarSmall} />
      <div className="hidden lg:block " ref={calendarLarge} />
    </>
  );
}
