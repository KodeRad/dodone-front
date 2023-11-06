import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Star from "@mui/icons-material/Star";
import StarEmpty from "@mui/icons-material/StarBorder";

export default function TodoItem({
  id,
  done,
  priority,
  name,
  toggleTodo,
  togglePriority,
  deleteTodo,
}) {
  // TODO: CONVERT DONE AND PRIORITY TO TRUE OR FALSE

  return (
    <ListItem
      key={id}
      disablePadding
      secondaryAction={
        // <ListItemButton
        //   role={undefined}
        //   onClick={(e) => togglePriority(id, e.target.checked)}
        //   dense
        // >
        //   <ListItemIcon>
        //     <Checkbox edge="end" checked={priority} disableRipple />
        //   </ListItemIcon>
        // </ListItemButton>
        <IconButton
          checked={priority}
          onClick={(e) => {
            togglePriority(id, e.target.checked);
            console.log(`Priority: ${priority}`);
            console.log(e.target);
          }}
          edge="end"
          aria-label="comments"
        >
          {priority ? <Star /> : <StarEmpty />}
        </IconButton>
      }
    >
      {/* // Start */}
      <ListItemButton
        role={undefined}
        onClick={(e) => toggleTodo(id, e.target.checked)}
        dense
      >
        <ListItemIcon>
          <Checkbox edge="start" checked={done} disableRipple />
        </ListItemIcon>
        <ListItemText id={id} primary={name} />
      </ListItemButton>
      {/* End */}
    </ListItem>
  );
}
