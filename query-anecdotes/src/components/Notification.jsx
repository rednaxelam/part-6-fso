import { useNotificationValue } from "../context/NotificationContext"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const notificationValue = useNotificationValue()
  
  if (notificationValue === '') return null
  else return (
    <div style={style}>
      {notificationValue}
    </div>
  )
}

export default Notification
