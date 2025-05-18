import { fakeApiRequest } from '../utils';
import { LocalStorageKeys, profileInfo, type Profile } from './types';

export const saveProfileInfo = (payload: Profile) => {
  localStorage.setItem(LocalStorageKeys.profile, JSON.stringify(payload));
  return fakeApiRequest(null);
};
export const getProfileInfoFromLs = () => {
  // localStorage.clear();
  let lsProfile = localStorage.getItem(LocalStorageKeys.profile);
  if (!lsProfile) {
    lsProfile = JSON.stringify(profileInfo);
    localStorage.setItem(LocalStorageKeys.profile, lsProfile);
  }

  const parsedProfile: Profile = JSON.parse(lsProfile);
  return fakeApiRequest(parsedProfile);
};