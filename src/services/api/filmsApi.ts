
import axios from 'axios';
import type { FilmInformation, FilmShort } from './types';

const apiKey = '3a523c11';

interface SearchResponse {
  Response: string;
  totalResults: string; // number in string
  Search: FilmShort[];
};

const popularQueries = ['tt18689424', 'tt4154796', 'tt0372784', 'tt0133093', 'tt1877830'];

export const getPopularFilms = async () => {
  const results = await getFilmsByIds(popularQueries);
  return results;
};

export const searchFilms = async (query: string, page: number) => {
  const response = await axios.get<SearchResponse>('http://omdbapi.com', {
    params: {
      apikey: apiKey,
      s: query,
      page: page,
    },
  });
  return response.data;
};

export const getFilmsByIds = (ids: string[]): Promise<FilmInformation[]>  => {
  const result = ids.map((item) => getFilmById(item));
  return Promise.all(result);
  
};
export const getFilmById = async (id: string) => {
  const response = await axios.get<FilmInformation>('http://omdbapi.com', {
    params: {
      apikey: apiKey,
      i: id,
    },
  });
  const filmInfo: FilmInformation = {
    imdbID: id,
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