import { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = ({ buttonText, children }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      {!visible && <button onClick={toggleVisibility}>{buttonText}</button>}
      {visible && (
        <div>
          {children}
          <button onClick={toggleVisibility}>cancel</button>
        </div>
      )}
    </div>
  )
}

Togglable.propTypes = {
  buttonText: PropTypes.string.isRequired,
}

export default Togglable
