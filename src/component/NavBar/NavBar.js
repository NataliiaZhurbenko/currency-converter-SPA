import { useState, useEffect } from "react";
import { Route, Switch, Link, useLocation } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import CurrencyConverter from "../CurrencyConverter/CurrencyConverter";
import AllCurrenciesList from "../AllCurrenciesList/AllCurrenciesList";
import { useStyles, StyledTab, StyledTabs } from "./NavBar.style";

export default function NavBar() {
  const [tabId, setTabId] = useState(0);

  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
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
            to="/"
          />
          <StyledTab
            label="All Currencies List"
            component={Link}
            to="/all-currencies-list"
          />
        </StyledTabs>
        <Typography className={classes.padding} />
      </div>
      <Switch>
        <Route exact path="/" component={CurrencyConverter} />
        <Route
          exact
          path="/all-currencies-list"
          component={AllCurrenciesList}
        />
      </Switch>
    </div>
  );
}
