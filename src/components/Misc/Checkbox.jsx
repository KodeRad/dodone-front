import { Star, StarBorder } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import { useState } from "react";

export default function CheckboxComponent({
  checkedValue,
  icon,
  checkedIcon,
  onChange,
  children,
}) {
  const handleChange = () => {
    if (onChange) {
      onChange();
    }
  };
  return (
    // CONST [CHECKED, SETCHECKED] = useState();

    <Checkbox
      checked={checkedValue}
      onChange={handleChange}
      sx={{
        color: "rgb(59 130 246)",
        "&.Mui-checked": {
          color: "rgb(59 130 246)",
        },
      }}
      icon={icon}
      checkedIcon={checkedIcon}
    >
      {children}
    </Checkbox>
  );
}
