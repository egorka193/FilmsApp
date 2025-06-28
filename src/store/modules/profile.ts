/* eslint-disable @typescript-eslint/no-explicit-any */
import { compareProfile, getProfileInfoFromLs, saveProfileInfo } from '@/services/api/profileApi';
import type { Profile } from '@/services/api/types';
import type { ActionContext } from 'vuex';

export interface ProfileState {
  profile: Profile;
  isEditing: boolean;
}

export const profileModule = {
  namespaced: true,
  state: (): ProfileState => ({
    profile: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      nickName: '',
    },
    isEditing: false,
  }),
  mutations: {
    updateProfile(state: ProfileState, value: Profile) {
      state.profile = value;
    },
    setEditing(state: ProfileState, value: boolean) {
      state.isEditing = value;
    },
    initProfile(state: ProfileState, value: Profile) {
      state.profile = value;
    },
  },
  actions: {
    async saveChanges({ commit }: ActionContext<ProfileState, any>, payload: Profile) {
      await saveProfileInfo(payload);
      commit('updateProfile', payload);
      commit('setEditing', false);
    },
    async initProfile({ commit }: any) {
      commit('setEditing', true);
      const profile = await getProfileInfoFromLs();
      commit('initProfile', profile);
      commit('setEditing', false);
    },
    changeGraph({ commit }: any, payload: object) {
      const result = compareProfile(payload);
      if(result){
        commit('setEditing', false);
      } else {
        commit('setEditing', true);
      }
    },
  },
};