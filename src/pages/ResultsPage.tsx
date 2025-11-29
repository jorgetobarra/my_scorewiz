import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { Box, Button, Fade, Grid, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { TransitionGroup } from "react-transition-group";
import CurrentResultsCard from "../components/results/CurrentResultsCard";
import ResultsCard from "../components/results/ResultsCard";
import Header from "../components/utils/Header";
import { useSnackbarContext } from "../contexts/SnackbarContext";
import Confetti from "react-canvas-confetti";
import { Contest, Participant } from "../types/index";
import { Endpoints } from "../utils/endpoints";
import useWindowDimensions from "../utils/useWindowDimensions";
import { useContestContext } from '../contexts/ContestContext';

const MAX_WIDTH = "1024px";

let styles = {
  grid: {},
  resultsControls: {
    display: "flex",
    marginLeft: "1rem",
    marginRight: "1rem",
  },
  button: {
    margin: ".2rem",
  },
};

export default function ResultsPage() {
  const { contest: contestId } = useParams<{ contest: string }>();
  const { getContest } = useContestContext();
  const [contest] = useState<Contest | null>(getContest(contestId));
  const [pastResults, setPastResults] = useState<Participant[]>([]);
  const [mainResultStage, setMainResultStage] = useState(0);
  const [counter, setCounter] = useState(1);
  const [fullScreen, setFullScreen] = useState(false);
  const [maxWidth, setMaxWidth] = useState<string>(MAX_WIDTH);
  const { openSnackbar } = useSnackbarContext();
  const history = useHistory();
  
  React.useEffect(() => {
    if (!contest) {
      openSnackbar(`Contest ${contestId} not found`);
      history.goBack();
    }
  }, [contest]);
  
  if (!contest?.participants?.length) {
    return null;
  }
  
  const participants = contest.participants;
  const winnerName = participants.length > 0 ? participants.filter(p => p.place === 1).map(p => p.name).join(' and ') : '';

  const hasNextParticipant = () => counter <= participants.length;
  const hasPreviousParticipant = () => counter > 1;
  const getNextParticipant = () =>
    hasNextParticipant() && counter > 0
      ? participants[participants.length - counter]
      : ({} as Participant);
  const clickPrevious = () => {
    if (hasPreviousParticipant()) {
      setMainResultStage((prev) => prev - 1);
      if (mainResultStage === 0) {
        setPastResults(() => {
          const temp = [...pastResults];
          temp.shift();
          return temp;
        });
        setCounter((prev) => prev - 1);
        setMainResultStage(2);
      }
    } else {
      openSnackbar("Not fewer results");
    }
  };
  const clickNext = () => {
    if (hasNextParticipant()) {
      setMainResultStage((prev) => prev + 1);
      if (mainResultStage === 2) {
        setPastResults((prev) => [getNextParticipant(), ...prev]);
        setCounter((prev) => prev + 1);
        setMainResultStage(0);
      }
    } else {
      openSnackbar("No more results");
    }
  };
  const clickEnd = () => {
    setPastResults(participants);
    setCounter(participants.length + 1);
    setMainResultStage(0);
  };
  const keydownFunction = useCallback(
    (event) => {
      if (event.keyCode === 32) {
        clickNext();
      }
      if (event.keyCode === 27) {
        clickEnd();
      }
    },
    [counter, contest, mainResultStage]
  );

  useEffect(() => {
    document.addEventListener("keydown", keydownFunction);

    return () => {
      document.removeEventListener("keydown", keydownFunction);
    };
  }, [keydownFunction]);

  useEffect(() => {
    if (fullScreen) setMaxWidth("100%");
    if (!fullScreen) setMaxWidth(MAX_WIDTH);
  }, [fullScreen]);

  return (
    <Grid
      container
      className="ResultsPage layout"
      justifyContent="center"
      sx={{ maxWidth }}
    >
      <Grid item xs={12} key="resultsHeader">
        {fullScreen || <Header text={`Results of ${contestId}`} />}
      </Grid>
      <Grid
        item
        xs={12}
        key="resultsControls"
        justifyContent="left"
        sx={styles.resultsControls}
      >
        <Button
          variant="contained"
          startIcon={<ArrowBackIosNewIcon />}
          onClick={clickPrevious}
          disabled={!hasPreviousParticipant()}
          sx={styles.button}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          endIcon={<NavigateNextIcon />}
          onClick={clickNext}
          disabled={!hasNextParticipant()}
          sx={styles.button}
        >
          Next
        </Button>
        <Button
          variant="contained"
          endIcon={<SkipNextIcon />}
          onClick={clickEnd}
          disabled={!hasNextParticipant()}
          sx={styles.button}
        >
          End
        </Button>
        <Box className="FlexBox" />
        <Button
          variant="contained"
          sx={styles.button}
          onClick={() => setFullScreen(!fullScreen)}
        >
          Full screen
        </Button>
        <Link to={Endpoints.DETAILED_RESULTS(contestId)} className="NoLink">
          <Button
            variant="contained"
            disabled={hasNextParticipant()}
            sx={styles.button}
          >
            See details
          </Button>
        </Link>
      </Grid>
      <Grid
        item
        xs
        key="resultsGrid"
        style={{
          marginTop: "1rem",
          alignItems: fullScreen ? "center" : "top",
        }}
      >
        <Box sx={{ height: useWindowDimensions().height / 12 }} />
        {hasNextParticipant() && (
          <CurrentResultsCard
            participant={getNextParticipant()}
            stage={mainResultStage}
          />
        )}
        {!hasPreviousParticipant() && mainResultStage === 0 && (
          <Box sx={{ width: '100%', textAlign: 'center'}}>
            <Button
              variant="contained"
              size="large"
              onClick={() => clickNext()}
            >
              Start
            </Button>
          </Box>
        )}
        {!hasNextParticipant() && hasPreviousParticipant() && (
          <>
            {/* TODO: do this properly, this is just an idea */}
            <Confetti
              onInit={({ confetti }) => {
                confetti({
                  particleCount: 800,
                  spread: 500,
                  origin: { y: 0.3 },
                });
              }}
              style={{ position: "fixed", width: "100vw", height: "100vh" }}
            />
            <Typography variant="h3" align="center">
              Congratulations, {winnerName}!
            </Typography>
          </>
        )}
        <Box sx={{ height: useWindowDimensions().height / 12 }} />
        {/* <Divider /> */}
        <TransitionGroup className="ParticipantsList" key="ParticipantsList">
          {pastResults.map((participant) => (
            <Fade
              timeout={1000}
              mountOnEnter
              unmountOnExit
              key={participant.id}
            >
              <ResultsCard participant={participant} />
            </Fade>
          ))}
        </TransitionGroup>
      </Grid>
    </Grid>
  );
}
