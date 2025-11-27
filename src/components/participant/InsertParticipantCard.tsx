/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import {
  Card, CardContent, Grid, Button, Typography, CardActions, Fade, Slide, IconButton, Box,
} from '@mui/material';
import React from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Participant } from '../../types';

interface InsertParticipantCardProps {
  participant: Participant;
  deleteParticipant?: (participant: Participant) => void;
  index: number;
}

const useStyles = makeStyles(() => ({
  button: {
    marginLeft: '0.5rem', marginRight: '0.5rem',
  },
}));

export default function InsertParticipantCard({ participant, deleteParticipant, index }: InsertParticipantCardProps) {
  const classes = useStyles();
  const onClickDelete = () => {
    if (deleteParticipant) {
      deleteParticipant(participant);
    }
  };
  return (
    <Grid
      item
      key={`grid-item-${participant.name}-${index}`}
      style={{ margin: 0 }}
      xs={12}
      sm={6}
      md={12}
    >
      <Card key={`card-${participant.name}-${index}`} style={{ margin: 8, marginLeft: 24, marginRight: 24 }}>
        <CardContent style={{ padding: 8, textAlign: 'center' }}>
          {participant.name}
        </CardContent>
        <CardActions>
          <Box className="FlexBox" />
          {deleteParticipant && <IconButton key={`deleteParticipant-${participant.name}`} color="error" onClick={onClickDelete}><DeleteOutlineIcon /></IconButton>}
        </CardActions>
      </Card>
    </Grid>
  );
}
