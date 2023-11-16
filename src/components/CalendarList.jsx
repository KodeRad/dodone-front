import React, { useContext, useEffect, useRef } from "react";
import { Calendar } from "@fullcalendar/core";
import listPlugin from "@fullcalendar/list";
import { TodoContext } from "./Todo";

export default function CalendarList() {
  const { todos } = useContext(TodoContext);

  // The useRef hook is used to create a reference to the div element.
  const calendarRef = useRef(null);

  useEffect(() => {
    const calendar = new Calendar(calendarRef.current, {
      plugins: [listPlugin],
      initialView: "listWeek",
      events: todos.map((todo) => {
        return {
          title: todo.name,
          start: todo?.dueDate,
        };
      }),
    });

    calendar.render();

    return () => {
      calendar.destroy();
    };
  }, [todos]);

  return <div ref={calendarRef} />;
}
