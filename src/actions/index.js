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

export function login(user) {
  return {
    type: 'LOGGED_IN',
    user: user,
  }
}
