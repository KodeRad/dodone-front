import React, { useContext, useEffect, useRef, forwardRef } from "react";
import { Calendar } from "@fullcalendar/core";
import listPlugin from "@fullcalendar/list";
import dayGridPlugin from "@fullcalendar/daygrid";
import { TodoContext } from "../Main/Todo";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";

const CalendarComponent = forwardRef(({ initialView }, ref) => {
  const { todos } = useContext(TodoContext);

  useEffect(() => {
    const calendar = new Calendar(ref.current, {
      plugins: [listPlugin, dayGridPlugin, bootstrap5Plugin],
      headerToolbar: {
        left: "prev,next today",
        right: "dayGridMonth,listWeek",
      },
      initialView: initialView,
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
      themeSystem: "bootstrap5",

      dayMaxEvents: true,
      dayMaxEventRows: true,
      views: {
        timeGrid: {
          dayMaxEventRows: 2,
        },
      },
    });

    calendar.render();

    return () => {
      calendar.destroy();
    };
  }, [todos, initialView, ref]);

  return (
    <>
      <div ref={ref} />
    </>
  );
});

export default CalendarComponent;
