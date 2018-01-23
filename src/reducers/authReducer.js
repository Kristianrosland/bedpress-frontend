import { Actions } from '../utils/constants';

const initialState = {
  isAuthenticated: false,
  loadingUser: true,
  newUserSignIn: false,
  userFetched: false,
  idToken: undefined,
}

export default function authReducer(state = initialState, action) {
  switch(action.type) {
    case Actions.AUTH_SUCCESS:
      return {
        ...state,
        idToken: action.idToken,
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
        isAuthenticated: true,
        userFetched: false,
        userInfo: action.userInfo,
      }
    case Actions.FETCH_USER_SUCCESS:
      return {
        ...state,
        newUserSignIn: false,
        isAuthenticated: true,
        userFetched: true,
        userInfo: action.userInfo,
      }

    default:
      break;
  }
  return state;
}
