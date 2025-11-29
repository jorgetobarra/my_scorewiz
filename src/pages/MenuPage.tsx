import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import ContestsList from "../components/contest/ContestsList";
import Header from "../components/utils/Header";
import { Endpoints } from "../utils/endpoints";
import ImportContest from "../components/contest/ImportContest";

const styles = {
  buttonsGrid: {
    display: "flex",
    padding: "1rem",
  },
  buttons: {
    marginLeft: "1rem",
    marginRight: "1rem",
  },
};

export default function MenuPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <Grid item xs className="layout">
      <Grid item xs key="contestsHeader">
        <Header text="Choose a contest" align="left" />
      </Grid>
      <Grid item xs key="contestsGrid" sx={{ padding: ".5rem" }}>
        <ContestsList />
      </Grid>
      <Grid
        item
        xs
        key="buttonsGrid"
        justifyContent="center"
        sx={styles.buttonsGrid}
      >
        <Button
          variant="contained"
          sx={styles.buttons}
          component={Link}
          to={Endpoints.NEW_CONTEST()}
        >
          Create new contest
        </Button>
        <ImportContest onImportSuccess={() => refresh()} sx={styles.buttons} />
      </Grid>
    </Grid>
  );
}
