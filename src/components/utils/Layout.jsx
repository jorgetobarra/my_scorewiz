/* eslint-disable no-unused-vars */
import { Box, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import {
  Redirect, Route, useLocation,
} from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import NavBar from './NavBar';
import Endpoints from '../../utils/endpoints';
import routes from '../../utils/routes';
import CustomSnackBar from './CustomSnackBar';

const useStyle = makeStyles((theme) => ({
  layout: {
    zIndex: theme.zIndex.appBar - 1,
    width: '100%',
    // backgroundColor: theme.palette.primary.light, // TODO: I can't get the shadow
  },
}));

// -> this worked in you know what
// const ModelPickerSquare = withStyles((theme) => ({
//   root: {
//     backgroundColor: theme.palette.background.separator,
//     height: 24,
//     width: 24,
//     verticalAlign: 'middle',
//     display: 'inline-flex',
//   },
// }))(Box);

function Layout() {
  const [pageName, setPageName] = useState(sessionStorage.getItem('route') || '');
  const location = useLocation();

  useEffect(() => {
    setPageName(sessionStorage.getItem('route'));
  }, [location]);
  const classes = useStyle();
  return (
    <>
      <CustomSnackBar />
      <Grid item xs={12} key="header">
        <NavBar pageName={pageName} />
      </Grid>
      <Grid item xs={12} key="layout" elevation={0} className={classes.layout}>
        {/* TODO: fix toolbar shadow and this style to sx and center */}
        {routes.map((route) => (
          <Route
            exact
            path={route.path}
            key={route.path}
            render={() => {
              sessionStorage.setItem('route', route.name); return route.component;
              // setPageName(route.name);
            }}
          />
        ))}
        <Redirect to={Endpoints.MENU()} />
      </Grid>
      <Grid item xs={12} key="footer">
        {/* TODO: add a footer here */}
      </Grid>
    </>
  );
}

export default Layout;
