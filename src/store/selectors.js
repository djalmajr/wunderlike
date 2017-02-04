import faker from 'faker';

export const getCacheMessage = state => state.cacheMessage;
export const getRandomMessage = () => faker.hacker.phrase();
