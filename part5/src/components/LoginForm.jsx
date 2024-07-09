const LoginForm = ({ onUsernameChange, onPasswordChange, handleLogin }) => {
  return (
    <div>
      <h2>log in to application</h2>
      <div>
        <form onSubmit={handleLogin}>
          <div>
            <label>Username:</label>
            <input onChange={onUsernameChange} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" onChange={onPasswordChange} />
          </div>
          <div>
            <button>login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
