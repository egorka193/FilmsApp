/* eslint-disable @typescript-eslint/no-explicit-any */
import { getFilmsByIds } from '@/services/api/filmsApi';
import type { FilmInformation } from '@/services/api/types';
import type { ActionContext } from 'vuex';

export interface FilmsState {
  films: FilmInformation[];
}

export const filmsModule = {
  namespaced: true,
  state: (): FilmsState => ({
    films: [],
  }),
  mutations: {
    setFilms(state: FilmsState, payload: FilmInformation[]) {
      const existingIds = state.films.map((f) => f.imdbID);
      payload.forEach((film) => {
        if (!existingIds.includes(film.imdbID)) {
          state.films.push(film);
        }
      });
    },
  },
  actions: {
    async getFilms(context: ActionContext<FilmsState, any>, payload: string[]){
      const idsInStore = context.state.films.filter(film =>
        payload.includes(film.imdbID),
      );
      const missingIds = payload.filter(
        id => !idsInStore.some(film => film.imdbID === id),
      );
      let response: FilmInformation[] = [];
      if (missingIds.length > 0) {
        response = await getFilmsByIds(missingIds);
        context.commit('setFilms', response);
      }
    },
  },
};