import React from "react";
import { Grid } from "@mui/material";
import { useContestContext } from "../../contexts/ContestContext";
import ContestCard from "./ContestCard";

export default function ContestsList() {
  const { contests, removeContest } = useContestContext();

  return (
    <>
      <Grid
        container
        className="ContestsList"
        key="ContestsList"
        justifyContent="left"
        direction="row"
      >
        {contests?.map((contest, index) => (
          <ContestCard
            key={contest.id}
            contestId={contest.id}
            index={index}
            removeContest={removeContest}
          />
        ))}
      </Grid>
    </>
  );
}
