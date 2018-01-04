import { Actions } from '../utils/constants';

export default function authReducer(state = { loadingUser: true }, action) {
  switch(action.type) {
    case Actions.AUTH_SUCCESS:
      return {
        ...state,
        user: action.user,
        loadingUser: false,
      };
    case Actions.AUTH_FAIL:
      return {
        ...state,
        user: undefined,
        loadingUser: false,
      }
    default:
      break;
  }
  return state;
}
