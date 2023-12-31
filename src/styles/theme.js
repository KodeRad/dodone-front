import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(96, 165, 250)", // Your primary color
    },
    secondary: {
      main: "rgb(147, 197, 253)", // Your secondary color
    },
    strongBlue: {
      main: "rgb(59, 130, 246)", // Your extra blue color
    },
  },
  typography: {
    primary: {
      color: "rgb(59, 130, 246)", // Use .primary color
    },
    secondary: {
      color: "rgb(239 246 255)", // Use .primary color
    },
    dark: {
      color: "rgb(50, 50, 50)", // Use .primary color
    },
  },
});

export default theme;
