import * as actionTypes from '../actions/actionTypes';

const initialState = {
  mixId: '',
  mixTitle: '',
  ownerId: '',
  tracks: [],
  topTracks: [],
  currentTrack: null,
  votingTrack: null,
  timeInterval: null,
  isPlaying: false,
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_GET_RANKING_TRACKS:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actionTypes.GET_RANKING_TRACKS:
      return {
        ...state,
        tracks: action.tracks,
        loading: false,
        error: false,
      };
    case actionTypes.GET_RANKING_TRACKS_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case actionTypes.START_GET_RANKING:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actionTypes.GET_RANKING:
      return {
        ...state,
        mixId: action.mix.id,
        mixTitle: action.mix.title,
        tracks: action.mix.tracks,
        topTracks: action.mix.topTracks,
        ownerId: action.mix.ownerId,
        timeInterval: action.mix.timeInterval,
        loading: false,
        error: false,
      };
    case actionTypes.GET_RANKING_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case actionTypes.START_GET_CURRENT_TRACK:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actionTypes.GET_CURRENT_TRACK:
      return {
        ...state,
        currentTrack: action.currentTrack,
        loading: false,
        error: false,
      };
    case actionTypes.GET_CURRENT_TRACK_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case actionTypes.START_GET_VOTING_TRACK:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actionTypes.GET_VOTING_TRACK:
      return {
        ...state,
        votingTrack: action.votingTrack,
        loading: false,
        error: false,
      };
    case actionTypes.GET_VOTING_TRACK_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case actionTypes.START_UPVOTE:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actionTypes.UPVOTE:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case actionTypes.UPVOTE_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case actionTypes.START_DOWNVOTE:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actionTypes.DOWNVOTE:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case actionTypes.DOWNVOTE_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case actionTypes.START_BEGIN_PLAYBACK:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actionTypes.BEGIN_PLAYBACK:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case actionTypes.BEGIN_PLAYBACK_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case actionTypes.START_STOP_PLAYBACK:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actionTypes.STOP_PLAYBACK:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case actionTypes.STOP_PLAYBACK_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;
