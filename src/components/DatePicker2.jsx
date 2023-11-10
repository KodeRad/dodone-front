import * as React from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "dayjs/locale/pl";
import moment from "moment";

import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function DatePicker2({ setTime }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
      <DemoContainer components={["MobileDateTimePicker"]}>
        <DemoItem label="Mobile variant">
          <MobileDateTimePicker
            onChange={(e) => {
              const timeString = e.$d.toString().slice(0, -42);
              const momentTime = moment(timeString).format(
                "YYYY-MM-DDTHH:mm:ss"
              );

              setTime(momentTime);
            }}
            defaultValue={moment()}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
