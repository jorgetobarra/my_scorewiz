/* eslint-disable no-unused-vars */
import {
  Button,
  Grid,
} from '@mui/material';
import { React } from 'react';
import { Link } from 'react-router-dom';
import ContestsList from '../components/contest/ContestsList';
import Header from '../components/utils/Header';
import Endpoints from '../utils/endpoints';

const styles = {
  buttonsGrid: {
    display: 'flex',
    padding: '1rem',
  },
  buttons: {
    marginLeft: '1rem',
    marginRight: '1rem',
  },
};

export default function MenuPage() {
  return (
    <Grid item xs className="layout">
      <Grid item xs key="contestsHeader">
        <Header text="Choose a contest" align="left" />
      </Grid>
      <Grid item xs key="contestsGrid" sx={{ padding: '.5rem' }}>
        <ContestsList />
      </Grid>
      <Grid item xs key="buttonsGrid" justifyContent="center" sx={styles.buttonsGrid}>
        <Link to={Endpoints.NEW_CONTEST()} className="NoLink">
          <Button variant="contained" sx={styles.buttons}>Create new contest</Button>
        </Link>
        <Button variant="outlined" sx={styles.buttons}>Import backup</Button>
      </Grid>
    </Grid>
  );
}
