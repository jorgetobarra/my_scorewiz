/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import {
  Card, CardContent, Grid, Button, Typography, CardActions, Fade, Slide, IconButton, Box,
} from '@mui/material';
import React from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  button: {
    marginLeft: '0.5rem', marginRight: '0.5rem',
  },
}));

export default function InsertParticipantCard({ participant, deleteParticipant, index }) {
  const classes = useStyles();
  const onClickDelete = () => {
    deleteParticipant(participant);
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
InsertParticipantCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  participant: PropTypes.object.isRequired,
  deleteParticipant: PropTypes.func,
  index: PropTypes.number.isRequired,
};
InsertParticipantCard.defaultProps = {
  deleteParticipant: undefined,
};
