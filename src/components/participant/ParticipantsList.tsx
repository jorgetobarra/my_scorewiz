/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import {
  Card, CardContent, Grid, Button, Typography, CardActions, Fade, Slide,
} from '@mui/material';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { randomizeArray } from '../../services/randomService';
import Endpoints from '../../utils/endpoints';
import ParticipantCard from './ParticipantCard';
import { Participant } from '../../types';

interface ParticipantsListProps {
  participants: Participant[];
  setParticipants: (participants: Participant[]) => void;
}

export default function ParticipantsList({ participants, setParticipants }: ParticipantsListProps) {
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
