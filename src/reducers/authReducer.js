export default function authReducer(state = {}, action) {
  switch(action.type) {
    case 'LOGGED_IN':
      return {
        ...state,
        user: action.user,
      };
    default:
      break;
  }
  return state;
}
