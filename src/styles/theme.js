// Colors
// blue-50 rgb(239 246 255)
// bg-blue-100 rgb(219 234 254)
// blue-200 rgb(191 219 254)
// blue-300 rgb(147 197 253)
// blue-400 rgb(96 165 250)
// blue-500 rgb(59 130 246)

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(96, 165, 250)",
    },
    secondary: {
      main: "rgb(147, 197, 253)",
    },
    strongBlue: {
      main: "rgb(59, 130, 246)",
    },
  },
  typography: {
    primary: {
      color: "rgb(59, 130, 246)",
    },
    secondary: {
      color: "rgb(239 246 255)",
    },
    dark: {
      color: "rgb(50, 50, 50)",
    },
  },
});

export default theme;
