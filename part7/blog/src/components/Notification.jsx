const Notification = ({ message, type }) => {
  const style = {
    color: type === 'success' ? 'green' : 'red',
    border: '3px solid',
    display: message === null ? 'none' : '',
    padding: '5px',
    borderRadius: '5px',
  }
  return <div style={style}>{message}</div>
}

export default Notification
