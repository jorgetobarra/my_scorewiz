/* eslint-disable no-plusplus */
function getRandomInteger(offset: number, excludingLimit: number): number {
  return Math.floor(Math.random() * (excludingLimit - offset) * (offset || 1));
}

// eslint-disable-next-line import/prefer-default-export
export function randomizeArray<T>(array: T[]): T[] {
  const finalArray = [...array];
  for (let i = 0; i < finalArray.length * 10; i++) {
    const positionA = getRandomInteger(0, finalArray.length);
    const positionB = getRandomInteger(0, finalArray.length);
    const temp = finalArray[positionA];
    finalArray[positionA] = finalArray[positionB];
    finalArray[positionB] = temp;
  }
  return finalArray;
}
