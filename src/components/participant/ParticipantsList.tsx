import { Grid } from "@mui/material";
import React from "react";
import { Participant } from "../../types";
import ParticipantCard from "./ParticipantCard";

interface ParticipantsListProps {
  participants: Participant[];
  setParticipants: (participants: Participant[]) => void;
}

export default function ParticipantsList({
  participants,
  setParticipants,
}: ParticipantsListProps) {
  return (
    <Grid
      container
      className="ParticipantsList"
      key="ParticipantsList"
      justifyContent="center"
    >
      <Grid
        container
        className="Cards"
        key="participantsCards"
        justifyContent="left"
        direction="row"
      >
        {participants.length > 0 &&
          participants.map((participant, index) => (
            <ParticipantCard
              key={participant.id}
              participant={participant}
              setParticipants={setParticipants}
              index={index}
            />
          ))}
      </Grid>
    </Grid>
  );
}
