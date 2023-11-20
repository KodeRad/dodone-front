import React, { useContext, useEffect, useRef } from "react";
import { Calendar } from "@fullcalendar/core";
import listPlugin from "@fullcalendar/list";
import dayGridPlugin from "@fullcalendar/daygrid";
import { TodoContext } from "./Todo";

export default function CalendarList() {
  const { todos } = useContext(TodoContext);

  const calendarSmall = useRef(null);
  const calendarLarge = useRef(null);

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
    });

    calendar.render();

    return () => {
      calendar.destroy();
    };
  }, [todos]);

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
