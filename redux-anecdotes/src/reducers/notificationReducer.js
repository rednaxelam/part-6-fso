import { createSlice } from "@reduxjs/toolkit"

const initialState = {content: '', timeOutId: null}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    removeNotification(state, action) {
      return {content: '', timeOutId: null}
    },
    createNotification(state, action) {
      clearTimeout(state.timeOutId)
      return {content: action.payload, timeOutId: null}
    },
    addNotificationTimeOutId(state, action) {
      return {...state, timeOutId: action.payload}
    }
  }
})

export const { createNotification, removeNotification, addNotificationTimeOutId } = notificationSlice.actions
export default notificationSlice.reducer