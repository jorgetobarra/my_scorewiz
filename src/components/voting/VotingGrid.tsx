import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { randomizeArray } from "../../services/randomService";
import { Participant } from "../../types";

interface VotingGridProps {
  input: string;
  setReady: (ready: boolean) => void;
}

export default function VotingGrid({ input, setReady }: VotingGridProps) {
  const participantNames = input ? input.split("\n") : [];
  const initialParticipants: Participant[] = participantNames.map(
    (name, idx) => ({
      id: `participant-${idx}`,
      name,
      points: 0,
    })
  );
  const [participants, setParticipants] = useState<Participant[]>(
    randomizeArray(initialParticipants)
  );
  const [showButtons, setShowButtons] = useState(true);
  const clickReset = () => setReady(false);
  const clickRedraw = () => setParticipants(randomizeArray(participants));
  const clickDownload = () => {};

  return [
    <Grid
      container
      className="RunnningOrder"
      key="runningOrder"
      justifyContent="center"
    >
      <Grid
        container
        className="Logo"
        key="runningOrderLogo"
        justifyContent="center"
        direction="column"
      >
        <Grid item xs>
          <Typography>This is a logo</Typography>
        </Grid>
      </Grid>
      <Grid
        container
        className="Cards"
        key="runningOrderCards"
        justifyContent="left"
        direction="row"
      >
        {participants.length > 0 &&
          randomizeArray(participants).map((participant, index) => (
            <Grid
              item
              key={`grid-item-${participant.name}-${index}`}
              style={{ margin: 0 }}
              xs={12} // TODO: make it two columns
            >
              <Card
                key={`card-${participant.name}-${index}`}
                style={{ margin: 8, marginLeft: 24, marginRight: 24 }}
              >
                <CardContent style={{ padding: 8 }}>
                  {index + 1}. {participant.name}
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Grid>,
    <Grid
      container
      className="Buttons"
      justifyContent="center"
      style={{ marginTop: 64 }}
    >
      {showButtons && (
        <Grid item xs key="resetButtonGrid">
          <Button key="resetButton" variant="outlined" onClick={clickReset}>
            Reset
          </Button>
          <Button key="redrawButton" variant="outlined" onClick={clickRedraw}>
            Redraw
          </Button>
          <Button
            key="redrawButton"
            variant="contained"
            onClick={clickDownload}
          >
            Download
          </Button>
        </Grid>
      )}
    </Grid>,
  ];
}
