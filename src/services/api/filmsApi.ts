import axios from 'axios';

const apiKey = '3a523c11';

interface SearchResponse {
  Response: string;
  totalResults: string; // number in string
  Search: FilmShort[];
};
export interface FilmInformation {
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

export const searchFilms = async (query: string) => {
  const response = await axios.get<SearchResponse>('http://omdbapi.com', {
    params: {
      apikey: apiKey,
      s: query,
    },
  });
  return response.data;
};

export const getFilmById = async (id: string) => {
  const response = await axios.get<FilmInformation>('http://omdbapi.com', {
    params: {
      apikey: apiKey,
      i: id,
    },
  });
  const filmInfo: FilmInformation = {
    Title: response.data.Title,
    Actors: response.data.Actors,
    Country: response.data.Country, 
    Genre: response.data.Genre,
    Plot: response.data.Plot,
    Poster: response.data.Poster,
    Rated: response.data.Rated,
    Runtime: response.data.Runtime,
    Writer: response.data.Writer,
    Year: response.data.Year,
    imdbRating: response.data.imdbRating,
  };
  return filmInfo;
};
