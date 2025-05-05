export enum RoutesNames {
  Home = 'Home',
  Search = 'Search',
  Lists = 'Lists',
  Profile = 'Profile',
  List = 'List',
  Film = 'Film',
}

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