/*
They are functions, PLEASE USE THEM AS FUNCTIONS
*/
export default class Endpoints {
  static MENU = () => '/';

  static CONTESTS = () => '/contests';

  static NEW_CONTEST = () => '/contests/new';

  static CONTEST = (contestId) => `/contest/${contestId || ':contest'}`;

  static NEW_PARTICIPANT = (contestId) => `/contest/${contestId || ':contest'}/participants/new`;

  static PARTICIPANT_VOTING = (contestId, participantId) => `/contest/${contestId || ':contest'}/vote/${participantId || ':participant'}`;

  static RESULTS = (contestId) => `/contest/${contestId || ':contest'}/results`;

  static DETAILED_RESULTS = (contestId) => `/contest/${contestId || ':contest'}/results/details`;
}
