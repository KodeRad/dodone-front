import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Star from "@mui/icons-material/Star";
import StarBorder from "@mui/icons-material/StarBorder";
import { useContext, useEffect } from "react";
import { TodoContext } from "./Todo";
import CheckboxComponent from "./Misc/Checkbox";
import dayjs from "dayjs";

export default function TodoItem({ id, done, priority, name, dueDate }) {
  const { toggleTodo, togglePriority, handleEditForm } =
    useContext(TodoContext);

  // console.log(todo);

  return (
    <ListItem className="bg-blue-100 text-blue-50" key={id}>
      <IconButton
        edge="start"
        onClick={(e) => {
          toggleTodo(id, e.target.checked);
        }}
      >
        {/* // REFACTOR: CHECKBOX AS A SEPARATE COMPONENT WITH CHILDREN PROPS */}
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
        className="bg-blue-100 text-blue-500"
        // REFACTOR: I am sending info about the task I am editing to parent component
        onClick={() => {
          handleEditForm(id, name, priority, dueDate);
        }}
        // TODO: ADD DUEDATE TO BROWSER VIEW
        // primary={`${name} due to: ${dayjs(dueDate).format("YYYY-M-D-H-m")}`}
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
