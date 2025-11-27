import { Grid, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import NavBar from "./NavBar";
import { ROUTES } from "../../utils/endpoints";
import routes from "../../utils/routes";
import CustomSnackBar from "./CustomSnackBar";

const useStyle = makeStyles((theme: Theme) => ({
  layout: {},
}));

interface LayoutProps {
  className?: string;
}

function Layout({}: LayoutProps): React.ReactElement {
  const [pageName, setPageName] = useState<string>(
    sessionStorage.getItem("route") || ""
  );
  const location = useLocation();

  useEffect(() => {
    setPageName(sessionStorage.getItem("route") || "");
  }, [location]);
  const classes = useStyle();
  return (
    <div>
      <CustomSnackBar />
      <Grid item xs={12} key="header">
        <NavBar pageName={pageName} />
      </Grid>
      <Grid item xs={12} key="layout" className={classes.layout}>
        {/* TODO: fix toolbar shadow and this style to sx and center */}
        {routes.map((route) => (
          <Route
            exact
            path={route.path}
            key={route.path}
            render={() => {
              sessionStorage.setItem("route", route.name);
              setPageName(route.name);
              return route.component;
            }}
          />
        ))}
        <Redirect to={ROUTES.MENU} />
      </Grid>
      <Grid item xs={12} key="footer">
        {/* TODO: add a footer here */}
      </Grid>
    </div>
  );
}

export default Layout;
