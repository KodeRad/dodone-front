import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import "dayjs/locale/pl";
import dayjs from "dayjs";
import { useContext } from "react";
import { TodoContext } from "./Todo";

export default function DatePicker() {
  // WHAT STATE WILL TELL ME? EDITOPEN FOR EG
  const { editTodoOpen, editedDueDate, time, setTime } =
    useContext(TodoContext);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
      <DemoContainer components={["DateTimePicker"]}>
        <DemoItem label="Mobile variant">
          <DateTimePicker
            disablePast
            onChange={(e) => {
              // TODO: GET RID OF SECONDS FROM FORMAT BOTH IN FE AND BE
              const formattedDate = dayjs(e).format("YYYY-MM-DD HH:mm:ss");
              // setTime(formattedDate);
              setTime(e);
            }}
            // GET THE VALUE FROM THE EDITED TASK
            // IF EDIT = DEFAULT VALUE = EDITEDTASK TIMEVALUE
            // IF NEW TASK = DEFAULT VALUE NEW DATE
            // get the state so I can check it?
            // how to grab this todo.dueDate
            // defaultValue={editTodoOpen ? editedDueDate : dayjs(new Date())}
            value={time}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
