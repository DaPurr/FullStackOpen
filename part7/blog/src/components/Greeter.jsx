import { Button } from '@mui/material'

const Greeter = ({ user, handleLogout }) => {
  return (
    <div>
      <h2>blogs</h2>
      {user} currently logged in
      <Button variant="contained" onClick={handleLogout}>
        logout
      </Button>
    </div>
  )
}

export default Greeter
