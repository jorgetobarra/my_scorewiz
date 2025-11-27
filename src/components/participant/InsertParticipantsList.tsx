/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import {
  Card, CardContent, Grid, Button, Typography, CardActions, Fade, Slide,
} from '@mui/material';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { randomizeArray } from '../../services/randomService';
import Endpoints from '../../utils/endpoints';
import InsertParticipantCard from './InsertParticipantCard';
import { removeParticipant } from '../../services/localStorageService';
import { Participant } from '../../types';

interface InsertParticipantsListProps {
  oldParticipants: Participant[];
  participants: Participant[];
  setParticipants: (participants: Participant[]) => void;
}

const styles = {
  grid: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
};

export default function InsertParticipantsList({ oldParticipants, participants, setParticipants }: InsertParticipantsListProps) {
  const onClickDelete = (participant: Participant) => {
    const parts = [...participants];
    const index = parts.findIndex((p) => p.id === participant.id);
    parts.splice(index, 1);
    setParticipants(parts);
  };

  return ([
    <Grid container className="ParticipantsList" key="ParticipantsList" justifyContent="center" sx={styles.grid}>
      <Grid
        container
        className="Cards"
        key="participantsCards"
        justifyContent="left"
        direction="row"
      >
        {oldParticipants.length > 0 && oldParticipants.map((participant, index) => (
          <InsertParticipantCard
            participant={participant}
            index={index}
          />
        ))}
        {participants.length > 0 && participants.map((participant, index) => (
          <InsertParticipantCard
            participant={participant}
            deleteParticipant={onClickDelete}
            index={index}
          />
        ))}
      </Grid>
    </Grid>,
  ]);
}
