import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme) => ({
  paper: {
    background: "linear-gradient(45deg, #b388ff 30%, #7c4dff 90%)",
    marginTop: theme.spacing(15),
    width: theme.spacing(55),
    overflow: "auto",
    maxHeight: theme.spacing(65),
    textAlign: "center",
    margin: "auto",
    "& > h1": {
      color: green[300],
      textTransform: "uppercase",
    },
  },
  submitButton: {
    color: green[50],
    textTransform: "uppercase",
    marginBottom: theme.spacing(2),
  },
  formControl: {
    width: theme.spacing(12),
    marginBottom: theme.spacing(3),
  },
}));

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[600],
    },
  },
});
