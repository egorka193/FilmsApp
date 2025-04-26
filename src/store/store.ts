import { createStore } from 'vuex';
import type { List } from '@/services/api/types';
import { createList, deleteListApi, getLists, updateListApi } from '@/services/api/listsApi';
import { getFilmsByIds, type FilmInformation } from '@/services/api/filmsApi';

// define your typings for the store state
export interface State {
  lists: List[];
  films: FilmInformation[]; 
  isListsLoading: boolean;
}

export const store = createStore<State>({
  state: {
    lists: [], 
    films: [],
    isListsLoading: false,
  },
  mutations: {
    initList(state, payload: List[]) {
      state.lists = payload;
    },
    setFilms(state, payload: FilmInformation[]) {
      const ids = state.films.map(item => item.imdbID);
      payload.forEach(item => {
        if (!ids.includes(item.imdbID)) {
          state.films.push(item);
        }
      });
    },
    addList(state, payload: List) {
      state.lists.push(payload);
    },
    setIsListsLoading(state, payload: boolean) {
      state.isListsLoading = payload;
    },
    deleteList(state, payload: number) {
      state.lists = state.lists.filter((item) => item.id !== payload);
    },
    updateList(state, payload: List) {
      state.lists =  state.lists.map((item) => {
        return item.id === payload.id ? payload : item;
      });
    },
  },
  actions: {
    async initList(context){
      context.commit('setIsListsLoading', true);
      const lists = await getLists();
      context.commit('initList', lists);
      context.commit('setIsListsLoading', false);
    },
    async addList(context, payload){
      const result = await createList(payload);
      context.commit('addList', result);
    },
    async deleteList(context, payload){
      await deleteListApi(payload);
      context.commit('deleteList', payload);
    },
    async updateList(context, payload: List){
      await updateListApi(payload);
      context.commit('updateList', payload);
    },
    async getFilms(context, payload: string[]){
      const response = await getFilmsByIds(payload);
      context.commit('setFilms', response);
    },
  },
});