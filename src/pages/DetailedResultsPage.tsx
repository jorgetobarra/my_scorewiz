import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import DetailedResultsGrid from "../components/results/DetailedResultsGrid";
import DetailedResultsList from "../components/results/DetailedResultsList";
import Header from "../components/utils/Header";
import { getContest } from "../services/localStorageService";
import XlsService from "../services/xlsService";

const styles = {
  grid: {
    paddingLeft: "1rem",
    paddingRight: "1rem",
  },
  items: {
    padding: ".5rem",
  },
  button: {
    margin: "1rem",
  },
};

export default function DetailedResultsPage() {
  const { contest: contestId }: { contest: string } = useParams();
  const [contest] = useState(getContest(contestId)!);
  const xlsService = new XlsService();

  return (
    <Grid
      container
      className="DetailedResultsPage layout"
      justifyContent="center"
      sx={styles.grid}
    >
      <Grid item xs={12} key="detailedResultsHeader">
        <Header text={`Detailed results of ${contestId}`} />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        key="detailedResultsGrid"
        sx={{ ...styles.items, textAlign: "center" }}
      >
        <DetailedResultsGrid results={contest.results} />
        <Button
          onClick={() =>
            xlsService.exportResultsXls(contest.results, contest.id)
          }
          sx={styles.button}
        >
          Download
        </Button>
      </Grid>
      <Grid item xs={12} md={6} key="detailedResultsList" sx={styles.items}>
        <DetailedResultsList participants={contest.participants} />
      </Grid>
    </Grid>
  );
}
