/* eslint-disable prefer-const */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import {
  Box,
  Button,
  Divider,
  Fade,
  Grid, Typography,
} from '@mui/material';
import {
  useState, React, useCallback, useEffect, useContext,
} from 'react';
import { Link, useParams } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';
import { makeStyles } from '@mui/styles';
import CurrentResultsCard from '../components/results/CurrentResultsCard';
import Header from '../components/utils/Header';
import ResultsCard from '../components/results/ResultsCard';
import { getContest } from '../services/localStorageService';
import Endpoints from '../utils/endpoints';
import useWindowDimensions from '../utils/useWindowDimensions';
import { useSnackbarContext } from '../contexts/SnackbarContext';
import { Contest } from '../types/index';

const MAX_WIDTH = 1024;

let styles = {
  grid: {
    // maxWidth: MAX_WIDTH,
  },
  resultsControls: {
    display: 'flex',
    marginLeft: '1rem',
    marginRight: '1rem',
  },
  button: {
    margin: '.2rem',
  },
};

export default function ResultsPage() {
  const { contest: contestId } = useParams<{ contest: string }>();
  const [contest] = useState<Contest>(getContest(contestId));
  const [pastResults, setPastResults] = useState([]);
  const [mainResultStage, setMainResultStage] = useState(0);
  const [counter, setCounter] = useState(1);
  const [fullScreen, setFullScreen] = useState(false);
  const [maxWidth, setMaxWidth] = useState(MAX_WIDTH);
  const { openSnackbar } = useSnackbarContext();

  const hasNextParticipant = () => (counter <= contest.participants.length);
  const hasPreviousParticipant = () => (counter > 1);
  const getNextParticipant = () => ((hasNextParticipant() && counter > 0)
    ? contest.participants[contest.participants.length - counter]
    : {});
  const clickPrevious = () => {
    if (hasPreviousParticipant()) {
      setMainResultStage((prev) => prev - 1);
      if (mainResultStage === 0) {
        setPastResults(() => { const temp = [...pastResults]; temp.shift(); return temp; });
        setCounter((prev) => prev - 1);
        setMainResultStage(2);
      }
    } else {
      openSnackbar('Not fewer results');
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
      openSnackbar('Not more results');
    }
  };
  const clickEnd = () => {
    setPastResults(contest.participants);
    setCounter(contest.participants.length + 1);
    setMainResultStage(0);
  };
  // TODO: hacer anuncio del top2 diferente
  const keydownFunction = useCallback((event) => {
    if (event.keyCode === 32) {
      clickNext();
    }
    if (event.keyCode === 27) {
      clickEnd();
    }
  }, [counter, contest, mainResultStage]);

  useEffect(() => {
    document.addEventListener('keydown', keydownFunction);

    return () => {
      document.removeEventListener('keydown', keydownFunction);
    };
  }, [keydownFunction]);

  useEffect(() => {
    if (fullScreen) setMaxWidth('100%');
    if (!fullScreen) setMaxWidth(MAX_WIDTH);
  }, [fullScreen]);

  return (
    <Grid container className="ResultsPage layout" justifyContent="center" style={{ maxWidth }}>
      <Grid item xs={12} key="resultsHeader">
        {fullScreen || <Header text={`Results of ${contestId}`} />}
      </Grid>
      <Grid item xs={12} key="resultsControls" justifyContent="left" sx={styles.resultsControls}>
        <Button variant="contained" startIcon={<ArrowBackIosNewIcon />} onClick={clickPrevious} disabled={!hasPreviousParticipant()} sx={styles.button}>
          Previous
        </Button>
        <Button variant="contained" endIcon={<NavigateNextIcon />} onClick={clickNext} disabled={!hasNextParticipant()} sx={styles.button}>
          Next
        </Button>
        <Button variant="contained" endIcon={<SkipNextIcon />} onClick={clickEnd} disabled={!hasNextParticipant()} sx={styles.button}>
          End
        </Button>
        <Box className="FlexBox" />
        <Button variant="contained" sx={styles.button} onClick={() => setFullScreen(!fullScreen)}>
          Full screen
        </Button>
        <Link to={Endpoints.DETAILED_RESULTS(contestId)} className="NoLink">
          <Button variant="contained" disabled={hasNextParticipant()} sx={styles.button}>
            See details
          </Button>
        </Link>
      </Grid>
      <Grid
        item
        xs
        key="resultsGrid"
        style={{
          marginTop: '1rem',
          alignItems: fullScreen ? 'center' : 'top',
        }}
      >
        <Box sx={{ height: useWindowDimensions().height / 12 }} />
        <CurrentResultsCard
          participant={getNextParticipant()}
          stage={mainResultStage}
        />
        <Box sx={{ height: useWindowDimensions().height / 12 }} />
        {/* <Divider /> */}
        <TransitionGroup className="ParticipantsList" key="ParticipantsList">
          {pastResults.map((participant) => (
            <Fade timeout={1000} mountOnEnter unmountOnExit key={participant.id}>
              <ResultsCard participant={participant} />
            </Fade>
          ))}
        </TransitionGroup>
      </Grid>
    </Grid>
  );
}
