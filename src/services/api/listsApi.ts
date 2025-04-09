import { type List, LocalStorageKeys, getFakeDelay, favoriteList } from './types';

const fakeApiRequest = <T>(response: T): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(response);
    }, getFakeDelay());
  });
};

const getListsFromLs = () => {
  let lsResults = localStorage.getItem(LocalStorageKeys.lists);
  const defaultLists = [favoriteList];
  if (!lsResults) {
    lsResults = JSON.stringify(defaultLists);
    localStorage.setItem(LocalStorageKeys.lists, lsResults);
  }
  const parseLsResults = JSON.parse(lsResults);
  if (Array.isArray(parseLsResults) && parseLsResults.length) {
    return parseLsResults as List[];
  }
  return defaultLists;
};

export const getLists = (): Promise<List[]> => {
  return fakeApiRequest(getListsFromLs());
};