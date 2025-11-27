import { Grid } from "@mui/material";
import React, { useState } from "react";
import { getContests } from "../../services/localStorageService";
import ContestCard from "./ContestCard";

export default function ContestsList() {
  const [contests, setContests] = useState(getContests());
  return (
    <>
      <Grid
        container
        className="ContestsList"
        key="ContestsList"
        justifyContent="left"
        direction="row"
      >
        {/* {contests.length > 0 && contests.map((contest, index) => ( */}
        {contests?.map((contest, index) => (
          <ContestCard
            key={contest}
            contest={contest}
            index={index}
            setContests={setContests}
          />
        ))}
      </Grid>
    </>
  );
}
ContestsList.propTypes = {};
