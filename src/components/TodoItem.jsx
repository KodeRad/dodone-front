import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Star from "@mui/icons-material/Star";
import StarBorder from "@mui/icons-material/StarBorder";
import { useContext, useEffect } from "react";
import { TodoContext } from "./Todo";
import CheckboxComponent from "./Checkbox";

export default function TodoItem({ id, done, priority, name, dueDate }) {
  const { toggleTodo, togglePriority, editTodoFormOpen } =
    useContext(TodoContext);

  return (
    <ListItem key={id}>
      <IconButton
        edge="start"
        onClick={(e) => {
          toggleTodo(id, e.target.checked);
        }}
      >
        {/* // TODO: CHECKBOX AS A SEPARATE COMPONENT WITH CHILDREN PROPS */}
        <CheckboxComponent checkedValue={done} />
        {/* <Checkbox
          checked={done}
          sx={{
            color: "rgb(59 130 246)",
            "&.Mui-checked": {
              color: "rgb(59 130 246)",
            },
          }}
        /> */}
      </IconButton>
      <ListItemText
        onClick={() => {
          // TODO: CHECK WHERE THE NAME GOES AND CHANGE
          // FROM PLACEHOLDER TO THE VALUE THAT YOU CAN CHANGE OR NOT
          // I can send ID to my Todo
          // component and then pass it to EditTodoForm.jsx
          editTodoFormOpen(id, name, priority, dueDate);
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
          <Checkbox
            checked={priority}
            sx={{
              color: "rgb(59 130 246)",
              "&.Mui-checked": {
                color: "rgb(59 130 246)",
              },
            }}
            icon={<StarBorder />}
            checkedIcon={<Star />}
          />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
