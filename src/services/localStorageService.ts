import { Contest, Participant, Vote } from "../types";

const CONTESTS_KEY = "contests";
const CONTEST_KEY = (contest: string) => `${contest}:data`;

export async function getContests(): Promise<Contest[]> {
  const contests = localStorage.getItem(CONTESTS_KEY);
  return contests ? JSON.parse(contests) : [];
}

export async function saveContestsList(contests: Contest[]): Promise<boolean> {
  if (contests) {
    localStorage.setItem(CONTESTS_KEY, JSON.stringify(contests));
    return true;
  }
  return false;
}

export async function getContest(contestId: string): Promise<Contest | null> {
  const contestData = localStorage.getItem(CONTEST_KEY(contestId));
  return contestData ? JSON.parse(contestData) : null;
}

export async function saveContest(contest: Contest): Promise<boolean> {
  if (contest && contest.id) {
    localStorage.setItem(
      CONTESTS_KEY,
      JSON.stringify([
        ...(await getContests()).filter((c) => c.id !== contest.id),
        contest,
      ])
    );
    localStorage.setItem(CONTEST_KEY(contest.id), JSON.stringify(contest));
    return true;
  }
  return false;
}

export async function deleteContest(contestId: string): Promise<void> {
  localStorage.removeItem(CONTEST_KEY(contestId));
  localStorage.setItem(
    CONTESTS_KEY,
    JSON.stringify((await getContests()).filter((c) => c.id !== contestId))
  );
}
