import * as actionTypes from '../actions/actionTypes';

const initialState = {
  mixes: [],
  playlists: [],
  tracks: [],
  refresh: false,
  profile: '',
  profileURL: '',
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_GET_MIXES:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actionTypes.GET_MIXES:
      return {
        ...state,
        mixes: action.mixes,
        loading: false,
        error: false,
      };
    case actionTypes.GET_MIXES_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case actionTypes.START_ADD_TO_GROUP:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actionTypes.ADD_TO_GROUP:
      return {
        ...state,
        mixes: state.mixes.concat(action.mix),
        loading: false,
        error: false,
      };
    case actionTypes.ADD_TO_GROUP_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case actionTypes.START_GET_PROFILE_URL:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actionTypes.GET_PROFILE_URL:
      return {
        ...state,
        profileURL: action.url,
        loading: false,
        error: false,
      };
    case actionTypes.GET_PROFILE_URL_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case actionTypes.START_GET_PROFILE:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actionTypes.GET_PROFILE:
      return {
        ...state,
        refresh: true,
        profile: action.profile,
        loading: false,
        error: false,
      };
    case actionTypes.GET_PROFILE_FAIL:
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
