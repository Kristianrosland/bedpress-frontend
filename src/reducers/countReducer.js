export default function countReducer(state = { count: 0 }, action) {
  switch(action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,
      };

    case 'RESET':
      return {
        ...state,
        count: 0
      }

    default:
      console.log(action.type)
  }
  return state;
}
