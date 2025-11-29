import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Participant } from "../../types";
import { Endpoints } from "../../utils/endpoints";
import AlertDialog from "../utils/AlertDialog";
import { useContestContext } from '../../contexts/ContestContext';

interface ParticipantCardProps {
  participant: Participant;
  setParticipants: (participants: Participant[]) => void;
  index: number;
}

const styles = {
  button: {
    marginLeft: "0.5rem",
  },
};

export default function ParticipantCard({
  participant,
  setParticipants,
  index,
}: ParticipantCardProps) {
  const { contest: contestId } = useParams<any>();
  const { getParticipants, getVotes, removeVotes, removeParticipant } = useContestContext();
  const [votes, setVotes] = useState(getVotes(contestId, participant.id));
  const [openVotesAlert, setVotesAlertOpen] = useState(false);
  const [openParticipantAlert, setParticipantAlertOpen] = useState(false);
  const onClickRemoveVotes = () => {
    removeVotes(contestId, participant.id);
    setVotes(getVotes(contestId, participant.id));
  };
  const onClickDelete = () => {
    removeParticipant(contestId, participant.id);
    setParticipants(getParticipants(contestId));
  };
  return (
    <>
      <AlertDialog
        key="remove_votes_dialog"
        header="¿Seguro?"
        text={`¿Seguro que quieres borrar los votos de ${participant.name}?`}
        onYes={onClickRemoveVotes}
        open={openVotesAlert}
        setOpen={setVotesAlertOpen}
      />
      <AlertDialog
        key="delete_participant_dialog"
        header="¿Seguro?"
        text={`¿Seguro que quieres al participante ${participant.name}?`}
        onYes={onClickDelete}
        open={openParticipantAlert}
        setOpen={setParticipantAlertOpen}
      />
      <Grid
        item
        key={`grid-item-${participant.name}-${index}`}
        style={{ margin: 0 }}
        xs={12}
        sm={6}
        md={4}
      >
        <Card
          key={`card-${participant.name}-${index}`}
          style={{ margin: 8, marginLeft: 24, marginRight: 24 }}
        >
          <CardContent sx={{ padding: ".5rem", textAlign: "center" }}>
            <Typography sx={{ fontWeight: 500 }}>{participant.name}</Typography>
          </CardContent>
          <CardActions>
            <Link
              to={Endpoints.PARTICIPANT_VOTING(contestId, participant.id)}
              className="NoLink"
            >
              <Button key="voteButton" size="small" style={styles.button}>
                {!votes ? "Vote" : "Edit votes"}
              </Button>
            </Link>
            {votes && (
              <Button
                key="deleteVotesButton"
                size="small"
                color="error"
                onClick={() => setVotesAlertOpen(true)}
                style={styles.button}
              >
                Remove votes
              </Button>
            )}
            <Box className="FlexBox" />
            <IconButton
              key={`deleteParticipant-${participant.name}`}
              color="error"
              onClick={() => setParticipantAlertOpen(true)}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
}
