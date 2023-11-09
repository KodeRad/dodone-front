import React, { useEffect, useRef } from "react";
import { Calendar } from "@fullcalendar/core";
import listPlugin from "@fullcalendar/list";

const CalendarList = ({ todos }) => {
  const calendarRef = useRef(null);

  useEffect(() => {
    const calendar = new Calendar(calendarRef.current, {
      plugins: [listPlugin],
      initialView: "listWeek",
      events: todos.map((todo) => {
        return {
          title: todo.name,
          start: todo?.dueDate?.slice(0, -7),
        };
      }),
    });

    calendar.render();

    return () => {
      calendar.destroy();
    };
  }, [todos]);

  // TODO: WHY DO I NEED useRef?
  return <div ref={calendarRef} />;
};

export default CalendarList;
