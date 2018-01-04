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

    default:
      break;
  }
  return state;
}
