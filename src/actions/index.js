import { Actions } from '../utils/constants';

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
