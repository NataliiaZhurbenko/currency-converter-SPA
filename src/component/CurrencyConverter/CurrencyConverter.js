import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FormControl,
  Paper,
  Select,
  TextField,
  Button,
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import {
  getCountryCodes,
  getConvertRate,
} from "../../store/actions/currencyCodeActions";
import { useStyles, theme } from "./CurrencyConverter.styles";

import {
  SET_AMOUNT_FROM,
  SET_AMOUNT_FROM_ERROR,
  SET_COUNTRY_CODE_FROM,
  SET_COUNTRY_CODE_TO,
} from "../../store/types";

export default function CurrencyConverter() {
  const countryCodes = useSelector((state) => state.countryCodes);
  const amountTo = useSelector((state) => state.amountTo);
  const countryCodeFrom = useSelector((state) => state.countryCodeFrom);
  const countryCodeTo = useSelector((state) => state.countryCodeTo);
  const amountFrom = useSelector((state) => state.amountFrom);
  const [localAmountFrom, setLocalAmountFrom] = useState(null);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    getCountryCodes(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (
      countryCodeFrom === "" &&
      countryCodeTo === "" &&
      countryCodes.length > 0
    ) {
      dispatch({ type: SET_COUNTRY_CODE_FROM, payload: countryCodes[0] });
      dispatch({ type: SET_COUNTRY_CODE_TO, payload: countryCodes[0] });
    }
  }, [dispatch, countryCodes]);

  async function convert(e) {
    e.preventDefault();
    if (amountFrom === "" || isNaN(Number(amountFrom))) {
      dispatch({ type: SET_AMOUNT_FROM_ERROR });
    } else {
      await getConvertRate(dispatch, countryCodeFrom, countryCodeTo);
    }
  }

  return (
    <div>
      <Paper className={classes.paper}>
        <h1>Currency Converter</h1>
        <form>
          <div>
            <TextField
              id="standard-select-currency"
              variant="outlined"
              label="amount"
              value={localAmountFrom === null ? amountFrom : localAmountFrom}
              onChange={(e) => setLocalAmountFrom(e.target.value)}
              onBlur={(e) =>
                dispatch({ type: SET_AMOUNT_FROM, payload: e.target.value })
              }
              autoComplete="off"
            />
            <FormControl
              className={classes.formControl}
              variant="outlined"
              onChange={(e) =>
                dispatch({
                  type: SET_COUNTRY_CODE_FROM,
                  payload: e.target.value,
                })
              }
            >
              <Select native value={countryCodeFrom}>
                {countryCodes.map((code, index) => (
                  <option key={index} value={code}>
                    {code}
                  </option>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            <TextField
              id="standard-select-currency-native"
              variant="outlined"
              aria-readonly
              label="native currency amount"
              value={amountTo}
            />
            <FormControl
              className={classes.formControl}
              variant="outlined"
              onChange={(e) =>
                dispatch({ type: SET_COUNTRY_CODE_TO, payload: e.target.value })
              }
            >
              <Select native value={countryCodeTo}>
                {countryCodes.map((code, index) => (
                  <option key={index} value={code}>
                    {code}
                  </option>
                ))}
              </Select>
            </FormControl>
          </div>
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              color="primary"
              className={classes.submitButton}
              size="large"
              onClick={convert}
            >
              Convert
            </Button>
          </ThemeProvider>
        </form>
      </Paper>
    </div>
  );
}
