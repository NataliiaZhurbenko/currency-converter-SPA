import { useState, useEffect } from "react";
import { Route, Switch, Link, useLocation } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import CurrencyConverter from "../CurrencyConverter/CurrencyConverter";
import AllCurrenciesList from "../AllCurrenciesList/AllCurrenciesList";
import { useStyles, StyledTab, StyledTabs } from "./NavBar.style";

const ROOT_PATH = process.env.REACT_APP_ROOT_PATH;
const CURRENCY_CONVERTER_HASH = "";
const ALL_CURRENCIES_LIST_HASH = "#all-currencies-list";

export default function NavBar() {
  const [tabId, setTabId] = useState(0);

  const location = useLocation();
  useEffect(() => {
    if (location.hash === CURRENCY_CONVERTER_HASH) {
      setTabId(0);
    } else {
      setTabId(1);
    }
  }, [location]);

  const handleTabChange = (event, nextTabId) => {
    setTabId(nextTabId);
  };
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.navbar}>
        <StyledTabs value={tabId} onChange={handleTabChange}>
          <StyledTab
            selected
            label="Currency Converter"
            component={Link}
            to={`${ROOT_PATH}${CURRENCY_CONVERTER_HASH}`}
          />
          <StyledTab
            label="All Currencies List"
            component={Link}
            to={`${ROOT_PATH}${ALL_CURRENCIES_LIST_HASH}`}
          />
        </StyledTabs>
        <Typography className={classes.padding} />
      </div>
      <Route
        exact
        path={ROOT_PATH}
        component={({ location }) =>
          location.hash === CURRENCY_CONVERTER_HASH && <CurrencyConverter />
        }
      />
      <Route
        exact
        path={ROOT_PATH}
        component={({ location }) =>
          location.hash === ALL_CURRENCIES_LIST_HASH && <AllCurrenciesList />
        }
      />
    </div>
  );
}
