const Greeter = ({ user, handleLogout }) => {
  return (
    <div>
      <h2>blogs</h2>
      {user} currently logged in
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Greeter
