import TodoItem from "./TodoItem";
import List from "@mui/material/List";

export default function TodoList({
  todos,
  toggleTodo,
  deleteTodo,
  togglePriority,
}) {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {/* {todos.length === 0 && "No Todos"} */}
      {todos.map((todo) => {
        return (
          <TodoItem
            {...todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            togglePriority={togglePriority}
            key={todo.id}
          />
        );
      })}
    </List>
  );
}
