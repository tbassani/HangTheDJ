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

export const initGetMix = (mixId, mixTitle, ownerId) => {
  return {
    type: actionTypes.INIT_GET_MIX,
    mixId: mixId,
    mixTitle: mixTitle,
    ownerId: ownerId,
  };
};

export const startGetMix = () => {
  return {
    type: actionTypes.START_GET_MIX,
  };
};

export const getMix = mix => {
  return {
    type: actionTypes.GET_MIX,
    mix: mix,
  };
};

export const getMixFail = () => {
  return {
    type: actionTypes.GET_MIX_FAIL,
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

export const initGetCurrentTrack = mixId => {
  return {
    type: actionTypes.INIT_GET_CURRENT_TRACK,
    mixId: mixId,
  };
};

export const startGetCurrentTrack = () => {
  return {
    type: actionTypes.START_GET_CURRENT_TRACK,
  };
};

export const getCurrentTrack = currentTrack => {
  return {
    type: actionTypes.GET_CURRENT_TRACK,
    currentTrack: currentTrack,
  };
};

export const getCurrentTrackFail = () => {
  return {
    type: actionTypes.GET_CURRENT_TRACK_FAIL,
  };
};

export const getNextTrack = nextTrack => {
  return {
    type: actionTypes.GET_NEXT_TRACK,
    nextTrack: nextTrack,
  };
};

export const getNextTrackFail = () => {
  return {
    type: actionTypes.GET_NEXT_TRACK_FAIL,
  };
};

export const getPlayingTrack = playingTrack => {
  return {
    type: actionTypes.GET_PLAYING_TRACK,
    playingTrack: playingTrack,
  };
};

export const getPlayingTrackFail = () => {
  return {
    type: actionTypes.GET_PLAYING_TRACK_FAIL,
  };
};

export const initGetVotingTrack = trackId => {
  return {
    type: actionTypes.INIT_GET_VOTING_TRACK,
    trackId: trackId,
  };
};

export const startGetVotingTrack = () => {
  return {
    type: actionTypes.START_GET_VOTING_TRACK,
  };
};

export const getVotingTrack = votingTrack => {
  return {
    type: actionTypes.GET_VOTING_TRACK,
    votingTrack: votingTrack,
  };
};

export const getVotingTrackFail = () => {
  return {
    type: actionTypes.GET_VOTING_TRACK_FAIL,
  };
};

export const initUpvote = trackId => {
  return {
    type: actionTypes.INIT_UPVOTE,
    trackId: trackId,
  };
};

export const startUpvote = () => {
  return {
    type: actionTypes.START_UPVOTE,
  };
};

export const upvote = () => {
  return {
    type: actionTypes.UPVOTE,
  };
};

export const upvoteFail = () => {
  return {
    type: actionTypes.UPVOTE_FAIL,
  };
};

export const initDownvote = trackId => {
  return {
    type: actionTypes.INIT_DOWNVOTE,
    trackId: trackId,
  };
};

export const startDownvote = () => {
  return {
    type: actionTypes.START_DOWNVOTE,
  };
};

export const downvote = () => {
  return {
    type: actionTypes.DOWNVOTE,
  };
};

export const downvoteFail = () => {
  return {
    type: actionTypes.DOWNVOTE_FAIL,
  };
};

export const initBeginPlayback = mixId => {
  return {
    type: actionTypes.INIT_BEGIN_PLAYBACK,
    mixId: mixId,
  };
};

export const startBeginPlayback = () => {
  return {
    type: actionTypes.START_BEGIN_PLAYBACK,
  };
};

export const beginPlayback = () => {
  return {
    type: actionTypes.BEGIN_PLAYBACK,
  };
};

export const beginPlaybackFail = () => {
  return {
    type: actionTypes.BEGIN_PLAYBACK_FAIL,
  };
};

export const initPlayTrack = (mixId, trackId) => {
  return {
    type: actionTypes.INIT_PLAY_TRACK,
    mixId: mixId,
    trackId: trackId,
  };
};

export const startPlayTrack = () => {
  return {
    type: actionTypes.INIT_PLAY_TRACK,
  };
};

export const playTrack = () => {
  return {
    type: actionTypes.PLAY_TRACK,
  };
};

export const playTrackFail = () => {
  return {
    type: actionTypes.PLAY_TRACK_FAIL,
  };
};

export const setTopTracks = topTracks => {
  return {
    type: actionTypes.SET_TOP_TRACKS,
    topTracks: topTracks,
  };
};

export const setTopTracksFail = () => {
  return {
    type: actionTypes.SET_TOP_TRACKS_FAIL,
  };
};

export const initPauseTrack = () => {
  return {
    type: actionTypes.PAUSE_TRACK,
  };
};

export const startPauseTrack = () => {
  return {
    type: actionTypes.PAUSE_TRACK,
  };
};

export const pauseTrack = () => {
  return {
    type: actionTypes.PAUSE_TRACK,
  };
};

export const pauseTrackFail = () => {
  return {
    type: actionTypes.PAUSE_TRACK_FAIL,
  };
};

export const initStopPlayback = () => {
  return {
    type: actionTypes.INIT_STOP_PLAYBACK,
  };
};

export const startStopPlayback = () => {
  return {
    type: actionTypes.START_STOP_PLAYBACK,
  };
};

export const stopPlayback = () => {
  return {
    type: actionTypes.STOP_PLAYBACK,
  };
};

export const stopPlaybackFail = () => {
  return {
    type: actionTypes.STOP_PLAYBACK_FAIL,
  };
};

export const initGetTopTracks = mixId => {
  return {
    type: actionTypes.INIT_GET_TOP_TRACKS,
    mixId: mixId,
  };
};

export const startGetTopTracks = () => {
  return {
    type: actionTypes.START_GET_TOP_TRACKS,
  };
};

export const getTopTracks = topTracks => {
  return {
    type: actionTypes.GET_TOP_TRACKS,
    topTracks: topTracks,
  };
};

export const getTopTracksFail = () => {
  return {
    type: actionTypes.GET_TOP_TRACKS_FAIL,
  };
};

export const initRemoveTopTracks = (userId, ownerId) => {
  return {
    type: actionTypes.INIT_REMOVE_TOP_TRACKS,
    userId: userId,
    ownerId: ownerId,
  };
};

export const startRemoveTopTracks = () => {
  return {
    type: actionTypes.START_REMOVE_TOP_TRACKS,
  };
};

export const removeTopTracks = () => {
  return {
    type: actionTypes.REMOVE_TOP_TRACKS,
  };
};

export const removeTopTracksFail = () => {
  return {
    type: actionTypes.REMOVE_TOP_TRACKS_FAIL,
  };
};
