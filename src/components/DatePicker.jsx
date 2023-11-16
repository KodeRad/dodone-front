import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import "dayjs/locale/pl";
//TODO: USE ONLY ONE LIBRARY FOR TIME
import moment from "moment";
import dayjs from "dayjs";

export default function DatePicker({ setTime }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
      <DemoContainer components={["DateTimePicker"]}>
        <DemoItem label="Mobile variant">
          <DateTimePicker
            disablePast
            onChange={(e) => {
              console.log(e);
              const formattedDate = moment(e.$d).format("YYYY-MM-DD HH:mm:ss");
              setTime(formattedDate);
            }}
            defaultValue={dayjs(new Date())}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
