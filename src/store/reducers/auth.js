import * as actionTypes from '../actions/actionTypes';

const initialState = {
  userId: '',
  token: '',
  email: '',
  isLoggedIn: false,
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
    case actionTypes.LOGIN:
      return {
        ...state,
        userId: action.user.localId,
        isLoggedIn: true,
        token: action.user.token,
        email: action.user.email,
        loading: false,
        error: false,
      };
    case actionTypes.SIGNUP:
      return {
        ...state,
        email: action.email,
        loading: false,
        error: false,
      };
    case actionTypes.REGISTER:
      return {
        ...state,
        email: action.email,
        token: action.token,
        userId: action.userId,
        isLoggedIn: true,
        loading: false,
        error: false,
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        loading: false,
        error: true,
      };
    case actionTypes.AUTHENTICATE:
      return {
        ...state,
        userId: action.userId,
        isLoggedIn: true,
        token: action.token,
        email: action.email,
        loading: false,
        error: false,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        userId: '',
        isLoggedIn: false,
        token: '',
        email: '',
        loading: false,
        error: false,
      };
    case actionTypes.FORGOT_PASSWORD:
      return {
        ...state,
        userId: '',
        isLoggedIn: false,
        token: '',
        email: '',
        loading: false,
        error: false,
      };

    default:
      return state;
  }
};

export default reducer;
