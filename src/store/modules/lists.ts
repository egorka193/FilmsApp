/* eslint-disable @typescript-eslint/no-explicit-any */
import { createList, deleteListApi, getLists, updateListApi } from '@/services/api/listsApi';
import type { List } from '@/services/api/types';
import type { ActionContext } from 'vuex';

export interface ListsState {
  lists: List[];
  isListsLoading: boolean;
}

export const listsModule = {
  namespaced: true,
  state: (): ListsState => ({
    lists: [],
    isListsLoading: false,
  }),
  mutations: {
    initList(state: ListsState, payload: List[]) {
      state.lists = payload;
    },
    addList(state: ListsState, payload: List) {
      state.lists.push({ ...payload });
    },
    deleteList(state: ListsState, id: number) {
      state.lists = state.lists.filter((list) => list.id !== id);
    },
    updateList(state: ListsState, updated: List) {
      state.lists = state.lists.map((list) =>
        list.id === updated.id ? updated : list,
      );
    },
    setIsListsLoading(state: ListsState, payload: boolean) {
      state.isListsLoading = payload;
    },
  },
  actions: {
    async initList({ commit }: ActionContext<ListsState, any>) {
      commit('setIsListsLoading', true);
      const lists = await getLists();
      commit('initList', lists);
      commit('setIsListsLoading', false);
    },
    async addList({ commit }: ActionContext<ListsState, any>, payload: string) {
      const newList = await createList(payload);
      commit('addList', newList);
    },
    async deleteList({ commit }: ActionContext<ListsState, any>, id: number) {
      await deleteListApi(id);
      commit('deleteList', id);
    },
    async updateList({ commit }: ActionContext<ListsState, any>, list: List) {
      await updateListApi(list);
      commit('updateList', list);
    },
  },
};