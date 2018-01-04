export function increment() {
  return {
    type: 'INCREMENT'
  }
}

export function reset() {
  return {
    type: 'RESET'
  }
}

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
