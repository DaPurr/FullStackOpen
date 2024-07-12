const reducer = (state = '', action) => {
  console.log('set filter to', action.payload)

  switch (action.type) {
    case 'UPDATE_FILTER':
      return action.payload
    default:
      return state
  }
}

export const setFilter = text => {
  return { type: 'UPDATE_FILTER', payload: text }
}

export default reducer
