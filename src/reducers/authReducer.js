export default function authReducer(state = { loadingUser: true }, action) {
  switch(action.type) {
    case 'LOGGED_IN':
      return {
        ...state,
        user: action.user,
        loadingUser: false,
      };
    case 'NO_AUTH':
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
