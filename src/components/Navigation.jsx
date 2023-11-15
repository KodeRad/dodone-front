import { useState, useRef } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Update from "@mui/icons-material/Update";
import NewTodo from "@mui/icons-material/AddBox";
import Calendar from "@mui/icons-material/CalendarMonth";
import Paper from "@mui/material/Paper";

export default function Navigation({
  todoFormOpen,
  handleCalendarOpen,
  handleSummaryOpen,
}) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            onClick={handleSummaryOpen}
            label="Summary"
            icon={<Update />}
          />
          <BottomNavigationAction
            onClick={todoFormOpen}
            label="New Todo"
            icon={<NewTodo />}
          />
          <BottomNavigationAction
            onClick={handleCalendarOpen}
            label="Calendar"
            icon={<Calendar />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
