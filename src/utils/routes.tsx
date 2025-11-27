import React from 'react';
import ContestsList from '../components/contest/ContestsList';
import ContestPage from '../pages/ContestPage';
import DetailedResultsPage from '../pages/DetailedResultsPage';
import InsertContestPage from '../pages/InsertContestPage';
import InsertParticipantPage from '../pages/InsertParticipantPage';
import MenuPage from '../pages/MenuPage';
import ResultsPage from '../pages/ResultsPage';
import VotingPage from '../pages/VotingPage';
import {ROUTES} from './endpoints';
import { Route } from '../types';

const routes: Route[] = [
  { path: ROUTES.MENU, name: 'Menu', component: <MenuPage /> },
  { path: ROUTES.CONTESTS, name: 'Contests', component: <ContestsList /> },
  { path: ROUTES.NEW_CONTEST, name: 'New contest', component: <InsertContestPage /> },
  { path: ROUTES.CONTEST, name: 'Contest', component: <ContestPage /> },
  { path: ROUTES.NEW_PARTICIPANT, name: 'New Participant', component: <InsertParticipantPage /> },
  { path: ROUTES.PARTICIPANT_VOTING, name: 'Participant voting', component: <VotingPage /> },
  { path: ROUTES.RESULTS, name: 'Results', component: <ResultsPage /> },
  { path: ROUTES.DETAILED_RESULTS, name: 'Detailed results', component: <DetailedResultsPage /> },
];

export default routes;
