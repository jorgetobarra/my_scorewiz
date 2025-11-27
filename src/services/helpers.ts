/* eslint-disable max-len */
import { Contest, Participant, Vote } from '../types';

// a little function to help us with reordering the result
// eslint-disable-next-line import/prefer-default-export
export const reorder = <T>(
  list: T[],
  startIndex: number,
  endIndex: number,
): T[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const mapResultsToGrid = (contest: Contest): any[][] => {
  const participants = [...(contest.participants || [])];
  const resultsGrid: any[][] = [];
  [...participants, 1].forEach(() => resultsGrid.push([]));
  // const participantsWhoVoted = [];
  // const participantsWhoDidNotVote = []; TODO: give option to remove participants who did not vote
  const sortedResults = participants
    .sort((a, b) => (a.place || 0) - (b.place || 0));
  sortedResults
    .forEach((p, indexP) => {
      // if (p.votes) participantsWhoVoted.push(p);
      // else participantsWhoDidNotVote.push(p);
      resultsGrid[0][0] = 'Puesto';
      resultsGrid[0][1] = 'Receptor';
      resultsGrid[indexP + 1][0] = p.place; // TODO: change index for ROW and COLUMN to organise this sheit
      resultsGrid[indexP + 1][1] = p.name;
      sortedResults
        .forEach((r, indexR) => {
          resultsGrid[0][indexR + 2] = r.name;
          resultsGrid[indexP + 1][indexR + 2] = r.votes?.find((v) => v.participantId === p.id)?.points || 0;
        });
      resultsGrid[indexP + 1][indexP + 2] = '-';
      resultsGrid[0][participants.length + 2] = 'Total';
      resultsGrid[indexP + 1][participants.length + 2] = p.points;
    });
  return resultsGrid;
};

export const mapGridToWorkbook = (resultsGrid: any[][]): any[] => {
  const resultsCopy = [...resultsGrid];
  const workbook: any[] = [];
  resultsCopy.forEach((gridRow, rowIndex) => {
    if (rowIndex > 0) {
      const row: any = {};
      gridRow.forEach((gridCol, colIndex) => {
        row[resultsCopy[0][colIndex]] = gridCol;
      });
      workbook.push(row);
    }
  });
  return workbook;
};
