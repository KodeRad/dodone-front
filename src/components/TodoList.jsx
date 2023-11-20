import TodoItem from "./TodoItem";
import List from "@mui/material/List";
import { TodoContext } from "./Todo";
import { useContext } from "react";

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
        .sort((low, high) => high.priority - low.priority)
        .map((todo) => {
          return <TodoItem {...todo} key={todo.id} />;
        })}
    </List>
  );
}
