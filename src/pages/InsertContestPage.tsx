import { Grid } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";
import ContestInput from "../components/contest/ContestInput";
import { getContest, addContest } from "../services/localStorageService";

export default function InsertContestPage() {
  const history = useHistory();

  const submit = (input: string) => {
    if (input.includes(",") || input.includes(":"))
      alert("Contests cannot include a comma(,) or colon(:)");
    else if (!getContest(input)) {
      addContest(input);
      history.goBack();
    } else {
      alert("Contest already exists");
    }
  };

  return (
    <Grid container className="InsertContests" justifyContent="center">
      <Grid item xs key="newContest">
        <ContestInput submit={submit} />
      </Grid>
    </Grid>
  );
}
