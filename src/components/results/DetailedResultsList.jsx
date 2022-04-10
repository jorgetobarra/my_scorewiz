/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
import {
  Fade,
  Grid,
  Typography,
} from '@mui/material';
import { React, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import ResultsCard from './ResultsCard';

export default function DetailedResultsList({ participants }) {
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
        <Typography variant="h5" sx={{ textAlign: 'center' }}>List</Typography>
        {participants.length > 0 && participants.map((participant, index) => (
          // <Fade in timeout={1000} mountOnEnter unmountOnExit>
          <ResultsCard participant={participant} />
          // </Fade>
        ))}
      </Grid>
    </Grid>
  );
}
DetailedResultsList.propTypes = {
  participants: PropTypes.array.isRequired,
};
