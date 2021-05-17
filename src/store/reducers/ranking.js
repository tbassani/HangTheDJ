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
    case actionTypes.START_AUTH:
      return {
        ...state,
        loading: true,
        error: false,
      };

    default:
      return state;
  }
};

export default reducer;
