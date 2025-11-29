import React from "react";
import { Contest, Participant, Vote } from "../types/index";
import * as ContestsRepository from "../services/localStorageService";
import { mapResultsToGrid } from "../services/helpers";

interface ContestContextType {
  contests: Contest[];
  getContest: (contestId: string) => Contest | null;
  addContest: (name: string) => void;
  removeContest: (contestId: string) => void;
  getParticipants: (contestId: string) => Participant[];
  getParticipant: (
    contestId: string,
    participantId: string
  ) => Participant | undefined;
  setParticipants: (contestId: string, participants: Participant[]) => void;
  addParticipant: (contestId: string, participant: Participant) => void;
  updateParticipant: (contestId: string, participant: Participant) => void;
  removeParticipant: (contestId: string, participantId: string) => void;
  getVotes: (contestId: string, participantId: string) => Vote[] | undefined;
  calculateAllVotes: (contestId: string) => Promise<Contest | undefined>;
  setVotes: (
    contestId: string,
    participantId: string,
    votes: Vote[] | undefined
  ) => void;
  removeVotes: (contestId: string, participantId: string) => void;
  generateVotes: (contestId: string) => void;
  restoreContest: (contest: Contest) => Promise<[boolean, string]>;
}

export const ContestContext = React.createContext<
  ContestContextType | undefined
>(undefined);

