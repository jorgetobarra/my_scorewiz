import { React } from 'react';
import ContestsList from '../components/contest/ContestsList';
import ContestPage from '../pages/ContestPage';
import DetailedResultsPage from '../pages/DetailedResultsPage';
import InsertContestPage from '../pages/InsertContestPage';
import InsertParticipantPage from '../pages/InsertParticipantPage';
import MenuPage from '../pages/MenuPage';
import ResultsPage from '../pages/ResultsPage';
import VotingPage from '../pages/VotingPage';
import Endpoints from './endpoints';

export default [
  { path: Endpoints.MENU(), name: 'Menu', component: <MenuPage /> },
  { path: Endpoints.CONTESTS(), name: 'Contests', component: <ContestsList /> },
  { path: Endpoints.NEW_CONTEST(), name: 'New contest', component: <InsertContestPage /> },
  { path: Endpoints.CONTEST(), name: 'Contest', component: <ContestPage /> },
  { path: Endpoints.NEW_PARTICIPANT(), name: 'New Participant', component: <InsertParticipantPage /> },
  { path: Endpoints.PARTICIPANT_VOTING(), name: 'Participant voting', component: <VotingPage /> },
  { path: Endpoints.RESULTS(), name: 'Results', component: <ResultsPage /> },
  { path: Endpoints.DETAILED_RESULTS(), name: 'Detailed results', component: <DetailedResultsPage /> },
];
