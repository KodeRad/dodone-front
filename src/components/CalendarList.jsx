import React, { useContext, useEffect, useRef } from "react";
import { Calendar } from "@fullcalendar/core";
import listPlugin from "@fullcalendar/list";
import dayGridPlugin from "@fullcalendar/daygrid";
import { TodoContext } from "./Todo";

export default function CalendarList() {
  const { todos } = useContext(TodoContext);

  // The useRef hook is used to create a reference to the div element.
  const calendarRef = useRef(null);

  // TODO: ADD DEBOUNCING?
  // REFACTOR: CHANGEVIEW DOESN'T WORK
  function handleResize() {
    const calendar = calendarRef.current;
    if (calendar) {
      const view = window.innerWidth < 600 ? "listWeek" : "dayGridMonth";
      console.log(view);
      // calendar.changeView("listWeek");
    }
  }

  useEffect(() => {
    const calendar = new Calendar(calendarRef.current, {
      plugins: [listPlugin, dayGridPlugin],
      initialView: "listWeek",
      events: todos.map((todo) => {
        return {
          title: todo.name,
          start: todo?.dueDate,
        };
      }),
    });

    calendar.render();

    function resizeListener() {
      handleResize();
    }

    window.addEventListener("resize", resizeListener);

    return () => {
      calendar.destroy();
      window.removeEventListener("resize", resizeListener);
    };
  }, [todos]);

  useEffect(() => {
    handleResize();
  }, []);

  return <div ref={calendarRef} />;
}
