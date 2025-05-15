import { fakeApiRequest, getNewId } from '@/services/utils';
import { type List, LocalStorageKeys, type Profile, favoriteList, profileInfo } from './types';
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
export const saveProfileInfo = () => {
  return fakeApiRequest(null);
};
export const updateProfile = async ( key: keyof Profile, value: string) => {
  const lsResults = await getProfileInfoFromLs();
  lsResults[key] = value;
  localStorage.setItem(LocalStorageKeys.profile, JSON.stringify(lsResults));
  return fakeApiRequest(lsResults);
};
export const getProfileInfoFromLs = () => {
  if (!localStorage.getItem(LocalStorageKeys.profile)) {
    const defaultProfile = JSON.stringify(profileInfo);
    localStorage.setItem(LocalStorageKeys.profile, defaultProfile);
  }
  const lsResults = localStorage.getItem(LocalStorageKeys.profile);
  const parseLsResults: Profile = JSON.parse(lsResults as string);

  return fakeApiRequest(parseLsResults);
};

