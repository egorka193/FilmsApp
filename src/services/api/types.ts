export enum LocalStorageKeys {
  lists = 'FaFakeApiLists',
}

export const getFakeDelay = () => {
  const minimalDelay = 200;
  const randomDelay = Math.random() * 1000;
  return Math.max(randomDelay, minimalDelay);
};

export interface List {
  id: number;
  name: string;
  filmsIds: string[];
  isSystem: boolean;
  createdAt: string | null; // date
  updatedAt: string | null; // date
}

export const favoriteList: List = {
  id: 0,
  name: 'Favorite',
  isSystem: true,
  filmsIds: [],
  createdAt: null,
  updatedAt: null,
};
