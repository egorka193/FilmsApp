import { createStore } from 'vuex';
import type { List } from '@/services/api/types';
import { createList, deleteListApi, getLists, updateListApi } from '@/services/api/listsApi';

// define your typings for the store state
export interface State {
  lists: List[];
}

export const store = createStore<State>({
  state: {
    lists: [], // ✅ значение по умолчанию (пустой массив)
  },
  mutations: {
    initList(state, payload: List[]) {
      state.lists = payload;
    },
    addList(state, payload: List) {
      state.lists.push(payload);
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
      const lists = await getLists();
      context.commit('initList', lists);
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
  },
});