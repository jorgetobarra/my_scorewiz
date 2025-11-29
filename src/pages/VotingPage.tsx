import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import AlertDialog from "../components/utils/AlertDialog";
import Header from "../components/utils/Header";
import DraggableList from "../components/voting/DraggableList";
import { useGoBackContext } from "../contexts/GoBackContext";
import { Participant } from "../types/index";
import { POINTS } from "../utils/constants";
import { useContestContext } from '../contexts/ContestContext';

const styles = {
  // TODO: Use or set these
  grid: {
    maxWidth: 480,
  },
  form: {
    marginTop: ".5rem",
    marginBottom: ".5rem",
    width: "100%",
  },
  buttonsGrid: {
    marginTop: ".5rem",
    marginLeft: "1rem",
    marginRight: "1rem",
  },
  button: {
    marginTop: ".5rem",
    marginBottom: ".5rem",
    width: "100%",
  },
};

export default function VotingPage() {
  const history = useHistory();
  const { setVotes, getParticipants } = useContestContext();
  const { contest: contestId, participant: participantId } = useParams<{
    contest: string;
    participant: string;
  }>();
  const [participants, setParticipants] = useState(
    getParticipants(contestId).filter((p) => p.id !== participantId)
  );
  const [openAlert, setOpenAlert] = useState(false);
  const { setDisableBack } = useGoBackContext();

  const save = (parts: Participant[]) => {
    setVotes(
      contestId,
      participantId,
      parts.map((p, index) => ({
        participantId: p.id,
        points: POINTS[index],
      }))
    );
    history.goBack();
  };
  const cancel = () => {
    setOpenAlert(true);
  };

  useEffect(() => {
    setDisableBack(true);
    return () => setDisableBack(false);
  }, []);

  return (
    <Grid container className="VotingPage layout" justifyContent="center">
      <AlertDialog
        header="¿Seguro?"
        text="Perderás los datos no guardados"
        yesText="Salir"
        noText="No salir"
        onYes={() => history.goBack()}
        open={openAlert}
        setOpen={setOpenAlert}
      />
      <Grid item xs={12} key="voterDataHeader">
        <Header text={`Voting: ${participantId}`} align="center" />
      </Grid>
      <Grid item container xs={12} key="votingArea" style={styles.grid}>
        <Grid item xs={12} key="votingDragAndDrop" style={styles.form}>
          {/* TODO: Padding and styling to list (maybe draggable hints) */}
          <DraggableList
            key="votingList"
            items={participants}
            setItems={setParticipants}
          />
        </Grid>
        <Grid item xs={12} key="votingButtons" style={styles.buttonsGrid}>
          <Button
            variant="contained"
            onClick={() => save(participants)}
            style={styles.button}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={cancel}
            style={styles.button}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
