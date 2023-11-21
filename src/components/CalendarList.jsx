import React, { useContext, useEffect, useRef } from "react";
import { Calendar } from "@fullcalendar/core";
import listPlugin from "@fullcalendar/list";
import dayGridPlugin from "@fullcalendar/daygrid";
import { TodoContext } from "./Todo";

export default function CalendarList() {
  const { todos } = useContext(TodoContext);

  const calendarSmall = useRef(null);
  const calendarLarge = useRef(null);

  // LIST CALENDAR VIEW
  useEffect(() => {
    const calendar = new Calendar(calendarSmall.current, {
      plugins: [listPlugin, dayGridPlugin],
      headerToolbar: {
        left: "prev,next today",
        right: "dayGridMonth,timeGridDay,listWeek",
      },
      initialView: "listWeek",
      contentHeight: "auto",

      events: todos.map((todo) => {
        return {
          title: todo.name,
          start: todo?.dueDate,
        };
      }),
      eventDisplay: "auto",
      eventColor: "rgb(59 130 246)",
      eventBorderColor: "rgb(59 130 246)",
      eventTextColor: "rgb(59 130 246)",
      eventBackgroundColor: "rgb(219 234 254)",

      eventTimeFormat: {
        // like '14:30:00'
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      },
    });

    calendar.render();

    return () => {
      calendar.destroy();
    };
  }, [todos]);

  // MONTH CALENDAR VIEW
  useEffect(() => {
    const calendar = new Calendar(calendarLarge.current, {
      plugins: [dayGridPlugin, listPlugin],
      headerToolbar: {
        left: "prev,next today",
        right: "dayGridMonth,timeGridDay,listWeek",
      },
      initialView: "dayGridMonth",
      contentHeight: "auto",
      events: todos.map((todo) => {
        return {
          title: todo.name,
          start: todo?.dueDate,
        };
      }),
      eventDisplay: "auto",
      eventColor: "rgb(59 130 246)",
      eventBorderColor: "rgb(59 130 246)",
      eventTextColor: "rgb(59 130 246)",
      eventBackgroundColor: "rgb(219 234 254)",
    });

    calendar.render();

    return () => {
      calendar.destroy();
    };
  }, [todos]);

  return (
    <>
      <div className="block sm:hidden" ref={calendarSmall} />
      <div className="hidden sm:block " ref={calendarLarge} />
    </>
  );
}
