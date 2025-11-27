/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Grid,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles, styled } from '@mui/styles';
import Header from '../components/utils/Header';
import ParticipantsList from '../components/participant/ParticipantsList';
import TooltipButton from '../components/utils/TooltipButton';
import { saveJSONAsFile } from '../services/fileManagementService';
import {
  generateVotes, getContest, getParticipants, getVotes, removeContest,
} from '../services/localStorageService';
import Endpoints from '../utils/endpoints';

const useStyles = makeStyles(() => ({
  button: {
    '&.MuiButton-root': {
      marginLeft: '1rem',
      marginRight: '1rem',
    },
  },
  buttonsGird: {
    display: 'flex',
    marginLeft: '1rem',
    marginBottom: '2rem',
  },
}));

const styles = {
  controlPanel: {
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
};

export default function ContestPage() {
  const { contest: contestId } = useParams();
  const [participants, setParticipants] = useState(getParticipants(contestId));
  const history = useHistory();

  const isAddParticipantDisabled = () => !!participants.find((p) => getVotes(contestId, p.id));
  const isViewResultsDisabled = () => !participants.find((p) => (!!p.votes));

  const saveData = () => {
    generateVotes(contestId);
    const contest = getContest(contestId);
    saveJSONAsFile(contest, `${contestId}-votes.svd`);
  };

  const clickSeeResults = () => {
    generateVotes(contestId);
    history.push(Endpoints.RESULTS(contestId));
  };
  const clickRemoveContest = () => {
    removeContest(contestId);
    history.goBack();
    history.push(Endpoints.MENU);
  };
  const classes = useStyles();

  return (
    <Grid container name="layout" className="ContestPage" direction="column">
      <Grid item xs key="title">
        <Header text={`Contest: ${contestId}`} />
      </Grid>
      <Grid item xs container key="controlPanel" sx={styles.controlPanel}>
        <Grid item xs={12} key="buttonPanel" justifyContent="left" className={classes.buttonsGird}>
          <TooltipButton
            text="Add participant"
            link={Endpoints.NEW_PARTICIPANT(contestId)}
            isDisabled={isAddParticipantDisabled()}
            tooltipText="You cannot add more if any participant has already voted"
            className={classes.button}
          />
          <TooltipButton
            text="View results"
            onClick={clickSeeResults}
            isDisabled={isViewResultsDisabled()}
            tooltipText="There aren't any votes yet"
            className={classes.button}
          />
          <Box className="FlexBox" />
          <Button onClick={saveData} className={classes.button}>Backup</Button>
          <Button color="error" onClick={clickRemoveContest} className={classes.button}>Delete contest</Button>
        </Grid>
        <Grid item xs={12} key="participantsSubHeader">
          <Header text="Participants" textVariant="h7" />
        </Grid>
        <Grid item xs={12} key="participantsList" justifyContent="space-between">
          <ParticipantsList participants={participants} setParticipants={setParticipants} />
        </Grid>
      </Grid>
      <Grid item xs key="footer" />
    </Grid>
  );
}
