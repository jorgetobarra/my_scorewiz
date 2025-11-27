import { Grid } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import * as React from "react";
import { Theme } from '@mui/material/styles';

interface HeaderProps {
  text: string;
  align?: "left" | "right" | "inherit" | "center" | "justify";
  textVariant?: Variant | "inherit";
}

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    maxWidth: "inherit",
    minHeight: "1rem",
    paddingLeft: "2rem",
    paddingTop: "1rem",
    paddingBottom: ".5rem",
  },
}));

function Header({ text, align = "center", textVariant = "h6" }: HeaderProps) {
  const classes = useStyles();
  return (
    <Grid
      className={classes.header}
    >
      <Typography
        variant={textVariant}
        noWrap
        sx={{
          mr: 2,
          fontFamily: "Roboto, sans-serif",
          color: "gray",
          textAlign: align,
        }}
      >
        {text}
      </Typography>
    </Grid>
  );
}

export default Header;
