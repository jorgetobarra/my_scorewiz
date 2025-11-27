/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import {
  Card, CardContent, Grid, Button, Typography, CardActions,
} from '@mui/material';
import React, { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { randomizeArray } from '../../services/randomService';

function ResultsCard(props, ref) {
  const { contest } = useParams();
  const { participant } = props;
  const getPlaceColor = (place) => {
    switch (place) {
      case 1: return 'gold';
      case 2: return 'lightgrey';
      default: return '';
    }
  };
  const getLipsynchersColor = (place) => {
    switch (place) {
      case 1:
      case 2: return '#ffe';
      default: return '';
    }
  };
  return (
    <Grid
      {...props}
      ref={ref}
      container
      className="Cards"
      key="participantsCards"
      justifyContent="left"
      direction="row"
    >
      <Grid
        item
        key={`grid-item-${participant.name}-place`}
        style={{ margin: 0 }}
        xs={1}
      >
        <Card
          key={`card-${participant.name}-place`}
          style={{
            margin: 8,
            marginLeft: 24,
            marginRight: 8,
            backgroundColor: getPlaceColor(participant.place),
          }}
        >
          <CardContent style={{ padding: 8, textAlign: 'center', fontSize: '1.2rem' }}>
            {`${participant.place}º`}
          </CardContent>
        </Card>
      </Grid>
      <Grid
        item
        key={`grid-item-${participant.name}-points`}
        style={{ margin: 0 }}
        xs={3}
      >
        <Card
          key={`card-${participant.name}-points`}
          style={{
            margin: 8,
            marginLeft: 8,
            marginRight: 8,
            backgroundColor: getLipsynchersColor(participant.place),
          }}
        >
          <CardContent style={{ padding: 8, textAlign: 'center', fontSize: '1.2rem' }}>
            {`${participant.points} points`}
          </CardContent>
        </Card>
      </Grid>
      <Grid
        item
        key={`grid-item-${participant.name}-name`}
        style={{ margin: 0 }}
        xs={8}
      >
        <Card
          key={`card-${participant.name}-name`}
          style={{
            margin: 8,
            marginLeft: 8,
            marginRight: 24,
            backgroundColor: getLipsynchersColor(participant.place),
          }}
        >
          <CardContent style={{ padding: 8, paddingLeft: '1rem', fontSize: '1.2rem' }}>
            {participant.name}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
// ResultsCard.propTypes = {
//   // eslint-disable-next-line react/forbid-prop-types
//   participant: PropTypes.object.isRequired,
// };
export default forwardRef(ResultsCard);
