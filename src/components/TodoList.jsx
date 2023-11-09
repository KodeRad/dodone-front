import TodoItem from "./TodoItem";
import List from "@mui/material/List";

export default function TodoList({
  todos,
  toggleTodo,
  deleteTodo,
  togglePriority,
  editTodoFormOpen,
}) {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {/* CREATE A NICER ADNOTATION IF NO TODOS */}
      {todos.length === 0 && "THERE ARE NO TODOS. ADD SOME PLEASE!"}
      {/* TODO: finish sorting */}
      {todos
        .sort((low, high) => high.priority - low.priority)
        .map((todo) => {
          return (
            <TodoItem
              {...todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              togglePriority={togglePriority}
              editTodoFormOpen={editTodoFormOpen}
              key={todo.id}
            />
          );
        })}
    </List>
  );
}
