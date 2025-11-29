import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import InsertParticipantsList from "../components/participant/InsertParticipantsList";
import ParticipantInput from "../components/participant/ParticipantInput";
import AlertDialog from "../components/utils/AlertDialog";
import { useGoBackContext } from "../contexts/GoBackContext";
import { Participant } from '../types/index';
import { useContestContext } from '../contexts/ContestContext';

export default function InsertParticipantPage() {
  const { contest: contestId }: { contest: string } = useParams();
  const history = useHistory();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [openAlert, setOpenAlert] = useState(false);
  const { setDisableBack } = useGoBackContext();
  const { getParticipant, getParticipants, addParticipant } = useContestContext();

  const submit = (input: string) => {
    if (input.length === 0) alert("Participant can't be empty");
    else if (input.includes(",") || input.includes(":"))
      alert("participants cannot include a comma(,) or colon(:)");
    else if (!getParticipant(contestId, input)) {
      setParticipants([...participants, { id: `${input}`, name: `${input}` }]);
    } else {
      alert("Participant already exists");
    }
  };

  const save = () => {
    if (participants && participants.length > 0) {
      participants.forEach((p) => addParticipant(contestId, p));
      history.goBack();
    } else {
      alert("There are no new participants yet");
    }
  };

  useEffect(() => {
    setDisableBack(true);
    return () => setDisableBack(false);
  }, []);

  return (
    <Grid
      container
      className="InsertParticipants layout"
      justifyContent="center"
    >
      <AlertDialog
        header="¿Seguro?"
        text="Perderás los datos no guardados"
        yesText="Salir"
        noText="No salir"
        onYes={() => history.goBack()}
        open={openAlert}
        setOpen={setOpenAlert}
      />
      <Grid item xs={12} md={6} key="newParticipant">
        <ParticipantInput
          submit={submit}
          save={save}
          disableSave={participants.length === 0}
          alert={setOpenAlert}
        />
      </Grid>
      <Grid item xs={12} md={6} key="participantsList">
        <InsertParticipantsList
          oldParticipants={getParticipants(contestId)}
          participants={participants}
          setParticipants={setParticipants}
        />
      </Grid>
    </Grid>
  );
}
