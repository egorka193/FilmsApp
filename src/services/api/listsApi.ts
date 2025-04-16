import { fakeApiRequest, getNewId } from '@/services/utils';
import { type List, LocalStorageKeys, favoriteList } from './types';
import { newList } from './types';

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
export const updateLs = (value: object) => {
  localStorage.setItem(LocalStorageKeys.lists, JSON.stringify(value));
};

export const createList = (name: string): Promise<List> => {
  newList.name = name;
  const lists = getListsFromLs();
  newList.id = getNewId(lists.map(list => list.id));
  const updatedLists = [...lists, newList];
  localStorage.setItem(LocalStorageKeys.lists, JSON.stringify(updatedLists)); 
  return fakeApiRequest(newList);
};
