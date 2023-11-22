import { Star, StarBorder } from "@mui/icons-material";
import { Checkbox } from "@mui/material";

export default function CheckboxComponent({ checkedValue, icon, checkedIcon }) {
  return (
    <Checkbox
      checked={checkedValue}
      sx={{
        color: "rgb(59 130 246)",
        "&.Mui-checked": {
          color: "rgb(59 130 246)",
        },
      }}
      icon={icon}
      checkedIcon={checkedIcon}
    />
  );
}
