const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE':
      return action.payload
    case 'CLEAR':
      return ''
    default:
      return state
  }
}

export const pushNotification = content => ({
  type: 'UPDATE',
  payload: content,
})

export const clearNotification = content => ({ type: 'CLEAR', payload: null })

export default reducer
