/* eslint-disable no-unused-vars */
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import * as React from 'react';

const useStyles = makeStyles((theme) => ({
  header: {
    maxWidth: 'inherit',
    backgroundColor: 'white',
    minHeight: '1rem',
    paddingLeft: '2rem',
    paddingTop: '1rem',
    paddingBottom: '.5rem',
  },
}));

function Header({ text, align, textVariant }) {
  const classes = useStyles();
  return (
    <Grid
      disablegutters="true"
      className={classes.header}
      // sx={{ justifyContent: align }}
      elevation={0}
    >
      <Typography
        variant={textVariant}
        noWrap
        href="/"
        sx={{
          mr: 2,
          fontFamily: 'Roboto, sans-serif',
          // fontWeight: 500,
          // letterSpacing: '.1rem',
          color: 'gray',
          textAlign: align,
        }}
      >
        {text}
      </Typography>
    </Grid>
  );
}
Header.propTypes = {
  text: PropTypes.string.isRequired,
  align: PropTypes.string,
  textVariant: PropTypes.string,
};
Header.defaultProps = {
  align: 'center',
  textVariant: 'h6',
};
export default Header;
