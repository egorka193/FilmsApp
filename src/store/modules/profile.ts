/* eslint-disable @typescript-eslint/no-explicit-any */
import { getProfileInfoFromLs, saveProfileInfo, updateProfile } from '@/services/api/listsApi';
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
    updateField(state: ProfileState) {
      state.isEditing = true;
    },
    setEditing(state: ProfileState, value: boolean) {
      state.isEditing = value;
    },
    initProfile(state: ProfileState, value: Profile) {
      state.profile = value;
    },
  },
  actions: {
    async updateField({ commit }: ActionContext<ProfileState, any>, payload: { key: keyof Profile; value: string }) {
      const result = await updateProfile(payload.key, payload.value);
      commit('updateField', result);
    },
    async saveChanges({ commit }: any) {
      await saveProfileInfo();
      commit('setEditing', false);
    },
    async initProfile({ commit }: any) {
      commit('setEditing', true);
      const profile = await getProfileInfoFromLs();
      commit('initProfile', profile);
      commit('setEditing', false);
    },
  },
};