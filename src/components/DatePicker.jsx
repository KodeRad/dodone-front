import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import "dayjs/locale/pl";
import dayjs from "dayjs";

export default function DatePicker({ setTime }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
      <DemoContainer components={["DateTimePicker"]}>
        <DemoItem label="Mobile variant">
          <DateTimePicker
            disablePast
            onChange={(e) => {
              // TODO: GET RID OF SECONDS FROM FORMAT BOTH IN FE AND BE
              const formattedDate = dayjs(e).format("YYYY-MM-DD HH:mm:ss");
              console.log(formattedDate);
              setTime(formattedDate);
            }}
            defaultValue={dayjs(new Date())}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
