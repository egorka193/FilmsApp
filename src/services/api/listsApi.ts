import { fakeApiRequest, getNewId } from '@/services/utils';
import { favoriteList, type List, LocalStorageKeys} from './types';
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
const setListsInLs = (lists: List[]) => {
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
  setListsInLs(updateLists);
  return fakeApiRequest(null);
};
export const deleteListApi = (id: number) => {
  const lsResults = getListsFromLs();
  const filteredResults = lsResults.filter((item: List) => item.id !== id);
  setListsInLs(filteredResults);
  return fakeApiRequest(null);
};

export const createList = (name: string): Promise<List> => {
  newList.name = name;
  const lists = getListsFromLs();
  newList.id = getNewId(lists.map(list => list.id));
  const updatedLists = [...lists, newList];
  setListsInLs(updatedLists);
  return fakeApiRequest(newList);
};


