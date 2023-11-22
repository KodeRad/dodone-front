import { Star, StarBorder } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import { useState } from "react";

export default function CheckboxComponent({ checkedValue, icon, checkedIcon }) {
  return (
    // CONST [CHECKED, SETCHECKED] = useState();

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
