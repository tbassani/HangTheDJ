import * as actionTypes from './actionTypes';

export const initGetRankingTracks = (mixId, query, cancelToken) => {
  return {
    type: actionTypes.INIT_GET_RANKING_TRACKS,
    mixId: mixId,
    query: query,
    cancelToken: cancelToken,
  };
};

export const startGetRankingTracks = () => {
  return {
    type: actionTypes.START_GET_RANKING_TRACKS,
  };
};

export const getRankingTracks = tracks => {
  return {
    type: actionTypes.GET_RANKING_TRACKS,
    tracks: tracks,
  };
};

export const getRankingTracksFail = () => {
  return {
    type: actionTypes.GET_RANKING_TRACKS_FAIL,
  };
};

export const initGetRanking = (mixId, mixTitle, ownerId) => {
  return {
    type: actionTypes.INIT_GET_RANKING,
    mixId: mixId,
    mixTitle: mixTitle,
    ownerId: ownerId,
  };
};

export const startGetRanking = () => {
  return {
    type: actionTypes.START_GET_RANKING,
  };
};

export const getRanking = mix => {
  return {
    type: actionTypes.GET_RANKING,
    mix: mix,
  };
};

export const getRankingFail = () => {
  return {
    type: actionTypes.GET_RANKING_FAIL,
  };
};

export const initAddTracksToMix = mixId => {
  return {
    type: actionTypes.INIT_ADD_TRACKS_TO_MIX,
    mixId: mixId,
  };
};

export const startAddTracksToMix = () => {
  return {
    type: actionTypes.START_ADD_TRACKS_TO_MIX,
  };
};

export const addTracksToMix = (mixId, tracks, playlists) => {
  return {
    type: actionTypes.ADD_TRACKS_TO_MIX,
    mixId: mixId,
    tracks: tracks,
    playlists: playlists,
  };
};

export const addTracksToMixFail = () => {
  return {
    type: actionTypes.ADD_TRACKS_TO_MIX_FAIL,
  };
};
