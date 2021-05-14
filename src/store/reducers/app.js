import * as actionTypes from '../actions/actionTypes';

const initialState = {
  mixes: [],
  playlists: [],
  tracks: [],
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
      console.lof('ACTION GET MIXES');
      return {
        ...state,
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
        loading: true,
        error: false,
      };
    case actionTypes.ADD_TO_GROUP_FAIL:
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
