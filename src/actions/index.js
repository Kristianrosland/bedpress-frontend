import { Actions } from '../utils/constants';
import { db } from '../utils/firebase';

export function authSuccess(user) {
  return {
    type: Actions.AUTH_SUCCESS,
    user: user,
  }
}

export function authFail() {
  return {
    type: Actions.AUTH_FAIL,
  }
}

export function fetchEvents() {
  return function(dispatch) {
    dispatch(fetchStart())

    db.collection("presentations").get()
      .then((querySnapshot) => {
        var events = querySnapshot.docs.map(doc => {
          const event = doc.data()
          event.id = doc.id;
          return event;
        });
        dispatch(fetchSuccess(events));
      }).catch((error) => {
        dispatch(fetchFail())
      })
  }
}

export function fetchStart() {
  return {
    type: Actions.FETCH_EVENTS,
  }
}

export function fetchSuccess(events) {
  return {
    type: Actions.FETCH_SUCCESS,
    events: events,
  }
}

export function fetchFail() {
  return {
    type: Actions.FETCH_FAIL,
  }
}
