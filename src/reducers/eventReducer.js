import { Actions } from '../utils/constants';

export default function eventReducer(state = { isFetching: true }, action) {
  switch(action.type) {
    case Actions.FETCH_EVENTS:
      return {
          ...state,
          isFetching: true,
      };

    case Actions.FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        events: action.events,
      }

    case Actions.FETCH_FAIL:
      return {
        ...state,
        isFetching: false,
      }

    case Actions.SIGN_UP_FOR_EVENT_SUCCESS:
      console.log(action.successMessage)
      return {
        ...state,
        signUpForEventMessage: action.successMessage,
        signUpForEventSuccess: true,
      }

    case Actions.SIGN_UP_FOR_EVENT_FAIL:
      return {
        ...state,
        signUpForEventMessage: action.error,
        signUpForEventSuccess: false,
      }

    default:
      break;
  }
  return state;
}