export function ContestContextProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const [contests, setContests] = React.useState<Contest[]>([]);

  const reloadContests = async () => {
    const storedContests = await ContestsRepository.getContests();
    setContests(storedContests);
  };

  const getContest = (contestId: string): Contest | null => {
    return contests.find((c) => c.id === contestId) || null;
  };

  const addContest = async (name: string) => {
    const newContest: Contest = { id: name, name, participants: [] };
    const allContests = await ContestsRepository.getContests();

    ContestsRepository.saveContestsList([...allContests, newContest]);
    ContestsRepository.saveContest(newContest);

    setContests((prev) => [...prev, newContest]);
  };

  const removeContest = async (contestId: string) => {
    const updatedContests = contests.filter((c) => c.id !== contestId);
    await ContestsRepository.deleteContest(contestId);
    setContests(updatedContests);
  };

  const getParticipants = (contestId: string): Participant[] => {
    const contest = getContest(contestId);
    return contest?.participants || [];
  };

  const getParticipant = (
    contestId: string,
    participantId: string
  ): Participant | undefined => {
    const contest = getContest(contestId);
    return contest?.participants?.find((p) => p.id === participantId);
  };

  const setParticipants = async (
    contestId: string,
    participants: Participant[]
  ): Promise<void> => {
    const contest = getContest(contestId);
    if (!contest) return;

    const updatedContest = contests.map((c) =>
      c.id === contestId ? { ...c, participants } : c
    );

    setContests(updatedContest);
    await ContestsRepository.saveContest(contest);
  };

  const addParticipant = async (
    contestId: string,
    participant: Participant
  ): Promise<void> => {
    const contest = getContest(contestId);
    if (!contest) return;

    setContests((prev) =>
      prev.map((c) =>
        c.id === contestId
          ? { ...c, participants: [...(c.participants || []), participant] }
          : c
      )
    );

    await ContestsRepository.saveContest(contest);
  };

  const updateParticipant = async (
    contestId: string,
    participant: Participant
  ): Promise<void> => {
    const contest = getContest(contestId);
    if (!contest) return;

    const updatedContests = contests.map((c) => {
      if (c.id === contestId) {
        const updatedParticipants = c.participants?.map((p) =>
          p.id === participant.id ? participant : p
        );
        return { ...c, participants: updatedParticipants };
      }
      return c;
    });

    setContests(updatedContests);
    await ContestsRepository.saveContest(contest);
  };

  const removeParticipant = async (
    contestId: string,
    participantId: string
  ): Promise<void> => {
    const contest = getContest(contestId);
    if (!contest || !contest.participants) return;

    const updatedContests = contests.map((c) => {
      if (c.id === contestId) {
        const updatedParticipants = c.participants?.filter(
          (p) => p.id !== participantId
        );
        return { ...c, participants: updatedParticipants };
      }
      return c;
    });

    setContests(updatedContests);

    await ContestsRepository.saveContest(contest);
  };

  const calculateAllVotes = async (
    contestId: string
  ): Promise<Contest | undefined> => {
    const contest = getContest(contestId);
    if (!contest) return undefined;

    const updatedContest = { ...contest };

    updatedContest.participants?.forEach((part) => {
      part.points = 0;

      updatedContest.participants!.forEach((p) => {
        if (p.id !== part.id) {
          const received = p.votes?.find((v) => v.participantId === part.id);
          if (received) {
            part.points = (part.points || 0) + received.points;
          }
        }
      });
    });

    updatedContest.participants
      ?.sort((a, b) => (b.points || 0) - (a.points || 0))
      .forEach((p, index) => {
        p.place = index + 1;
      });

    for (let i = 1; i < updatedContest.participants!.length; i++) {
      if (
        updatedContest.participants![i].points ===
        updatedContest.participants![i - 1].points
      ) {
        updatedContest.participants![i].place =
          updatedContest.participants![i - 1].place;
      }
    }

    await ContestsRepository.saveContest(updatedContest);
    setContests((prev) =>
      prev.map((c) => (c.id === contestId ? updatedContest : c))
    );
    return updatedContest;
  };

  const getVotes = (
    contestId: string,
    participantId: string
  ): Vote[] | undefined => {
    const contest = getContest(contestId);
    return contest?.participants?.find((p) => p.id === participantId)?.votes;
  };

  const setVotes = async (
    contestId: string,
    participantId: string,
    votes: Vote[] | undefined
  ): Promise<void> => {
    const contest = getContest(contestId);
    if (!contest || !contest.participants) return;

    const updatedContest = { ...contest };

    const participant = updatedContest.participants!.find(
      (p) => p.id === participantId
    );
    if (participant) {
      participant.votes = votes;
      await ContestsRepository.saveContest(updatedContest);
      setContests((prev) =>
        prev.map((c) => (c.id === contestId ? updatedContest : c))
      );
    }
  };

  const removeVotes = (contestId: string, participantId: string): void => {
    setVotes(contestId, participantId, undefined);
  };

  const generateVotes = async (contestId: string): Promise<void> => {
    const contest = await calculateAllVotes(contestId);
    if (!contest) return;

    const updatedContest = { ...contest };

    updatedContest.results = mapResultsToGrid(updatedContest);
    await ContestsRepository.saveContest(updatedContest);
    setContests((prev) =>
      prev.map((c) => (c.id === contestId ? updatedContest : c))
    );
  };

  const restoreContest = async (
    contest: Contest
  ): Promise<[boolean, string]> => {
    if (!contest.id || !contest.name) {
      return [false, "Invalid contest format"];
    }

    if (contests.find((c) => c.id === contest.id)) {
      return [false, `Contest "${contest.name}" already exists`];
    }

    const updatedContests = [...contests];

    updatedContests.push(contest);
    setContests(updatedContests);
    await ContestsRepository.saveContestsList(updatedContests);
    await ContestsRepository.saveContest(contest);

    return [true, `Contest "${contest.name}" imported successfully`];
  };

  React.useEffect(() => {
    reloadContests();
  }, []);

  const values: ContestContextType = {
    contests,
    getContest,
    addContest,
    removeContest,
    getParticipants,
    getParticipant,
    setParticipants,
    addParticipant,
    updateParticipant,
    removeParticipant,
    getVotes,
    calculateAllVotes,
    setVotes,
    removeVotes,
    generateVotes,
    restoreContest,
  };

  return (
    <ContestContext.Provider value={values}>{children}</ContestContext.Provider>
  );
}

export const useContestContext = (): ContestContextType => {
  const context = React.useContext(ContestContext);
  if (context === undefined) {
    throw new Error(
      "useContestContext must be used within a ContestContextProvider"
    );
  }
  return context;
};
