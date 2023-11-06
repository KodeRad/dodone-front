import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Star from "@mui/icons-material/Star";
import StarEmpty from "@mui/icons-material/StarBorder";

export default function TodoItem({
  id,
  done,
  priority,
  name,
  toggleTodo,
  togglePriority,
}) {
  return (
    <ListItem key={id}>
      <IconButton
        edge="start"
        checked={done}
        onClick={(e) => {
          toggleTodo(id, e.target.checked);
        }}
      >
        <Checkbox
          sx={{
            color: "rgb(59 130 246)",
            "&.Mui-checked": {
              color: "rgb(59 130 246)",
            },
          }}
        />
      </IconButton>
      {/* TODO: MODAL WINDOW EDIT ON CLICK */}
      <ListItemText primary={name} />
      <ListItemSecondaryAction>
        <IconButton
          checked={priority}
          edge="end"
          onClick={(e) => {
            togglePriority(id, e.target.checked);
          }}
        >
          <Checkbox
            sx={{
              color: "rgb(59 130 246)",
              "&.Mui-checked": {
                color: "rgb(59 130 246)",
              },
            }}
            icon={<StarEmpty />}
            checkedIcon={<Star />}
          />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
