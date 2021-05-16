import * as actionTypes from './actionTypes';

export const initGetMixes = () => {
  return {
    type: actionTypes.INIT_GET_MIXES,
  };
};

export const startGetMixes = () => {
  return {
    type: actionTypes.START_GET_MIXES,
  };
};

export const getMixes = mixes => {
  return {
    type: actionTypes.GET_MIXES,
    mixes: mixes,
  };
};

export const getMixesFail = () => {
  return {
    type: actionTypes.GET_MIXES_FAIL,
  };
};

export const initAddToGroup = mixId => {
  return {
    type: actionTypes.INIT_ADD_TO_GROUP,
    mixId: mixId,
  };
};

export const startAddToGroup = () => {
  return {
    type: actionTypes.START_ADD_TO_GROUP,
  };
};

export const addToGroup = mix => {
  return {
    type: actionTypes.ADD_TO_GROUP,
    mix: mix,
  };
};

export const addToGroupFail = () => {
  return {
    type: actionTypes.ADD_TO_GROUP_FAIL,
  };
};

export const initGetProfileURL = () => {
  return {
    type: actionTypes.INIT_GET_PROFILE_URL,
  };
};

export const startGetProfileURL = () => {
  return {
    type: actionTypes.START_GET_PROFILE_URL,
  };
};

export const getProfileURL = url => {
  return {
    type: actionTypes.GET_PROFILE_URL,
    url: url,
  };
};

export const getProfileURLFail = () => {
  return {
    type: actionTypes.GET_PROFILE_URL_FAIL,
  };
};

export const initGetProfile = () => {
  return {
    type: actionTypes.INIT_GET_PROFILE,
  };
};

export const startGetProfile = () => {
  return {
    type: actionTypes.START_GET_PROFILE,
  };
};

export const getProfile = profile => {
  return {
    type: actionTypes.GET_PROFILE,
    profile: profile,
  };
};

export const getProfileFail = () => {
  return {
    type: actionTypes.GET_PROFILE_FAIL,
  };
};

export const initResetPassword = (email, currPassword, newPassword) => {
  return {
    type: actionTypes.INIT_RESET_PASSWORD,
    email: email,
    currPassword: currPassword,
    newPassword: newPassword,
  };
};

export const startResetPassword = () => {
  return {
    type: actionTypes.START_RESET_PASSWORD,
  };
};

export const resetPassword = () => {
  return {
    type: actionTypes.RESET_PASSWORD,
  };
};

export const resetPasswordFail = () => {
  return {
    type: actionTypes.RESET_PASSWORD_FAIL,
  };
};

export const initGetTracksAndPlaylists = (query, cancelToken) => {
  return {
    type: actionTypes.INIT_GET_TRACKS_AND_PLAYLISTS,
    query: query,
    cancelToken: cancelToken,
  };
};

export const startGetTracksAndPlaylists = () => {
  return {
    type: actionTypes.START_GET_TRACKS_AND_PLAYLISTS,
  };
};

export const getTracksAndPlaylists = (tracks, playlists) => {
  return {
    type: actionTypes.GET_TRACKS_AND_PLAYLISTS,
    tracks: tracks,
    playlists: playlists,
  };
};

export const getTracksAndPlaylistsFail = () => {
  return {
    type: actionTypes.GET_TRACKS_AND_PLAYLISTS_FAIL,
  };
};

export const addTrackToMix = track => {
  return {
    type: actionTypes.ADD_TRACK_TO_MIX,
    track: track,
  };
};

export const addPlaylistToMix = playlist => {
  return {
    type: actionTypes.ADD_PLAYLIST_TO_MIX,
    playlist: playlist,
  };
};

export const removeTrackFromMix = track => {
  return {
    type: actionTypes.REMOVE_TRACK_FROM_MIX,
    track: track,
  };
};

export const removePlaylistFromMix = playlist => {
  return {
    type: actionTypes.REMOVE_PLAYLIST_FROM_MIX,
    playlist: playlist,
  };
};
