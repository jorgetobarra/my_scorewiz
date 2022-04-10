/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import {
  Card, CardContent, Grid, Button, Typography, CardActions, Fade, Slide,
} from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { randomizeArray } from '../../services/randomService';
import Endpoints from '../../utils/endpoints';
import ParticipantCard from './ParticipantCard';

export default function ParticipantsList({ participants, setParticipants }) {
  return ([
    <Grid container className="ParticipantsList" key="ParticipantsList" justifyContent="center">
      <Grid
        container
        className="Cards"
        key="participantsCards"
        justifyContent="left"
        direction="row"
      >
        {participants.length > 0 && participants.map((participant, index) => (
          <ParticipantCard
            key={participant.id}
            participant={participant}
            setParticipants={setParticipants}
            index={index}
          />
        ))}
      </Grid>
    </Grid>,
  ]);
}
ParticipantsList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  participants: PropTypes.array.isRequired,
  setParticipants: PropTypes.func.isRequired,
};
