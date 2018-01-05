import { Actions } from '../utils/constants';

const initialState = {
  isAuthenticated: false,
  loadingUser: true,
  newUserSignIn: false,
  userFetched: false,
}

export default function authReducer(state = initialState, action) {
  switch(action.type) {
    case Actions.AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loadingUser: false,
      };
    case Actions.AUTH_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        loadingUser: false,
      }
    case Actions.NEW_USER_SIGN_IN:
      return {
        ...state,
        newUserSignIn: true,
        userFetched: false,
      }
    case Actions.FETCH_USER_SUCCESS:
      return {
        ...state,
        newUserSignIn: false,
        userFetched: true,
      }

    default:
      break;
  }
  return state;
}
