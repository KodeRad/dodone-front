import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Star from "@mui/icons-material/Star";
import StarBorder from "@mui/icons-material/StarBorder";
import { useContext, useEffect } from "react";
import { TodoContext } from "./Todo";
import CheckboxComponent from "../Misc/Checkbox";

// TODO: REFACTOR:
export default function TodoItem({ todo, id, done, priority, name, dueDate }) {
  const { toggleTodo, togglePriority, handleEditForm } =
    useContext(TodoContext);

  // console.log(todo);

  // const { id, done, priority, name, dueDate } = props.todo;
  // console.log(id, done, priority, name, dueDate);
  // console.log(todo.id, todo.done, todo.priority, todo.name, todo.dueDate);
  // console.log(todo);

  return (
    <ListItem className="bg-blue-100 text-blue-50" key={id}>
      <IconButton
        edge="start"
        onClick={(e) => {
          toggleTodo(id, e.target.checked);
        }}
      >
        <CheckboxComponent checkedValue={done} />
      </IconButton>
      <ListItemText
        className="text-blue-500 bg-blue-100"
        onClick={() => {
          handleEditForm(id, name, priority, dueDate);
        }}
        primary={name}
      />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          onClick={(e) => {
            togglePriority(id, e.target.checked);
          }}
        >
          <CheckboxComponent
            checkedValue={priority}
            icon={<StarBorder />}
            checkedIcon={<Star />}
          />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
