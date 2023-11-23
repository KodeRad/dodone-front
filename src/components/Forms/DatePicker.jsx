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
    setTime(e);
    onTimeChange(e);
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
