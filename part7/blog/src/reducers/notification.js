export default (state, action) => {
  switch (action.type) {
    case 'UPDATE':
      return action.payload
    case 'CLEAR':
      return null
    default:
      return state
  }
}

export const setNotification = message => ({ type: 'UPDATE', payload: message })

export const clearNotification = message => ({
  type: 'CLEAR',
})
