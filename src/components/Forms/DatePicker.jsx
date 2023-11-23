import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import "dayjs/locale/pl";
import { forwardRef, useContext } from "react";
import { TodoContext } from "../Main/Todo";

const DatePicker = forwardRef(({ onTimeChange }, ref) => {
  const { time, setTime } = useContext(TodoContext);

  const handleTimeChange = (e) => {
    // TODO: GET RID OF SECONDS FROM FORMAT BOTH IN FE AND BE
    // const formattedDate = dayjs(e).format("YYYY-MM-DD HH:mm:ss");
    setTime(e);
    onTimeChange(e); // Call the callback function with the selected time
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
      <DemoContainer components={["DateTimePicker"]}>
        <DemoItem>
          <DateTimePicker
            ref={ref}
            disablePast
            onChange={handleTimeChange}
            value={time}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
});

export default DatePicker;
