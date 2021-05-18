import * as actionTypes from '../actions/actionTypes';

const initialState = {
  mixId: '',
  mixTitle: '',
  ownerId: '',
  tracks: [],
  topTracks: [],
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
    default:
      return state;
  }
};

export default reducer;
