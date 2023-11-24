import { useContext, useEffect, useState } from "react";
import DownloadButton from "../Misc/ICSButton";
import { Box, Button } from "@mui/material";
import List from "@mui/material/List";
import { TodoContext } from "./Todo";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { todos } = useContext(TodoContext);
  const [leftTodos, setLeftTodos] = useState([]);

  useEffect(() => {
    setLeftTodos(todos.filter((todo) => !todo.done));
  }, [todos]);

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 580,
        backgroundColor: "rgb(147 197 253)",
        marginTop: "18vh",
        marginBottom: "8vh",
        borderRadius: "10px",
      }}
    >
      {leftTodos
        .sort((a, b) => b.priority - a.priority)
        .map((todo) => {
          return <TodoItem {...todo} key={todo.id} />;
        })}
      {leftTodos.length === 0 ? (
        <Box className="p-1 mt-2 text-center text-blue-50">U DON ;)</Box>
      ) : (
        <DownloadButton />
      )}
    </List>
  );
}
