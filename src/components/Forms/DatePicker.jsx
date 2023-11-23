import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import "dayjs/locale/pl";
import { forwardRef, useContext, useEffect } from "react";
import { TodoContext } from "../Main/Todo";
import dayjs from "dayjs";

const DatePicker = forwardRef(({ onTimeChange, setInitialTime }, ref) => {
  const { time, setTime } = useContext(TodoContext);

  const handleTimeChange = (e) => {
    // const formattedDate = dayjs(e).format("YYYY-MM-DD HH:mm:ss");
    setTime(e);
    onTimeChange(dayjs(e).format("YYYY-MM-DD HH:mm:ss"));
  };

  // useEffect(() => {
  //   setInitialTime(dayjs(e).format("YYYY-MM-DD HH:mm:ss"));
  // }, []);

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
