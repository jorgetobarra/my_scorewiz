/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */

import { mapResultsToGrid } from './helpers';

/* eslint-disable no-param-reassign */
const CONTESTS_KEY = 'contests';
const CONTEST_KEY = (contest) => `${contest}:data`;

export function getContests() {
  const contests = localStorage.getItem(CONTESTS_KEY);
  return contests ? JSON.parse(contests) : [];
}

export function setContests(contests) {
  if (contests) {
    localStorage.setItem(CONTESTS_KEY, JSON.stringify(contests));
    return true;
  }
  return false;
}

export function addContest(contest) {
  const contests = getContests();
  localStorage.setItem(CONTESTS_KEY, JSON.stringify([...contests, contest]));
  localStorage.setItem(CONTEST_KEY(contest), JSON.stringify({ id: contest, name: contest }));
}

export function getContest(contestId) {
  const contestData = localStorage.getItem(CONTEST_KEY(contestId));
  return JSON.parse(contestData);
}

export function setContest(contest) {
  if (contest && contest.id) {
    localStorage.setItem(CONTEST_KEY(contest.id), JSON.stringify(contest));
    return true;
  }
  return false;
}

export function removeContest(contestId) {
  const contest = getContest(contestId);
  const contests = getContests();
  if (contest) {
    localStorage.removeItem(CONTEST_KEY(contestId));
    const index = contests.indexOf(contests.find((c) => c === contestId));
    if (index !== -1) {
      contests.splice(index, 1);
    }
  }
  setContests(contests);
}

export function getParticipants(contestId) {
  const contest = getContest(contestId);
  return contest?.participants || [];
}

export function getParticipant(contestId, participantName) {
  const contest = getContest(contestId);
  return contest?.participants?.find((p) => p.name === participantName);
}

export function setParticipants(contestId, participants) {
  const contest = getContest(contestId);
  contest.participants = participants; // TODO: this overrides votes, careful
  setContest(contest);
}

export function addParticipant(contestId, participant) {
  const contest = getContest(contestId);
  if (contest?.participants) {
    contest.participants.push(participant);
  } else {
    contest.participants = [participant];
  }
  setContest(contest);
}

export function setParticipant(contest, participant) { // TODO: what does this do?
  contest.participants
    // eslint-disable-next-line no-param-reassign
    .forEach((p) => { if (p.id === participant.id) p = participant; });
  setContest(contest); // TODO: this overrides votes, careful
}

export function removeParticipant(contestId, participantId) {
  const contest = getContest(contestId);
  const index = contest.participants.findIndex((p) => p.id === participantId);
  contest.participants.splice(index, 1);
  setContest(contest);
}

export function setAllVotes(contestId) {
  const contest = getContest(contestId);
  contest.participants?.forEach((part) => {
    // Given votes are [{participantId: string, points: number}]
    if (!part.votes) part.votes = [];
    part.points = 0;
    contest.participants.forEach((p) => {
      if (p.id !== part.id) {
        const received = p.votes?.find((v) => v.participantId === part.id);
        if (received) part.points = (part.points || 0) + received.points; // TODO: this works?
      }
    });
  });
  contest.participants?.sort((a, b) => b.points - a.points) // Descending order
    .forEach((p, index) => { p.place = index + 1; });
  for (let i = 0; i < contest.participants.length; i++) {
    if (i > 0
         && contest.participants[i].points === contest.participants[i - 1].points) {
      contest.participants[i].place = contest.participants[i - 1].place;
    }
  }
  setContest(contest);
  return contest.participants;
}

export function getVotes(contestId, participantId) {
  const contest = getContest(contestId);
  return contest?.participants?.find((p) => p.id === participantId).votes;
}

export function setVotes(contestId, participantId, votes) {
  const contest = getContest(contestId);
  const participant = contest.participants.find((p) => p.id === participantId);
  participant.votes = votes; // TODO: check that this is working
  setParticipant(contest, participant);
}

export function removeVotes(contestId, participantId) {
  setVotes(contestId, participantId, undefined);
}

export function generateVotes(contestId) {
  setAllVotes(contestId);
  const contest = getContest(contestId);
  contest.results = mapResultsToGrid(contest);
  setContest(contest);
}

export function restoreContest(contest) {
  // TODO : validate contest format before
  localStorage.setItem(contest.id, JSON.stringify(contest));
}
