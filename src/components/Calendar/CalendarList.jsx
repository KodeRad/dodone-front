import React, { useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import CalendarComponent from "./CalendarComponent";

const CalendarList = () => {
  const listViewRef = useRef(null);
  const monthViewRef = useRef(null);

  const listView = "listWeek";
  const monthView = "dayGridMonth";

  return (
    <>
      <div className="block lg:hidden">
        <CalendarComponent initialView={listView} ref={listViewRef} />
      </div>
      <div className="hidden lg:block">
        <CalendarComponent initialView={monthView} ref={monthViewRef} />
      </div>
    </>
  );
};

export default CalendarList;
