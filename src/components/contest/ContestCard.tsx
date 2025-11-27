/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import {
  Card, CardContent, Grid, Button, Typography, CardActions, CardActionArea, IconButton,
} from '@mui/material';
import React, { useState } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link, useHistory } from 'react-router-dom';
import { randomizeArray } from '../../services/randomService';
import { getContest, getContests, removeContest } from '../../services/localStorageService';
import Endpoints from '../../utils/endpoints';
import AlertDialog from '../utils/AlertDialog';

interface ContestCardProps {
  contest: string;
  index: number;
  setContests: (contests: string[]) => void;
}

export default function ContestCard({ contest: contestId, index, setContests }: ContestCardProps) {
  const history = useHistory();
  const [openAlert, setAlertOpen] = useState(false);
  const onDelete = () => { removeContest(contestId); setContests(getContests()); };
  return (
    <>
      <AlertDialog
        header="¿Seguro?"
        text={`¿Seguro que quieres borrar ${contestId}?`}
        onYes={onDelete}
        open={openAlert}
        setOpen={setAlertOpen}
        key="delete_alert"
      />
      <Grid
        item
        key={`grid-item-${contestId}-${index}`}
        style={{ margin: 0 }}
        xs={12}
        sm={6}
        md={4}
      >
        <Card key={`card-${contestId}-${index}`} style={{ margin: 8, marginLeft: 24, marginRight: 24 }}>
          <CardActionArea onClick={() => history.push(Endpoints.CONTEST(contestId))}>
            <CardContent sx={{ padding: '1rem', textAlign: 'center' }}>
              <Typography variant="h6">{contestId}</Typography>
            </CardContent>
          </CardActionArea>
          <CardActions sx={{ justifyContent: 'space-between' }}>
            <IconButton id={`delete:${contestId}`} size="small" color="error" onClick={() => setAlertOpen(true)}><DeleteOutlineIcon /></IconButton>
            <Link to={Endpoints.CONTEST(contestId)} className="NoLink">
              <IconButton id={`vote:${contestId}`} size="small"><ArrowForwardIcon /></IconButton>
            </Link>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
}
