export enum LocalStorageKeys {
  lists = 'FaFakeApiLists',
}

export interface List {
  id: number;
  name: string;
  filmsIds: string[];
  isSystem: boolean;
}
export const newList: List = {
  id: 0,
  name: '',
  filmsIds: [],
  isSystem: false,
};
export const favoriteList: List = {
  id: 0,
  name: 'Favorite',
  isSystem: true,
  filmsIds: [],
};
