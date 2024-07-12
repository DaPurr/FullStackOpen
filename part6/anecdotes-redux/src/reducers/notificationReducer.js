import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotificationMessage(state, action) {
      console.log('notification action:', action)
      return action.payload
    },
    clearNotification() {
      return ''
    },
  },
})

export const setNotification = (message, timeout) => {
  return async dispatch => {
    setTimeout(() => dispatch(clearNotification()), timeout)
    return dispatch(setNotificationMessage(message))
  }
}

export const { setNotificationMessage, clearNotification } =
  notificationSlice.actions
export default notificationSlice.reducer
