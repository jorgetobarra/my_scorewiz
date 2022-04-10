/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import {
  Card, CardContent, Grid, Button, Typography, CardActions, Fade,
} from '@mui/material';
import React, { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import { randomizeArray } from '../../services/randomService';

const styles = {
  grid: {
    padding: '1rem',
  },
  nameGrid: {
    margin: 0,
    textAlign: 'center',
  },
  nameCard: {
    margin: 8,
    marginLeft: 8,
    marginRight: 8,
  },
  nameCardContent: {
    padding: 8,
    fontSize: '3rem',
    fontWeight: 500,
  },
  otherCardContent: {
    padding: 8,
    fontSize: '2rem',
    textAlign: 'center',
  },
};

// TODO: these are crazy, they don't respond properly to CSS
export default function CurrentResultsCard(props) {
  const { contest } = useParams();
  const { participant, stage } = props;
  return (
    <Grid
      container
      className="Cards"
      key="participantsCards"
      justifyContent="left"
      direction="row"
      sx={styles.grid}
    >
      <Fade in={stage > 1} timeout={{ enter: 1000, exit: 0 }}>
        <Grid
          item
          key={`grid-item-${participant.name}-name`}
          sx={styles.nameGrid}
          xs={12}
        >
          <Card key={`card-${participant.name}-name`} style={styles.nameCard} elevation={6}>
            <CardContent style={styles.nameCardContent}>
              {participant.name}
            </CardContent>
          </Card>
        </Grid>
      </Fade>
      <Fade in={stage > 0} timeout={{ enter: 1000, exit: 0 }}>
        <Grid
          item
          key={`grid-item-${participant.name}-place`}
          style={{ margin: 0 }}
          xs={4}
        >
          <Card key={`card-${participant.name}-place`} style={{ margin: 8, marginLeft: 8, marginRight: 4 }} elevation={4}>
            <CardContent style={styles.otherCardContent}>
              {participant.place}
              º
            </CardContent>
          </Card>
        </Grid>
      </Fade>
      <Fade in={stage > 0} timeout={{ enter: 2000, exit: 0 }}>
        <Grid
          item
          key={`grid-item-${participant.name}-points`}
          style={{ margin: 0 }}
          xs={8}
        >
          <Card key={`card-${participant.name}-points`} style={{ margin: 8, marginLeft: 4, marginRight: 8 }} elevation={4}>
            <CardContent style={styles.otherCardContent}>
              {participant.points}
              {' '}
              puntos
            </CardContent>
          </Card>
        </Grid>
      </Fade>
    </Grid>
  );
}
CurrentResultsCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  participant: PropTypes.object.isRequired,
  stage: PropTypes.number.isRequired,
};
