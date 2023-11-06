import { useState } from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const todayAtNoon = dayjs().set("hour", 12).startOf("hour");
const todayAt9AM = dayjs().set("hour", 9).startOf("hour");

export default function DatePicker({ time, setTime }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateTimePicker"]}>
        <DemoItem label="DateTimePicker">
          <DateTimePicker
            onChange={(e) => {
              const selectedDate = dayjs(e);
              setTime(selectedDate);
            }}
            value={time}
            defaultValue={todayAtNoon}
            maxDateTime={todayAt9AM}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
