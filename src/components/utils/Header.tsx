/* eslint-disable no-unused-vars */
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import { Variant } from '@mui/material/styles/createTypography';

interface HeaderProps {
  text: string;
  align?: 'left' | 'right' | 'inherit' | 'center' | 'justify';
  textVariant?: Variant | 'inherit';
}

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

function Header({ text, align = 'center', textVariant = 'h6' }: HeaderProps) {
  const classes = useStyles();
  return (
    <Grid
      // disableGutters
      className={classes.header}
      // sx={{ justifyContent: align }}
      // elevation={0}
    >
      <Typography
        variant={textVariant}
        noWrap
        component="a"
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

export default Header;
