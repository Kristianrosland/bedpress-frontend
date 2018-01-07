import { Actions } from '../utils/constants';
import { db } from '../utils/firebase';

export function authSuccess() {
  return {
    type: Actions.AUTH_SUCCESS,
  }
}

export function authFail() {
  return {
    type: Actions.AUTH_FAIL,
  }
}

export function fetchUser(user) {
  return function(dispatch) {
    dispatch(fetchUserStart());

    const uid = user.uid;
    db.collection("users").doc(uid).get()
      .then(fetchedUser => {
        if (fetchedUser.exists) {
          dispatch(fetchUserSuccess(fetchedUser.data()));
        } else {
          dispatch(newUserSignIn(user));
        }
      }).catch( error => {
        console.log("Error fetching user, ", error)
      });
  }
}

export function newUserSignIn(user) {
  return function(dispatch) {
    const userInfo = {
      name: user.displaName,
      email: user.email,
    };
    dispatch(newUser(userInfo));

    db.collection("users").doc(user.uid).set(userInfo)
      .then(() => {
        console.log("New user written to database");
      })
      .catch( error => console.log("Error writing new user, " + error));
  }
}

export function newUser(userInfo) {
  return {
    type: Actions.NEW_USER_SIGN_IN,
    userInfo: userInfo,
  }
}

export function fetchUserStart() {
  return {
    type: Actions.FETCH_USER,
  }
}

export function fetchUserSuccess(userInfo) {
  return {
    type: Actions.FETCH_USER_SUCCESS,
    userInfo: userInfo,
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

export function receivedUserInfo(userInfo) {
  return {
    type: Actions.FETCH_USER_SUCCESS,
    userInfo: userInfo,
  }
}

export function updateAllergies(allergies, uid) {
  return function(dispatch) {
    db.collection("users").doc(uid).update(
      { allergies: allergies }
    ).then( () => console.log("Allergies updated with ", allergies)
    ).catch( error => console.log("Error updating allergies, ", allergies));
  }
}

export function updateProgramAndYear(program, year, uid) {
  return function(dispatch) {
    db.collection("users").doc(uid).update({
      year: year,
      studyProgram: program,
    }).then( () => console.log("Updated program and year", program, year))
    .catch( error => console.log("Error updating program and year"));
  }
}
