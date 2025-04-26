import { fakeApiRequest, getNewId } from '@/services/utils';
import { type List, LocalStorageKeys, favoriteList } from './types';
import { newList } from './types';
// import type { FilmShort } from './filmsApi';

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
const seListsInLs = (lists: List[]) => {
  localStorage.setItem(LocalStorageKeys.lists, JSON.stringify(lists)); 
};

export const getLists = (): Promise<List[]> => {
  return fakeApiRequest(getListsFromLs());
};
export const updateListApi = (value: List) => {
  const lsResults = getListsFromLs();
  const updateLists = lsResults.map((item) => {
    return item.id === value.id ? value : item;
  });
  seListsInLs(updateLists);
  return fakeApiRequest(null);
};
export const deleteListApi = (id: number) => {
  const lsResults = getListsFromLs();
  const filteredResults = lsResults.filter((item: List) => item.id !== id);
  seListsInLs(filteredResults);
  return fakeApiRequest(null);
};

export const createList = (name: string): Promise<List> => {
  newList.name = name;
  const lists = getListsFromLs();
  newList.id = getNewId(lists.map(list => list.id));
  const updatedLists = [...lists, newList];
  seListsInLs(updatedLists);
  return fakeApiRequest(newList);
};
// export const addFilmInList = (list: List, film: FilmShort) => {
//   const listsInLs = localStorage.getItem(LocalStorageKeys.lists);
//   const addingList = JSON.parse(listsInLs).filter((item) => item.name === list.name)[0];
//   console.log(addingList);
//   addingList.filmsIds.push(film);
//   console.log(addingList);
  
// };
