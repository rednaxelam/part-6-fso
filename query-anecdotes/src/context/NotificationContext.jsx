import { createContext, useReducer, useContext } from "react"

let timeoutId = null

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_NOTIFICATION":
      clearTimeout(timeoutId)
      return action.payload
    case "REMOVE_NOTIFICATION":
      clearTimeout(timeoutId)
      return ''
    case "SET_TIMEOUT_ID":
      timeoutId = action.payload
      return state
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)
  return notification
}

export const useNotificationDispatch = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)
  return notificationDispatch
}

export default NotificationContext