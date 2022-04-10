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

export default function ContestInput({ submit }) {
  const [input, setInput] = useState('');
  const onSubmit = (event) => {
    event.preventDefault();
    submit(input);
  };

  return (
    <Grid container className="ContestInput layout" textAlign="center" sx={styles.grid}>
      <form onSubmit={onSubmit} style={styles.form}>
        <Grid item xs key="contestData" sx={styles.inputGrid}>
          <TextField
            key="contestField"
            label="Contest name"
            autoFocus
            required
            value={input}
            maxRows={30}
            placeholder="Add contest name"
            onChange={(event) => setInput(event.target.value)}
            sx={styles.input}
          />
        </Grid>
        <Grid item xs key="buttons" sx={styles.buttonsGrid}>
          <Button key="addButton" variant="contained" type="submit" sx={styles.button}>Add contest</Button>
        </Grid>
      </form>
    </Grid>
  );
}
ContestInput.propTypes = {
  submit: PropTypes.func.isRequired,
};
