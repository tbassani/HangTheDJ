import * as actionTypes from '../actions/actionTypes';

const initialState = {
  mixId: '',
  mixTitle: '',
  ownerId: '',
  tracks: [],
  topTracks: [],
  currTrack: null,
  timeInterval: null,
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
        mixId: action.ranking.mixId,
        mixTitle: action.ranking.mixTitle,
        tracks: action.ranking.tracks,
        topTracks: action.ranking.topTracks,
        ownerId: action.ranking.ownerId,
        timeInterval: action.ranking.timeInterval,
        loading: false,
        error: false,
      };
    case actionTypes.GET_RANKING_FAIL:
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
