import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormControl, Paper, Select, Button } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {
  getCountryCodes,
  getAllConvertRates,
} from "../../store/actions/currencyCodeActions";
import { useStyles, theme } from "./AllCurrenciesList.styles";
import { SET_BASE_COUNTRY_CODE } from "../../store/types";

export default function AllCurrenciesList() {
  const countryCodes = useSelector((state) => state.countryCodes);
  const allCountriesRates = useSelector((state) => state.allCountriesRates);
  const baseCurrency = useSelector((state) => state.baseCurrency);
  const baseCountryCode = useSelector((state) => state.baseCountryCode);

  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    getCountryCodes(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (baseCountryCode === "" && countryCodes.length > 0) {
      dispatch({ type: SET_BASE_COUNTRY_CODE, payload: countryCodes[0] });
    }
  }, [countryCodes, dispatch]);

  async function getAllRates(e) {
    e.preventDefault();
    await getAllConvertRates(dispatch, baseCountryCode);
  }

  return (
    <div>
      <Paper className={classes.paper}>
        <h1>All currencies list</h1>
        <form>
          <div>
            <FormControl
              className={classes.formControl}
              variant="outlined"
              onChange={(e) =>
                dispatch({
                  type: SET_BASE_COUNTRY_CODE,
                  payload: e.target.value,
                })
              }
            >
              <Select native value={baseCountryCode}>
                {countryCodes.map((code, index) => (
                  <option key={index} value={code}>
                    {code}
                  </option>
                ))}
              </Select>
            </FormControl>
          </div>
          <div></div>
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              color="primary"
              className={classes.submitButton}
              size="large"
              onClick={getAllRates}
            >
              Convert
            </Button>
          </ThemeProvider>
        </form>
        <List>
          <ul>
            {Object.keys(allCountriesRates).map((code, id) => (
              <ListItem key={`country-${code}`}>
                <ListItemText
                  primary={`1 ${code} = ${(1 / allCountriesRates[code]).toFixed(
                    2
                  )} ${baseCurrency}`}
                />
              </ListItem>
            ))}
          </ul>
        </List>
      </Paper>
    </div>
  );
}
