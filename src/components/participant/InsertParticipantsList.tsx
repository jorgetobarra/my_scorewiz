import React from "react";
import { Grid } from "@mui/material";
import { Participant } from "../../types";
import InsertParticipantCard from "./InsertParticipantCard";

interface InsertParticipantsListProps {
  oldParticipants: Participant[];
  participants: Participant[];
  setParticipants: (participants: Participant[]) => void;
}

const styles = {
  grid: {
    marginTop: "1rem",
    marginBottom: "1rem",
  },
};

export default function InsertParticipantsList({
  oldParticipants,
  participants,
  setParticipants,
}: InsertParticipantsListProps) {
  const onClickDelete = (participant: Participant) => {
    const parts = [...participants];
    const index = parts.findIndex((p) => p.id === participant.id);
    parts.splice(index, 1);
    setParticipants(parts);
  };

  return (
    <>
      <Grid
        container
        className="ParticipantsList"
        key="ParticipantsList"
        justifyContent="center"
        sx={styles.grid}
      >
        <Grid
          container
          className="Cards"
          key="participantsCards"
          justifyContent="left"
          direction="row"
        >
          {oldParticipants.length > 0 &&
            oldParticipants.map((participant, index) => (
              <InsertParticipantCard key={participant.id} participant={participant} index={index} />
            ))}
          {participants.length > 0 &&
            participants.map((participant, index) => (
              <InsertParticipantCard
                key={participant.id}
                participant={participant}
                deleteParticipant={onClickDelete}
                index={index}
              />
            ))}
        </Grid>
      </Grid>
    </>
  );
}
