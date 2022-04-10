import {
  Button,
  Grid, TextField,
} from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
}) {
  const [input, setInput] = useState('');
  const onSubmit = (event) => {
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
          <Button key="addButton" variant="contained" type="button" onClick={onSubmit} sx={styles.button}>Add participant</Button>
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
ParticipantInput.propTypes = {
  submit: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  disableSave: PropTypes.bool.isRequired,
  alert: PropTypes.bool.isRequired,
};
