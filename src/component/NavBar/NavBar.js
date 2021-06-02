import { useState, useEffect } from "react";
import { Route, Switch, Link, useLocation } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import CurrencyConverter from "../CurrencyConverter/CurrencyConverter";
import AllCurrenciesList from "../AllCurrenciesList/AllCurrenciesList";
import { useStyles, StyledTab, StyledTabs } from "./NavBar.style";

const ROOT_PATH = process.env.REACT_APP_ROOT_PATH;
const CURRENCY_CONVERTER_PATH = `${ROOT_PATH}/`;
const ALL_CURRENCIES_LIST_PATH = `${ROOT_PATH}/all-currencies-list`;

export default function NavBar() {
  const [tabId, setTabId] = useState(0);

  const location = useLocation();
  useEffect(() => {
    if (location.pathname === CURRENCY_CONVERTER_PATH) {
      setTabId(0);
    } else {
      setTabId(1);
    }
  }, [location]);

  const handleChange = (event, nextTabId) => {
    setTabId(nextTabId);
  };
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.navbar}>
        <StyledTabs value={tabId} onChange={handleChange}>
          <StyledTab
            selected
            label="Currency Converter"
            component={Link}
            to={CURRENCY_CONVERTER_PATH}
          />
          <StyledTab
            label="All Currencies List"
            component={Link}
            to={ALL_CURRENCIES_LIST_PATH}
          />
        </StyledTabs>
        <Typography className={classes.padding} />
      </div>
      <Switch>
        <Route
          exact
          path={CURRENCY_CONVERTER_PATH}
          component={CurrencyConverter}
        />
        <Route
          exact
          path={ALL_CURRENCIES_LIST_PATH}
          component={AllCurrenciesList}
        />
      </Switch>
    </div>
  );
}
