import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      // main: '#00796b',
      // main: '#1976d2',
      main: "#1b3764",
    },
    secondary: {
      // main: '#ff9800',
      main: "#fdd835",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
  // typography: {
  //   fontFamily: [
  //     'Chilanka',
  //     'cursive',
  //   ].join(','),
  // },
});

export default theme;
