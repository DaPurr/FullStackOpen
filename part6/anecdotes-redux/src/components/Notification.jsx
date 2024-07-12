import { useSelector } from 'react-redux'

const Notification = () => {
  const notificationText = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  return (
    notificationText.length > 0 && <div style={style}>{notificationText}</div>
  )
}

export default Notification
