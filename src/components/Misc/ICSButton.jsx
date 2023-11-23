import { Button, Box } from "@mui/material";
import { TodoContext } from "../Main/Todo";
import { createEvents } from "ics";
import { useContext } from "react";
import dayjs from "dayjs";

const getEvents = (todos) => {
  const events = todos
    .filter((todo) => todo.dueDate)
    .map((todo) => {
      const start = dayjs(todo.dueDate)
        .subtract(30, "minute")
        .format("YYYY-M-D-H-m")
        .split("-")
        .map((start) => +start);
      const end = dayjs(todo.dueDate)
        .format("YYYY-M-D-H-m")
        .split("-")
        .map((end) => +end);

      return { title: todo.name, description: "", start, end };
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
    <Box className="mt-2 text-center text-blue-500">
      <Button className="text-white" onClick={handleDownload}>
        Download ICS file
      </Button>
    </Box>
  );
};

export default ICSButton;
