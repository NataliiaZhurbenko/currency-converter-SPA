import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme) => ({
  paper: {
    background: "linear-gradient(45deg, #b388ff 30%, #7c4dff 90%)",
    marginTop: theme.spacing(12),
    paddingTop: theme.spacing(0.5),
    width: theme.spacing(55),
    height: theme.spacing(38),
    textAlign: "center",
    margin: "auto",
    "& > h1": {
      color: green[300],
      textTransform: "uppercase",
    },
    "& .MuiTextField-root": {
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(3),
    },
  },
  submitButton: {
    color: green[50],
    textTransform: "uppercase",
  },
  formControl: {
    width: theme.spacing(12),
  },
}));

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[600],
    },
  },
});
