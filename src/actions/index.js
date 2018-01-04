export function authSuccess(user) {
  return {
    type: 'AUTH_SUCCESS',
    user: user,
  }
}

export function authFail() {
  return {
    type: 'AUTH_FAIL',
  }
}
