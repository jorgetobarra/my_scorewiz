export const Endpoints = {
  MENU: () => "/",
  CONTESTS: () => "/contests",
  NEW_CONTEST: () => "/contests/new",
  CONTEST: (contestId: string) => `/contest/${contestId}`,
  NEW_PARTICIPANT: (contestId: string) =>
    `/contest/${contestId}/participants/new`,
  PARTICIPANT_VOTING: (contestId: string, participantId: string) =>
    `/contest/${contestId}/vote/${participantId}`,
  RESULTS: (contestId: string) => `/contest/${contestId}/results`,
  DETAILED_RESULTS: (contestId: string) =>
    `/contest/${contestId}/results/details`,
};

export const ROUTES = 
  {
  MENU: Endpoints.MENU(),
  CONTESTS: Endpoints.CONTESTS(),
  NEW_CONTEST: Endpoints.NEW_CONTEST(),
  CONTEST: Endpoints.CONTEST(":contest"),
  NEW_PARTICIPANT: Endpoints.NEW_PARTICIPANT(":contest"),
  PARTICIPANT_VOTING: Endpoints.PARTICIPANT_VOTING(":contest", ":participant"),
  RESULTS: Endpoints.RESULTS(":contest"),
  DETAILED_RESULTS: Endpoints.DETAILED_RESULTS(":contest"),
}
;
