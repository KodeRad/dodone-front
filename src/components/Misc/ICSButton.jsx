import { Button, Box } from "@mui/material";
import dayjs from "dayjs";
import { createEvents } from "ics";
import { useContext } from "react";
import { TodoContext } from "../Main/Todo";

// TODO: REFACTOR TO GET RID OF PUSHING INTO EVENTS ARRAY (MUTATING)
const getEvents = (todos) => {
  const events = [];
  todos
    .filter((todo) => todo.dueDate)
    .forEach((todo) => {
      const start = dayjs(todo.dueDate)
        .subtract(30, "minute")
        .format("YYYY-M-D-H-m")
        .split("-")
        .map((start) => +start);
      const end = dayjs(todo.dueDate)
        .format("YYYY-M-D-H-m")
        .split("-")
        .map((end) => +end);

      events.push({ title: todo.name, description: "", start, end });
    });
  return events;
};

const ICSButton = () => {
  const { todos } = useContext(TodoContext);
  const handleDownload = async () => {
    const filename = "todos.ics";
    const file = await new Promise((resolve, reject) => {
      createEvents(getEvents(todos), (error, value) => {
        if (error) {
          reject(error);
        }
        resolve(new File([value], filename, { type: "text/calendar" }));
      });
    });
    const url = URL.createObjectURL(file);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    URL.revokeObjectURL(url);
  };

  return (
    // TODO: ADD SECOND BUTTON TO CLEAR FINISHED TASKS
    <Box className="text-blue-500 text-center mt-2">
      <Button className="text-white" onClick={handleDownload}>
        Download calendar
      </Button>
    </Box>
  );
};

export default ICSButton;
