import {
  Button,
  Grid, TextField,
} from '@mui/material';
import React, { useState } from 'react';

interface ParticipantInputProps {
  submit: (input: string) => void;
  save: () => void;
  disableSave: boolean;
  alert: (show: boolean) => void;
}

const styles = {
  grid: {
    maxWidth: 720,
  },
  form: {
    marginTop: '1rem',
    marginBottom: '1rem',
    width: '100%',
  },
  inputGrid: {
    marginLeft: '1rem',
    marginRight: '1rem',
  },
  input: {
    marginTop: '1rem',
    marginBottom: '1rem',
    width: '100%',
  },
  buttonsGrid: {
    marginLeft: '1rem',
    marginRight: '1rem',
  },
  button: {
    marginTop: '1rem',
    marginBottom: '1rem',
    width: '100%',
  },
};

export default function ParticipantInput({
  submit, save, disableSave, alert,
}: ParticipantInputProps) {
  const [input, setInput] = useState('');
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit(input);
    setInput('');
  };

  return (
    <Grid container className="ParticipantInput" justifyContent="center" sx={styles.grid}>
      <form onSubmit={onSubmit} style={styles.form}>
        <Grid item xs key="participantData" sx={styles.inputGrid}>
          <TextField
            key="participantField"
            label="Participant"
            autoFocus
            required
            value={input}
            maxRows={30}
            placeholder="Add participant name"
            onChange={(event) => setInput(event.target.value)}
            sx={styles.input}
          />
        </Grid>
        <Grid item xs key="buttons" sx={styles.buttonsGrid}>
          <Button key="addButton" variant="contained" type="submit" sx={styles.button}>Add participant</Button>
          <Button
            key="saveButton"
            variant="contained"
            color="secondary"
            type="button"
            disabled={disableSave}
            onClick={save}
            sx={styles.button}
          >
            Save
          </Button>
          <Button key="saveButton" variant="contained" color="error" type="button" onClick={() => alert(true)} sx={styles.button}>
            Cancel
          </Button>
        </Grid>
      </form>
    </Grid>
  );
}
