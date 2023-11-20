import TodoItem from "./TodoItem";
import List from "@mui/material/List";
import { TodoContext } from "./Todo";
import { useContext } from "react";
import DownloadButton from "./ICSButton";

export default function TodoList() {
  const { todos } = useContext(TodoContext);
  return (
    <List
      // className="bg-blue-300"
      sx={{
        width: "100%",
        maxWidth: 580,
        backgroundColor: "rgb(147 197 253)",
        marginTop: "18vh",
        marginBottom: "8vh",
        borderRadius: "10px",
      }}
    >
      {/* TODO: CREATE A NICER ADNOTATION IF NO TODOS */}
      {todos.length === 0 && "THERE ARE NO TODOS. ADD SOME PLEASE!"}
      {/* TODO: DO THE SORTING FOR DONE */}
      {todos
        .sort((a, b) => {
          // First, prioritize todos with done: false
          if (a.done && !b.done) {
            return 1; // a should come after b
          }

          if (!a.done && b.done) {
            return -1; // a should come before b
          }

          // If both have the same done status, then sort by priority
          return a.priority === b.priority ? 0 : a.priority ? -1 : 1;
        })
        .map((todo) => {
          return <TodoItem {...todo} key={todo.id} />;
        })}
      <DownloadButton />
    </List>
  );
}
