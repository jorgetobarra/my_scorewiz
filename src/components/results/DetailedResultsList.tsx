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
  // const { contest: contestId } = useParams();
  // const [appear, setAppear] = useState([]);
  // const timeout = 0;
  // const appearProcess = (index, setVar) => {
  //   timeout += 500;
  //   setTimeout(() => { setVar((prev) => [...prev, true]); }, timeout);
  //   return appear[participants.length - index - 1]; // We want from last to first
  // };
  return (
    <Grid container className="DetailedResultsList" justifyContent="center">
      <Grid item xs key="detailedResultsList">
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          List
        </Typography>
        {participants.length > 0 &&
          participants.map((participant) => (
            // <Fade in timeout={1000} mountOnEnter unmountOnExit>
            <ResultsCard key={participant.id} participant={participant} />
            // </Fade>
          ))}
      </Grid>
    </Grid>
  );
}
