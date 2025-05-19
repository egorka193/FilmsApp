export enum LocalStorageKeys {
  lists = 'FaFakeApiLists',
  profile = 'profileData',
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
export interface FilmInformation {
  imdbID: string;
  Title: string;
  Actors: string;
  Country: string; 
  Plot: string;
  Poster: string;
  Rated: string;
  Runtime: string;
  Writer: string;
  Year: string;
  imdbRating: string;
  Genre: string;
};
export interface FilmShort {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
};
export interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nickName: string;
}
export const profileInfo: Profile = {
  firstName: 'Igor',
  lastName: 'Krivocapich',
  email: 'Krivocapich.igor.1978@gmail.ru',
  phone: '86994937424',
  nickName: 'igor4ick/Pomidor4ick',
};