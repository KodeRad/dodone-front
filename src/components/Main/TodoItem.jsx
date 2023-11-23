import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import StarBorder from "@mui/icons-material/StarBorder";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import CheckboxComponent from "../Misc/Checkbox";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import Star from "@mui/icons-material/Star";
import { TodoContext } from "./Todo";
import { useContext } from "react";

export default function TodoItem({ id, done, priority, name, dueDate }) {
  const { toggleTodo, togglePriority, handleEditForm } =
    useContext(TodoContext);

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
