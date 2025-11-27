import { Grid, Typography } from "@mui/material";
import React from "react";
import { Participant } from "../../types";
import ResultsCard from "./ResultsCard";

interface DetailedResultsListProps {
  participants?: Participant[];
}

export default function DetailedResultsList({
  participants = [],
}: DetailedResultsListProps) {
  return (
    <Grid container className="DetailedResultsList" justifyContent="center">
      <Grid item xs key="detailedResultsList">
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          List
        </Typography>
        {participants.length > 0 &&
          participants.map((participant) => (
            <ResultsCard key={participant.id} participant={participant} />
          ))}
      </Grid>
    </Grid>
  );
}
