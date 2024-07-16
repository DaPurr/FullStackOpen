import { Button } from '@mui/material'

const LoginForm = ({ onUsernameChange, onPasswordChange, handleLogin }) => {
  return (
    <div>
      <h2>log in to application</h2>
      <div>
        <form onSubmit={handleLogin}>
          <div>
            <label>Username:</label>
            <input data-testid="username" onChange={onUsernameChange} />
          </div>
          <div>
            <label>Password:</label>
            <input
              data-testid="password"
              type="password"
              onChange={onPasswordChange}
            />
          </div>
          <div>
            <Button variant="contained" type="submit">
              login
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
