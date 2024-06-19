import { createSlice } from "@reduxjs/toolkit"

const initialState = {content: '', timeOutId: null}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    removeNotification(state, action) {
      return {content: '', timeOutId: null}
    },
    setNotificationContent(state, action) {
      clearTimeout(state.timeOutId)
      return {content: action.payload, timeOutId: null}
    },
    addNotificationTimeOutId(state, action) {
      return {...state, timeOutId: action.payload}
    }
  }
})

const { setNotificationContent, removeNotification, addNotificationTimeOutId } = notificationSlice.actions

export const createNotification = (content, seconds) => {
  return dispatch => {
    dispatch(setNotificationContent(content))
    const timeOutId = setTimeout(() => dispatch(removeNotification()), seconds * 1000)
    dispatch(addNotificationTimeOutId(timeOutId))
  }
}

export default notificationSlice.reducer