import { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@mui/material'

const Togglable = ({ buttonText, children }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      {!visible && (
        <Button variant="contained" onClick={toggleVisibility}>
          {buttonText}
        </Button>
      )}
      {visible && (
        <div>
          {children}
          <Button variant="contained" onClick={toggleVisibility}>
            cancel
          </Button>
        </div>
      )}
    </div>
  )
}

Togglable.propTypes = {
  buttonText: PropTypes.string.isRequired,
}

export default Togglable
